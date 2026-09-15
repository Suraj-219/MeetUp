import { clerkClient, getAuth } from "@clerk/express";
import {verifyWebhook} from "@clerk/express/webhooks"
import { sql } from "../config/db.js";

async function upsertUser(user) {
    const primaryEmail = user.emailAddresses?.find(
        (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress || user.emailAddresses?.[0]?.emailAddress || "";
    const name = `${user.firstName || "User"} ${user.lastName || ""}`.trim();
    const image = user.imageUrl || "";

    await sql`
        INSERT INTO users (id, name, email, image, plan)
        VALUES (${user.id}, ${name}, ${primaryEmail}, ${image}, 'free')
        ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            email = EXCLUDED.email,
            image = EXCLUDED.image,
            updated_at = NOW()`;
}

export const syncCurrentUser = async (req, res) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const user = await clerkClient.users.getUser(userId);
        await upsertUser(user);

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error syncing user to database:", error.message || error);
        return res.status(500).json({ error: "Unable to sync user" });
    }
};

export const handleClerkWebhook = async (req, res) => {
    try {
        const evt = await verifyWebhook(req)

        const eventType = evt.type;
        const data = evt.data;

        switch(eventType) {
            case "user.created": {
                const userId = data.id;
                const primaryEmail = data.email_addresses?.[0]?.email_address || "";
                const name = `${data.first_name || "User"} ${data.last_name}`;
                const image = data.image_url || "";
                const plan = "free";

                await upsertUser(data);
                break;
            }

            case "user.updated": {
                const userId = data.id;
                const primaryEmail = data.email_addresses?.[0]?.email_address || "";
                const name = `${data.first_name || "User"} ${data.last_name}`;
                const image = data.image_url || "";
                const plan = "free";

                await upsertUser(data);
                break;
            }
            
            case "user.deleted": {
                const userId = data.id;
                if(userId){
                    await sql`DELETE FROM users WHERE id = ${userId}`;
                }
            }
            
            default:
                console.log(`Unhandled Clerk webhook event type: ${eventType}`);   
        }
        return res.status(200).json({ success: true, eventType });

    } catch(error){
        console.error("Error verifying Clerk webhook:", err.message || err);
        return res.status(400).json({ error : "Webhook verification failed: " + (err.message || err)});
    }
}
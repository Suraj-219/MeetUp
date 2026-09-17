import { sql } from "./config/db.js";

const rooms = new Map();

export function setupSocketId(io){
    io.on("connection", (socket)=>{
        let currentRoomId = null;
        let currentUser = null;

        // User joins aa meeting room
        socket.on("json-room", async ({roomId, user, audioEnabled = true, videoEnabled = true})=>{
            try {
                // Verify meeting status from DB
                const meetings = await sql`SELECT * FROM meetings WHERE meeting_id = ${roomId}`;

                if(meetings.length === 0){
                    socket.emit("meeting-ended", {message: "Meeting not fund."})
                    return;
                }
                const meeting = meetings[0];

                if(meeting.status === "ended"){
                    socket.emit("meeting-ended", {message: "This meeting has already ended."})
                    return;
                }

                currentRoomId = roomId;
                const isHost = meeting.host_id && user?.id && meeting.host_id.toString() === user.is.toString();

                currentUser = {
                    socketId: socket.id,
                    userId: user?.id,
                    userName: user?.name || "Anonymous",
                    isHost,
                    audioEnabled,
                    videoEnabled,
                }

                if(!rooms.has(roomId)){
                    rooms.set(roomId, new Map())
                }

                const roomParticipants = rooms.get(roomId);

                const hosts = await sql`SELECT plan FROM users WHERE id = ${meeting.host_id}`;

                const hostPlan = hosts[0]?.plan || "free";
                const maxParticipants = hostPlan === "premium" ? 100 : 10;

                if(roomParticipants.size >= maxParticipants){
                    socket.emit("meeting-ended", {
                        message: `Meeting capacity limit reached (max ${maxParticipants}
                        participants for ${hostPlan.toUpperCase()} plan). Hostmust upgrade
                        to Premium for up to 100 participants!`,
                    })
                    return;
                }
                socket.json(roomId)

                // Get existing participants in the room 
                const existingUsers = Array.from(roomParticipants.values());

                // Add new participants to socket state
                roomParticipants.set(socket.id, currentUser);

                // Save participant into DB if not already present
                const userId = user?.id || null;
                const existingParticipants = await sql`
                SELECT id FROM meeting_participants
                WHERE meeting_id = ${meeting.id}
                AND ((${userId}::text IS NOT NULL AND user_id = ${userId}) OR name = ${currentUser.userName})`;

                if(existingParticipants.length === 0){
                    await sql`
                    INSERT INTO meeting_participants (meeting_id, user_id, name, joined_at)
                    VALUES (${meeting.id}, ${userId}, ${currentUser.userName}, NOW())`;
                }

                socket.emit("all-users", existingUsers);

                // Notify everyone else in the room
                socket.to(roomId).emit("user-joined", currentUser);

            } catch(error){
                console.error("Error joining room in socket:", err);
                socket.emit("meeting-ended", {message: "Failed to join room."});
            }
        })
    })
}
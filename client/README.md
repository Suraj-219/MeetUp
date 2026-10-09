# React + Vite

## Deployment configuration

In the Vercel project settings, set `VITE_BASE_URL` to the public base URL of the deployed API, for example `https://your-api.example.com` (no trailing slash). Do not use `localhost` for a production deployment. Redeploy the client after changing this value.

On the API host, set `ORIGINS` to a comma-separated list of allowed frontend origins. Include `https://meet-up-xyjv.vercel.app` and any custom or preview domains you use. The API must be publicly reachable over HTTPS; local URLs only work on your own computer.

The API also needs its database and Clerk environment variables configured on its host. Because this app uses Socket.IO, use a backend host that supports persistent WebSocket connections.

## Local development

Set `VITE_BASE_URL=http://localhost:3000` in the client environment and run the API server locally.

## Vite template

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

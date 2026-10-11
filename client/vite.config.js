import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import process from "node:process";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  if (command === "build" && !env.VITE_API_URL?.trim()) {
    throw new Error(
      "VITE_API_URL is required for production builds. Set it to the deployed backend URL ending in /api."
    );
  }

  return {
    plugins: [react()],
  };
})

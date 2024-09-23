import { useEffect } from "react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

export default function useEcho() {
  useEffect(() => {
    // Check if running in the browser
    if (typeof window !== "undefined") {
      window.Pusher = Pusher;
      window.Echo = new Echo({
        broadcaster: "reverb",
        key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
        wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
        wsPort: process.env.NEXT_PUBLIC_REVERB_PORT ?? 80,
        wssPort: process.env.NEXT_PUBLIC_REVERB_PORT ?? 443,
        forceTLS:
          (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? "https") === "https",
        enabledTransports: ["ws", "wss"],
      });
    }
  }, []);
}

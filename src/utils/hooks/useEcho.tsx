import { useEffect, useState } from "react";
import Echo from "laravel-echo";
import { axiosClient } from "@/networks/apiClient";
import Pusher from "pusher-js";

interface Authorizer {
  authorize(
    socketId: string,
    callback: (error: boolean, data: any) => void
  ): void;
}

export default function useEcho(): Echo | null {
  const [echoInstance, setEchoInstance] = useState<Echo | null>(null);

  useEffect(() => {
    // Check if running in the browser
    if (typeof window !== "undefined") {
      window.Pusher = Pusher;

      const echo = new Echo({
        broadcaster: "reverb",
        key: process.env.NEXT_PUBLIC_REVERB_APP_KEY as string,
        authorizer: (channel: any, options: any): Authorizer => {
          return {
            authorize: (socketId, callback) => {
              axiosClient
                .post("/api/broadcasting/auth", {
                  socket_id: socketId,
                  channel_name: channel.name,
                })
                .then((response) => {
                  callback(false, response.data);
                })
                .catch((error) => {
                  callback(true, error);
                });
            },
          };
        },
        wsHost: process.env.NEXT_PUBLIC_REVERB_HOST as string,
        wsPort: process.env.NEXT_PUBLIC_REVERB_PORT
          ? parseInt(process.env.NEXT_PUBLIC_REVERB_PORT)
          : 80,
        wssPort: process.env.NEXT_PUBLIC_REVERB_PORT
          ? parseInt(process.env.NEXT_PUBLIC_REVERB_PORT)
          : 443,
        forceTLS:
          (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? "https") === "https",
        enabledTransports: ["ws", "wss"],
      });

      setEchoInstance(echo);

      // Cleanup function to disconnect echo when the component unmounts
      return () => {
        echo.disconnect();
      };
    }
  }, []);

  return echoInstance;
}

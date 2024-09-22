import Echo from "laravel-echo";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";

declare global {
    interface Window {
      Pusher: any;
      Echo: any;
    }
}

export default function test() {
    const [data, setData] = useState("");

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.Pusher = Pusher;
            window.Echo = new Echo({
                broadcaster: "reverb",
                key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
                wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
                wsPort: process.env.NEXT_PUBLIC_REVERB_PORT ?? 80,
                wssPort: process.env.NEXT_PUBLIC_REVERB_PORT ?? 443,
                forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? "https") === "https",
                enabledTransports: ["ws", "wss"],
            });
            window.Echo.channel('list_dealer_online')
            .listen('ListDealerEvent', async (e) => {
                // e.message
                console.log('ListDealerEvent::', e);
                setData(JSON.stringify(e))
            });
        }
    })
    return data
}
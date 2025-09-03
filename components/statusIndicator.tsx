"use client";

import { useEffect, useRef } from "react";

type Props = {
  memberId: string;
};

export default function StatusIndicator({ memberId }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    async function updateStatus() {
      try {
        const res = await fetch("https://blibblop-api.rc-garage.nl/user-statussen");
        const data = await res.json();

        if (!ref.current || !data[memberId]) return;

        const status = data[memberId].status;
        const lastChecked = data[memberId].lastChecked;

        ref.current.classList.remove("status-online", "status-offline", "status-idle");

        switch (status) {
          case "online":
            ref.current.classList.add("status-online");
            break;
          case "idle":
            ref.current.classList.add("status-idle");
            break;
          default:
            ref.current.classList.add("status-offline");
        }

        ref.current.title = `Discord status: ${status}. Last checked: ${lastChecked}`;
      } catch (err) {
        console.error("Error fetching status:", err);
      }
    }

    void updateStatus();

    const interval = setInterval(updateStatus, 20 * 1000); // 20 seconds
    return () => clearInterval(interval);
  }, [memberId]);

  return (
    <span
      ref={ref}
      className="absolute top-2 right-2 w-5 h-5 rounded-full shadow-lg transition-colors duration-300"
    />
  );
}

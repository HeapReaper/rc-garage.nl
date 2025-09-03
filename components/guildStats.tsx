"use client";

import { useEffect, useState } from "react";
import { CountUp } from "countup.js";

export default function GuildStats() {
  const [stats, setStats] = useState({
    memberCount: 0,
    membersOnline: 0,
    boostCount: 0,
    lastJoined: "...",
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("https://blibblop-api.rc-garage.nl/stats/guild");
        const data = await res.json();

        setStats({
          memberCount: data.memberCount,
          membersOnline: data.membersOnline,
          boostCount: data.boostCount,
          lastJoined: data.lastJoined,
        });

        const memberCount = new CountUp("memberCount", data.memberCount, { enableScrollSpy: true });
        memberCount.error ? console.error(memberCount.error) : memberCount.start();

        const onlineCount = new CountUp("onlineCount", data.membersOnline, { enableScrollSpy: true });
        onlineCount.error ? console.error(onlineCount.error) : onlineCount.start();

        const boostCount = new CountUp("boostCount", data.boostCount, { enableScrollSpy: true });
        boostCount.error ? console.error(boostCount.error) : boostCount.start();
      } catch (err) {
        console.error("Error fetching guild stats:", err);
      }
    }

    fetchStats();
    const interval = setInterval(fetchStats, 29_000); // update every 29 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="communityStatisticsSection"
      className="max-w-5xl mx-auto py-10 px-8 text-center"
      data-aos="fade-up"
      data-aos-duration="700"
      data-aos-delay="100"
    >
      <div className="flex flex-col items-center gap-2 mb-12 sm:flex-row sm:justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-11 h-11 text-blue-600"
        >
          <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
        </svg>
        <h2 className="text-4xl font-bold text-center sm:text-left">Community Statistieken</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105">
          <p className="text-gray-400 mb-1">Aantal leden</p>
          <p id="memberCount" className="font-bold text-xl">
            {stats.memberCount}
          </p>
        </div>

        <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105">
          <p className="text-gray-400 mb-1">Online leden</p>
          <p id="onlineCount" className="font-bold text-xl">
            {stats.membersOnline}
          </p>
        </div>

        <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105">
          <p className="text-gray-400 mb-1">Aantal boosts</p>
          <p id="boostCount" className="font-bold text-xl">
            {stats.boostCount}
          </p>
        </div>

        <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105">
          <p className="text-gray-400 mb-1">Laatste lid join</p>
          <p id="lastJoined" className="font-bold text-xl">
            {stats.lastJoined}
          </p>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";

async function fetchEvents() {
  const res = await fetch(`${process.env.BOT_API_URL}/api/events`, {
    next: { revalidate: 60 },
  });

  const data = await res.json();
  return data;
}

export default async function Page() {
  const events = await fetchEvents();

  return (
    <section className="max-w-6xl mx-auto py-20 px-8 text-center">
      <h1 className="text-5xl font-bold mb-12">Events</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {events.map((event: any) => (
          <div
            key={event.id}
            className="block bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <div className="w-full h-48 bg-gray-800 flex items-center justify-center text-gray-500 text-sm">
              {event.image ? (
                <Image
                  src={event.image}
                  alt={event.name}
                  width={400}
                  height={192}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span>
                  Geen afbeelding beschikbaar...
                </span>
              )}
            </div>

            <div className="p-4 text-left">
              <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{event.name}</h2>
              <p className="text-gray-400 text-xs sm:text-sm">
                {event.scheduledStartTime} - {event.scheduledEndTime}
              </p>
              <p className="mt-1 sm:mt-2 text-gray-300 line-clamp-3 text-sm">
                {event.description}
              </p>
              <p className="mt-2 text-gray-400 text-xs sm:text-sm">
                <span className="font-semibold">Location:</span> {event.location}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm">
                <span className="font-semibold">Creator:</span> {event.creator.username}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm">
                <span className="font-semibold">Guild:</span> {event.guildName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

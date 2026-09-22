import Image from "next/image";
import { Calendar, Check, Compass, Home, MapPin, Search, Ticket, User, Waves } from "lucide-react";

const accent = "var(--color-tech-blue)";

/**
 * Illustrated (not real) phone-screen mockups for the LIBERIA360 landing
 * page's PhoneMockup — simple stand-ins for "browse places," "plan a
 * trip," conveying what the app does without claiming to be an actual
 * screenshot.
 */
export function WelcomeScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 bg-[var(--color-navy)] px-6 text-center">
      <Image src="/products/liberia360/logo.png" alt="" aria-hidden="true" width={72} height={72} className="rounded-2xl" />
      <div>
        <p className="text-lg font-bold text-white">Discover Liberia</p>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-pale)]">
          Everything Liberia. One place.
        </p>
      </div>
    </div>
  );
}

const places = [
  { name: "Waterfall day trip", place: "Bong County", icon: Waves },
  { name: "City walking tour", place: "Monrovia", icon: Compass },
  { name: "Beachside restaurant", place: "Robertsport", icon: MapPin },
];

export function DiscoverScreen() {
  return (
    <div className="flex h-full flex-col bg-[var(--color-off-white)] px-4 pb-4 pt-8">
      <div className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-3 py-2">
        <Search size={13} aria-hidden="true" className="text-[var(--ink-muted)]" />
        <span className="text-[11px] text-[var(--ink-muted)]">Search places in Liberia</span>
      </div>
      <div className="mt-4 grid gap-2.5">
        {places.map(({ name, place, icon: Icon }) => (
          <div key={name} className="flex items-center gap-2.5 rounded-xl border border-[var(--line)] bg-white p-2.5">
            <span
              className="grid size-9 shrink-0 place-items-center rounded-lg"
              style={{ backgroundColor: `color-mix(in srgb, ${accent} 16%, transparent)`, color: accent }}
            >
              <Icon size={16} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-bold text-[var(--ink)]">{name}</p>
              <p className="truncate text-[10px] text-[var(--ink-muted)]">{place}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-around border-t border-[var(--line)] pt-3" aria-hidden="true">
        {[Home, Compass, Calendar, User].map((Icon, i) => (
          <Icon key={i} size={15} className={i === 0 ? "" : "text-[var(--ink-muted)]"} style={i === 0 ? { color: accent } : undefined} />
        ))}
      </div>
    </div>
  );
}

const itinerary = [
  { day: "Day 1", items: ["Arrive in Monrovia", "Check in to hotel"] },
  { day: "Day 2", items: ["Waterfall day trip", "Dinner by the beach"] },
];

export function TripScreen() {
  return (
    <div className="flex h-full flex-col gap-4 bg-[var(--color-off-white)] px-4 pb-4 pt-8">
      <div className="flex items-center gap-2">
        <Ticket size={14} aria-hidden="true" style={{ color: accent }} />
        <p className="text-[12px] font-bold text-[var(--ink)]">My Liberia Trip</p>
      </div>
      {itinerary.map(({ day, items }) => (
        <div key={day} className="rounded-xl border border-[var(--line)] bg-white p-3">
          <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: accent }}>
            {day}
          </p>
          <ul className="mt-2 grid gap-1.5">
            {items.map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-[11px] text-[var(--ink)]">
                <Check size={12} aria-hidden="true" style={{ color: accent }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

import { CheckCircle2, Circle, Hash, Home, Inbox, LayoutGrid, ListChecks, Search, Sparkles } from "lucide-react";

const accent = "var(--kuu)";
const tint = (percent: number) => `color-mix(in srgb, ${accent} ${percent}%, transparent)`;

const channels = ["general", "announcements", "launch-plan", "field-team"];

const todayTasks = [
  { title: "Confirm venue for the launch", done: true },
  { title: "Share the draft budget", done: false },
  { title: "Review onboarding guide", done: false },
];

/**
 * A static, illustrative sketch of the Küü workspace — a channel conversation
 * where a message has become an owned task, beside the day's task list. It
 * mirrors the product's real layout and concepts but is drawn in markup, not
 * a screenshot, and contains no real people or data.
 */
export function KuuWorkspace() {
  return (
    <figure className="m-0">
      <div
        aria-hidden="true"
        className="overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-elevated)]"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-[var(--line)] px-4 py-3">
          <span className="flex gap-1.5">
            <i className="size-2.5 rounded-full bg-[var(--line)]" />
            <i className="size-2.5 rounded-full bg-[var(--line)]" />
            <i className="size-2.5 rounded-full bg-[var(--line)]" />
          </span>
          <span className="mx-auto flex items-center gap-1.5 rounded-full bg-[var(--bg)] px-3 py-1 text-[11px] text-[var(--ink-muted)]">
            <Search size={11} /> kuuuu.app
          </span>
        </div>

        <div className="grid grid-cols-1 text-[12px] sm:grid-cols-[170px_1fr] lg:grid-cols-[170px_1fr_190px]">
          {/* Sidebar */}
          <div className="hidden border-r border-[var(--line)] p-3 sm:block">
            <div className="flex items-center gap-2 px-1.5 pb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/products/kuu/kuu-icon.svg" alt="" className="size-6 rounded-md" />
              <span className="font-bold text-[var(--ink)]">Your team</span>
            </div>
            {[
              { icon: Home, label: "Home" },
              { icon: Inbox, label: "Inbox" },
              { icon: ListChecks, label: "My work" },
              { icon: LayoutGrid, label: "Projects" },
            ].map(({ icon: Icon, label }) => (
              <p key={label} className="flex items-center gap-2 rounded-lg px-1.5 py-1.5 text-[var(--ink-muted)]">
                <Icon size={13} /> {label}
              </p>
            ))}
            <p className="mt-3 px-1.5 pb-1 text-[10px] font-bold uppercase tracking-widest text-[var(--ink-muted)]">
              Channels
            </p>
            {channels.map((channel) => {
              const active = channel === "launch-plan";
              return (
                <p
                  key={channel}
                  className="flex items-center gap-1.5 truncate rounded-lg px-1.5 py-1.5"
                  style={active ? { backgroundColor: tint(14), color: accent, fontWeight: 700 } : undefined}
                >
                  <Hash size={12} className={active ? undefined : "text-[var(--ink-muted)]"} />
                  <span className={active ? undefined : "text-[var(--ink-muted)]"}>{channel}</span>
                </p>
              );
            })}
          </div>

          {/* Channel */}
          <div className="flex min-w-0 flex-col gap-3 p-4">
            <p className="flex items-center gap-1.5 font-bold text-[var(--ink)]">
              <Hash size={13} /> launch-plan
            </p>
            <Message initials="AK" name="Ama" time="9:12">
              Venue is confirmed for the 14th. Can someone own the budget draft?
            </Message>
            <Message initials="JT" name="Joseph" time="9:20">
              I&rsquo;ll take it — I&rsquo;ll share it by Friday.
            </Message>
            <div className="ml-9 rounded-xl border p-3" style={{ borderColor: tint(40), backgroundColor: tint(7) }}>
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: accent }}>
                <ListChecks size={11} /> Task created from message
              </p>
              <p className="mt-1.5 font-semibold text-[var(--ink)]">Share the draft budget</p>
              <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--ink-muted)]">
                <span>Owner: Joseph</span>
                <span>Due Friday</span>
                <span style={{ color: accent }}>In progress</span>
              </p>
            </div>
            <div className="mt-auto flex items-center gap-2 rounded-xl border border-[var(--line)] px-3 py-2 text-[var(--ink-muted)]">
              <Sparkles size={12} style={{ color: accent }} />
              Ask Küü: what did we decide about the venue?
            </div>
          </div>

          {/* Today */}
          <div className="hidden border-l border-[var(--line)] p-4 lg:block">
            <p className="font-bold text-[var(--ink)]">Today</p>
            <ul className="mt-3 space-y-2.5">
              {todayTasks.map((task) => (
                <li key={task.title} className="flex items-start gap-2">
                  {task.done ? (
                    <CheckCircle2 size={14} className="mt-px shrink-0" style={{ color: accent }} />
                  ) : (
                    <Circle size={14} className="mt-px shrink-0 text-[var(--ink-muted)]" />
                  )}
                  <span className={task.done ? "text-[var(--ink-muted)] line-through" : "text-[var(--ink)]"}>{task.title}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 font-bold text-[var(--ink)]">Decided this week</p>
            <p className="mt-2 rounded-lg bg-[var(--bg)] p-2.5 leading-relaxed text-[var(--ink-muted)]">
              Launch on the 14th at the confirmed venue.
            </p>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-[var(--ink-muted)]">
        Illustrative preview of a Küü workspace.
      </figcaption>
    </figure>
  );
}

function Message({ initials, name, time, children }: { initials: string; name: string; time: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-2.5">
      <span
        className="grid size-7 shrink-0 place-items-center rounded-full text-[10px] font-bold"
        style={{ backgroundColor: tint(16), color: accent }}
      >
        {initials}
      </span>
      <div className="min-w-0">
        <p className="text-[var(--ink)]">
          <b>{name}</b> <span className="text-[11px] text-[var(--ink-muted)]">{time}</span>
        </p>
        <p className="mt-0.5 leading-relaxed text-[var(--ink-muted)]">{children}</p>
      </div>
    </div>
  );
}

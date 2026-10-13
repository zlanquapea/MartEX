"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { Check, Loader2, Minus, Plus, Receipt, ScanLine, Store, Trash2 } from "lucide-react";
import { useIsReducedMotion } from "@/components/motion/use-reduced-motion";
import type { PockaySaleItem } from "@/content/products";

const accent = "var(--pockaypos)";
const tint = (percent: number) => `color-mix(in srgb, ${accent} ${percent}%, transparent)`;

type Currency = "USD" | "LRD";
type CartLine = PockaySaleItem & { qty: number };
type CompletedSale = { id: number; totalUsd: number; currency: Currency; rate: number; lines: CartLine[] };
type View = "register" | "charging" | "success";
type Tab = "register" | "sales";

function formatAmount(amountUsd: number, currency: Currency, rate: number) {
  if (currency === "USD") return `$${amountUsd.toFixed(2)}`;
  return `L$${Math.round(amountUsd * rate).toLocaleString()}`;
}

/**
 * A genuinely working point-of-sale demo — not a screenshot or a static
 * sketch. Add demo items (by tapping or scanning a demo barcode), switch
 * between USD and LRD, charge the sale, and watch "Today's sales" update
 * from the transactions actually run here. All state is local to this
 * component and resets on reload; nothing is sent anywhere.
 */
export function PosDemo({
  catalog,
  barcodes,
  exchangeRate,
}: {
  catalog: PockaySaleItem[];
  barcodes: Record<string, string>;
  exchangeRate: number;
}) {
  const shouldReduceMotion = useIsReducedMotion();
  const [tab, setTab] = useState<Tab>("register");
  const [view, setView] = useState<View>("register");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [sales, setSales] = useState<CompletedSale[]>([]);
  const [lastSale, setLastSale] = useState<CompletedSale | null>(null);
  const [barcodeInput, setBarcodeInput] = useState("");
  const [barcodeError, setBarcodeError] = useState(false);
  const barcodeRef = useRef<HTMLInputElement>(null);

  const totalUsd = useMemo(() => cart.reduce((sum, line) => sum + line.price * line.qty, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((sum, line) => sum + line.qty, 0), [cart]);

  const todayTotalUsd = useMemo(() => sales.reduce((sum, sale) => sum + sale.totalUsd, 0), [sales]);
  const usdSales = useMemo(() => sales.filter((s) => s.currency === "USD").length, [sales]);
  const lrdSales = sales.length - usdSales;
  const topItems = useMemo(() => {
    const counts = new Map<string, { name: string; qty: number }>();
    for (const sale of sales) {
      for (const line of sale.lines) {
        const existing = counts.get(line.id);
        counts.set(line.id, { name: line.name, qty: (existing?.qty ?? 0) + line.qty });
      }
    }
    return Array.from(counts.values()).sort((a, b) => b.qty - a.qty);
  }, [sales]);

  function addItem(item: PockaySaleItem) {
    setCart((current) => {
      const existing = current.find((line) => line.id === item.id);
      if (existing) {
        return current.map((line) => (line.id === item.id ? { ...line, qty: line.qty + 1 } : line));
      }
      return [...current, { ...item, qty: 1 }];
    });
  }

  function changeQty(id: string, delta: number) {
    setCart((current) =>
      current
        .map((line) => (line.id === id ? { ...line, qty: line.qty + delta } : line))
        .filter((line) => line.qty > 0)
    );
  }

  function removeLine(id: string) {
    setCart((current) => current.filter((line) => line.id !== id));
  }

  function submitBarcode(event: React.FormEvent) {
    event.preventDefault();
    const code = barcodeInput.trim();
    const itemId = barcodes[code];
    const item = catalog.find((entry) => entry.id === itemId);
    if (item) {
      addItem(item);
      setBarcodeError(false);
    } else {
      setBarcodeError(true);
    }
    setBarcodeInput("");
  }

  function charge() {
    if (cart.length === 0) return;
    setView("charging");
    window.setTimeout(
      () => {
        const sale: CompletedSale = { id: Date.now(), totalUsd, currency, rate: exchangeRate, lines: cart };
        setSales((current) => [...current, sale]);
        setLastSale(sale);
        setView("success");
      },
      shouldReduceMotion ? 150 : 900
    );
  }

  function newSale() {
    setCart([]);
    setLastSale(null);
    setView("register");
    barcodeRef.current?.focus();
  }

  return (
    <figure className="m-0">
      <div
        className="overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-elevated)]"
        style={{ "--accent": accent } as React.CSSProperties}
      >
        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-[var(--line)] px-4 py-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <i className="size-2.5 rounded-full bg-[var(--line)]" />
            <i className="size-2.5 rounded-full bg-[var(--line)]" />
            <i className="size-2.5 rounded-full bg-[var(--line)]" />
          </span>
          <span className="mx-auto flex items-center gap-1.5 rounded-full bg-[var(--bg)] px-3 py-1 text-[11px] text-[var(--ink-muted)]">
            <Store size={11} aria-hidden="true" /> pockaypos.com
          </span>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[var(--line)] px-4" role="tablist" aria-label="PockayPOS demo view">
          {(["register", "sales"] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className="relative px-4 py-3 text-sm font-semibold"
              style={{ color: tab === t ? accent : "var(--ink-muted)" }}
            >
              {t === "register" ? "Register" : "Today's sales"}
              {tab === t && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3 bottom-0 h-0.5 rounded-full"
                  style={{ backgroundColor: accent }}
                />
              )}
            </button>
          ))}
        </div>

        {tab === "register" ? (
          <div className="grid grid-cols-1 gap-0 sm:grid-cols-[1fr_270px]">
            <div>
              {/* Barcode scan */}
              <form onSubmit={submitBarcode} className="flex items-center gap-2 border-b border-[var(--line)] p-3">
                <ScanLine size={15} aria-hidden="true" className="shrink-0 text-[var(--ink-muted)]" />
                <input
                  ref={barcodeRef}
                  type="text"
                  inputMode="numeric"
                  value={barcodeInput}
                  onChange={(e) => {
                    setBarcodeInput(e.target.value);
                    setBarcodeError(false);
                  }}
                  placeholder="Scan or type a barcode, e.g. 001"
                  aria-label="Scan or type a demo barcode"
                  disabled={view !== "register"}
                  className="min-w-0 flex-1 bg-transparent text-sm text-[var(--ink)] outline-none placeholder:text-[var(--ink-muted)]"
                />
              </form>
              {barcodeError && (
                <p role="alert" className="px-3 pt-2 text-xs text-[#c4453a]">
                  No demo item has that barcode. Try 001–006.
                </p>
              )}

              {/* Catalog */}
              <div className="grid grid-cols-2 gap-2.5 p-4 sm:grid-cols-3">
                {catalog.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => addItem(item)}
                    disabled={view !== "register"}
                    className="rounded-xl border border-[var(--line)] p-3 text-left transition-colors hover:border-[var(--accent)] disabled:opacity-50"
                  >
                    <p className="text-sm font-semibold text-[var(--ink)]">{item.name}</p>
                    <p className="mt-1 text-xs font-bold" style={{ color: accent }}>
                      {formatAmount(item.price, currency, exchangeRate)}
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] text-[var(--ink-muted)]">
                      #00{index + 1}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Cart / charge / success */}
            <div className="border-t border-[var(--line)] p-4 sm:border-l sm:border-t-0">
              {view === "success" && lastSale ? (
                <SuccessPanel sale={lastSale} onNewSale={newSale} shouldReduceMotion={shouldReduceMotion} />
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[var(--ink-muted)]">
                      <Receipt size={13} aria-hidden="true" /> Current sale
                    </p>
                    <div className="flex rounded-full border border-[var(--line)] p-0.5 text-[11px] font-bold">
                      {(["USD", "LRD"] as const).map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setCurrency(c)}
                          aria-pressed={currency === c}
                          className="rounded-full px-2.5 py-1 transition-colors"
                          style={
                            currency === c ? { backgroundColor: accent, color: "white" } : { color: "var(--ink-muted)" }
                          }
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                  {cart.length === 0 ? (
                    <p className="mt-6 text-sm text-[var(--ink-muted)]">Tap an item, or scan its barcode, to add it to the sale.</p>
                  ) : (
                    <ul className="mt-3 grid gap-2.5">
                      {cart.map((line) => (
                        <li key={line.id} className="flex items-center gap-2 text-sm">
                          <span className="min-w-0 flex-1 truncate text-[var(--ink)]">{line.name}</span>
                          <button
                            type="button"
                            aria-label={`Remove one ${line.name}`}
                            onClick={() => changeQty(line.id, -1)}
                            disabled={view !== "register"}
                            className="grid size-6 place-items-center rounded-md border border-[var(--line)] text-[var(--ink-muted)] disabled:opacity-50"
                          >
                            <Minus size={11} aria-hidden="true" />
                          </button>
                          <span className="w-4 text-center text-[var(--ink)]">{line.qty}</span>
                          <button
                            type="button"
                            aria-label={`Add one more ${line.name}`}
                            onClick={() => changeQty(line.id, 1)}
                            disabled={view !== "register"}
                            className="grid size-6 place-items-center rounded-md border border-[var(--line)] text-[var(--ink-muted)] disabled:opacity-50"
                          >
                            <Plus size={11} aria-hidden="true" />
                          </button>
                          <span className="w-16 shrink-0 text-right font-semibold text-[var(--ink)]">
                            {formatAmount(line.price * line.qty, currency, exchangeRate)}
                          </span>
                          <button
                            type="button"
                            aria-label={`Remove ${line.name} from sale`}
                            onClick={() => removeLine(line.id)}
                            disabled={view !== "register"}
                            className="text-[var(--ink-muted)] hover:text-[var(--ink)] disabled:opacity-50"
                          >
                            <Trash2 size={13} aria-hidden="true" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-5 flex items-center justify-between border-t border-[var(--line)] pt-4 text-sm font-bold text-[var(--ink)]">
                    <span>Total ({cartCount} item{cartCount === 1 ? "" : "s"})</span>
                    <span>{formatAmount(totalUsd, currency, exchangeRate)}</span>
                  </div>
                  {currency === "LRD" && (
                    <p className="mt-1 text-right text-[11px] text-[var(--ink-muted)]">
                      at an example rate of L${exchangeRate}/$1 — managers set the real rate
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={charge}
                    disabled={cart.length === 0 || view === "charging"}
                    className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold text-white transition-opacity disabled:opacity-40"
                    style={{ backgroundColor: accent }}
                  >
                    {view === "charging" ? (
                      <>
                        <ChargingSpinner shouldReduceMotion={shouldReduceMotion} />
                        Processing…
                      </>
                    ) : (
                      `Charge ${formatAmount(totalUsd, currency, exchangeRate)}`
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--ink-muted)]">Today&rsquo;s sales</p>
            <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <p className="text-3xl font-bold tracking-tight" style={{ color: accent }}>
                  ${todayTotalUsd.toFixed(2)}
                </p>
                <p className="mt-1 text-xs text-[var(--ink-muted)]">Total revenue, this demo session</p>
              </div>
              <div>
                <p className="text-3xl font-bold tracking-tight" style={{ color: accent }}>
                  {sales.length}
                </p>
                <p className="mt-1 text-xs text-[var(--ink-muted)]">
                  Sales completed{sales.length > 0 ? ` (${usdSales} USD, ${lrdSales} LRD)` : ""}
                </p>
              </div>
            </div>
            {topItems.length === 0 ? (
              <p className="mt-8 rounded-xl border border-dashed border-[var(--line)] p-5 text-center text-sm text-[var(--ink-muted)]">
                Ring up a sale in the Register tab to see it here.
              </p>
            ) : (
              <ul className="mt-6 grid gap-2">
                {topItems.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between rounded-lg bg-[var(--bg)] px-3 py-2 text-sm text-[var(--ink)]"
                  >
                    <span>{item.name}</span>
                    <span className="text-[var(--ink-muted)]">{item.qty} sold</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      <figcaption className="mt-3 text-center text-xs text-[var(--ink-muted)]">
        A live, working demo — try it above. Nothing you enter here is saved or sent anywhere.
      </figcaption>
    </figure>
  );
}

function ChargingSpinner({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  if (shouldReduceMotion) return <Loader2 size={16} aria-hidden="true" />;
  return (
    <motion.span
      aria-hidden="true"
      className="inline-flex"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
    >
      <Loader2 size={16} />
    </motion.span>
  );
}

function SuccessPanel({
  sale,
  onNewSale,
  shouldReduceMotion,
}: {
  sale: CompletedSale;
  onNewSale: () => void;
  shouldReduceMotion: boolean;
}) {
  return (
    <div role="status">
      <motion.span
        aria-hidden="true"
        className="grid size-11 place-items-center rounded-full"
        style={{ backgroundColor: tint(16), color: "var(--pockaypos)" }}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Check size={20} />
      </motion.span>
      <p className="mt-3 text-sm font-bold text-[var(--ink)]">Payment received</p>
      <ul className="mt-3 grid gap-1 text-xs text-[var(--ink-muted)]">
        {sale.lines.map((line) => (
          <li key={line.id} className="flex justify-between">
            <span>
              {line.qty} × {line.name}
            </span>
            <span>{formatAmount(line.price * line.qty, sale.currency, sale.rate)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex justify-between border-t border-[var(--line)] pt-3 text-sm font-bold text-[var(--ink)]">
        <span>Total paid ({sale.currency})</span>
        <span>{formatAmount(sale.totalUsd, sale.currency, sale.rate)}</span>
      </div>
      {sale.currency === "LRD" && (
        <p className="mt-1 text-right text-[11px] text-[var(--ink-muted)]">rate used: L${sale.rate}/$1, saved with this receipt</p>
      )}
      <button
        type="button"
        onClick={onNewSale}
        className="mt-5 min-h-11 w-full rounded-full border border-[var(--line)] text-sm font-semibold text-[var(--ink)] transition-colors hover:border-[var(--pockaypos)]"
      >
        New sale
      </button>
    </div>
  );
}

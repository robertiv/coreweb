"use client";

import { useState } from "react";
import type { WheelItem } from "@/lib/wheel";

type WheelSystemClientProps = {
  items: WheelItem[];
};

const SPIN_COST = 10;
const LEFT_PANEL_BACKGROUND = "/images/wheel-left-bg.jpg";

function pickWeightedIndex(items: WheelItem[]) {
  const totalWeight = items.reduce((sum, item) => sum + Math.max(item.probability, 0), 0);
  if (totalWeight <= 0) {
    return 0;
  }

  const roll = Math.random() * totalWeight;
  let cumulative = 0;

  for (let index = 0; index < items.length; index += 1) {
    cumulative += Math.max(items[index].probability, 0);
    if (roll <= cumulative) {
      return index;
    }
  }

  return items.length - 1;
}

export function WheelSystemClient({ items }: WheelSystemClientProps) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [balance, setBalance] = useState(500);
  const [lastItemId, setLastItemId] = useState<string | null>(null);

  const slotAngle = items.length > 0 ? 360 / items.length : 360;
  const canSpin = items.length > 0 && balance >= SPIN_COST && !isSpinning;

  const handleBuyBalance = () => {
    setBalance((prev) => prev + 100);
  };

  const handleSpin = () => {
    if (!canSpin) {
      return;
    }

    const chosenIndex = pickWeightedIndex(items);
    const currentNormalized = ((rotation % 360) + 360) % 360;
    const targetNormalized = (360 - chosenIndex * slotAngle) % 360;
    const delta = (targetNormalized - currentNormalized + 360) % 360;
    const nextRotation = rotation + 360 * 6 + delta;

    setBalance((prev) => prev - SPIN_COST);
    setIsSpinning(true);
    setRotation(nextRotation);

    window.setTimeout(() => {
      setIsSpinning(false);
      setLastItemId(items[chosenIndex].id);
    }, 4200);
  };

  const lastItem = items.find((item) => item.id === lastItemId) ?? null;

  return (
    <main className="bg-black p-0 text-[#f4e1b6]">
      <div className="w-[780px]">
        <div className="wheel-shell relative w-full overflow-hidden rounded-[20px] border border-[#a17c3b] bg-gradient-to-b from-[#2a2118] via-[#16110d] to-[#0f0b08] p-1 shadow-[0_24px_70px_rgba(0,0,0,0.65)]">
          <div className="flex flex-col rounded-[14px] border border-[#6e542a] bg-[#120d09] p-2">
            <div className="mb-2 flex h-[32px] items-center justify-between rounded-lg border border-[#4c3a1e] bg-gradient-to-r from-[#3b2b17] to-[#2a1f10] px-2 py-1 text-xs uppercase tracking-wide text-[#e8c98d]">
              <span>Wheel System</span>
              <span>Daily Spin</span>
            </div>

            <div className="grid grid-cols-[370px_374px] gap-2">
              <section
                className="relative w-[370px] overflow-hidden rounded-xl border border-[#5f4725] bg-[#1a130d] p-1"
                style={{
                  backgroundImage: `linear-gradient(rgba(12, 8, 4, 0.45), rgba(12, 8, 4, 0.55)), url(${LEFT_PANEL_BACKGROUND})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <div className="relative z-10 mb-2 flex justify-center">
                  <div className="relative h-[270px] w-[270px]">
                    <div className="pointer-events-none absolute left-1/2 top-2 z-20 h-0 w-0 -translate-x-1/2 border-l-[9px] border-r-[9px] border-t-[16px] border-l-transparent border-r-transparent border-t-[#f3d28e] drop-shadow-[0_0_10px_rgba(243,210,142,0.6)]" />

                    <div
                      className="absolute inset-0 rounded-full border-[5px] border-[#8c6a36] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.74)_62%,rgba(0,0,0,0.96)_100%)] shadow-[inset_0_0_28px_rgba(0,0,0,0.72),0_0_44px_rgba(0,0,0,0.55)]"
                      style={{
                        transform: `rotate(${rotation}deg)`,
                        transition: isSpinning ? "transform 4s cubic-bezier(0.14, 0.86, 0.22, 1)" : "none",
                      }}
                    >
                      {items.map((item, index) => {
                        const angle = index * slotAngle;
                        return (
                          <div
                            key={item.id}
                            className="absolute left-1/2 top-1/2"
                            style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-105px) rotate(-${angle}deg)` }}
                          >
                            <div className="flex h-12 w-12 items-center justify-center rounded-md border border-[#8d6c36] bg-[#251b11] p-1 shadow-[inset_0_1px_4px_rgba(255,255,255,0.08),0_2px_8px_rgba(0,0,0,0.45)]">
                              <img src={item.image} alt={item.name} width={32} height={32} className="h-8 w-8 rounded-sm object-cover" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <img
                      src="/images/logo.webp"
                      alt="Wheel logo"
                      width={122}
                      height={122}
                      className="absolute left-1/2 top-1/2 z-20 h-[122px] w-[122px] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_0_14px_rgba(225,188,117,0.52)]"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSpin}
                  disabled={!canSpin}
                  className="relative z-10 mx-auto block h-[34px] w-[170px] rounded-md border border-[#a98344] bg-gradient-to-b from-[#f1d48f] to-[#ba8740] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#2a1b09] shadow-[0_4px_10px_rgba(0,0,0,0.4)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-55"
                >
                  {isSpinning ? "Spinning..." : `Spin (-${SPIN_COST})`}
                </button>

                <p className="relative z-10 mt-2 text-center text-xs text-[#d8bd86]">
                  {lastItem ? `Last reward: ${lastItem.name} x${lastItem.quantity}` : items.length > 0 ? "Spin the wheel to get a reward" : "No wheel items found"}
                </p>
              </section>

              <aside className="w-[374px] space-y-2 rounded-xl border border-[#5f4725] bg-[#1a130d] p-1.5">
                <div className="h-[88px] rounded-lg border border-[#70562d] bg-[#24180f] p-2">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] text-[#cca765]">
                    <span>Balance</span>
                    <span className="text-base font-bold tracking-normal text-[#f2cf86]">{balance}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleBuyBalance}
                    className="mt-2 h-[34px] w-full rounded-md border border-[#9e793f] bg-gradient-to-b from-[#f6dc9f] to-[#c48f45] px-2 py-1 text-xs font-semibold uppercase tracking-wide text-[#2b1d0d] transition hover:brightness-110"
                  >
                    Buy Balance (+100)
                  </button>
                </div>

                <div className="space-y-1">
                  <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-[#e4c07a]">Rewards and Chances</h2>
                  <div className="grid grid-cols-2 gap-1.5">
                    {items.map((item) => {
                      const isLastItem = item.id === lastItemId;
                      return (
                        <article
                          key={item.id}
                          className={`grid h-[40px] w-[177px] grid-cols-[32px_1fr_auto] items-center gap-x-1.5 rounded-md border px-1.5 py-1 transition ${
                            isLastItem
                              ? "border-[#dcb46a] bg-[#3a2a16]"
                              : "border-[#624a24] bg-[#251a11]"
                          }`}
                        >
                          <img src={item.image} alt={item.name} width={32} height={32} className="h-8 w-8 rounded-sm border border-[#8d6c36] object-cover" />
                          <p className="truncate text-[11px] font-semibold leading-none text-[#f2d395]">{item.name} x{item.quantity}</p>
                          <p className="text-[10px] font-bold leading-none text-[#f2cf86]">{item.probability}%</p>
                        </article>
                      );
                    })}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

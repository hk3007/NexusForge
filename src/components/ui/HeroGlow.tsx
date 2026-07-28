/** Ambient black-mode background: grid mesh + soft white radial glows. */
export default function HeroGlow() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Soft white radial glow, top center */}
      <div className="absolute -top-[30%] left-1/2 h-[760px] w-[min(1100px,120vw)] -translate-x-1/2 glow-radial" />
      {/* Grid mesh */}
      <div className="absolute inset-0 bg-mesh-dark opacity-50" />
      {/* Side accent glows */}
      <div className="absolute right-[-10%] top-[35%] h-[420px] w-[420px] rounded-full bg-overlay/[0.03] blur-[120px]" />
      <div className="absolute bottom-[-15%] left-[-8%] h-[380px] w-[380px] rounded-full bg-overlay/[0.025] blur-[110px]" />
    </div>
  );
}

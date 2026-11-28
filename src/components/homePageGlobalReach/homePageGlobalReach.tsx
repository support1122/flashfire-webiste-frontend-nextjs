import { WORLD_LAND_PATH } from "./worldLandPath";

const LAND = "#f0b690";

type City = {
  x: number;
  y: number;
  name: string;
  // label offset from the dot; omit to show a dot only
  label?: { dx: number; dy: number; code?: string };
};

// Positions come from the same projection as WORLD_LAND_PATH, so they sit on the real locations.
const cities: Record<string, City> = {
  usa: { x: 200, y: 114, name: "United States", label: { dx: -14, dy: 30, code: "USA" } },
  canada: { x: 194, y: 67, name: "Canada", label: { dx: 12, dy: -26, code: "CA" } },
  uk: { x: 469, y: 76, name: "United Kingdom", label: { dx: -40, dy: -48, code: "London" } },
  ireland: { x: 450, y: 74, name: "Ireland" },
  germany: { x: 501, y: 81, name: "Germany", label: { dx: 20, dy: -44, code: "DE" } },
  netherlands: { x: 487, y: 77, name: "Netherlands" },
  france: { x: 479, y: 93, name: "France" },
  spain: { x: 462, y: 110, name: "Spain", label: { dx: -62, dy: 22, code: "ES" } },
  italy: { x: 507, y: 104, name: "Italy" },
  poland: { x: 526, y: 78, name: "Poland" },
  sweden: { x: 514, y: 50, name: "Sweden" },
  aus: { x: 844, y: 292, name: "Australia", label: { dx: -92, dy: -34, code: "AU" } },
};

const arcs: [string, string][] = [
  ["usa", "uk"],
  ["canada", "uk"],
  ["usa", "spain"],
  ["canada", "germany"],
  ["usa", "ireland"],
  ["uk", "aus"],
  ["germany", "aus"],
];

function arcPath(a: City, b: City) {
  const mx = (a.x + b.x) / 2;
  const my = Math.min(a.y, b.y) - Math.abs(b.x - a.x) * 0.22;
  return `M${a.x} ${a.y} Q${mx} ${my} ${b.x} ${b.y}`;
}

export default function HomePageGlobalReach() {
  return (
    <section
      className="w-full bg-[#fffefd] px-5 py-8 sm:px-6 sm:py-12 md:px-12 md:py-16 lg:py-20"
      style={{ fontFamily: "Satoshi, sans-serif" }}
    >
      <div className="mx-auto max-w-6xl">
        <p className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-wide text-[#545b65] md:text-[13px]">
          <span className="h-[2px] w-6 bg-[#ff5a1f]" />
          Ambition has no single address
        </p>

        <div className="mt-4 grid items-start gap-4 md:grid-cols-2 md:gap-16">
          <h2 className="font-bold leading-[110%] tracking-[-0.03em] text-[#02060A] text-[2.5rem] min-[480px]:text-[3.6rem] min-[769px]:text-[2.75rem] min-[1025px]:text-[50.84px]">
            Your next chapter.
            <br />
            <span className="bg-gradient-to-r from-[#d84a22] via-[#f05a23] to-[#ff7a2a] bg-clip-text text-transparent">
              A wider world.
            </span>
          </h2>
          <div className="md:pt-2">
            <p className="text-[1.8rem] font-bold leading-tight tracking-[-0.02em] text-[#02060A] md:text-[30px]">
              Across 50 countries
            </p>
            <p className="mt-3 text-[19px] font-medium leading-[150%] tracking-[-0.02em] text-[#02060A] md:text-[18px]">
              Bring your goals and preferred destinations into one focused
              search. Featured locations below reflect the markets supplied by
              Flashfire, not confirmed availability.
            </p>
          </div>
        </div>

        <div className="mt-6 border-[6px] border-[#fcf9f7] bg-[#fcf9f7] sm:mt-8 md:mt-12">
          <div className="bg-white p-3 sm:p-6">
            <div className="-mx-1 overflow-x-auto overscroll-x-contain px-1 sm:mx-0 sm:overflow-visible sm:px-0">
            <svg
              viewBox="0 0 1000 380"
              role="img"
              aria-label="Illustrative world map with featured locations connected by arcs"
              className="h-auto w-full min-w-[680px] sm:min-w-0"
            >
              {[95, 190, 285].map((y) => (
                <line key={y} x1="0" x2="1000" y1={y} y2={y} stroke="#f0d5c8" strokeWidth="1" />
              ))}
              {[250, 500, 750].map((x) => (
                <line key={x} x1={x} x2={x} y1="0" y2="380" stroke="#f0d5c8" strokeWidth="1" />
              ))}

              <path d={WORLD_LAND_PATH} fill={LAND} />

              {arcs.map(([a, b]) => (
                <path
                  key={`${a}-${b}`}
                  d={arcPath(cities[a], cities[b])}
                  fill="none"
                  stroke="#ff5a1f"
                  strokeWidth="1.2"
                  opacity="0.85"
                />
              ))}

              {Object.entries(cities).map(([k, c]) => (
                <g key={k}>
                  <title>{c.name}</title>
                  <circle cx={c.x} cy={c.y} r="7" fill="#ff5a1f" opacity="0.18" />
                  <circle cx={c.x} cy={c.y} r="3" fill="#ff5a1f" />
                </g>
              ))}

              {Object.values(cities)
                .filter((c) => c.label)
                .map((c) => {
                  const l = c.label!;
                  const w = c.name.length * 6.4 + (l.code ? l.code.length * 5.4 + 8 : 0) + 18;
                  return (
                    <g key={c.name} transform={`translate(${c.x + l.dx} ${c.y + l.dy})`}>
                      <rect width={w} height="20" fill="#fff4ee" stroke="#eadfd8" />
                      <text x="8" y="14" fontSize="10" fontWeight="700" fill="#24272d">
                        {c.name}
                        {l.code && (
                          <tspan dx="5" fontSize="8" fontWeight="500" fill="#545b65">
                            {l.code}
                          </tspan>
                        )}
                      </text>
                    </g>
                  );
                })}
            </svg>
            </div>

            <p className="mt-3 flex items-start gap-2 text-[13px] font-medium leading-relaxed text-[#545b65] sm:items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a1f]" />
              <span><span className="sm:hidden">Swipe to explore · </span>Featured locations only · Illustrative geography, not a verified coverage map</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

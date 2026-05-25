export function Ticker() {
  const items = [
    "MATRIMONIAL", "DATING", "PROFESSIONAL",
    "HOBBIES", "NEW IN TOWN", "STUDENT",
    "MATRIMONIAL", "DATING", "PROFESSIONAL",
    "HOBBIES", "NEW IN TOWN", "STUDENT",
  ];

  return (
    <div
      className="overflow-hidden py-3"
      style={{ background: "var(--orange)" }}
    >
      <div className="animate-ticker flex whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="font-syne font-bold text-sm tracking-wider" style={{ color: "#000", padding: "0 24px" }}>
            {item}
            {i % 6 !== 5 && (
              <span style={{ opacity: 0.4, marginLeft: 24 }}>✦</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
export function ShieldFeature() {
  const steps = [
    {
      num: "1",
      text: "Visitor sees your name, 1 photo and tagline — everything else blurred",
    },
    {
      num: "2",
      text: 'They send a request: "Hi, I\'m Rahul from Delhi. My family is interested..."',
    },
    {
      num: "3",
      text: "You get an email — approve or decline in one tap",
    },
    {
      num: "4",
      text: "Approved people get a private link valid 7 days. Revoke anytime.",
    },
  ];

  return (
    <section className="px-6 lg:px-16 py-8 pb-24" style={{ background: "var(--black)" }}>
      <div className="max-w-6xl mx-auto">
        <div
          className="rounded-3xl p-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          style={{
            background: "var(--gray)",
            border: "1px solid var(--border)",
          }}
        >
          {/* Left */}
          <div>
            <div style={{ fontSize: 56, marginBottom: 20 }}>🛡️</div>
            <h3
              className="font-syne mb-4"
              style={{
                fontSize: "clamp(24px, 3vw, 40px)",
                fontWeight: 900,
                letterSpacing: "-1.5px",
                lineHeight: 1.1,
              }}
            >
              Your biodata.<br />
              Only for people<br />
              you{" "}
              <span style={{ color: "var(--orange)" }}>approve.</span>
            </h3>
            <p
              className="text-sm mb-3"
              style={{ color: "var(--muted)", lineHeight: 1.7 }}
            >
              Shield mode means strangers can't see your full profile. They see
              your name and one photo — and must request access. You decide who
              sees the rest.
            </p>
            <p
              className="text-xs"
              style={{ color: "#52525b", lineHeight: 1.7 }}
            >
              Perfect for matrimonial profiles — share the link freely in family
              WhatsApp groups, control who actually reads your biodata.
            </p>
          </div>

          {/* Right — steps */}
          <div className="grid gap-3">
            {steps.map((step) => (
              <div
                key={step.num}
                className="flex gap-3 items-start rounded-xl p-4"
                style={{
                  background: "var(--black)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    width: 26,
                    height: 26,
                    background: "var(--orange)",
                    color: "#000",
                    fontSize: 11,
                  }}
                >
                  {step.num}
                </div>
                <p
                  className="text-sm"
                  style={{ color: "var(--muted)", lineHeight: 1.6, paddingTop: 2 }}
                >
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
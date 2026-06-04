const META = [
  { label: "Birth on date",     val: "30 April 2004" },
  { label: "Location",   val: "Jakarta, ID" },
  { label: "University", val: "Bina Nusantara" },
  { label: "Company", val: "-" },
];

export default function MetaStrip() {
  return (
    <div className="meta-strip a4">
      {META.map((m) => (
        <div key={m.label} className="meta-cell">
          <div className="meta-cell-label mono">{m.label}</div>
          <div className="meta-cell-val">{m.val}</div>
        </div>
      ))}
    </div>
  );
}

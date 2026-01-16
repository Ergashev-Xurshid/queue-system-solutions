export default function PrintCheck({ category, subcategory }) {
  return (
    <div
      style={{
        width: "302px", // 80mm printer
        padding: "10px 12px",
        fontFamily: "monospace",
        backgroundColor: "white",
        textAlign: "center",
      }}
    >

      {/* LOGO (PNG tavsiya etiladi) */}
      <img
        src="/logo.png"
        alt="Logo"
        style={{
          width: "95px",               // 80–100px eng optimal
          margin: "0 auto 8px",
          display: "block",
          imageRendering: "crisp-edges", // 🟢 rasmni tiniq qiladi
        }}
      />

      <h2
        style={{
          fontSize: "12px",
          fontWeight: "bold",
          marginBottom: "6px",
          lineHeight: "14px",
        }}
      >
        KARSHI STATE TECHNICAL UNIVERSITY
      </h2>

      <p style={{ fontSize: "14px", marginTop: "12px" }}>
        Sizning raqamingiz:
      </p>

      <p
        style={{
          fontSize: "42px",
          fontWeight: "bold",
          margin: "4px 0 6px",
        }}
      >
        T2
      </p>

      <p style={{ fontSize: "14px", marginBottom: "4px" }}>
        Tanlangan xizmat:
      </p>

      <p
        style={{
          fontSize: "13px",
          marginBottom: "10px",
        }}
      >
        {subcategory || "Xizmat tanlanmagan"}
      </p>

      <p style={{ fontSize: "13px", margin: "4px 0" }}>
        Navbatni soni: <strong>0</strong>
      </p>

      <p style={{ fontSize: "13px", marginTop: "10px" }}>
        Kelgan vaqt:<br />
        {new Date().toLocaleString()}
      </p>

      <p style={{ marginTop: "12px", fontSize: "12px" }}>
        www.kstu.uz
      </p>
    </div>
  );
}

const matches = [
  {
    date: "01.05.2026",
    category: "U10",
    league: "TBF Seri C - G Grubu",
    home: "No23 Basketball Academy",
    away: "Fatih Belediyesi SK",
    venue: "BGM Salon C3",
    videoUrl: "https://youtube.com",
    statsUrl: "https://docs.google.com",
    note: "Skor : 31-33 (M)"
  },
  {
    date: "26.04.2026",
    category: "U9",
    league: "Unibest Ligi",
    home: "No23 Basketball Academy",
    away: "Bahçeşehir İhtisas B",
    venue: "İstanbul",
    videoUrl: "https://youtube.com",
    statsUrl: "https://docs.google.com",
    note: "Skor : 14-6 (G)"
  }
];

export default function App() {
  return (
    <div style={styles.page}>
      
      {/* HEADER */}
      <header style={styles.hero}>
        <div style={styles.badge}>🔒 Özel Maç Arşivi</div>
        <h1 style={styles.title}>NO23 Basketball Academy</h1>
        <p style={styles.subtitle}>
          Maç videoları ve istatistikler tek yerde
        </p>
      </header>

      {/* CONTENT */}
      <main style={styles.container}>
        <div style={styles.info}>
          {matches.length} maç listeleniyor
        </div>

        <div style={styles.grid}>
          {matches.map((m, i) => (
            <div key={i} style={styles.card}>

              <div style={styles.cardTop}>
                <span style={styles.category}>{m.category}</span>
                <h2 style={styles.match}>
                  {m.home} vs {m.away}
                </h2>
                <p style={styles.league}>{m.league}</p>
              </div>

              <div style={styles.cardBody}>
                <p>📅 {m.date}</p>
                <p>📍 {m.venue}</p>
                <p style={styles.note}>{m.note}</p>

                <div style={styles.buttons}>
                  <a href={m.videoUrl} target="_blank" style={styles.video}>
                    ▶ İzle
                  </a>
                  <a href={m.statsUrl} target="_blank" style={styles.stats}>
                    📊 Stats
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

const styles = {
  page: {
    background: "#000",
    color: "#fff",
    minHeight: "100vh",
    fontFamily: "Arial"
  },

  hero: {
    padding: "60px 20px",
    textAlign: "center",
    borderBottom: "1px solid #222"
  },

  badge: {
    display: "inline-block",
    background: "#facc15",
    color: "#000",
    padding: "6px 14px",
    borderRadius: 999,
    fontWeight: "bold",
    marginBottom: 20
  },

  title: {
    fontSize: 44,
    margin: 0,
    letterSpacing: 2
  },

  subtitle: {
    color: "#aaa"
  },

  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: 20
  },

  info: {
    marginBottom: 20,
    color: "#aaa"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 20
  },

  card: {
    border: "1px solid #222",
    borderRadius: 20,
    overflow: "hidden",
    background: "#111",
    transition: "0.2s"
  },

  cardTop: {
    padding: 20,
    background: "#000",
    borderBottom: "1px solid #222"
  },

  category: {
    background: "#facc15",
    color: "#000",
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "bold"
  },

  match: {
    marginTop: 15,
    fontSize: 20
  },

  league: {
    color: "#888",
    fontSize: 14
  },

  cardBody: {
    padding: 20,
    color: "#ccc"
  },

  note: {
    marginTop: 10,
    minHeight: 40
  },

  buttons: {
    marginTop: 20,
    display: "flex",
    gap: 10
  },

  video: {
    flex: 1,
    textAlign: "center",
    background: "#facc15",
    color: "#000",
    padding: 12,
    borderRadius: 10,
    textDecoration: "none",
    fontWeight: "bold"
  },

  stats: {
    flex: 1,
    textAlign: "center",
    border: "1px solid #facc15",
    color: "#facc15",
    padding: 12,
    borderRadius: 10,
    textDecoration: "none",
    fontWeight: "bold"
  }
};

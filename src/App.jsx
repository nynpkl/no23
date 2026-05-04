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
    note: "Maç videosu ve istatistik linki."
  },
  {
    date: "26.04.2026",
    category: "U9",
    league: "Unibest Ligi",
    home: "No23 Basketball Academy",
    away: "Anka Avrupa",
    venue: "İstanbul",
    videoUrl: "https://youtube.com",
    statsUrl: "https://docs.google.com",
    note: "Ata #0 gelişim takibi için arşivlendi."
  }
];

export default function App() {
  return (
    <div style={styles.page}>
      <header style={styles.hero}>
        <div style={styles.badge}>🔒 Özel Maç Arşivi</div>
        <h1 style={styles.title}>No23 Basketball Academy</h1>
        <p style={styles.subtitle}>
          Maç videoları, istatistik linkleri ve maç notları tek yerde.
        </p>
      </header>

      <main style={styles.container}>
        <div style={styles.infoBar}>
          <strong>{matches.length}</strong> maç listeleniyor
        </div>

        <div style={styles.grid}>
          {matches.map((match, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.cardTop}>
                <span style={styles.category}>{match.category}</span>
                <h2 style={styles.matchTitle}>
                  {match.home} vs {match.away}
                </h2>
                <p style={styles.league}>{match.league}</p>
              </div>

              <div style={styles.cardBody}>
                <p><strong>📅 Tarih:</strong> {match.date}</p>
                <p><strong>📍 Salon:</strong> {match.venue}</p>
                <p style={styles.note}>{match.note}</p>

                <div style={styles.buttons}>
                  <a style={styles.videoButton} href={match.videoUrl} target="_blank">
                    ▶ Maçı İzle
                  </a>
                  <a style={styles.statsButton} href={match.statsUrl} target="_blank">
                    📊 İstatistik
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
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
    fontFamily: "Arial, sans-serif"
  },
  hero: {
    padding: "60px 24px",
    background: "linear-gradient(135deg, #991b1b, #0f172a)",
    textAlign: "center"
  },
  badge: {
    display: "inline-block",
    padding: "8px 16px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.15)",
    marginBottom: 20
  },
  title: {
    fontSize: 46,
    margin: 0
  },
  subtitle: {
    fontSize: 18,
    color: "rgba(255,255,255,0.75)"
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: 24
  },
  infoBar: {
    marginBottom: 20,
    color: "rgba(255,255,255,0.7)"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 20
  },
  card: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 24,
    overflow: "hidden"
  },
  cardTop: {
    padding: 24,
    background: "linear-gradient(135deg, #dc2626, #1e293b)"
  },
  category: {
    background: "white",
    color: "#0f172a",
    padding: "6px 12px",
    borderRadius: 999,
    fontWeight: "bold",
    fontSize: 13
  },
  matchTitle: {
    marginTop: 20,
    fontSize: 24
  },
  league: {
    color: "rgba(255,255,255,0.75)"
  },
  cardBody: {
    padding: 24,
    color: "rgba(255,255,255,0.82)"
  },
  note: {
    marginTop: 16,
    minHeight: 40
  },
  buttons: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginTop: 24
  },
  videoButton: {
    textAlign: "center",
    background: "#dc2626",
    color: "white",
    padding: 14,
    borderRadius: 14,
    textDecoration: "none",
    fontWeight: "bold"
  },
  statsButton: {
    textAlign: "center",
    background: "white",
    color: "#0f172a",
    padding: 14,
    borderRadius: 14,
    textDecoration: "none",
    fontWeight: "bold"
  }
};

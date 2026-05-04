import { useState } from "react";
import matches from "./matches";

export default function App() {
  const [seasonFilter, setSeasonFilter] = useState("All");
  const [ageFilter, setAgeFilter] = useState("All");
  const [leagueFilter, setLeagueFilter] = useState("All");
  const [resultFilter, setResultFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const filtered = matches
    .filter((m) => {
      const matchDate = new Date(m.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      return (
        (seasonFilter === "All" || m.season === seasonFilter) &&
        (ageFilter === "All" || m.age === ageFilter) &&
        (leagueFilter === "All" || m.league === leagueFilter) &&
        (resultFilter === "All" || m.result === resultFilter) &&
        (!start || matchDate >= start) &&
        (!end || matchDate <= end)
      );
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <div style={styles.kicker}>No23 Basketball Academy</div>
          <h1 style={styles.title}>Match Archive</h1>
        </div>
        <div style={styles.count}>{filtered.length} maç</div>
      </header>

      <div style={styles.filters}>
        <select onChange={(e) => setSeasonFilter(e.target.value)} style={styles.select}>
          <option value="All">Sezon</option>
          <option>2025-2026</option>
          <option>2026-2027</option>
        </select>

        <select onChange={(e) => setAgeFilter(e.target.value)} style={styles.select}>
          <option value="All">Yaş</option>
          <option>U8</option>
          <option>U9</option>
          <option>U10</option>
          <option>U11</option>
          <option>U12</option>
        </select>

        <select onChange={(e) => setLeagueFilter(e.target.value)} style={styles.select}>
          <option value="All">Lig</option>
          <option>Unibest</option>
          <option>Gelişim</option>
          <option>TBF</option>
        </select>

        <select onChange={(e) => setResultFilter(e.target.value)} style={styles.select}>
          <option value="All">Sonuç</option>
          <option>Galibiyet</option>
          <option>Mağlubiyet</option>
        </select>

        <div style={styles.dateGroup}>
          <span style={styles.label}>Tarih</span>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={styles.dateInput}
          />

          <span style={styles.arrow}>–</span>

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={styles.dateInput}
          />

          {(startDate || endDate) && (
            <button
              onClick={() => {
                setStartDate("");
                setEndDate("");
              }}
              style={styles.clearBtn}
              title="Tarih filtresini temizle"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div style={styles.list}>
        {filtered.map((m) => (
          <div key={m.id} style={styles.card}>
            <div style={styles.main}>
              <div style={styles.topLine}>
                <span style={styles.badge}>{m.season}</span>
                <span style={styles.badge}>{m.age}</span>
                <span style={styles.meta}>{m.league}</span>
                <span style={m.result === "Galibiyet" ? styles.win : styles.lose}>
                  {m.result}
                </span>
              </div>

              <div style={styles.match}>
                No23 Basketball Academy <span style={styles.vs}>vs</span> {m.opponent}
              </div>

              <div style={styles.sub}>
                {formatDate(m.date)} · Skor: {m.score}
              </div>
            </div>

            <div style={styles.actions}>
              <a href={m.video} target="_blank" rel="noreferrer" style={styles.video}>
                Video
              </a>

              <a href={m.highlights} target="_blank" rel="noreferrer" style={styles.highlights}>
                Highlights
              </a>

              <a href={m.stats} target="_blank" rel="noreferrer" style={styles.stats}>
                Stats
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#ffffff",
    color: "#111",
    minHeight: "100vh",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
    padding: "28px 18px",
    maxWidth: 980,
    margin: "0 auto",
    boxSizing: "border-box"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 16,
    marginBottom: 22,
    borderBottom: "1px solid #eee",
    paddingBottom: 18,
    flexWrap: "wrap"
  },

  kicker: {
    fontSize: 14,
    color: "#777",
    fontWeight: 600,
    marginBottom: 4
  },

  title: {
    margin: 0,
    fontSize: "clamp(30px, 5vw, 44px)",
    lineHeight: 1.05,
    letterSpacing: "-1px"
  },

  count: {
    fontSize: 13,
    background: "#f5f1dc",
    border: "1px solid #eee2a8",
    padding: "6px 10px",
    borderRadius: 999,
    color: "#333",
    fontWeight: 600
  },

  filters: {
    display: "flex",
    gap: 8,
    marginBottom: 18,
    flexWrap: "wrap"
  },

  select: {
    height: 38,
    padding: "0 12px",
    border: "1px solid #ddd",
    borderRadius: 10,
    background: "#fff",
    fontSize: 14,
    color: "#111"
  },

  dateGroup: {
    minHeight: 38,
    display: "flex",
    alignItems: "center",
    gap: 7,
    border: "1px solid #ddd",
    padding: "0 10px",
    borderRadius: 10,
    background: "#fafafa",
    flexWrap: "wrap"
  },

  label: {
    fontSize: 13,
    color: "#666",
    fontWeight: 600
  },

  arrow: {
    color: "#aaa"
  },

  dateInput: {
    border: "none",
    background: "transparent",
    fontSize: 13,
    maxWidth: 125,
    outline: "none"
  },

  clearBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "#999",
    fontSize: 13
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  },

  card: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: 14,
    alignItems: "center",
    border: "1px solid #eeeeee",
    borderRadius: 14,
    padding: 14,
    background: "#fff",
    boxShadow: "0 1px 4px rgba(0,0,0,0.03)"
  },

  main: {
    minWidth: 0
  },

  topLine: {
    display: "flex",
    gap: 7,
    marginBottom: 7,
    fontSize: 13,
    flexWrap: "wrap",
    alignItems: "center"
  },

  badge: {
    background: "#f5e8ad",
    padding: "3px 7px",
    borderRadius: 7,
    fontWeight: 600,
    color: "#111"
  },

  meta: {
    color: "#777",
    fontWeight: 500
  },

  win: {
    color: "#168000",
    fontWeight: 600
  },

  lose: {
    color: "#c60000",
    fontWeight: 600
  },

  match: {
    fontWeight: 750,
    fontSize: "clamp(18px, 3vw, 23px)",
    lineHeight: 1.2,
    letterSpacing: "-0.3px"
  },

  vs: {
    color: "#777",
    fontWeight: 600
  },

  sub: {
    fontSize: 14,
    color: "#666",
    marginTop: 4
  },

  actions: {
    display: "flex",
    gap: 7,
    flexWrap: "wrap",
    justifyContent: "flex-end"
  },

  video: {
    background: "#111",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: 9,
    textDecoration: "none",
    fontSize: 13,
    fontWeight: 700,
    textAlign: "center"
  },

  highlights: {
    background: "#f5e8ad",
    color: "#111",
    padding: "8px 12px",
    borderRadius: 9,
    textDecoration: "none",
    fontSize: 13,
    fontWeight: 700,
    textAlign: "center"
  },

  stats: {
    border: "1px solid #ddd",
    padding: "8px 12px",
    borderRadius: 9,
    textDecoration: "none",
    fontSize: 13,
    color: "#111",
    fontWeight: 700,
    textAlign: "center",
    background: "#fff"
  },

  "@media": {}
};

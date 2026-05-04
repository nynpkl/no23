import { useState } from "react";
import matches from "./matches";

export default function App() {
  const [ageFilter, setAgeFilter] = useState("All");
  const [leagueFilter, setLeagueFilter] = useState("All");
  const [resultFilter, setResultFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filtered = matches
    .filter((m) => {
      const matchDate = new Date(m.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      return (
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
      <h1 style={styles.title}>No23 Match Archive</h1>

      <div style={styles.filters}>
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
          <span style={styles.label}>Tarih:</span>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={styles.dateInput}
          />

          <span style={styles.arrow}>→</span>

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
          <div key={m.id} style={styles.row}>
            <div style={styles.left}>
              <div style={styles.topLine}>
                <span style={styles.badge}>{m.age}</span>
                <span style={styles.meta}>{m.league}</span>
                <span style={m.result === "Galibiyet" ? styles.win : styles.lose}>
                  {m.result}
                </span>
              </div>

              <div style={styles.match}>No23 vs {m.opponent}</div>

              <div style={styles.sub}>
                {m.date} • Skor: {m.score}
              </div>
            </div>

            <div style={styles.right}>
              <a href={m.video} target="_blank" rel="noreferrer" style={styles.video}>
                Video
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
    fontFamily: "Arial",
    padding: 30,
    maxWidth: 900,
    margin: "0 auto"
  },

  title: {
    marginBottom: 20
  },

  filters: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
    flexWrap: "wrap"
  },

  select: {
    padding: 8,
    border: "1px solid #ddd",
    borderRadius: 6
  },

  dateGroup: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    border: "1px solid #ddd",
    padding: "6px 10px",
    borderRadius: 8,
    background: "#fafafa"
  },

  label: {
    fontSize: 13,
    color: "#555"
  },

  arrow: {
    color: "#aaa"
  },

  dateInput: {
    border: "none",
    background: "transparent",
    fontSize: 13
  },

  clearBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "#999",
    fontSize: 14
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: 12
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #eee",
    borderRadius: 10,
    padding: 14
  },

  left: {},

  topLine: {
    display: "flex",
    gap: 8,
    marginBottom: 6,
    fontSize: 12
  },

  badge: {
    background: "#f4e7b2",
    padding: "2px 6px",
    borderRadius: 4
  },

  meta: {
    color: "#777"
  },

  win: {
    color: "green"
  },

  lose: {
    color: "red"
  },

  match: {
    fontWeight: "bold"
  },

  sub: {
    fontSize: 13,
    color: "#666"
  },

  right: {
    display: "flex",
    gap: 8
  },

  video: {
    background: "#111",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: 6,
    textDecoration: "none",
    fontSize: 12
  },

  stats: {
    border: "1px solid #ddd",
    padding: "6px 10px",
    borderRadius: 6,
    textDecoration: "none",
    fontSize: 12,
    color: "#111"
  }
};

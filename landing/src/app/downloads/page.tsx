import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Downloads | CodeSprint",
  description: "Baixe materiais gratuitos da CodeSprint.",
  robots: "noindex, nofollow",
};

const downloads = [
  {
    id: "7-codigos-proibidos",
    title: "7 Códigos Proibidos",
    description:
      "Descubra os 7 códigos proibidos que podem transformar sua mentalidade e resultados.",
    filename: "7-codigos-proibidos.pdf",
    size: "PDF",
  },
];

export default function DownloadsPage() {
  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <header style={styles.header}>
          <a href="/" style={styles.backLink}>
            ← Voltar
          </a>
          <h1 style={styles.title}>Downloads</h1>
          <p style={styles.subtitle}>Materiais disponíveis para download</p>
        </header>

        <div style={styles.grid}>
          {downloads.map((item) => (
            <div key={item.id} style={styles.card}>
              <div style={styles.cardIcon}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <polyline points="9 15 12 18 15 15" />
                </svg>
              </div>
              <h2 style={styles.cardTitle}>{item.title}</h2>
              <p style={styles.cardDescription}>{item.description}</p>
              <span style={styles.badge}>{item.size}</span>
              <a
                href={`/downloads/${item.filename}`}
                download={item.filename}
                style={styles.downloadButton}
              >
                ⬇ Baixar Agora
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
    color: "#f0f0f0",
    padding: "2rem 1rem",
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  },
  container: {
    maxWidth: "720px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center" as const,
    marginBottom: "3rem",
  },
  backLink: {
    color: "#888",
    textDecoration: "none",
    fontSize: "0.875rem",
    display: "inline-block",
    marginBottom: "1.5rem",
    transition: "color 0.2s",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: 700,
    margin: "0 0 0.5rem",
    background: "linear-gradient(135deg, #fff 0%, #999 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    color: "#888",
    fontSize: "1rem",
    margin: 0,
  },
  grid: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.5rem",
  },
  card: {
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "16px",
    padding: "2rem",
    textAlign: "center" as const,
    transition: "border-color 0.3s, transform 0.2s",
  },
  cardIcon: {
    color: "#4ade80",
    marginBottom: "1rem",
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: 600,
    margin: "0 0 0.75rem",
    color: "#fff",
  },
  cardDescription: {
    color: "#aaa",
    fontSize: "0.95rem",
    lineHeight: 1.6,
    margin: "0 0 1rem",
  },
  badge: {
    display: "inline-block",
    background: "rgba(74, 222, 128, 0.1)",
    color: "#4ade80",
    padding: "0.25rem 0.75rem",
    borderRadius: "999px",
    fontSize: "0.75rem",
    fontWeight: 500,
    marginBottom: "1.5rem",
  },
  downloadButton: {
    display: "inline-block",
    background: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
    color: "#000",
    padding: "0.875rem 2rem",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "1rem",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 20px rgba(74, 222, 128, 0.25)",
  },
};

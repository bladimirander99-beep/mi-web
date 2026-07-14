"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Exchange", href: "#exchange" },
    { name: "Wallets", href: "#wallets" },
    { name: "Trading", href: "#trading" },
    { name: "Apps", href: "#apps" },
    { name: "IA", href: "#ia" },
    { name: "Videos", href: "#video" },
    { name: "Juegos", href: "#juegos" },
    { name: "Curso", href: "#redes" },
  ];

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 999,
          backdropFilter: "blur(20px)",
          background: "rgba(5,13,24,.90)",
          borderBottom: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <div
          style={{
            maxWidth: 1250,
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 20px",
          }}
        >
          {/* Logo */}
          <h2
            style={{
              color: "#00C6FF",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Dinero Abundante
          </h2>

          {/* Menú escritorio */}
          <div
            className="desktop-menu"
            style={{
              display: "flex",
              gap: 25,
              alignItems: "center",
            }}
          >
            {links.map((item) => (
              <a
                key={item.name}
                href={item.href}
                style={{
                  color: "#d7e8f6",
                  textDecoration: "none",
                  fontSize: 15,
                }}
              >
                {item.name}
              </a>
            ))}

            <button
              style={{
                background: "#00C6FF",
                color: "#000",
                border: "none",
                padding: "10px 18px",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Registrarse
            </button>
          </div>

          {/* Botón móvil */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "none",
            }}
            className="mobile-button"
          >
            ☰
          </button>
        </div>

        {menuOpen && (
          <div
            style={{
              background: "#09111D",
              padding: 20,
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            {links.map((item) => (
              <a
                key={item.name}
                href={item.href}
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
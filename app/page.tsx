"use client";
import { useState, useCallback } from "react";

/* ── TYPES ── */
interface RefItem { name: string; href: string; badge: string; hot?: boolean; videoId?: string; }
interface Category {
  id: string; icon: string; title: string; subtitle: string; hot?: boolean;
  links: RefItem[];
  manualLabel: string;
  steps: { title: string; desc: string }[];
  tip: string;
}

/* ── DATA ── */
const CATEGORIES: Category[] = [
  {
    id: "exchange", icon: "📈", title: "Exchange de Criptomonedas",
    subtitle: "Compra, vende e intercambia cripto", hot: true,
    links: [
      { name: "Binance", href: "TU_LINK_BINANCE", badge: "Hasta $100 USDT", hot: true },
      { name: "CoinEx",  href: "TU_LINK_COINEX",  badge: "Hasta $100 + 20% fee" },
      { name: "Margex",  href: "TU_LINK_MARGEX",  badge: "$50 registro + 20% depósito" },
      { name: "Bybit",   href: "TU_LINK_BYBIT",   badge: "Hasta $5,050 USDT" },
      { name: "MEXC",    href: "TU_LINK_MEXC",    badge: "Hasta $8,000 USDT" },
      { name: "Lemon",   href: "TU_LINK_LEMON",   badge: "Bono al registrarte" },
      { name: "BingX",   href: "TU_LINK_BINGX",   badge: "Hasta $6,000 USDT" },
      { name: "Próximamente #8",  href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #9",  href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #10", href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #11", href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #12", href: "#", badge: "🔒 Próximo" },
    ],
    manualLabel: "MANUAL: CÓMO GANAR CON EXCHANGES",
    steps: [
      { title: "Regístrate con mi link", desc: "Crea tu cuenta usando el link de referido. Obtienes bonos y descuento en comisiones desde el día 1." },
      { title: "Completa la verificación KYC", desc: "Sube tu documento de identidad para desbloquear todos los límites de retiro y funciones completas." },
      { title: "Obtén tu propio link de referido", desc: 'Ve a la sección "Referidos" del exchange. Copia tu link y compártelo en redes, grupos y amigos.' },
      { title: "Deposita desde $10 y opera", desc: "Empieza con USDT para aprender. Cada vez que operas acumulas experiencia y ganas comisiones de tus referidos." },
      { title: "Retira tus ganancias", desc: "Usa P2P o transferencia bancaria. Binance y Bybit permiten retirar a cuentas locales en Latinoamérica." },
    ],
    tip: "Publica 1 video corto por semana mostrando la plataforma y agrega tu link. Las comisiones se acumulan mientras duermes.",
  },
  {
    id: "wallets", icon: "👛", title: "Wallets / Billeteras Digitales",
    subtitle: "Guarda y gestiona tus activos digitales",
    links: [
      { name: "MetaMask",     href: "TU_LINK_METAMASK",     badge: "Gratis, sin comisiones" },
      { name: "Uphold",       href: "TU_LINK_UPHOLD",       badge: "$20 BTC al registrarte" },
      { name: "AirTM",        href: "TU_LINK_AIRTM",        badge: "Bono en primera transacción" },
      { name: "Skrill",       href: "TU_LINK_SKRILL",       badge: "Bono al verificar cuenta" },
      { name: "Speed Wallet", href: "TU_LINK_SPEEDWALLET",  badge: "Crypto gratis al registrar" },
      { name: "Base",         href: "TU_LINK_BASE",         badge: "Gratis en L2 Ethereum" },
      { name: "NC Wallet",    href: "TU_LINK_NCWALLET",     badge: "Sin comisiones + % referido" },
      { name: "Osmo Money",   href: "TU_LINK_OSMOMONEY",    badge: "Bono al registrarte" },
      { name: "Sweat Wallet", href: "TU_LINK_SWEATWALLET",  badge: "5 SWEAT al unirte" },
      { name: "Próximamente #1", href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #2", href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #3", href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #4", href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #5", href: "#", badge: "🔒 Próximo" },
    ],
    manualLabel: "MANUAL: CONFIGURA TU WALLET",
    steps: [
      { title: "Descarga MetaMask o Trust Wallet", desc: "Son las más usadas y compatibles. Descarga solo desde la web oficial o app store oficial." },
      { title: "Guarda tu frase semilla", desc: "12 palabras secretas. Escríbelas en papel y guárdalas en un lugar seguro. Nunca las compartas con nadie." },
      { title: "Conecta tu wallet al exchange", desc: "Retira cripto del exchange a tu wallet para tener control total. Usa la red correcta (BEP20, ERC20, etc.)." },
      { title: "Explora DeFi y staking", desc: "Con tu wallet puedes hacer staking de monedas y ganar intereses del 5% al 20% anual sin intermediarios." },
    ],
    tip: "Seguridad: nunca ingreses tu frase semilla en ningún sitio web. Esa frase es tu dinero completo.",
  },
  {
    id: "trading", icon: "📊", title: "Trading & Análisis Técnico",
    subtitle: "Opera mercados y genera ingresos activos",
    links: [
      { name: "Pionex",    href: "TU_LINK_PIONEX",   badge: "Hasta $10,000 USDT", hot: true },
      { name: "Bitget",    href: "TU_LINK_BITGET",   badge: "Hasta $6,200 + 50% fee" },
      { name: "OKX",       href: "TU_LINK_OKX",      badge: "Hasta $10,000 + 30% fee" },
      { name: "Pocket IA", href: "TU_LINK_POCKETIA", badge: "Bono al registrarte" },
      { name: "Próximamente #1", href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #2", href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #3", href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #4", href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #5", href: "#", badge: "🔒 Próximo" },
    ],
    manualLabel: "MANUAL: TU PRIMER TRADE RENTABLE",
    steps: [
      { title: "Estudia análisis técnico básico", desc: "Aprende soporte/resistencia, tendencias y los indicadores RSI y MACD en TradingView. Hay tutoriales gratis en YouTube." },
      { title: "Practica en cuenta demo 30 días", desc: "Bybit y OKX tienen demos gratuitas. Opera con dinero ficticio hasta lograr 3 semanas consecutivas en positivo." },
      { title: "Define tu estrategia de riesgo", desc: "Regla de oro: arriesga máximo 2% de tu capital por operación. Siempre usa stop-loss sin excepciones." },
      { title: "Empieza con $20&#8211;$50 reales", desc: "Opera pares como BTC/USDT o ETH/USDT en spot. Sin apalancamiento al principio." },
      { title: "Lleva un diario de trades", desc: "Anota cada operación: entrada, salida, razonamiento y resultado. Eso te hace mejorar 10x más rápido." },
    ],
    tip: "El 80% pierde por falta de disciplina, no de conocimiento. El plan importa más que el análisis.",
  },
  {
    id: "apps", icon: "📱", title: "Apps de Ganancias Pasivas",
    subtitle: "Gana dinero real usando tu teléfono",
    links: [
      { name: "Pi Network", href: "TU_LINK_PINETWORK", badge: "π gratis al minar", hot: true },
      { name: "Próximamente #1", href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #2", href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #3", href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #4", href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #5", href: "#", badge: "🔒 Próximo" },
    ],
    manualLabel: "MANUAL: INGRESO PASIVO CON APPS",
    steps: [
      { title: "Descarga Honeygain primero", desc: "Comparte tu conexión a internet y gana créditos automáticamente. Mínimo retiro: $20 vía PayPal o cripto." },
      { title: "Activa Sweatcoin en tu teléfono", desc: "Convierte tus pasos diarios en monedas canjeables por productos, PayPal o cripto. Camina y gana." },
      { title: "Usa tu código de referido", desc: "Cada app te da un código único. Compártelo con amigos y gana un bono por cada persona que se active." },
      { title: "Combina 4–5 apps en paralelo", desc: "Por separado ganan poco, juntas pueden sumar $40&#8211;$100/mes sin esfuerzo activo. La clave es la acumulación." },
    ],
    tip: "Publica una reseña de cada app en TikTok con tu link. Un solo video viral puede darte cientos de referidos.",
  },
  {
    id: "ia", icon: "🤖", title: "Apps de Inteligencia Artificial",
    subtitle: "Usa la IA para crear, vender y automatizar", hot: true,
    links: [
      { name: "ChatGPT",      href: "TU_LINK_CHATGPT",      badge: "1 mes Plus gratis", hot: true },
      { name: "Midjourney",   href: "TU_LINK_MIDJOURNEY",   badge: "25 imágenes gratis" },
      { name: "ElevenLabs",   href: "TU_LINK_ELEVENLABS",   badge: "10,000 créditos gratis" },
      { name: "Jasper IA",    href: "TU_LINK_JASPER",       badge: "7 días gratis" },
      { name: "Kling IA",     href: "TU_LINK_KLING",        badge: "Créditos gratis al entrar" },
      { name: "Leonardo IA",  href: "TU_LINK_LEONARDO",     badge: "150 tokens gratis/día" },
      { name: "Próximamente #1", href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #2", href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #3", href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #4", href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #5", href: "#", badge: "🔒 Próximo" },
    ],
    manualLabel: "MANUAL: GANA DINERO CON IA",
    steps: [
      { title: "Domina ChatGPT y Claude", desc: "Aprende a escribir buenos prompts. Con IA puedes crear artículos, scripts de video, emails y publicaciones en minutos." },
      { title: "Ofrece servicios en Fiverr o Upwork", desc: "Crea logos con Midjourney, voces con ElevenLabs, o textos con ChatGPT. Cobra $20&#8211;$200 por proyecto." },
      { title: "Crea contenido para redes con IA", desc: "Usa IA para generar guiones de TikTok, miniaturas de YouTube y copys de Instagram. Publica con tus links." },
      { title: "Afíliate a las plataformas de IA", desc: "Jasper, Copy.ai y otras pagan hasta 40% de comisión recurrente mensual por cada suscriptor que refieras." },
      { title: "Automatiza tu negocio con IA", desc: "Usa n8n o Make con IA para automatizar respuestas, publicaciones y reportes. Vende esto como servicio." },
    ],
    tip: "La IA no te reemplaza — te hace 10x más productivo. Quien la domine primero tendrá ventaja competitiva enorme.",
  },
  {
    id: "video", icon: "🎬", title: "Edición de Video & Contenido",
    subtitle: "Crea contenido y monetiza tu creatividad",
    links: [
      { name: "CapCut",     href: "TU_LINK_CAPCUT",   badge: "Pro gratis 7 días", hot: true },
      { name: "Canva Pro",  href: "TU_LINK_CANVA",    badge: "30 días Pro gratis" },
      { name: "InVideo IA", href: "TU_LINK_INVIDEO",  badge: "Plan gratis incluido" },
      { name: "InShot",     href: "TU_LINK_INSHOT",   badge: "Gratis + Pro con descuento" },
      { name: "Próximamente #1", href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #2", href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #3", href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #4", href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #5", href: "#", badge: "🔒 Próximo" },
    ],
    manualLabel: "MANUAL: DE CREADOR A GENERADOR DE INGRESOS",
    steps: [
      { title: "Elige tu nicho y crea tu canal", desc: "Finanzas, cripto, tecnología o estilo de vida. Crea cuentas en TikTok, YouTube Shorts e Instagram Reels." },
      { title: "Graba con tu teléfono y edita en CapCut", desc: "No necesitas cámara profesional. CapCut tiene plantillas virales, subtítulos automáticos y efectos gratis." },
      { title: "Incluye tus links en cada video", desc: "Menciona tu link de referido en el video y ponlo en la bio. Cada vista es un potencial registro con comisión." },
      { title: "Publica el mismo video en 3 plataformas", desc: "TikTok + YouTube Shorts + Instagram Reels. El mismo contenido triplica tu alcance sin esfuerzo extra." },
      { title: "Activa monetización directa", desc: "YouTube: 1,000 subs + 4,000 hrs. TikTok: 10,000 seguidores. Mientras llegas, los referidos ya pagan." },
    ],
    tip: "1 video diario por 90 días. La consistencia le gana al talento siempre en redes sociales.",
  },
  {
    id: "juegos", icon: "🎮", title: "Juegos Play-to-Earn",
    subtitle: "Juega y gana criptomonedas reales",
    links: [
      { name: "Sweatcoin",    href: "TU_LINK_SWEATCOIN",   badge: "5 SWC al registrarte", hot: true },
      { name: "Tetro Tiles",  href: "TU_LINK_TETROTILES",  badge: "Monedas gratis al entrar" },
      { name: "An Earn App",  href: "TU_LINK_ANEARNAPP",   badge: "Bono de bienvenida" },
      { name: "Faucet Crypto",href: "TU_LINK_FAUCETCRYPTO",badge: "Crypto gratis cada hora" },
      { name: "Shappi",       href: "TU_LINK_SHAPPI",      badge: "Bono al registrarte" },
      { name: "Próximamente #1", href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #2", href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #3", href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #4", href: "#", badge: "🔒 Próximo" },
      { name: "Próximamente #5", href: "#", badge: "🔒 Próximo" },
    ],
    manualLabel: "MANUAL: JUEGA Y CONVIERTE EN DINERO",
    steps: [
      { title: "Empieza con juegos gratis en Telegram", desc: "Notcoin y otros tap-to-earn en Telegram no requieren inversión. Ideal para aprender cómo funcionan los tokens." },
      { title: "Conecta tu wallet al juego", desc: "Usa MetaMask o Trust Wallet. Los tokens que ganas van directo a tu wallet, no a una cuenta del juego." },
      { title: "Completa misiones diarias", desc: "Los juegos P2E recompensan la constancia. Las misiones diarias y eventos especiales dan los mejores rewards." },
      { title: "Transfiere tokens al exchange y vende", desc: "Cuando el precio sea favorable, envía tus tokens al exchange y vende por USDT. Luego retira a tu cuenta bancaria." },
    ],
    tip: "Alerta: investiga SIEMPRE antes de invertir dinero en un juego P2E. Empieza solo con los que no requieren inversión inicial.",
  },
];

const EARNINGS = [
  { source: "Referidos de exchange",    amount: "$50–$500",    period: "por mes" },
  { source: "Trading (intermedio)",      amount: "$100–$1,000", period: "por mes" },
  { source: "Apps pasivas",              amount: "$20–$100",    period: "por mes" },
  { source: "Servicios con IA",          amount: "$200–$2,000", period: "por mes" },
  { source: "Contenido + referidos",     amount: "$300–$2,000", period: "por mes" },
  { source: "Juegos P2E",               amount: "$30–$300",    period: "por mes" },
  { source: "Edición freelance",         amount: "$300–$1,500", period: "por mes" },
  { source: "Redes sociales (90 días)", amount: "$300&#8211;$800",   period: "por mes" },
];

const MODULOS = [
  { n:"01", title:"Elige tu nicho rentable",        desc:"Finanzas, cripto, tech, lifestyle. Cómo encontrar el nicho que combina tu interés con demanda real de mercado." },
  { n:"02", title:"Configura tus perfiles",          desc:"Bio optimizada, foto de perfil, links en bio, y la estrategia de nombre de usuario que posiciona en buscadores." },
  { n:"03", title:"Crea contenido que vende",        desc:"Estructura de video viral, hooks que detienen el scroll, y cómo insertar tus links de referido de forma natural." },
  { n:"04", title:"Estrategia de publicación",       desc:"Horarios óptimos, frecuencia ideal, y cómo reutilizar 1 video en TikTok, YouTube Shorts, Instagram y Facebook." },
  { n:"05", title:"Monetización con referidos",      desc:"Cómo estructurar tus links, usar Linktree, y rastrear cuáles plataformas te generan más comisiones." },
  { n:"06", title:"Crece tu comunidad rápido",       desc:"Colaboraciones, comentarios estratégicos, duetos en TikTok y cómo usar tendencias sin perder tu identidad." },
  { n:"07", title:"Brand deals y patrocinios",       desc:"Cómo contactar marcas, cuánto cobrar según tus seguidores, y cómo crear tu media kit profesional." },
  { n:"08", title:"Escala a ingreso de tiempo completo", desc:"Automatización con IA, delegación, creación de tu propio curso o comunidad de pago. El siguiente nivel." },
];

const PLATAFORMAS = [
  { name:"TikTok",          earn:"$200–$2,000/mes" },
  { name:"YouTube Shorts",  earn:"$100–$1,500/mes" },
  { name:"Instagram Reels", earn:"$150–$1,200/mes" },
  { name:"Facebook",        earn:"$50–$800/mes" },
  { name:"Telegram Canal",  earn:"$100–$3,000/mes" },
  { name:"WhatsApp Status", earn:"$50–$500/mes" },
];

/* ── UTILS ── */
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
    /youtube\.com\/shorts\/([^?&]+)/,
  ];
  for (const p of patterns) { const m = url.match(p); if (m) return m[1]; }
  return null;
}

/* ── VIDEO PLAYER COMPONENT ── */
function VideoPlayer() {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const load = () => {
    const id = extractYouTubeId(input.trim());
    if (!id) { alert("Link de YouTube no reconocido."); return; }
    setVideoId(id);
  };

  return (
    <div style={{ borderTop: "0.5px solid var(--dark4)" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          width:"100%", padding:"7px 12px",
          background:"var(--dark3)", border:"none", cursor:"pointer",
          fontSize:12, color:"var(--text-muted)", fontFamily:"inherit",
          transition:"color .2s",
        }}
      >
        <span style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span>▶</span> Video instructivo
        </span>
        <span style={{ fontSize:10, transform: open ? "rotate(180deg)" : "none", transition:"transform .25s" }}>▼</span>
      </button>

      {open && (
        <div style={{ background:"var(--dark)" }}>
          {videoId ? (
            <div style={{ position:"relative", paddingBottom:"56.25%", height:0, overflow:"hidden" }}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                allowFullScreen
                style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", border:"none" }}
              />
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10, padding:"1.25rem", textAlign:"center" }}>
              <div style={{ fontSize:30, opacity:.4 }}>🎬</div>
              <div style={{ fontSize:12, color:"var(--text-muted)" }}>Pega tu link de YouTube cuando tengas el video</div>
              <div style={{ display:"flex", gap:6, width:"100%", maxWidth:340 }}>
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  style={{
                    flex:1, background:"var(--dark3)", border:"0.5px solid var(--dark4)",
                    color:"var(--text)", padding:"7px 10px", borderRadius:6,
                    fontSize:12, fontFamily:"inherit",
                  }}
                />
                <button
                  onClick={load}
                  style={{
                    background:"var(--gold)", color:"var(--dark)", border:"none",
                    padding:"7px 12px", borderRadius:6, fontSize:12,
                    fontWeight:600, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap",
                  }}
                >
                  Cargar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── REF ITEM ── */
function RefItem({ item }: { item: RefItem }) {
  return (
    <div style={{
      border:"0.5px solid var(--dark4)", borderRadius:8,
      overflow:"hidden", transition:"border-color .2s",
    }}>
      <a
        href={item.href} target="_blank" rel="noopener noreferrer"
        style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"8px 12px", textDecoration:"none",
          background:"var(--dark3)", color:"var(--text)", fontSize:13,
          borderBottom:"0.5px solid var(--dark4)",
        }}
      >
        {item.name}
        <span style={{
          fontSize:11, padding:"2px 8px", borderRadius:10, whiteSpace:"nowrap",
          background: item.hot ? "rgba(0,198,255,0.15)" : "var(--dark4)",
          color: item.hot ? "var(--gold-light)" : "var(--gold)",
          border: `0.5px solid ${item.hot ? "var(--gold)" : "var(--gold-dark)"}`,
        }}>
          {item.badge}
        </span>
      </a>
      <VideoPlayer />
    </div>
  );
}

/* ── CATEGORY CARD ── */
function CategoryCard({ cat, onAddLink }: { cat: Category; onAddLink: (id: string) => void }) {
  const [links, setLinks] = useState<RefItem[]>(cat.links);

  return (
    <div id={cat.id} style={{
      background:"var(--dark2)", border:"0.5px solid var(--dark4)",
      borderRadius:10, marginBottom:"2rem", overflow:"hidden",
    }}>
      {/* Header */}
      <div style={{
        display:"flex", alignItems:"center", gap:12,
        padding:"1rem 1.5rem", borderBottom:"0.5px solid var(--dark4)",
        background:"var(--dark3)",
      }}>
        <span style={{ fontSize:22 }}>{cat.icon}</span>
        <div>
          <div style={{ fontSize:16, fontWeight:600, color:"var(--gold)" }}>{cat.title}</div>
          <div style={{ fontSize:12, color:"var(--text-muted)" }}>{cat.subtitle}</div>
        </div>
        {cat.hot && (
          <span style={{
            marginLeft:"auto", fontSize:11, padding:"2px 10px", borderRadius:20,
            background:"rgba(0,198,255,0.15)", color:"var(--gold-light)",
            border:"0.5px solid var(--gold)",
          }}>
            {cat.id === "ia" ? "Tendencia 2025" : "Más popular"}
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>
        {/* Left — links */}
        <div style={{ padding:"1.5rem", borderRight:"0.5px solid var(--dark4)" }}>
          <span style={{ fontSize:11, letterSpacing:"1.5px", color:"var(--gold-dark)", marginBottom:"0.6rem", display:"block" }}>
            MIS LINKS DE REFERIDO
          </span>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {links.map((lnk, i) => <RefItem key={i} item={lnk} />)}
            <button
              onClick={() => onAddLink(cat.id)}
              style={{
                display:"flex", alignItems:"center", gap:6,
                background:"transparent", border:"0.5px dashed var(--dark4)",
                borderRadius:6, padding:"8px 12px", color:"var(--text-muted)",
                fontSize:13, cursor:"pointer", width:"100%",
                fontFamily:"inherit", marginTop:2,
              }}
            >
              + Agregar plataforma
            </button>
          </div>
        </div>

        {/* Right — manual */}
        <div style={{ padding:"1.5rem" }}>
          <span style={{ fontSize:11, letterSpacing:"1.5px", color:"var(--gold-dark)", marginBottom:"0.75rem", display:"block" }}>
            {cat.manualLabel}
          </span>
          {cat.steps.map((s, i) => (
            <div key={i} style={{ display:"flex", gap:10, marginBottom:12, alignItems:"flex-start" }}>
              <div style={{
                width:22, height:22, borderRadius:"50%",
                background:"var(--dark4)", border:"0.5px solid var(--gold-dark)",
                color:"var(--gold)", fontSize:11, fontWeight:600,
                display:"flex", alignItems:"center", justifyContent:"center",
                flexShrink:0, marginTop:1,
              }}>{i + 1}</div>
              <div>
                <strong style={{ display:"block", fontSize:13, fontWeight:500, color:"var(--text)", marginBottom:1 }}>{s.title}</strong>
                <p style={{ fontSize:12, color:"var(--text-muted)", lineHeight:1.55 }}>{s.desc}</p>
              </div>
            </div>
          ))}
          <div style={{
            display:"flex", alignItems:"flex-start", gap:8,
            background:"rgba(0,198,255,0.07)", border:"0.5px solid var(--gold-dark)",
            borderRadius:8, padding:"10px 12px", marginTop:10,
            fontSize:12, color:"var(--gold-light)", lineHeight:1.5,
          }}>
            <span style={{ color:"var(--gold)", flexShrink:0 }}>★</span>
            {cat.tip}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── ADD LINK MODAL ── */
function AddLinkModal({ catId, onClose, onSave }: {
  catId: string; onClose: () => void;
  onSave: (catId: string, item: RefItem) => void;
}) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [badge, setBadge] = useState("");

  const save = () => {
    if (!name || !url) { alert("Nombre y URL son requeridos."); return; }
    onSave(catId, { name, href: url, badge });
    onClose();
  };

  return (
    <div style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,0.8)",
      zIndex:200, display:"flex", alignItems:"center", justifyContent:"center",
    }}>
      <div style={{
        background:"var(--dark2)", border:"0.5px solid var(--gold-dark)",
        borderRadius:10, padding:"2rem", width:"90%", maxWidth:400,
      }}>
        <h3 style={{ color:"var(--gold)", marginBottom:"1rem", fontSize:16 }}>Agregar plataforma</h3>
        {[
          { val: name, set: setName, ph: "Nombre de la plataforma" },
          { val: url,  set: setUrl,  ph: "https://tu-link-de-referido.com" },
          { val: badge,set: setBadge,ph: "Badge (ej: Bono $50)" },
        ].map(({ val, set, ph }, i) => (
          <input key={i} value={val} onChange={e => set(e.target.value)} placeholder={ph}
            style={{
              width:"100%", background:"var(--dark3)", border:"0.5px solid var(--dark4)",
              color:"var(--text)", padding:"10px 14px", borderRadius:8,
              fontSize:14, marginBottom:10, fontFamily:"inherit", outline:"none",
            }}
          />
        ))}
        <div style={{ display:"flex", gap:10, marginTop:4 }}>
          <button onClick={save} style={{
            background:"var(--gold)", color:"var(--dark)", border:"none",
            padding:"8px 18px", borderRadius:8, fontSize:14, cursor:"pointer", fontFamily:"inherit",
          }}>Guardar</button>
          <button onClick={onClose} style={{
            background:"transparent", color:"var(--gold)", border:"1px solid var(--gold-dark)",
            padding:"8px 18px", borderRadius:8, fontSize:14, cursor:"pointer", fontFamily:"inherit",
          }}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

const PLAN_90 = [
  { n:1, t:"Días 1 al 10: Configura todo",        d:"Perfiles, links de referido, bio optimizada y primeros 3 videos publicados." },
  { n:2, t:"Días 11 al 30: Consistencia diaria",  d:"1 video por día. Analiza qué formato tiene más vistas y doble apuesta en ese estilo." },
  { n:3, t:"Días 31 al 60: Optimizar y crecer",   d:"Colabora con otros creadores, responde comentarios, usa IA para acelerar la producción." },
  { n:4, t:"Días 61 al 90: Monetización activa",  d:"Ya tienes audiencia. Activa AdSense, busca brand deals y tus referidos ya generan ingresos pasivos." },
];

function CursoRedes() {
  return (
    <div id="redes" style={{ background:"var(--dark3)", borderTop:"0.5px solid var(--dark4)", borderBottom:"0.5px solid var(--dark4)", padding:"3.5rem 2rem" }}>
      <div style={{ maxWidth:1060, margin:"0 auto" }}>
        <span style={{ fontSize:11, letterSpacing:2, color:"var(--gold)", marginBottom:"0.4rem", display:"block" }}>CURSO COMPLETO</span>
        <h2 style={{ fontSize:26, fontWeight:600, marginBottom:"0.4rem" }}>Monetización de Redes Sociales</h2>
        <p style={{ color:"var(--text-muted)", marginBottom:"2.5rem", fontSize:15 }}>De cero seguidores a ingresos reales. Un curso completo incluido en este sitio, sin costo.</p>
        <div style={{ background:"var(--dark2)", border:"1px solid var(--gold-dark)", borderRadius:10, overflow:"hidden" }}>
          {/* Header */}
          <div style={{ background:"var(--dark3)", padding:"1.25rem 1.5rem", borderBottom:"0.5px solid var(--dark4)", display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:22 }}>{"📲"}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:16, fontWeight:600, color:"var(--gold)" }}>{"Curso: Gana dinero con tus redes sociales"}</div>
              <div style={{ fontSize:12, color:"var(--text-muted)" }}>{"8 módulos · Bilingüe · Aplica desde hoy"}</div>
            </div>
            <span style={{ background:"var(--gold)", color:"var(--dark)", fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20 }}>GRATIS</span>
          </div>
          {/* Body */}
          <div className="curso-body" style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>
            {/* Modulos */}
            <div style={{ padding:"1.5rem", borderRight:"0.5px solid var(--dark4)" }}>
              <span style={{ fontSize:11, letterSpacing:"1.5px", color:"var(--gold-dark)", marginBottom:"0.75rem", display:"block" }}>MÓDULOS DEL CURSO</span>
              {MODULOS.map((m, i) => (
                <div key={i} style={{ display:"flex", gap:12, marginBottom:"1rem", paddingBottom:"1rem", borderBottom: i < MODULOS.length - 1 ? "0.5px solid var(--dark4)" : "none" }}>
                  <div style={{ width:32, height:32, borderRadius:8, background:"var(--dark4)", border:"0.5px solid var(--gold-dark)", color:"var(--gold)", fontSize:13, fontWeight:600, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{m.n}</div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:500, color:"var(--text)", marginBottom:2 }}>{m.title}</div>
                    <div style={{ fontSize:12, color:"var(--text-muted)", lineHeight:1.5 }}>{m.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Plataformas + Plan */}
            <div style={{ padding:"1.5rem" }}>
              <span style={{ fontSize:11, letterSpacing:"1.5px", color:"var(--gold-dark)", marginBottom:"0.75rem", display:"block" }}>PLATAFORMAS Y SU POTENCIAL</span>
              <div className="plat-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:"1rem" }}>
                {PLATAFORMAS.map((p, i) => (
                  <div key={i} style={{ background:"var(--dark3)", border:"0.5px solid var(--dark4)", borderRadius:8, padding:"10px 12px" }}>
                    <div style={{ fontSize:13, fontWeight:500, color:"var(--text)", marginBottom:2 }}>{p.name}</div>
                    <div style={{ fontSize:12, color:"var(--green)" }}>{p.earn}</div>
                  </div>
                ))}
              </div>
              <span style={{ fontSize:11, letterSpacing:"1.5px", color:"var(--gold-dark)", marginBottom:"0.75rem", display:"block" }}>PLAN DE ACCIÓN: 90 DÍAS</span>
              {PLAN_90.map((s) => (
                <div key={s.n} style={{ display:"flex", gap:10, marginBottom:12 }}>
                  <div style={{ width:22, height:22, borderRadius:"50%", background:"var(--dark4)", border:"0.5px solid var(--gold-dark)", color:"var(--gold)", fontSize:11, fontWeight:600, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{s.n}</div>
                  <div>
                    <strong style={{ display:"block", fontSize:13, fontWeight:500, color:"var(--text)" }}>{s.t}</strong>
                    <p style={{ fontSize:12, color:"var(--text-muted)" }}>{s.d}</p>
                  </div>
                </div>
              ))}
              <div style={{ display:"flex", gap:8, background:"rgba(0,198,255,0.07)", border:"0.5px solid var(--gold-dark)", borderRadius:8, padding:"10px 12px", fontSize:12, color:"var(--gold-light)" }}>
                <span style={{ color:"var(--gold)" }}>{"★"}</span>
                <span>{"Meta realista: $300 a $800/mes al dia 90 combinando referidos + monetizacion + 1 brand deal."}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── MAIN PAGE ── */
export default function Page() {
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [modalCat, setModalCat] = useState<string | null>(null);

  const handleAddLink = useCallback((catId: string) => setModalCat(catId), []);

  const handleSave = useCallback((catId: string, item: RefItem) => {
    setCategories(prev => prev.map(c =>
      c.id === catId ? { ...c, links: [...c.links, item] } : c
    ));
  }, []);

  return (
    <>
      <style>{`
        :root {
          --gold: #00C6FF; --gold-light: #80E8FF; --gold-dark: #0077AA;
          --dark: #050D18; --dark2: #0A1628; --dark3: #0F1F38; --dark4: #162840;
          --text: #E8F4FF; --text-muted: #7AAAC8; --green: #00E676; --radius: 10px;
        }
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }
        body { background:var(--dark); color:var(--text); font-family:'Segoe UI',system-ui,sans-serif; }
        a:hover { color:var(--gold) !important; }
        @media(max-width:700px){
          .cat-body { grid-template-columns:1fr !important; }
          .cat-left-col { border-right:none !important; border-bottom:0.5px solid var(--dark4) !important; }
          .curso-body { grid-template-columns:1fr !important; }
          .nav-links { display:none !important; }
          .plat-grid { grid-template-columns:1fr !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        background:"var(--dark2)", borderBottom:"0.5px solid var(--gold-dark)",
        padding:"0 2rem", display:"flex", alignItems:"center", justifyContent:"space-between",
        height:60, position:"sticky", top:0, zIndex:100,
      }}>
        <div style={{ fontSize:20, fontWeight:700, color:"var(--gold)" }}>
          Dinero<span style={{ color:"var(--text)", fontWeight:400 }}> Abundante</span>
        </div>
        <ul className="nav-links" style={{ display:"flex", gap:"1.2rem", listStyle:"none", flexWrap:"wrap" }}>
          {["exchange","wallets","trading","apps","ia","video","juegos","redes"].map(id => (
            <li key={id}><a href={`#${id}`} style={{ color:"var(--text-muted)", textDecoration:"none", fontSize:13 }}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a></li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <div style={{ textAlign:"center", padding:"5rem 2rem 4rem", borderBottom:"0.5px solid var(--dark4)" }}>
        <div style={{
          display:"inline-block", background:"var(--dark4)", border:"0.5px solid var(--gold-dark)",
          color:"var(--gold)", fontSize:12, padding:"4px 16px", borderRadius:20,
          marginBottom:"1.5rem", letterSpacing:1,
        }}>GANA DINERO ONLINE · PASO A PASO</div>
        <h1 style={{ fontSize:"clamp(2rem,5vw,3.5rem)", fontWeight:700, color:"var(--gold)", lineHeight:1.15, marginBottom:"1rem" }}>
          Tu <span style={{ color:"var(--text)" }}>libertad financiera</span><br />empieza aquí
        </h1>
        <p style={{ fontSize:18, color:"var(--text-muted)", maxWidth:620, margin:"0 auto 2rem" }}>
          Exchanges, wallets, trading, apps de IA, edición de video, juegos y redes sociales — links de referido + manual completo en cada categoría.
        </p>
        <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
          <a href="#exchange" style={{
            background:"var(--gold)", color:"var(--dark)", padding:"12px 28px",
            borderRadius:10, fontSize:15, fontWeight:600, textDecoration:"none",
          }}>Explorar categorías</a>
          <a href="#redes" style={{
            background:"transparent", color:"var(--gold)", border:"1px solid var(--gold-dark)",
            padding:"12px 28px", borderRadius:10, fontSize:15, textDecoration:"none",
          }}>Ver el Curso</a>
        </div>
      </div>

      {/* STATS */}
      <div style={{
        display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",
        gap:1, background:"var(--dark4)",
      }}>
        {[["8","Categorías"],["25+","Plataformas"],["$0","Para empezar"],["1","Curso incluido"],["24/7","Ingresos pasivos"]].map(([n,l]) => (
          <div key={l} style={{ background:"var(--dark2)", padding:"1.5rem", textAlign:"center" }}>
            <div style={{ fontSize:28, fontWeight:700, color:"var(--gold)" }}>{n}</div>
            <div style={{ fontSize:12, color:"var(--text-muted)", marginTop:4 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* CATEGORIES */}
      <div style={{ maxWidth:1060, margin:"0 auto", padding:"3.5rem 2rem" }}>
        <span style={{ fontSize:11, letterSpacing:2, color:"var(--gold)", marginBottom:"0.4rem", display:"block" }}>PLATAFORMAS Y MANUALES</span>
        <h2 style={{ fontSize:26, fontWeight:600, marginBottom:"0.4rem" }}>Todas las categorías</h2>
        <p style={{ color:"var(--text-muted)", marginBottom:"2.5rem", fontSize:15 }}>
          Links de referido a la izquierda con video instructivo · Manual de ganancias a la derecha.
        </p>
        {categories.map(cat => (
          <CategoryCard key={cat.id} cat={cat} onAddLink={handleAddLink} />
        ))}
      </div>

      {/* CURSO REDES */}
      <CursoRedes />

      {/* GANANCIAS */}
      <div style={{ maxWidth:1060, margin:"0 auto", padding:"3.5rem 2rem" }}>
        <span style={{ fontSize:11, letterSpacing:2, color:"var(--gold)", marginBottom:"0.4rem", display:"block" }}>POTENCIAL DE INGRESOS</span>
        <h2 style={{ fontSize:26, fontWeight:600, marginBottom:"0.4rem" }}>¿Cuánto puedes ganar?</h2>
        <p style={{ color:"var(--text-muted)", marginBottom:"2rem", fontSize:15 }}>Estimados reales de la comunidad. Resultados varían según dedicación y estrategia.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"0.75rem" }}>
          {EARNINGS.map((e, i) => (
            <div key={i} style={{ background:"var(--dark2)", border:"0.5px solid var(--dark4)", borderRadius:10, padding:"1rem" }}>
              <div style={{ fontSize:12, color:"var(--text-muted)", marginBottom:4 }}>{e.source}</div>
              <div style={{ fontSize:20, fontWeight:600, color:"var(--green)" }}>{e.amount}</div>
              <div style={{ fontSize:11, color:"var(--text-muted)" }}>{e.period}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background:"var(--dark2)", borderTop:"0.5px solid var(--dark4)", padding:"2rem", textAlign:"center", color:"var(--text-muted)", fontSize:13 }}>
        <div style={{ fontSize:20, fontWeight:700, color:"var(--gold)", marginBottom:"0.5rem" }}>
          Dinero<span style={{ color:"var(--text)", fontWeight:400 }}> Abundante</span>
        </div>
        <p>De la escasez a la abundancia &#8212; cada link que usas es un paso hacia tu libertad financiera. Juntos construimos riqueza real.</p>
        <p style={{ marginTop:"0.4rem", fontSize:12, color:"var(--dark4)" }}>Las ganancias mostradas son estimadas y no garantizadas. Invierte solo lo que puedas permitirte perder.</p>
      </footer>

      {/* MODAL */}
      {modalCat && (
        <AddLinkModal
          catId={modalCat}
          onClose={() => setModalCat(null)}
          onSave={handleSave}
        />
      )}
    </>
  );
}

import { useState, useEffect, useCallback, useMemo } from "react";

// ============================================================
// QRATEDKART.COM — Full MVP Prototype
// India's Fourthwall: Creator merch storefronts + discovery
// ============================================================

// --- MOCK DATA ---
const NICHES = ["Anime & Manga", "City Pride", "Fitness", "Indie Music", "Minimalist Art", "Memes & Humor"];
const CITIES = ["Bangalore", "Mumbai", "Delhi", "Chennai", "Hyderabad", "Pune", "Jaipur", "Kolkata"];
const PRODUCT_TYPES = ["Round Neck Tee", "Oversized Tee", "Hoodie", "Tote Bag", "Mug"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const COLORS_PALETTE = [
  { name: "Midnight Black", hex: "#1a1a1a" },
  { name: "Arctic White", hex: "#f5f5f0" },
  { name: "Storm Navy", hex: "#1e3a5f" },
  { name: "Sage Green", hex: "#7a9e7e" },
  { name: "Rust Orange", hex: "#c4652e" },
  { name: "Dusty Rose", hex: "#c9a0a0" },
];

const BASE_COSTS = {
  "Round Neck Tee": 250, "Oversized Tee": 320, "Hoodie": 650, "Tote Bag": 180, "Mug": 120,
};

const CREATORS = [
  { id: "artbyneha", name: "Art by Neha", city: "Bangalore", niche: "Anime & Manga", bio: "Digital artist obsessed with reimagining Indian mythology through anime aesthetics. Every design tells a story from the epics, remixed for today.", avatar: "🎨", theme: { primary: "#e84393", bg: "#0f0a1a", text: "#f0e6ff", accent: "#fd79a8" }, social: { instagram: "artbyneha", youtube: "artbyneha" }, followers: 12400 },
  { id: "blrcityco", name: "BLR City Co.", city: "Bangalore", niche: "City Pride", bio: "Bangalore born. Auto-rickshaw vibes, filter coffee love, and Koramangala chaos — all on fabric.", avatar: "🏙️", theme: { primary: "#00b894", bg: "#0a1a14", text: "#e6fff5", accent: "#55efc4" }, social: { instagram: "blrcityco" }, followers: 8200 },
  { id: "ironmitra", name: "Iron Mitra", city: "Mumbai", niche: "Fitness", bio: "Personal trainer by day, merch designer by night. Wear your motivation. No excuses, no shortcuts.", avatar: "💪", theme: { primary: "#d63031", bg: "#1a0a0a", text: "#ffe6e6", accent: "#ff7675" }, social: { instagram: "ironmitra", youtube: "ironmitrafit" }, followers: 23100 },
  { id: "thechennaibass", name: "The Chennai Bass", city: "Chennai", niche: "Indie Music", bio: "Underground bass music collective. Our merch drops are as limited as our gig tickets. Rep the scene.", avatar: "🎵", theme: { primary: "#6c5ce7", bg: "#0f0a1f", text: "#e6e0ff", accent: "#a29bfe" }, social: { instagram: "thechennaibass", youtube: "chennaibass" }, followers: 5600 },
  { id: "nihilistmemes", name: "Nihilist Memes India", city: "Delhi", niche: "Memes & Humor", bio: "Nothing matters, but at least you'll look good. Existential crisis, now available in XL.", avatar: "😶", theme: { primary: "#fdcb6e", bg: "#1a1700", text: "#fff8e0", accent: "#ffeaa7" }, social: { instagram: "nihilistmemesindia" }, followers: 45200 },
  { id: "zenlines", name: "Zen Lines", city: "Pune", niche: "Minimalist Art", bio: "One line. One thought. Less is more. Minimalist illustrations for people who appreciate quiet beauty.", avatar: "✏️", theme: { primary: "#636e72", bg: "#fafafa", text: "#2d3436", accent: "#b2bec3" }, social: { instagram: "zenlines" }, followers: 3400 },
  { id: "bombaybhau", name: "Bombay Bhau", city: "Mumbai", niche: "City Pride", bio: "Vada pav to BEST buses. Celebrating Mumbai's beautiful chaos, one tee at a time. Amchi Mumbai forever.", avatar: "🚌", theme: { primary: "#e17055", bg: "#1a110a", text: "#fff0e6", accent: "#fab1a0" }, social: { instagram: "bombaybhau" }, followers: 19800 },
  { id: "animeraja", name: "AnimeRaja", city: "Hyderabad", niche: "Anime & Manga", bio: "Biryani + anime = my whole personality. I draw original characters inspired by Telugu folklore meets shonen energy.", avatar: "⚡", theme: { primary: "#0984e3", bg: "#0a0f1a", text: "#e0f0ff", accent: "#74b9ff" }, social: { instagram: "animeraja", youtube: "animeraja" }, followers: 7800 },
  { id: "mudrafitness", name: "Mudra Fitness", city: "Jaipur", niche: "Fitness", bio: "Yoga meets modern fitness. Ancient strength, contemporary style. Designed in Jaipur, worn everywhere.", avatar: "🧘", theme: { primary: "#00cec9", bg: "#0a1a1a", text: "#e0ffff", accent: "#81ecec" }, social: { instagram: "mudrafi" }, followers: 4100 },
  { id: "kolkatainked", name: "Kolkata Inked", city: "Kolkata", niche: "Minimalist Art", bio: "Howrah Bridge in one stroke. Durga in three lines. Kolkata's soul through minimal tattoo-style art.", avatar: "🖋️", theme: { primary: "#2d3436", bg: "#fefefe", text: "#1a1a1a", accent: "#636e72" }, social: { instagram: "kolkatainked" }, followers: 2900 },
];

function generateProducts() {
  const designs = [
    { creator: "artbyneha", name: "Ramayana Remix", desc: "Lord Rama reimagined in shonen anime style", img: "🏹" },
    { creator: "artbyneha", name: "Devi Unleashed", desc: "Durga as a mecha pilot — power meets divinity", img: "⚔️" },
    { creator: "artbyneha", name: "Hanuman Ultra", desc: "Hanuman in Dragon Ball energy aura", img: "🐒" },
    { creator: "blrcityco", name: "Namma Metro", desc: "Purple line love letter to Bangalore's metro", img: "🚇" },
    { creator: "blrcityco", name: "Auto Raja", desc: "The iconic green-yellow auto in geometric art", img: "🛺" },
    { creator: "blrcityco", name: "Filter Kaapi Club", desc: "For the davara-tumbler faithful", img: "☕", mockup: "chai" },
    { creator: "ironmitra", name: "No Rest Days", desc: "Bold typography. Zero excuses.", img: "🔥" },
    { creator: "ironmitra", name: "Protein & Prayers", desc: "Gym motivation meets desi soul", img: "🙏" },
    { creator: "thechennaibass", name: "Bass Drop Chennai", desc: "Waveform art from our latest EP", img: "🔊" },
    { creator: "thechennaibass", name: "Underground Scene", desc: "If you know, you know. Rep the scene.", img: "🎧" },
    { creator: "nihilistmemes", name: "Nothing Matters Tee", desc: "Existential dread, premium cotton", img: "🕳️" },
    { creator: "nihilistmemes", name: "Sab Moh Maya Hai", desc: "Ancient wisdom, modern apathy", img: "💀" },
    { creator: "nihilistmemes", name: "Error 404: Motivation", desc: "When life gives you bugs", img: "🤖" },
    { creator: "zenlines", name: "One Breath", desc: "Single continuous line meditation", img: "🌊" },
    { creator: "zenlines", name: "Silent Mountain", desc: "Sahyadri peaks in three strokes", img: "🏔️" },
    { creator: "bombaybhau", name: "BEST Bus No. 1", desc: "Red bus, infinite memories", img: "🔴" },
    { creator: "bombaybhau", name: "Vada Pav Republic", desc: "The national snack deserves national merch", img: "🍔" },
    { creator: "bombaybhau", name: "Local Train Diaries", desc: "Virar fast, hold tight, wear proud", img: "🚂" },
    { creator: "animeraja", name: "Telugu Titan", desc: "Original character — Hyderabadi shonen hero", img: "⚡" },
    { creator: "animeraja", name: "Biryani Sensei", desc: "The wise master of flavors, anime style", img: "🍚" },
    { creator: "mudrafitness", name: "Surya Namaskar Flow", desc: "12 poses, one tee, eternal energy", img: "☀️" },
    { creator: "mudrafitness", name: "Warrior Pose", desc: "Virabhadrasana strength in minimal lines", img: "⚡" },
    { creator: "kolkatainked", name: "Howrah One Line", desc: "The bridge in a single unbroken stroke", img: "🌉" },
    { creator: "kolkatainked", name: "Tram Stories", desc: "Kolkata's moving heritage, minimal ink", img: "🚃" },
  ];
  let id = 1;
  const products = [];
  designs.forEach(d => {
    const types = PRODUCT_TYPES.slice(0, 2 + Math.floor(Math.random() * 3));
    types.forEach(type => {
      const baseCost = BASE_COSTS[type];
      const margin = Math.ceil(baseCost * (0.8 + Math.random() * 0.6));
      const price = baseCost + margin + Math.ceil(Math.random() * 50);
      const roundedPrice = Math.round(price / 50) * 50 - 1;
      products.push({
        id: id++, creator: d.creator, name: d.name, desc: d.desc, img: d.img,
        mockup: d.mockup || null,
        type, price: Math.max(roundedPrice, baseCost + 100),
        baseCost, colors: COLORS_PALETTE.slice(0, 2 + Math.floor(Math.random() * 4)),
        sizes: type === "Mug" || type === "Tote Bag" ? ["One Size"] : SIZES,
        sales: Math.floor(Math.random() * 120),
      });
    });
  });
  return products;
}

const ALL_PRODUCTS = generateProducts();

// --- ICONS (inline SVG components) ---
const Icons = {
  Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  Cart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  Back: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m15 18-6-6 6-6"/></svg>,
  Instagram: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/></svg>,
  Youtube: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75,15.02 15.5,11.75 9.75,8.48"/></svg>,
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>,
  Minus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14"/></svg>,
  X: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>,
  Dashboard: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Truck: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16,8 20,8 23,11 23,16 16,16"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  Rupee: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 3h12M6 8h12M6 3c0 5-6 8 6 13"/><path d="M14.5 8c0 3-2.5 5-5.5 5"/></svg>,
  Star: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>,
  Package: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27,6.96 12,12.01 20.73,6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  Users: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  TrendUp: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/></svg>,
  Eye: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Check: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>,
  Upload: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  Sparkle: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14 9L21 9L15.5 13.5L17.5 21L12 16.5L6.5 21L8.5 13.5L3 9L10 9Z"/></svg>,
};

// --- MOCKUP COMPONENTS ---
function ChaiMockup({ bgColor = "#111111", size = 220 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
      {/* T-shirt shape */}
      <path d="M55 40 L30 65 L55 75 L55 180 L165 180 L165 75 L190 65 L165 40 L145 55 C138 62 124 67 110 67 C96 67 82 62 75 55 Z"
        fill={bgColor} stroke="#333" strokeWidth="1.5"/>
      {/* Design area on shirt */}
      {/* Glass of chai */}
      <g transform="translate(72, 78)">
        {/* Steam wisps */}
        <path d="M28 12 Q26 7 28 3" stroke="#d4a96a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M33 10 Q31 5 33 1" stroke="#d4a96a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Glass body */}
        <rect x="20" y="15" width="26" height="32" rx="3" fill="#c8813a" opacity="0.9"/>
        <rect x="22" y="15" width="10" height="32" rx="2" fill="#e8a055" opacity="0.4"/>
        {/* Glass rim */}
        <rect x="19" y="14" width="28" height="4" rx="2" fill="#d4956e"/>
        {/* Glass base */}
        <rect x="22" y="45" width="22" height="4" rx="2" fill="#b87040"/>
        {/* "my" text */}
        <text x="0" y="20" fontFamily="Georgia, serif" fontSize="11" fill="#f5e6c8" fontStyle="italic">my</text>
        {/* CHAH text */}
        <text x="48" y="30" fontFamily="Impact, Arial Black, sans-serif" fontSize="18" fill="#f5e6c8" fontWeight="900">CHAH,</text>
        {/* sparkle */}
        <path d="M55 8 L57 13 L62 13 L58 16 L60 21 L55 18 L50 21 L52 16 L48 13 L53 13 Z" fill="#c8813a" opacity="0.8"/>
        {/* "my" small */}
        <text x="48" y="44" fontFamily="Georgia, serif" fontSize="8" fill="#f5e6c8" fontStyle="italic">my</text>
        {/* RULES text */}
        <text x="56" y="55" fontFamily="Impact, Arial Black, sans-serif" fontSize="16" fill="#f5f5f0" fontWeight="900">RULES.</text>
      </g>
    </svg>
  );
}

function ProductThumbnail({ product, creator, size = 220 }) {
  if (product.mockup === "chai") {
    const bgColor = product.colors?.[0]?.hex || "#111111";
    return (
      <div style={{
        width: "100%", height: size, display: "flex", alignItems: "center",
        justifyContent: "center", background: "#e8e4dd", position: "relative"
      }}>
        <ChaiMockup bgColor={bgColor} size={size - 20} />
        <span style={{
          position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.6)",
          color: "white", padding: "3px 10px", borderRadius: 100, fontSize: 11, fontWeight: 600
        }}>{product.type}</span>
        <span style={{
          position: "absolute", bottom: 8, left: 10, background: "#c0272d",
          color: "white", padding: "2px 8px", borderRadius: 100, fontSize: 10, fontWeight: 700
        }}>MOCKUP</span>
      </div>
    );
  }
  // Default emoji thumbnail
  return (
    <div style={{
      height: size, background: `linear-gradient(135deg, ${creator.theme.bg}, ${creator.theme.primary}33)`,
      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64, position: "relative"
    }}>
      {product.img}
      <span style={{
        position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.6)",
        color: "white", padding: "3px 10px", borderRadius: 100, fontSize: 11, fontWeight: 600
      }}>{product.type}</span>
    </div>
  );
}

// --- STYLES ---
const fontImport = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');`;

const globalStyles = `
  ${fontImport}
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --qk-black: #0a0a0a;
    --qk-white: #fafaf9;
    --qk-cream: #f5f0e8;
    --qk-warm: #e8e0d4;
    --qk-accent: #c0272d;
    --qk-accent-soft: #e03030;
    --qk-text: #1a1a1a;
    --qk-text-muted: #6b6560;
    --qk-border: #e0dbd4;
    --qk-success: #2d9c5a;
    --qk-card: #ffffff;
    --qk-radius: 12px;
    --qk-radius-sm: 8px;
    --qk-radius-lg: 20px;
    --font-display: 'Outfit', sans-serif;
    --font-mono: 'Space Mono', monospace;
  }
  body, html { font-family: var(--font-display); background: var(--qk-cream); color: var(--qk-text); }
  ::selection { background: var(--qk-accent); color: white; }
  input, select, textarea, button { font-family: var(--font-display); }
  a { color: inherit; text-decoration: none; }
  
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
  @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  @keyframes cartBounce { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.3); } }
  
  .fade-in { animation: fadeIn 0.4s ease-out both; }
  .slide-up { animation: slideUp 0.5s ease-out both; }
  .scale-in { animation: scaleIn 0.3s ease-out both; }
  
  .stagger-1 { animation-delay: 0.05s; }
  .stagger-2 { animation-delay: 0.1s; }
  .stagger-3 { animation-delay: 0.15s; }
  .stagger-4 { animation-delay: 0.2s; }
  .stagger-5 { animation-delay: 0.25s; }
  .stagger-6 { animation-delay: 0.3s; }
`;

// --- MAIN APP ---
export default function QratedkartApp() {
  const [view, setView] = useState("home"); // home | creator | product | cart | checkout | dashboard
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [dashboardTab, setDashboardTab] = useState("overview");
  const [notification, setNotification] = useState(null);
  const [checkoutDone, setCheckoutDone] = useState(false);

  const showNotification = useCallback((msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2200);
  }, []);

  const addToCart = useCallback((product, size, color) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.size === size && i.color === color.name);
      if (existing) return prev.map(i => i === existing ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, size, color: color.name, colorHex: color.hex, qty: 1 }];
    });
    showNotification(`${product.name} added to cart!`);
  }, [showNotification]);

  const removeFromCart = useCallback((idx) => {
    setCart(prev => prev.filter((_, i) => i !== idx));
  }, []);

  const updateQty = useCallback((idx, delta) => {
    setCart(prev => prev.map((item, i) => {
      if (i !== idx) return item;
      const newQty = item.qty + delta;
      return newQty > 0 ? { ...item, qty: newQty } : item;
    }));
  }, []);

  const cartTotal = useMemo(() => cart.reduce((sum, i) => sum + i.product.price * i.qty, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((sum, i) => sum + i.qty, 0), [cart]);

  const navigateTo = useCallback((v, data) => {
    if (v === "creator") setSelectedCreator(data);
    if (v === "product") setSelectedProduct(data);
    setView(v);
    setCartOpen(false);
  }, []);

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(p => {
      const creator = CREATORS.find(c => c.id === p.creator);
      if (selectedNiche !== "All" && creator.niche !== selectedNiche) return false;
      if (selectedCity !== "All" && creator.city !== selectedCity) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) ||
          creator.name.toLowerCase().includes(q) || creator.niche.toLowerCase().includes(q);
      }
      return true;
    });
  }, [selectedNiche, selectedCity, searchQuery]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--qk-cream)", position: "relative" }}>
      <style>{globalStyles}</style>

      {/* NOTIFICATION TOAST */}
      {notification && (
        <div style={{
          position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", zIndex: 9999,
          background: "var(--qk-black)", color: "white", padding: "12px 24px", borderRadius: 100,
          fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 8,
          animation: "scaleIn 0.3s ease-out", boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
        }}>
          <Icons.Check /> {notification}
        </div>
      )}

      {/* NAVIGATION BAR */}
      {view !== "dashboard" && (
        <nav style={{
          position: "sticky", top: 0, zIndex: 100, background: "rgba(245,240,232,0.85)",
          backdropFilter: "blur(20px)", borderBottom: "1px solid var(--qk-border)",
          padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {view !== "home" && (
              <button onClick={() => view === "product" ? (selectedCreator ? navigateTo("creator", selectedCreator) : navigateTo("home")) : navigateTo("home")}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex" }}>
                <Icons.Back />
              </button>
            )}
            <div onClick={() => navigateTo("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
              {/* Q icon — matches logo: dark circle with red sweep bottom-left */}
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2C7.373 2 2 7.373 2 14C2 20.627 7.373 26 14 26C20.627 26 26 20.627 26 14C26 7.373 20.627 2 14 2Z" fill="#1a1a1a"/>
                <path d="M14 2C10.5 2 7.4 3.6 5.3 6.1L14 14L20.8 20.8C23.9 18.7 26 15.6 26 14C26 7.373 20.627 2 14 2Z" fill="#1a1a1a"/>
                <path d="M5.3 6.1C3.3 8.2 2 11 2 14C2 17.5 3.5 20.6 5.9 22.8L14 14L5.3 6.1Z" fill="#c0272d"/>
                <circle cx="14" cy="14" r="6" fill="white"/>
                <path d="M18 18L22 23" stroke="#c0272d" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.3px", color: "#1a1a1a" }}>
                Qrated<span style={{ color: "#c0272d" }}>kart</span>
              </span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => navigateTo("dashboard")} style={{
              background: "none", border: "1px solid var(--qk-border)", borderRadius: 8,
              padding: "7px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600,
              display: "flex", alignItems: "center", gap: 6, color: "var(--qk-text-muted)",
              transition: "all 0.2s"
            }}>
              <Icons.Dashboard /> Creator Studio
            </button>
            <button onClick={() => setCartOpen(!cartOpen)} style={{
              background: "var(--qk-black)", color: "white", border: "none", borderRadius: 100,
              width: 42, height: 42, cursor: "pointer", display: "flex", alignItems: "center",
              justifyContent: "center", position: "relative", transition: "transform 0.2s"
            }}>
              <Icons.Cart />
              {cartCount > 0 && (
                <span style={{
                  position: "absolute", top: -4, right: -4, background: "var(--qk-accent)",
                  borderRadius: 100, width: 20, height: 20, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 11, fontWeight: 800,
                  animation: "cartBounce 0.4s ease-out"
                }}>{cartCount}</span>
              )}
            </button>
          </div>
        </nav>
      )}

      {/* CART DRAWER */}
      {cartOpen && (
        <div style={{
          position: "fixed", top: 0, right: 0, bottom: 0, width: "min(420px, 90vw)", zIndex: 200,
          background: "white", boxShadow: "-8px 0 40px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column",
          animation: "fadeIn 0.2s ease-out"
        }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--qk-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: 18, fontWeight: 700 }}>Your Cart ({cartCount})</h3>
            <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Icons.X /></button>
          </div>
          <div style={{ flex: 1, overflow: "auto", padding: 20 }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--qk-text-muted)" }}>
                <p style={{ fontSize: 40, marginBottom: 12 }}>🛒</p>
                <p style={{ fontWeight: 600 }}>Your cart is empty</p>
                <p style={{ fontSize: 13, marginTop: 4 }}>Discover unique merch from Indian creators</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {cart.map((item, idx) => (
                  <div key={idx} style={{
                    display: "flex", gap: 14, padding: 14, background: "var(--qk-cream)",
                    borderRadius: "var(--qk-radius)", position: "relative"
                  }}>
                    <div style={{
                      width: 72, height: 72, borderRadius: "var(--qk-radius-sm)", background: item.colorHex,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0
                    }}>{item.product.img}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{item.product.name}</p>
                      <p style={{ fontSize: 12, color: "var(--qk-text-muted)" }}>{item.product.type} · {item.size} · {item.color}</p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <button onClick={() => updateQty(idx, -1)} style={{
                            width: 26, height: 26, borderRadius: 6, border: "1px solid var(--qk-border)",
                            background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
                          }}><Icons.Minus /></button>
                          <span style={{ fontWeight: 700, fontSize: 14, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                          <button onClick={() => updateQty(idx, 1)} style={{
                            width: 26, height: 26, borderRadius: 6, border: "1px solid var(--qk-border)",
                            background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
                          }}><Icons.Plus /></button>
                        </div>
                        <span style={{ fontWeight: 800, fontSize: 15 }}>₹{(item.product.price * item.qty).toLocaleString()}</span>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(idx)} style={{
                      position: "absolute", top: 8, right: 8, background: "none", border: "none",
                      cursor: "pointer", opacity: 0.4, fontSize: 12
                    }}><Icons.X /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {cart.length > 0 && (
            <div style={{ padding: 20, borderTop: "1px solid var(--qk-border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ fontSize: 15, color: "var(--qk-text-muted)" }}>Subtotal</span>
                <span style={{ fontSize: 20, fontWeight: 800 }}>₹{cartTotal.toLocaleString()}</span>
              </div>
              <button onClick={() => { setCartOpen(false); navigateTo("checkout"); }} style={{
                width: "100%", padding: "14px 0", background: "var(--qk-accent)", color: "white",
                border: "none", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer",
                transition: "background 0.2s"
              }}>
                Proceed to Checkout →
              </button>
              <p style={{ fontSize: 11, color: "var(--qk-text-muted)", textAlign: "center", marginTop: 8 }}>
                Free shipping on orders above ₹999
              </p>
            </div>
          )}
        </div>
      )}
      {cartOpen && (
        <div onClick={() => setCartOpen(false)} style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.3)",
          zIndex: 199, backdropFilter: "blur(4px)"
        }} />
      )}

      {/* ===== VIEWS ===== */}
      {view === "home" && <HomeView {...{ filteredProducts, searchQuery, setSearchQuery, selectedNiche, setSelectedNiche, selectedCity, setSelectedCity, navigateTo }} />}
      {view === "creator" && selectedCreator && <CreatorView creator={selectedCreator} navigateTo={navigateTo} />}
      {view === "product" && selectedProduct && <ProductView product={selectedProduct} addToCart={addToCart} navigateTo={navigateTo} />}
      {view === "checkout" && <CheckoutView cart={cart} cartTotal={cartTotal} setCart={setCart} navigateTo={navigateTo} checkoutDone={checkoutDone} setCheckoutDone={setCheckoutDone} />}
      {view === "dashboard" && <DashboardView navigateTo={navigateTo} dashboardTab={dashboardTab} setDashboardTab={setDashboardTab} />}
    </div>
  );
}

// ============================================================
// HOME / DISCOVERY VIEW
// ============================================================
function HomeView({ filteredProducts, searchQuery, setSearchQuery, selectedNiche, setSelectedNiche, selectedCity, setSelectedCity, navigateTo }) {
  const featuredCreators = CREATORS.slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        padding: "60px 24px 48px", textAlign: "center",
        background: "linear-gradient(180deg, var(--qk-cream) 0%, #ede6db 100%)"
      }}>
        <div className="fade-in" style={{ maxWidth: 680, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, color: "var(--qk-accent)",
            letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
            Discover · Support · Wear
          </p>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-2px", marginBottom: 16 }}>
            Merch by India's<br />
            <span style={{ color: "var(--qk-accent)" }}>most original</span> creators
          </h1>
          <p style={{ fontSize: 17, color: "var(--qk-text-muted)", maxWidth: 460, margin: "0 auto 32px", lineHeight: 1.5 }}>
            From anime artists in Hyderabad to fitness coaches in Jaipur. 
            Every purchase supports an independent Indian creator.
          </p>
          {/* Search */}
          <div style={{
            maxWidth: 520, margin: "0 auto", background: "white", borderRadius: 14,
            padding: "4px 6px", display: "flex", alignItems: "center",
            border: "2px solid transparent", boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            transition: "border 0.2s"
          }}>
            <div style={{ padding: "0 12px", display: "flex", color: "var(--qk-text-muted)" }}><Icons.Search /></div>
            <input
              type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search creators, designs, niches..."
              style={{
                flex: 1, border: "none", outline: "none", padding: "14px 0", fontSize: 15,
                background: "transparent", color: "var(--qk-text)"
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Filters */}
        <div className="fade-in stagger-1" style={{ padding: "28px 0 8px", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--qk-text-muted)", textTransform: "uppercase", letterSpacing: 1.5, marginRight: 4 }}>Niche</span>
            {["All", ...NICHES].map(n => (
              <button key={n} onClick={() => setSelectedNiche(n)} style={{
                padding: "6px 16px", borderRadius: 100, border: "1.5px solid",
                borderColor: selectedNiche === n ? "var(--qk-accent)" : "var(--qk-border)",
                background: selectedNiche === n ? "var(--qk-accent)" : "transparent",
                color: selectedNiche === n ? "white" : "var(--qk-text-muted)",
                fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
                whiteSpace: "nowrap"
              }}>{n}</button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--qk-text-muted)", textTransform: "uppercase", letterSpacing: 1.5, marginRight: 4 }}>City</span>
            {["All", ...CITIES].map(c => (
              <button key={c} onClick={() => setSelectedCity(c)} style={{
                padding: "6px 14px", borderRadius: 100, border: "1.5px solid",
                borderColor: selectedCity === c ? "var(--qk-black)" : "var(--qk-border)",
                background: selectedCity === c ? "var(--qk-black)" : "transparent",
                color: selectedCity === c ? "white" : "var(--qk-text-muted)",
                fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
                whiteSpace: "nowrap"
              }}>{c}</button>
            ))}
          </div>
        </div>

        {/* Featured Creators Horizontal Scroll */}
        <div className="fade-in stagger-2" style={{ padding: "24px 0" }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16, letterSpacing: "-0.5px" }}>Featured Creators</h2>
          <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 8, scrollSnapType: "x mandatory" }}>
            {featuredCreators.map((creator, i) => (
              <div key={creator.id} onClick={() => navigateTo("creator", creator)}
                className={`fade-in stagger-${i + 1}`}
                style={{
                  flexShrink: 0, width: 200, padding: 18, borderRadius: "var(--qk-radius-lg)",
                  background: creator.theme.bg, color: creator.theme.text, cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s", scrollSnapAlign: "start",
                  border: `1px solid ${creator.theme.primary}22`
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${creator.theme.primary}33`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ fontSize: 36, marginBottom: 12 }}>{creator.avatar}</div>
                <p style={{ fontWeight: 800, fontSize: 15, marginBottom: 2 }}>{creator.name}</p>
                <p style={{ fontSize: 12, opacity: 0.7 }}>{creator.city} · {creator.niche}</p>
                <div style={{
                  marginTop: 12, padding: "4px 10px", background: `${creator.theme.primary}22`,
                  borderRadius: 100, display: "inline-block", fontSize: 11, fontWeight: 700,
                  color: creator.theme.primary
                }}>
                  {creator.followers.toLocaleString()} followers
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div style={{ padding: "16px 0 60px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px" }}>
              {searchQuery || selectedNiche !== "All" || selectedCity !== "All"
                ? `${filteredProducts.length} products found`
                : "Trending Now"}
            </h2>
          </div>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 18
          }}>
            {filteredProducts.slice(0, 24).map((product, i) => {
              const creator = CREATORS.find(c => c.id === product.creator);
              return (
                <div key={product.id}
                  className={`fade-in stagger-${(i % 6) + 1}`}
                  onClick={() => { setSelectedCreator(creator); navigateTo("product", product); }}
                  style={{
                    background: "white", borderRadius: "var(--qk-radius)", overflow: "hidden",
                    cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s",
                    border: "1px solid var(--qk-border)"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ overflow: "hidden", borderRadius: "var(--qk-radius) var(--qk-radius) 0 0" }}>
                    <ProductThumbnail product={product} creator={creator} size={220} />
                  </div>
                  <div style={{ padding: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                      <span style={{ fontSize: 16 }}>{creator.avatar}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "var(--qk-text-muted)" }}>{creator.name}</span>
                    </div>
                    <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, letterSpacing: "-0.3px" }}>{product.name}</p>
                    <p style={{ fontSize: 12, color: "var(--qk-text-muted)", marginBottom: 10, lineHeight: 1.4 }}>{product.desc}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: 800, fontSize: 17 }}>₹{product.price}</span>
                      <span style={{ fontSize: 11, color: "var(--qk-text-muted)" }}>{product.sales} sold</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CREATOR STOREFRONT VIEW
// ============================================================
function CreatorView({ creator, navigateTo }) {
  const products = ALL_PRODUCTS.filter(p => p.creator === creator.id);
  const totalSales = products.reduce((s, p) => s + p.sales, 0);

  return (
    <div>
      {/* Creator Hero */}
      <div style={{
        background: creator.theme.bg, color: creator.theme.text, padding: "60px 24px 48px",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: -100, right: -100, width: 400, height: 400,
          borderRadius: "50%", background: `${creator.theme.primary}15`
        }} />
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative" }}>
          <div className="fade-in" style={{ display: "flex", alignItems: "flex-start", gap: 24 }}>
            <div style={{
              width: 80, height: 80, borderRadius: 20, background: `${creator.theme.primary}22`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 42, flexShrink: 0,
              border: `2px solid ${creator.theme.primary}44`
            }}>{creator.avatar}</div>
            <div>
              <p style={{
                fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: creator.theme.primary,
                letterSpacing: 2, textTransform: "uppercase", marginBottom: 6
              }}>{creator.niche} · {creator.city}</p>
              <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-1px", marginBottom: 8 }}>{creator.name}</h1>
              <p style={{ fontSize: 15, opacity: 0.8, lineHeight: 1.6, maxWidth: 500 }}>{creator.bio}</p>
              <div style={{ display: "flex", gap: 16, marginTop: 16, alignItems: "center" }}>
                {creator.social.instagram && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6, opacity: 0.7, fontSize: 13 }}>
                    <Icons.Instagram /> @{creator.social.instagram}
                  </div>
                )}
                {creator.social.youtube && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6, opacity: 0.7, fontSize: 13 }}>
                    <Icons.Youtube /> {creator.social.youtube}
                  </div>
                )}
                <span style={{
                  padding: "4px 12px", background: `${creator.theme.primary}22`, borderRadius: 100,
                  fontSize: 12, fontWeight: 700, color: creator.theme.primary
                }}>{creator.followers.toLocaleString()} followers</span>
              </div>
            </div>
          </div>
          <div className="fade-in stagger-2" style={{
            display: "flex", gap: 24, marginTop: 32, paddingTop: 24,
            borderTop: `1px solid ${creator.theme.primary}22`
          }}>
            <div>
              <p style={{ fontWeight: 800, fontSize: 24 }}>{products.length}</p>
              <p style={{ fontSize: 12, opacity: 0.6 }}>Products</p>
            </div>
            <div>
              <p style={{ fontWeight: 800, fontSize: 24 }}>{totalSales}</p>
              <p style={{ fontSize: 12, opacity: 0.6 }}>Total Sales</p>
            </div>
            <div>
              <p style={{ fontWeight: 800, fontSize: 24 }}>{new Set(products.map(p => p.type)).size}</p>
              <p style={{ fontSize: 12, opacity: 0.6 }}>Product Types</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subdomain bar */}
      <div style={{
        background: "white", padding: "10px 24px", borderBottom: "1px solid var(--qk-border)",
        display: "flex", justifyContent: "center"
      }}>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 12, padding: "4px 16px",
          background: "var(--qk-cream)", borderRadius: 6, color: "var(--qk-text-muted)"
        }}>
          🔗 {creator.id}.qratedkart.com
        </div>
      </div>

      {/* Products */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px 60px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 24, letterSpacing: "-0.5px" }}>Shop {creator.name}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 18 }}>
          {products.map((product, i) => (
            <div key={product.id}
              className={`fade-in stagger-${(i % 6) + 1}`}
              onClick={() => navigateTo("product", product)}
              style={{
                background: "white", borderRadius: "var(--qk-radius)", overflow: "hidden",
                cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s",
                border: "1px solid var(--qk-border)"
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ borderRadius: "var(--qk-radius) var(--qk-radius) 0 0", overflow: "hidden" }}>
                <ProductThumbnail product={product} creator={creator} size={200} />
              </div>
              <div style={{ padding: 14 }}>
                <p style={{ fontSize: 11, color: "var(--qk-text-muted)", marginBottom: 4 }}>{product.type}</p>
                <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{product.name}</p>
                <p style={{ fontSize: 12, color: "var(--qk-text-muted)", marginBottom: 8 }}>{product.desc}</p>
                <span style={{ fontWeight: 800, fontSize: 17 }}>₹{product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PRODUCT DETAIL VIEW
// ============================================================
function ProductView({ product, addToCart, navigateTo }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[Math.min(2, product.sizes.length - 1)]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const creator = CREATORS.find(c => c.id === product.creator);

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px 60px" }}>
      <div className="fade-in" style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
        {/* Product Image */}
        <div style={{ flex: "1 1 380px" }}>
          <div style={{
            aspectRatio: "1", borderRadius: "var(--qk-radius-lg)", overflow: "hidden",
            background: product.mockup ? "#e8e4dd" : `linear-gradient(145deg, ${creator.theme.bg}, ${creator.theme.primary}33)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: product.mockup ? "inherit" : 120,
            position: "relative"
          }}>
            {product.mockup === "chai"
              ? <ChaiMockup bgColor={product.colors?.[0]?.hex || "#111"} size={340} />
              : product.img}
            <div style={{
              position: "absolute", bottom: 16, left: 16, right: 16, display: "flex", gap: 6
            }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{
                  flex: 1, height: 56, borderRadius: 8, background: `${creator.theme.primary}${i === 1 ? '33' : '11'}`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
                  border: i === 1 ? `2px solid ${creator.theme.primary}` : "2px solid transparent",
                  cursor: "pointer"
                }}>{product.img}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div style={{ flex: "1 1 360px" }}>
          <div onClick={() => navigateTo("creator", creator)} style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px 6px 8px",
            background: "var(--qk-cream)", borderRadius: 100, cursor: "pointer", marginBottom: 16,
            border: "1px solid var(--qk-border)", transition: "background 0.2s"
          }}>
            <span style={{ fontSize: 22 }}>{creator.avatar}</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{creator.name}</span>
            <span style={{ fontSize: 11, color: "var(--qk-text-muted)" }}>· {creator.city}</span>
          </div>

          <h1 style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-1px", marginBottom: 6 }}>{product.name}</h1>
          <p style={{ fontSize: 15, color: "var(--qk-text-muted)", marginBottom: 4 }}>{product.type}</p>
          <p style={{ fontSize: 15, color: "var(--qk-text-muted)", lineHeight: 1.5, marginBottom: 20 }}>{product.desc}</p>

          <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 24 }}>
            ₹{product.price}
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--qk-text-muted)", marginLeft: 8 }}>incl. taxes</span>
          </div>

          {/* Color Selection */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Color — {selectedColor.name}</p>
            <div style={{ display: "flex", gap: 8 }}>
              {product.colors.map(c => (
                <button key={c.name} onClick={() => setSelectedColor(c)} style={{
                  width: 36, height: 36, borderRadius: 10, background: c.hex, border: "3px solid",
                  borderColor: selectedColor.name === c.name ? "var(--qk-accent)" : "var(--qk-border)",
                  cursor: "pointer", transition: "border-color 0.2s",
                  boxShadow: selectedColor.name === c.name ? "0 0 0 2px var(--qk-accent)" : "none"
                }} />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Size — {selectedSize}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {product.sizes.map(s => (
                <button key={s} onClick={() => setSelectedSize(s)} style={{
                  padding: "8px 18px", borderRadius: 8, border: "2px solid",
                  borderColor: selectedSize === s ? "var(--qk-black)" : "var(--qk-border)",
                  background: selectedSize === s ? "var(--qk-black)" : "transparent",
                  color: selectedSize === s ? "white" : "var(--qk-text)",
                  fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s"
                }}>{s}</button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button onClick={() => addToCart(product, selectedSize, selectedColor)} style={{
            width: "100%", padding: "16px 0", background: "var(--qk-accent)", color: "white",
            border: "none", borderRadius: 12, fontWeight: 800, fontSize: 16, cursor: "pointer",
            transition: "background 0.2s, transform 0.1s", letterSpacing: "-0.3px"
          }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.98)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Add to Cart — ₹{product.price}
          </button>

          {/* Delivery & Trust */}
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: <Icons.Truck />, text: "Free delivery on orders above ₹999" },
              { icon: <Icons.Package />, text: "Printed & shipped within 5-7 business days" },
              { icon: <Icons.Star />, text: "Premium quality printing — satisfaction guaranteed" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--qk-text-muted)" }}>
                {item.icon} {item.text}
              </div>
            ))}
          </div>

          {/* Creator Badge */}
          <div style={{
            marginTop: 24, padding: 16, background: "var(--qk-cream)", borderRadius: "var(--qk-radius)",
            border: "1px solid var(--qk-border)"
          }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--qk-accent)", marginBottom: 6 }}>CREATOR EARNINGS</p>
            <p style={{ fontSize: 13, color: "var(--qk-text-muted)", lineHeight: 1.5 }}>
              ₹{Math.round((product.price - product.baseCost) * 0.4)} from this purchase goes directly to <strong>{creator.name}</strong>. 
              You're supporting an independent Indian creator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CHECKOUT VIEW
// ============================================================
function CheckoutView({ cart, cartTotal, setCart, navigateTo, checkoutDone, setCheckoutDone }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", pincode: "" });

  if (checkoutDone) {
    return (
      <div style={{ maxWidth: 500, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <div className="scale-in" style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
        <h2 className="fade-in stagger-1" style={{ fontSize: 28, fontWeight: 900, marginBottom: 8 }}>Order Placed!</h2>
        <p className="fade-in stagger-2" style={{ color: "var(--qk-text-muted)", marginBottom: 24, lineHeight: 1.6 }}>
          Thank you for supporting Indian creators. Your merch is being printed and will ship within 5-7 business days.
        </p>
        <p className="fade-in stagger-3" style={{
          fontFamily: "var(--font-mono)", fontSize: 13, padding: "8px 20px",
          background: "var(--qk-cream)", borderRadius: 8, display: "inline-block", marginBottom: 32
        }}>
          Order #QK{Math.floor(Math.random() * 90000 + 10000)}
        </p>
        <br />
        <button onClick={() => { setCheckoutDone(false); navigateTo("home"); }} style={{
          padding: "14px 32px", background: "var(--qk-accent)", color: "white", border: "none",
          borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 15
        }}>Continue Discovering →</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 60px" }}>
      <h2 className="fade-in" style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-1px", marginBottom: 32 }}>Checkout</h2>
      <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
        {/* Form */}
        <div className="fade-in stagger-1" style={{ flex: "1 1 360px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { key: "name", label: "Full Name", placeholder: "Rahul Sharma", type: "text" },
              { key: "email", label: "Email", placeholder: "rahul@email.com", type: "email" },
              { key: "phone", label: "Phone", placeholder: "+91 98765 43210", type: "tel" },
              { key: "address", label: "Address", placeholder: "123, 4th Cross, Koramangala", type: "text" },
              { key: "city", label: "City", placeholder: "Bangalore", type: "text" },
              { key: "pincode", label: "Pincode", placeholder: "560034", type: "text" },
            ].map(f => (
              <div key={f.key}>
                <label style={{ fontSize: 12, fontWeight: 700, color: "var(--qk-text-muted)", display: "block", marginBottom: 6 }}>{f.label}</label>
                <input type={f.type} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  style={{
                    width: "100%", padding: "12px 14px", border: "2px solid var(--qk-border)", borderRadius: 10,
                    fontSize: 14, outline: "none", transition: "border-color 0.2s", background: "white"
                  }}
                  onFocus={e => e.target.style.borderColor = "var(--qk-accent)"}
                  onBlur={e => e.target.style.borderColor = "var(--qk-border)"}
                />
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, padding: 16, background: "var(--qk-cream)", borderRadius: "var(--qk-radius)", border: "1px solid var(--qk-border)" }}>
            <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Payment Method</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["UPI", "Credit Card", "Debit Card", "Net Banking"].map(m => (
                <span key={m} style={{
                  padding: "6px 14px", background: "white", borderRadius: 8,
                  fontSize: 12, fontWeight: 600, border: "1px solid var(--qk-border)"
                }}>{m}</span>
              ))}
            </div>
            <p style={{ fontSize: 11, color: "var(--qk-text-muted)", marginTop: 8 }}>
              Secured by Razorpay · All payment modes supported
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="fade-in stagger-2" style={{
          flex: "1 1 300px", background: "white", borderRadius: "var(--qk-radius-lg)",
          padding: 24, height: "fit-content", border: "1px solid var(--qk-border)",
          position: "sticky", top: 88
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>Order Summary</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
            {cart.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <span style={{ color: "var(--qk-text-muted)" }}>{item.product.name} × {item.qty}</span>
                <span style={{ fontWeight: 700 }}>₹{(item.product.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid var(--qk-border)", paddingTop: 12, marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
              <span style={{ color: "var(--qk-text-muted)" }}>Shipping</span>
              <span style={{ fontWeight: 600, color: cartTotal >= 999 ? "var(--qk-success)" : "var(--qk-text)" }}>
                {cartTotal >= 999 ? "FREE" : "₹79"}
              </span>
            </div>
          </div>
          <div style={{ borderTop: "2px solid var(--qk-black)", paddingTop: 12, display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
            <span style={{ fontWeight: 800 }}>Total</span>
            <span style={{ fontWeight: 900, fontSize: 22 }}>₹{(cartTotal + (cartTotal >= 999 ? 0 : 79)).toLocaleString()}</span>
          </div>
          <button onClick={() => { setCheckoutDone(true); setCart([]); }} style={{
            width: "100%", padding: "14px 0", background: "var(--qk-accent)", color: "white",
            border: "none", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer",
            transition: "background 0.2s"
          }}>
            Pay ₹{(cartTotal + (cartTotal >= 999 ? 0 : 79)).toLocaleString()} →
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CREATOR DASHBOARD VIEW
// ============================================================
function DashboardView({ navigateTo, dashboardTab, setDashboardTab }) {
  const creator = CREATORS[0]; // Demo as Art by Neha
  const products = ALL_PRODUCTS.filter(p => p.creator === creator.id);
  const totalRevenue = products.reduce((s, p) => s + (p.price * p.sales), 0);
  const totalEarnings = products.reduce((s, p) => s + ((p.price - p.baseCost) * 0.4 * p.sales), 0);
  const totalOrders = products.reduce((s, p) => s + p.sales, 0);

  const recentOrders = [
    { id: "QK38291", product: "Ramayana Remix (Oversized Tee)", size: "L", date: "2 hours ago", status: "printing", amount: 849 },
    { id: "QK38284", product: "Devi Unleashed (Round Neck Tee)", size: "M", date: "5 hours ago", status: "shipped", amount: 699 },
    { id: "QK38270", product: "Hanuman Ultra (Hoodie)", size: "XL", date: "1 day ago", status: "delivered", amount: 1449 },
    { id: "QK38255", product: "Ramayana Remix (Mug)", size: "One Size", date: "2 days ago", status: "delivered", amount: 349 },
    { id: "QK38241", product: "Devi Unleashed (Tote Bag)", size: "One Size", date: "3 days ago", status: "delivered", amount: 449 },
  ];

  const statusColors = {
    printing: { bg: "#fef3cd", text: "#856404" },
    shipped: { bg: "#cce5ff", text: "#004085" },
    delivered: { bg: "#d4edda", text: "#155724" },
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{
        width: 240, background: "var(--qk-black)", color: "white", padding: "20px 0",
        display: "flex", flexDirection: "column", flexShrink: 0
      }}>
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #222" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2C7.373 2 2 7.373 2 14C2 20.627 7.373 26 14 26C20.627 26 26 20.627 26 14C26 7.373 20.627 2 14 2Z" fill="#fff"/>
              <path d="M5.3 6.1C3.3 8.2 2 11 2 14C2 17.5 3.5 20.6 5.9 22.8L14 14L5.3 6.1Z" fill="#c0272d"/>
              <circle cx="14" cy="14" r="6" fill="#1a1a1a"/>
              <path d="M18 18L22 23" stroke="#c0272d" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <span style={{ fontWeight: 800, fontSize: 14 }}>Qrated<span style={{ color: "#c0272d" }}>kart</span></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 28 }}>{creator.avatar}</span>
            <div>
              <p style={{ fontWeight: 700, fontSize: 13 }}>{creator.name}</p>
              <p style={{ fontSize: 11, opacity: 0.5 }}>{creator.id}.qratedkart.com</p>
            </div>
          </div>
        </div>
        <div style={{ padding: "12px 8px", flex: 1 }}>
          {[
            { key: "overview", icon: <Icons.Dashboard />, label: "Overview" },
            { key: "products", icon: <Icons.Package />, label: "Products" },
            { key: "orders", icon: <Icons.Truck />, label: "Orders" },
            { key: "storefront", icon: <Icons.Eye />, label: "My Storefront" },
          ].map(tab => (
            <button key={tab.key} onClick={() => setDashboardTab(tab.key)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
              background: dashboardTab === tab.key ? "#222" : "transparent",
              color: dashboardTab === tab.key ? "white" : "#888",
              border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600,
              marginBottom: 2, textAlign: "left", transition: "all 0.2s"
            }}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
        <div style={{ padding: "12px 16px", borderTop: "1px solid #222" }}>
          <button onClick={() => navigateTo("home")} style={{
            width: "100%", padding: "10px", background: "#222", color: "#aaa", border: "none",
            borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600
          }}>← Back to Qratedkart</button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, background: "#f8f6f2", padding: 32, overflow: "auto" }}>
        {/* Overview Tab */}
        {dashboardTab === "overview" && (
          <div>
            <h2 className="fade-in" style={{ fontSize: 24, fontWeight: 900, marginBottom: 4, letterSpacing: "-0.5px" }}>
              Welcome back, Neha 👋
            </h2>
            <p className="fade-in stagger-1" style={{ color: "var(--qk-text-muted)", marginBottom: 28 }}>
              Here's how your store is performing
            </p>

            {/* Stats Grid */}
            <div className="fade-in stagger-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
              {[
                { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: <Icons.Rupee />, color: "#c0272d" },
                { label: "Your Earnings", value: `₹${Math.round(totalEarnings).toLocaleString()}`, icon: <Icons.TrendUp />, color: "#2d9c5a" },
                { label: "Total Orders", value: totalOrders.toString(), icon: <Icons.Package />, color: "#0984e3" },
                { label: "Products", value: products.length.toString(), icon: <Icons.Sparkle />, color: "#6c5ce7" },
              ].map((stat, i) => (
                <div key={i} style={{
                  background: "white", padding: 20, borderRadius: "var(--qk-radius)",
                  border: "1px solid var(--qk-border)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: "var(--qk-text-muted)", textTransform: "uppercase", letterSpacing: 1 }}>{stat.label}</p>
                    <div style={{ color: stat.color }}>{stat.icon}</div>
                  </div>
                  <p style={{ fontSize: 28, fontWeight: 900, color: stat.color, letterSpacing: "-1px" }}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="fade-in stagger-3" style={{
              background: "white", borderRadius: "var(--qk-radius)", border: "1px solid var(--qk-border)",
              overflow: "hidden"
            }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--qk-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: 16, fontWeight: 800 }}>Recent Orders</h3>
                <button onClick={() => setDashboardTab("orders")} style={{
                  background: "none", border: "none", cursor: "pointer", fontSize: 13,
                  color: "var(--qk-accent)", fontWeight: 600
                }}>View all →</button>
              </div>
              <div style={{ overflow: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: "var(--qk-cream)" }}>
                      {["Order ID", "Product", "Size", "Amount", "Status", "Time"].map(h => (
                        <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontWeight: 700, fontSize: 11, color: "var(--qk-text-muted)", textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map(order => (
                      <tr key={order.id} style={{ borderBottom: "1px solid var(--qk-border)" }}>
                        <td style={{ padding: "12px 16px", fontFamily: "var(--font-mono)", fontSize: 12 }}>{order.id}</td>
                        <td style={{ padding: "12px 16px", fontWeight: 600 }}>{order.product}</td>
                        <td style={{ padding: "12px 16px" }}>{order.size}</td>
                        <td style={{ padding: "12px 16px", fontWeight: 700 }}>₹{order.amount}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{
                            padding: "3px 10px", borderRadius: 100, fontSize: 11, fontWeight: 700,
                            background: statusColors[order.status].bg, color: statusColors[order.status].text,
                            textTransform: "capitalize"
                          }}>{order.status}</span>
                        </td>
                        <td style={{ padding: "12px 16px", color: "var(--qk-text-muted)", fontSize: 12 }}>{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Products */}
            <div className="fade-in stagger-4" style={{
              background: "white", borderRadius: "var(--qk-radius)", border: "1px solid var(--qk-border)",
              padding: 20, marginTop: 20
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>Top Performing Products</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {products.sort((a, b) => b.sales - a.sales).slice(0, 5).map((p, i) => (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{
                      width: 28, height: 28, borderRadius: 8, background: "var(--qk-cream)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, fontWeight: 800, color: "var(--qk-text-muted)"
                    }}>{i + 1}</span>
                    <span style={{ fontSize: 24 }}>{p.img}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</p>
                      <p style={{ fontSize: 12, color: "var(--qk-text-muted)" }}>{p.type} · ₹{p.price}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontWeight: 800, fontSize: 14 }}>{p.sales} sold</p>
                      <p style={{ fontSize: 12, color: "var(--qk-success)" }}>₹{(p.sales * (p.price - p.baseCost) * 0.4).toLocaleString()} earned</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {dashboardTab === "products" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.5px" }}>Your Products</h2>
              <button style={{
                padding: "10px 20px", background: "var(--qk-accent)", color: "white", border: "none",
                borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6
              }}><Icons.Plus /> New Product</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {products.map(p => (
                <div key={p.id} style={{
                  background: "white", borderRadius: "var(--qk-radius)", padding: 16,
                  border: "1px solid var(--qk-border)", display: "flex", gap: 14
                }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: 10, flexShrink: 0,
                    background: `linear-gradient(135deg, ${creator.theme.bg}, ${creator.theme.primary}33)`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28
                  }}>{p.img}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</p>
                    <p style={{ fontSize: 12, color: "var(--qk-text-muted)" }}>{p.type}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                      <span style={{ fontWeight: 800, fontSize: 15 }}>₹{p.price}</span>
                      <span style={{ fontSize: 12, color: "var(--qk-text-muted)" }}>{p.sales} sold</span>
                    </div>
                  </div>
                </div>
              ))}
              {/* Add New Product Card */}
              <div style={{
                background: "var(--qk-cream)", borderRadius: "var(--qk-radius)", padding: 24,
                border: "2px dashed var(--qk-border)", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", cursor: "pointer", minHeight: 120,
                transition: "border-color 0.2s"
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14, background: "white",
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8,
                  color: "var(--qk-accent)"
                }}><Icons.Upload /></div>
                <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>Create New Product</p>
                <p style={{ fontSize: 12, color: "var(--qk-text-muted)" }}>Upload design → Pick product → Set price</p>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {dashboardTab === "orders" && (
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24, letterSpacing: "-0.5px" }}>All Orders</h2>
            <div style={{
              background: "white", borderRadius: "var(--qk-radius)", border: "1px solid var(--qk-border)",
              overflow: "hidden"
            }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "var(--qk-cream)" }}>
                    {["Order ID", "Product", "Size", "Amount", "Your Earnings", "Status", "Time"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, fontSize: 11, color: "var(--qk-text-muted)", textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id} style={{ borderBottom: "1px solid var(--qk-border)" }}>
                      <td style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", fontSize: 12 }}>{order.id}</td>
                      <td style={{ padding: "14px 16px", fontWeight: 600 }}>{order.product}</td>
                      <td style={{ padding: "14px 16px" }}>{order.size}</td>
                      <td style={{ padding: "14px 16px", fontWeight: 700 }}>₹{order.amount}</td>
                      <td style={{ padding: "14px 16px", fontWeight: 700, color: "var(--qk-success)" }}>₹{Math.round(order.amount * 0.25)}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{
                          padding: "3px 10px", borderRadius: 100, fontSize: 11, fontWeight: 700,
                          background: statusColors[order.status].bg, color: statusColors[order.status].text,
                          textTransform: "capitalize"
                        }}>{order.status}</span>
                      </td>
                      <td style={{ padding: "14px 16px", color: "var(--qk-text-muted)", fontSize: 12 }}>{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Storefront Preview Tab */}
        {dashboardTab === "storefront" && (
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8, letterSpacing: "-0.5px" }}>Your Storefront</h2>
            <p style={{ color: "var(--qk-text-muted)", marginBottom: 24 }}>
              This is how buyers see your store at <strong>{creator.id}.qratedkart.com</strong>
            </p>

            <div style={{
              background: "white", borderRadius: "var(--qk-radius-lg)", border: "1px solid var(--qk-border)",
              overflow: "hidden"
            }}>
              {/* Fake browser chrome */}
              <div style={{ padding: "10px 16px", background: "#f0f0f0", borderBottom: "1px solid #ddd", display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
                </div>
                <div style={{
                  flex: 1, padding: "4px 12px", background: "white", borderRadius: 6,
                  fontSize: 12, color: "#666", fontFamily: "var(--font-mono)"
                }}>🔒 {creator.id}.qratedkart.com</div>
              </div>
              {/* Mini storefront preview */}
              <div style={{ padding: 32, background: creator.theme.bg, color: creator.theme.text }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                  <span style={{ fontSize: 40 }}>{creator.avatar}</span>
                  <div>
                    <h3 style={{ fontSize: 22, fontWeight: 900 }}>{creator.name}</h3>
                    <p style={{ fontSize: 12, opacity: 0.7 }}>{creator.niche} · {creator.city}</p>
                  </div>
                </div>
                <p style={{ fontSize: 14, opacity: 0.8, marginBottom: 20, lineHeight: 1.5 }}>{creator.bio}</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                  {products.slice(0, 3).map(p => (
                    <div key={p.id} style={{
                      background: `${creator.theme.primary}15`, borderRadius: 12, padding: 12, textAlign: "center"
                    }}>
                      <div style={{ fontSize: 36, marginBottom: 6 }}>{p.img}</div>
                      <p style={{ fontSize: 12, fontWeight: 700 }}>{p.name}</p>
                      <p style={{ fontSize: 13, fontWeight: 800, color: creator.theme.primary, marginTop: 4 }}>₹{p.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{
              marginTop: 20, padding: 20, background: "white", borderRadius: "var(--qk-radius)",
              border: "1px solid var(--qk-border)"
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 12 }}>Customize Your Store</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { label: "Store Name", value: creator.name },
                  { label: "City", value: creator.city },
                  { label: "Niche", value: creator.niche },
                  { label: "Instagram", value: `@${creator.social.instagram}` },
                ].map(f => (
                  <div key={f.label}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "var(--qk-text-muted)", display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>{f.label}</label>
                    <input defaultValue={f.value} style={{
                      width: "100%", padding: "10px 12px", border: "2px solid var(--qk-border)",
                      borderRadius: 8, fontSize: 13, outline: "none", background: "var(--qk-cream)"
                    }} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--qk-text-muted)", display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>Bio</label>
                <textarea defaultValue={creator.bio} rows={3} style={{
                  width: "100%", padding: "10px 12px", border: "2px solid var(--qk-border)",
                  borderRadius: 8, fontSize: 13, outline: "none", resize: "vertical", background: "var(--qk-cream)",
                  fontFamily: "var(--font-display)"
                }} />
              </div>
              <div style={{ marginTop: 12 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--qk-text-muted)", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Theme Color</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {["#e84393", "#00b894", "#0984e3", "#6c5ce7", "#e17055", "#fdcb6e", "#2d3436"].map(c => (
                    <div key={c} style={{
                      width: 32, height: 32, borderRadius: 8, background: c, cursor: "pointer",
                      border: c === creator.theme.primary ? "3px solid var(--qk-black)" : "2px solid var(--qk-border)"
                    }} />
                  ))}
                </div>
              </div>
              <button style={{
                marginTop: 16, padding: "10px 24px", background: "var(--qk-accent)", color: "white",
                border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer"
              }}>Save Changes</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

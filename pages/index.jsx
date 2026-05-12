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

const CHAI_MOCKUP_IMG = "data:image/jpeg;base64,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";
const CHAI_DESIGN_IMG = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBAUEBAYFBQUGBgYHCQ4JCQgICRINDQoOFRIWFhUSFBQXGiEcFxgfGRQUHScdHyIjJSUlFhwpLCgkKyEkJST/2wBDAQYGBgkICREJCREkGBQYJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCT/wAARCAJYAeADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5VzR0oxRQAZooxRQAUZo6UUAFGaKMUAHSjNFGKADpR1ooxQAZo96KKADNHSjFFABmjpRiigA60dKMcUUAHWjNBGKKADoaM0UYoAOlHWijHFAB0o60UUAGaM5NFB4oAM0dKMUUAGaOlGKKADrRmjHFFAB1ozRR1oAKM0lLigA6UdaKMcUAHSjrRRQAZo60UUAGaOlFJQAvWjpRjiigA60ZoooAOtGaDR1oAPejNHQ0UAGcUdaKKADNHWig0AGaOlFFABmjNHFFABmjNBooAKM0lLQAfSjNFFABRmig0AGaKKKADNH0oooAM0UUUAGaM0UUAHWjNBooAKM0UUAFGaKO1ABR1oooAM0UUH2oAM0ZopKAFzRRRQAUUdqKADrRmiigBKXNJS0AGaM0lLQAUdaKKADNFFFABmkpaSgBc0ZopKAF60dKKKADrRmiigAozRRQAZo60lLQAZo60lKaACkpeKKAEopaOKAEopTRxQAlLRRxQAUUUUAJRS0UAJRS8UUAJRS8UdKACiij60AFJS0cUAJRS9elHFABSUpo4oASloo9hQAUlLRQAlLRxQaAEpaOKKAEopeKKAEopfajigBKKXrRxQAlFFLxQAlLRRQAlLRxR1oASil4o60AJS0cUlABRS0UAFFFHFABSUvWjigApKWjigApKWigBKXpRR1oAKKM0dKACkpc0dKACkpc0ZoAKKKM0AFFHSjNABSUvSjrQAlLRmjNAB1oozR0oAKKM0dKACijrR0oASil60ZoAKKOlGaACijpR1oAKKOlHWgBKKXNBPNACUtGaOlABRRmjpQAUUdaM0AFJS9aM0AJRS0ZoAKKOlHWgAoozR1oADR0ozR1oASilzRQAlLR1o6UAFFHWjNAB0oo60ZoASil96M0AFFGaOtABR0ozR1oAMUUZooAMUdqM0ZoAOlHeijNABRiijNABRiijNAB2oxRRmgAoozRQAUCjNFABiijNFABjijtRmigAIxRR1ozQAUYo6UZoAKMcUUZoAO1FFHWgAoIxRmigAxk0UZo6UAGKO1GaKADHFFFGaACjrR1ozQAlKBRRmgA7UY4oozQAUUUdaACijNFABSUuaKADFHajNFABRR1ozQAGjrR1ozQAdDRRRmgA7UUZo60AFBozR1oAMUUZooAMUUZooAKMUUZoAKMUUZoAKMUfSjNABRjiiigAAoozSUALigUZooAMUUZo+lAB2oFFFAAaAKKM0AFGKSlzQAUdqKM0AFFFFAABQaM0lAC4oozRQAYoozRQAdqKKKACjFFGaAEpcUlLmgAo7UUUAFFFFABzQaKKADFJS5pKAF7UUUUAFFFFAAaKKM0AB60UUUAFFFFABQaM0ZoAKKKSgBaKSigBTRSUUAFLSUtABRxRRQAUGkooAWikooAWikooAWgUUUAFAopKAFNFJRQAtFJRQAtHakpaACg0UlAC0HrSUUALRSUUALRSUUAL2ooxSUAKaKSigBaKSigApe1JS0AFFJS0AFFJRQAtJRRQAvaikooAU0YFFFABRxRSUAL3opKKAFoNJRQAtBpKXpQAZo6UYooAM0d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jFHWigAo7UUZoAKDRRmgAxQRig0lAC4ooo60AGKKM0UAHajFGaKAA0YozQeKACjFFFABR2oozQAYoNBozQAYoNBoFABiiigUAGKKM0UABoxRmigANGKM0UAFGKBRQAUGjtRmgAxQaKM0AFGKSloAKMUUlAC96AKKSgBaKKSgBcUUdaSgBcUHpRRQAYo60UlAC0YpKXrQAUYpKWgA7UYoooADRijpSUAL1oopKAFxR2oooAMUGiigAxQaSigBRxRikpaACjFFFAB2oxRRQAGjFFJQAtA4pKKAFxR2oooAMUGg0UAGKDQaOlABiikooAXtRiiigANGKKKAA0Yo6UUAB60dKKSgBcUGkpaADFBoo6UAFGKKSgBaKKSgBe9FJRQAtFJRQAuKKM0UAGKKKOlABRRSUALRSUtABRiiigAooooADzRR0ooAKKSigBaKKKADFFFFABQaSloAKKSigBaMUUUAFGKKKACijpSUAFLSUtABRSUtABiiiigAwKKKOlABSUtJQAvaikooAWjFFHWgANFHSigANFFFABQaSigBaOtJS0AGaM0YoxQAZozRijFAB1ozRRigA60ZpKXFABRmgZoxQAZo60YoxQAZo60YooAM0CjFFABmjpRijBoAM0Zo7UYoAM5ozQRijFAB1ozRRigAozRRjigA6UZzRg0YoAM0daMUEYoAM0UYooAM0UYoxQAZooxxRg0AFGaMUYoAKM0lLigAozRR2oAKKMGg0AFFGDRigAzRRikoAXNFGKKADNGSKDRzQAlLmg0YoAKM0UYoAKM0UYoAOlHWjrQaADNFFGKACjNFGKADrRRRigA60UUUAFFGKKACijFB6UAGaKMUd6ACiiigAzRRRigAoo7UYoAKM0GjFAB1ozRiigAozRijtQAUUYoNABmkpcUHrQAZoooxQAZoooxQAZoo7UYoAKKDRigBKXNHeigA96KMUdqACijFBoADRRig0AFJS4ooAKPejtRigAoNBoxQAUGg0YoAKKD1oxQAUZoxQaACijFBoASl60UUAFBoooASlNHU0UAFJS0UAHWkpaKACijFHagANFFHU0AFHWiigBKXrRRQAUUdqKACig0CgA60lLRQAdaKKO1ABRRQaAA0lLQaACjrRRQAUUUUAFFHaigAoPFBowKACikpaACiijtQAGijFBoADQKMCg0AFFHSkoAWijtRQAUUGigA6UUGigAFJSnrR0oAO1FFBoAKOlFBoAKKMijp2oAKKKOnagBKKWjI9KACkpaM+1ABRR07UUAFFH4UdaADrSUucdqKAEpaM+1FABRRn2o6UAFHWijp2oAOlFB5oz7UAJS0UZ9qACiij2oAKOlHA7UdaACkpc+1B5oASilz7UUAFFGfaigAoo/Cjj0oAOlJS9aM+1ACUtJS59qACijijPtQAUdKOKOtAAaOlHHpR1oAKSlz7UlAC0UZo4oAOlFHWjj0oAOlFHWjI9KACiijNACUvSjijNABR0o4o60AAoozRQAYooozQAUUdaM0AJS0daM0AGaMUc0ZoAOtHSiigA60lLmjrQAUlLmigAoozR9KACjrRRQAdKOtFGaAEpaKM0AJS0UUAFHSiigAo6UZooAKSlzRQAUUZooAKOtFFAB0opKXNACUuKKM0AJS0UUAFHSikoAXrR0o5ooAMUlLmigApKWigA6UUUcigA6UYpKXNAB0oxRRmgBKWiigBKWiigAoxRRQAYoxRRQAdKMUUUAFFFFAAKKKKADFBGKKKADFFFFABigUUUAFFFFAB2oxRRQAEYoxRRQAUYoooAKMcUUUAGKMUUUAGKCMUUUAGKKKKADFGKKKADHFGKKKADFGKKKAEpcUUUAGKO1FFABig0UUAGKMUUUAGKSiigBcUYoooADRRRQAGjFFFAB3oxRRQAUYoooAMUGiigD/2Q==";



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
function ProductThumbnail({ product, creator, size = 220 }) {
  if (product.mockup === "chai") {
    return (
      <div style={{
        width: "100%", height: size, position: "relative", overflow: "hidden",
        background: "#1a1a1a"
      }}>
        <img
          src={CHAI_MOCKUP_IMG}
          alt="My Chah My Rules tee mockup"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <span style={{
          position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.6)",
          color: "white", padding: "3px 10px", borderRadius: 100, fontSize: 11, fontWeight: 600
        }}>{product.type}</span>
        <span style={{
          position: "absolute", bottom: 8, left: 10, background: "#c0272d",
          color: "white", padding: "2px 8px", borderRadius: 100, fontSize: 10, fontWeight: 700,
          letterSpacing: 1
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
            background: product.mockup ? "#1a1a1a" : `linear-gradient(145deg, ${creator.theme.bg}, ${creator.theme.primary}33)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: product.mockup ? "inherit" : 120,
            position: "relative"
          }}>
            {product.mockup === "chai"
              ? <img src={CHAI_MOCKUP_IMG} alt="My Chah My Rules tee" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : product.img}
            <div style={{
              position: "absolute", bottom: 16, left: 16, right: 16, display: "flex", gap: 6
            }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{
                  flex: 1, height: 56, borderRadius: 8, overflow: "hidden",
                  background: product.mockup ? "#1a1a1a" : `${creator.theme.primary}${i === 1 ? '33' : '11'}`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
                  border: i === 1 ? `2px solid ${product.mockup ? "#c0272d" : creator.theme.primary}` : "2px solid transparent",
                  cursor: "pointer"
                }}>
                  {product.mockup === "chai"
                    ? <img src={i === 2 ? CHAI_DESIGN_IMG : CHAI_MOCKUP_IMG} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : product.img}
                </div>
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

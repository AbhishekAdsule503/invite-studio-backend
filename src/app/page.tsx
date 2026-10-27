"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Copy,
  Download,
  Eye,
  Heart,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Palette,
  Phone,
  RefreshCw,
  Search,
  Share2,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";
import { downloadInvitationPng, shareInvitationWithImage } from "@/lib/export-image";
import { InvitationCard } from "@/components/InvitationCard";


type OccasionKey =
  | "All"
  | "Wedding"
  | "Engagement"
  | "Haldi"
  | "God Bharai"
  | "Nikah"
  | "Walima"
  | "Reception"
  | "Anniversary"
  | "Birthday"
  | "Baby Shower"
  | "Festivals"
  | "Corporate";

interface Template {
  id: string;
  title: string;
  occasion: OccasionKey;
  subtitle: string;
  theme: "wine" | "champagne" | "blush" | "midnight" | "heritage" | "minimal" | "rose" | "lotus" | "nikah" | "aqua" | "wisteria" | "marathi" | "haldi" | "walima" | "embossed" | "celestial" | "mughal" | "reception";
  sampleHost: string;
  sampleEvent: string;
  sampleDate: string;
  sampleVenue: string;
  accent: string;
  tag: string;
}

const templates: Template[] = [
  // 1. Pink Lotus Ganesh Wedding (Reference 1)
  {
    id: "pink-lotus-ganesh-wedding",
    title: "Pink Lotus Ganesh Vivah",
    occasion: "Wedding",
    subtitle: "Blush watercolor, sacred Ganesha, blooming lotuses & royal couple",
    theme: "lotus",
    sampleHost: "Rohan & Ananya",
    sampleEvent: "Request the pleasure of your company at their Shubh Vivah",
    sampleDate: "Sunday, December 20, 2026",
    sampleVenue: "The Oberoi Udaivilas, Udaipur",
    accent: "#AD8745",
    tag: "Traditional Indian",
  },
  // 2. Aqua Floral Royal Engagement (Reference 2)
  {
    id: "aqua-floral-royal-engagement",
    title: "Aqua Floral Royal Engagement",
    occasion: "Engagement",
    subtitle: "Pale aqua watercolor, twin golden rings, white florals & elegant couple",
    theme: "aqua",
    sampleHost: "Kabir & Tara",
    sampleEvent: "Celebrate the joyous beginning of our forever",
    sampleDate: "Saturday, November 14, 2026",
    sampleVenue: "The St. Regis Hotel, Mumbai",
    accent: "#C9A45C",
    tag: "Royal Engagement",
  },
  // 3. Lavender Floral Royal Wedding (Reference 3)
  {
    id: "lavender-wisteria-royal-wedding",
    title: "Lavender Wisteria Royal Wedding",
    occasion: "Wedding",
    subtitle: "Hanging purple wisteria, gilded palace arch & romantic couple",
    theme: "wisteria",
    sampleHost: "Riya Sharma & Arjun Verma",
    sampleEvent: "Two hearts. One journey. Forever.",
    sampleDate: "Saturday, January 24, 2026",
    sampleVenue: "The Royal Palace, Jaipur",
    accent: "#B88E3E",
    tag: "Floral Wedding",
  },
  // 4. Traditional Marathi God Bharai (Reference 4)
  {
    id: "marathi-god-bharai-heritage",
    title: "पारंपारिक डोहाळे जेवण / गोद भराई",
    occasion: "God Bharai",
    subtitle: "पारंपारिक महाल, झुंबर, मोरांची जोडी व कुलदेवी कृपा",
    theme: "marathi",
    sampleHost: "सौ. जया आशिष वर्मा",
    sampleEvent: "गोद भराई एवं स्नेहभोज",
    sampleDate: "रविवार, १ जून २०२६",
    sampleVenue: "रॉयल कन्व्हेन्शन हॉल, मुंबई",
    accent: "#B87A4F",
    tag: "Marathi Heritage",
  },
  // 5. Marigold Haldi Ceremony (Reference 5)
  {
    id: "marigold-haldi-celebration",
    title: "Marigold Haldi Celebration",
    occasion: "Haldi",
    subtitle: "Golden marigolds, festive bells, turmeric brass urli & joyous vibes",
    theme: "haldi",
    sampleHost: "Aarav & Meera",
    sampleEvent: "Join us for a day filled with love, laughter and lots of haldi!",
    sampleDate: "Sunday, November 15, 2026",
    sampleVenue: "Vasai Green Haveli, Maharashtra",
    accent: "#D69F3D",
    tag: "Festive Haldi",
  },
  // 6. Elegant Walima Islamic Wedding (Reference 6)
  {
    id: "champagne-walima-elegance",
    title: "Champagne Walima Elegance",
    occasion: "Walima",
    subtitle: "Sacred Bismillah, olive botanical framing & banquet reception",
    theme: "walima",
    sampleHost: "Farhan & Yasmin",
    sampleEvent: "In the name of Allah, cordially invite you to their Walima",
    sampleDate: "Sunday, December 27, 2026",
    sampleVenue: "Grand Ball Pavilion, Bengaluru",
    accent: "#C2A368",
    tag: "Islamic Walima",
  },
  // 7. Embossed Burgundy Floral (Reference 7)
  {
    id: "burgundy-embossed-luxury",
    title: "Burgundy Embossed Luxury",
    occasion: "Wedding",
    subtitle: "Lustrous embossed stationery, rich corner florals & classic script",
    theme: "embossed",
    sampleHost: "Alistair & Vivienne",
    sampleEvent: "Request the pleasure of your company at their celebration",
    sampleDate: "Friday, October 9, 2026",
    sampleVenue: "The Rosewood Manor, Shimla",
    accent: "#8B263E",
    tag: "Embossed Luxury",
  },
  // 8. Deep Burgundy Royal Nikah (Reference 8)
  {
    id: "burgundy-royal-nikah",
    title: "Deep Burgundy Royal Nikah",
    occasion: "Nikah",
    subtitle: "Dark wine velvet, golden calligraphy, sacred du'a & Walima notice",
    theme: "wine",
    sampleHost: "Tariq & Zeenat",
    sampleEvent: "With the blessings of Allah, request your presence at their Nikah",
    sampleDate: "Friday, November 20, 2026",
    sampleVenue: "Taj Falaknuma Palace, Hyderabad",
    accent: "#D6B574",
    tag: "Royal Nikah",
  },
  // 9. Royal Mughal Wedding
  {
    id: "royal-mughal-wedding",
    title: "Royal Mughal Matrimony",
    occasion: "Wedding",
    subtitle: "Intricate Mughal arches, antique gold borders & royal heraldry",
    theme: "mughal",
    sampleHost: "Shahzade & Begum",
    sampleEvent: "Grand Dawat & Royal Vivah Celebration",
    sampleDate: "Saturday, January 16, 2027",
    sampleVenue: "ITC Grand Bharat, Gurugram",
    accent: "#AD8745",
    tag: "Royal Mughal",
  },
  // 10. Midnight Celestial Wedding
  {
    id: "midnight-celestial-wedding",
    title: "Midnight Celestial Wedding",
    occasion: "Wedding",
    subtitle: "Deep cosmic indigo, champagne gold constellations & moon stardust",
    theme: "celestial",
    sampleHost: "Aurelius & Seraphina",
    sampleEvent: "Two hearts written in the stars beginning eternity",
    sampleDate: "Sunday, February 14, 2027",
    sampleVenue: "The Observatory Estate, Kodaikanal",
    accent: "#E2C485",
    tag: "Celestial Night",
  },
  // 11. Minimal Editorial Wedding
  {
    id: "minimal-editorial-wedding",
    title: "Minimal Editorial Wedding",
    occasion: "Wedding",
    subtitle: "Architectural minimalism, sculptural serif typography & generous space",
    theme: "minimal",
    sampleHost: "Julian & Clara",
    sampleEvent: "Warmly invite you to witness their marriage vows",
    sampleDate: "Thursday, April 22, 2027",
    sampleVenue: "Modernist Atelier, Alibaug",
    accent: "#651E32",
    tag: "Modern Editorial",
  },
  // 12. Rose Garden Engagement
  {
    id: "rose-garden-engagement",
    title: "Rose Garden Engagement",
    occasion: "Engagement",
    subtitle: "Dusty rose palette, delicate botanical arches & romantic calligraphy",
    theme: "rose",
    sampleHost: "Lucas & Genevieve",
    sampleEvent: "Joyfully celebrate their ring ceremony and love story",
    sampleDate: "Saturday, May 15, 2027",
    sampleVenue: "The Orchard Conservatory, Chandigarh",
    accent: "#C27B8A",
    tag: "Garden Romance",
  },
  // 13. Pearl Anniversary
  {
    id: "pearl-anniversary",
    title: "Pearl Anniversary Gala",
    occasion: "Anniversary",
    subtitle: "Shimmering pearl ivory, golden laurels & 30-year milestone tribute",
    theme: "champagne",
    sampleHost: "Vikram & Radhika",
    sampleEvent: "Celebrating thirty golden years of love and happiness",
    sampleDate: "Sunday, October 18, 2026",
    sampleVenue: "The Imperial Ballroom, New Delhi",
    accent: "#D6B574",
    tag: "Anniversary",
  },
  // 14. Royal Reception
  {
    id: "royal-reception",
    title: "Royal Wedding Reception",
    occasion: "Reception",
    subtitle: "Regal burgundy & champagne gold banquet celebration",
    theme: "reception",
    sampleHost: "Devendra & Ananya",
    sampleEvent: "Request the honour of your company at the reception dinner",
    sampleDate: "Sunday, November 29, 2026",
    sampleVenue: "The Grand Hyatt Ballroom, Mumbai",
    accent: "#D6B574",
    tag: "Grand Reception",
  },
  // Backward compatibility templates
  {
    id: "royal-wine-wedding",
    title: "The Burgundy Royale",
    occasion: "Wedding",
    subtitle: "Deep wine velvet, ivory letterpress & champagne gold foil",
    theme: "wine",
    sampleHost: "Siddharth & Ananya",
    sampleEvent: "Request the pleasure of your company",
    sampleDate: "Saturday, November 28, 2026",
    sampleVenue: "The Glasshouse Estate, Udaipur",
    accent: "#D6B574",
    tag: "Luxury Editorial",
  },
  {
    id: "champagne-soiree",
    title: "Velvet & Champagne Gala",
    occasion: "Birthday",
    subtitle: "Warm ivory, blush noir accents & golden sparkle",
    theme: "champagne",
    sampleHost: "Sophia Montgomery",
    sampleEvent: "Celebrating Thirty Unforgettable Years",
    sampleDate: "Friday, December 18, 2026",
    sampleVenue: "The Rooftop Pavilion, Bandra",
    accent: "#C9A45C",
    tag: "Celebration",
  },
  {
    id: "celestial-engagement",
    title: "Celestial Twilight",
    occasion: "Engagement",
    subtitle: "Deep midnight indigo & stardust filigree",
    theme: "midnight",
    sampleHost: "Elena & Marcus",
    sampleEvent: "Two hearts beginning their next chapter",
    sampleDate: "Sunday, January 10, 2027",
    sampleVenue: "Starlight Conservatory, Bangalore",
    accent: "#E2C485",
    tag: "Romantic",
  },
  {
    id: "blush-elegance",
    title: "Dusty Rose & Gilded Script",
    occasion: "Wedding",
    subtitle: "Soft blush linen, delicate florals & burgundy calligraphy",
    theme: "blush",
    sampleHost: "Alex & Jamie",
    sampleEvent: "Together with their beloved families",
    sampleDate: "Saturday, June 14, 2026",
    sampleVenue: "The Rosewood Villa, Kodaikanal",
    accent: "#8C324E",
    tag: "Editorial Romantic",
  },
  {
    id: "heritage-palace",
    title: "Saffron & Marigold Heritage",
    occasion: "Anniversary",
    subtitle: "Warm terracotta, royal arches & gilded borders",
    theme: "heritage",
    sampleHost: "Kavita & Rajesh Verma",
    sampleEvent: "Celebrating 25 Golden Years of Love",
    sampleDate: "Sunday, October 25, 2026",
    sampleVenue: "Heritage Haveli, Jaipur",
    accent: "#B87A4F",
    tag: "Heritage",
  },
  {
    id: "minimalist-atelier",
    title: "The Atelier Modernist",
    occasion: "Corporate",
    subtitle: "Sculptural typography & architectural minimalism",
    theme: "minimal",
    sampleHost: "Studio Arch & Design",
    sampleEvent: "Annual Innovation & Design Showcase",
    sampleDate: "Thursday, November 12, 2026",
    sampleVenue: "The Atrium Gallery, New Delhi",
    accent: "#651E32",
    tag: "Minimalist",
  },
  {
    id: "baby-blooms",
    title: "Soft Peach & Rose Whispers",
    occasion: "Baby Shower",
    subtitle: "Airy blush watercolor, gold foil stars & delicate bows",
    theme: "rose",
    sampleHost: "Priya & Rohan",
    sampleEvent: "A little miracle is on the way!",
    sampleDate: "Sunday, August 23, 2026",
    sampleVenue: "The Blossom Villa, Pune",
    accent: "#C27B8A",
    tag: "Whimsical",
  },
  {
    id: "festival-diwali",
    title: "Luminous Lanterns Soirée",
    occasion: "Festivals",
    subtitle: "Deep crimson, gold moti & joyous celebration",
    theme: "heritage",
    sampleHost: "The Kapoor Family",
    sampleEvent: "Diwali Feast & Evening of Lights",
    sampleDate: "Friday, November 6, 2026",
    sampleVenue: "Kapoor Residence, Juhu",
    accent: "#D69F3D",
    tag: "Festive",
  },
];

const occasionsList = [
  { name: "Wedding", count: "34 Designs", icon: "💍", desc: "Royal burgundy, gold foil & floral suites" },
  { name: "Birthday", count: "28 Designs", icon: "✨", desc: "Milestone galas, chic dinner parties" },
  { name: "Engagement", count: "22 Designs", icon: "🥂", desc: "Romantic soirées & ring ceremonies" },
  { name: "Anniversary", count: "16 Designs", icon: "🍷", desc: "Silver & golden jubilee tributes" },
  { name: "Baby Shower", count: "18 Designs", icon: "🧸", desc: "Gentle dusty rose & ivory pastels" },
  { name: "Festivals", count: "25 Designs", icon: "🪔", desc: "Diwali, Eid, Christmas & celebrations" },
  { name: "Housewarming", count: "14 Designs", icon: "🏡", desc: "New beginnings with loved ones" },
  { name: "Corporate", count: "20 Designs", icon: "🏛️", desc: "Galas, summits & executive dinners" },
];

export default function HomePage() {
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionKey>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Live builder modal state
  const [showBuilder, setShowBuilder] = useState(false);
  const [builderTab, setBuilderTab] = useState<"edit" | "preview">("edit");
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [form, setForm] = useState({
    occasion: "Wedding",
    host: "Siddharth & Ananya",
    title: "A Celebration of Love",
    date: "2026-11-28",
    time: "18:00",
    venue: "The Glasshouse Estate, Udaipur",
    message: "Together with our families, we joyfully invite you to celebrate our wedding and reception.",
    theme: "wine" as Template["theme"],
  });
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const builderCardRef = useRef<HTMLDivElement>(null);
  const quickPreviewRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  async function handleDownloadBuilderPng() {
    if (!builderCardRef.current) return;
    setIsExporting(true);
    try {
      await downloadInvitationPng(builderCardRef.current, form.title || "invitation", 2.5);
      showToast("High-resolution PNG downloaded!");
    } catch (err) {
      console.error("Export error", err);
      showToast("Could not export PNG. Please try again.");
    } finally {
      setIsExporting(false);
    }
  }

  async function handleWhatsAppShareBuilder() {
    if (!builderCardRef.current) return;
    setIsExporting(true);
    try {
      const res = await shareInvitationWithImage(
        builderCardRef.current,
        {
          title: form.title || "Invitation",
          text: shareText,
        },
        2.5
      );

      if (res.sharedViaNative) {
        showToast("Shared successfully!");
      } else if (res.downloaded) {
        showToast("PNG saved to your device! Opening WhatsApp...");
        window.open(whatsappUrl, "_blank");
      }
    } catch (err) {
      console.error("Share error", err);
      showToast("Could not share image.");
    } finally {
      setIsExporting(false);
    }
  }

  async function handleEmailShareBuilder() {
    if (!builderCardRef.current) return;
    setIsExporting(true);
    try {
      await downloadInvitationPng(builderCardRef.current, form.title || "invitation", 2.5);
      showToast("PNG saved! Opening your email client...");
      window.open(mailUrl, "_self");
    } catch (err) {
      console.error("Email share error", err);
      showToast("Could not export invitation for email.");
    } finally {
      setIsExporting(false);
    }
  }

  async function handleDownloadQuickPreviewPng() {
    if (!quickPreviewRef.current || !previewTemplate) return;
    setIsExporting(true);
    try {
      await downloadInvitationPng(quickPreviewRef.current, previewTemplate.title, 2.5);
      showToast("High-resolution PNG downloaded!");
    } catch (err) {
      console.error("Export error", err);
      showToast("Could not export PNG.");
    } finally {
      setIsExporting(false);
    }
  }


  const [allTemplates, setAllTemplates] = useState<Template[]>(templates);

  useEffect(() => {
    async function loadDynamicTemplates() {
      try {
        const res = await fetch("/api/templates");
        const data = await res.json();
        if (data.templates && Array.isArray(data.templates) && data.templates.length > 0) {
          setAllTemplates(data.templates);
        }
      } catch (err) {
        console.warn("Using fallback static templates", err);
      }
    }
    void loadDynamicTemplates();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredTemplates = useMemo(() => {
    return allTemplates.filter((tpl) => {
      const matchesOccasion = selectedOccasion === "All" || tpl.occasion.toLowerCase() === selectedOccasion.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.occasion.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tpl.subtitle && tpl.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesOccasion && matchesSearch;
    });
  }, [allTemplates, selectedOccasion, searchQuery]);


  const updateForm = (key: keyof typeof form, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const shareText = `${form.title} — ${form.host}\nDate: ${form.date} at ${form.time}\nVenue: ${form.venue}\n\n${form.message}\n\nCreated with Invite Studio`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const mailUrl = `mailto:?subject=${encodeURIComponent(form.title)}&body=${encodeURIComponent(shareText)}`;

  async function copyText() {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy your invitation text:", shareText);
    }
  }

  function openBuilderWith(template: Template) {
    setForm({
      occasion: template.occasion,
      host: template.sampleHost,
      title: template.title,
      date: "2026-12-15",
      time: "18:30",
      venue: template.sampleVenue,
      message: "We would be honored by your presence as we celebrate this special milestone together.",
      theme: template.theme,
    });
    setShowBuilder(true);
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--warm-ivory)", color: "var(--charcoal)" }}>
      {/* ================= STICKY LUXURY NAVIGATION ================= */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          transition: "all 0.3s ease",
          backgroundColor: scrolled ? "rgba(250, 246, 239, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(214, 181, 116, 0.35)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 20px rgba(58, 20, 36, 0.05)" : "none",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 84 }}>
          {/* Brand Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                backgroundColor: "var(--deep-wine)",
                display: "grid",
                placeItems: "center",
                color: "var(--champagne-gold)",
                boxShadow: "0 4px 14px rgba(58, 20, 36, 0.28)",
                border: "1px solid rgba(214, 181, 116, 0.45)",
              }}
            >
              <Sparkles size={20} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", fontWeight: 700, letterSpacing: "-0.01em", color: "var(--rich-burgundy)" }}>
                Invite<span style={{ color: "var(--champagne-gold)", fontStyle: "italic", marginLeft: 4 }}>Studio</span>
              </div>
              <div style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted-taupe)", marginTop: -2 }}>
                Atelier of Celebrations
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav style={{ display: "flex", alignItems: "center", gap: 32 }} className="desktop-nav">
            <a href="#designs" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--rich-burgundy)", textDecoration: "none", transition: "color 0.2s" }}>
              Explore Designs
            </a>
            <a href="#occasions" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--rich-burgundy)", textDecoration: "none", transition: "color 0.2s" }}>
              Occasions
            </a>
            <a href="#how-it-works" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--rich-burgundy)", textDecoration: "none", transition: "color 0.2s" }}>
              How It Works
            </a>
            <a href="#experience" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--rich-burgundy)", textDecoration: "none", transition: "color 0.2s" }}>
              The Studio
            </a>
          </nav>

          {/* Desktop Action Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }} className="desktop-nav">
            <Link href="/login" className="btn btn-ghost" style={{ fontSize: "0.88rem" }}>
              Sign In
            </Link>
            <button onClick={() => setShowBuilder(true)} className="btn btn-primary" style={{ padding: "11px 22px", fontSize: "0.88rem" }}>
              <span>Create Invitation</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "none",
              background: "none",
              border: "1px solid var(--light-border)",
              padding: 9,
              borderRadius: 10,
              color: "var(--rich-burgundy)",
              cursor: "pointer",
            }}
            className="mobile-toggle"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: "20px 24px 28px",
              backgroundColor: "var(--pure-white)",
              borderBottom: "1px solid var(--border-gold)",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <a href="#designs" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: "1rem", fontWeight: 600, color: "var(--rich-burgundy)" }}>
                Explore Designs
              </a>
              <a href="#occasions" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: "1rem", fontWeight: 600, color: "var(--rich-burgundy)" }}>
                Occasions
              </a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: "1rem", fontWeight: 600, color: "var(--rich-burgundy)" }}>
                How It Works
              </a>
              <div style={{ height: 1, backgroundColor: "var(--light-border)", margin: "8px 0" }} />
              <Link href="/login" className="btn btn-secondary" style={{ width: "100%" }}>
                Sign In / Register
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowBuilder(true);
                }}
                className="btn btn-primary"
                style={{ width: "100%" }}
              >
                Create Invitation
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ================= EDITORIAL HERO SECTION (DEEP WINE & BURGUNDY) ================= */}
      <section
        style={{
          position: "relative",
          backgroundColor: "var(--deep-wine)",
          color: "var(--warm-ivory)",
          paddingTop: "clamp(48px, 7vw, 84px)",
          paddingBottom: "clamp(64px, 9vw, 110px)",
          overflow: "hidden",
          borderBottom: "1px solid var(--border-gold)",
        }}
      >
        {/* Ambient champagne gold glow */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "5%",
            width: 550,
            height: 550,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(214, 181, 116, 0.16) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="container hero-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "clamp(32px, 5vw, 64px)", alignItems: "center" }}>
          {/* Left Column: Editorial Headline & Actions */}
          <div>
            <div className="section-eyebrow" style={{ marginBottom: 18, color: "var(--champagne-gold)" }}>
              <Sparkles size={14} />
              <span>Bespoke Celebration Atelier</span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2.5rem, 5.2vw, 4.3rem)",
                lineHeight: 1.1,
                color: "#FAF6EF",
                marginBottom: 24,
                letterSpacing: "-0.03em",
              }}
            >
              Every Celebration Deserves an <span className="editorial-italic">Extraordinary</span> Invitation.
            </h1>

            <p style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)", lineHeight: 1.68, color: "var(--champagne-light)", opacity: 0.9, marginBottom: 36, maxWidth: 540 }}>
              Craft heirloom-quality digital invitations with custom typography, gilded borders, and instantaneous RSVP delivery across WhatsApp, email, and private hosted links.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center", marginBottom: 44 }}>
              <button onClick={() => setShowBuilder(true)} className="btn btn-gold" style={{ padding: "16px 32px", fontSize: "1rem" }}>
                <span>Create Your Invitation</span>
                <ArrowRight size={18} />
              </button>
              <a href="#designs" className="btn btn-ghost-light" style={{ padding: "16px 28px", fontSize: "1rem" }}>
                Explore Designs
              </a>
            </div>

            {/* Proof Badges */}
            <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", borderTop: "1px solid rgba(214, 181, 116, 0.25)", paddingTop: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ display: "flex", color: "var(--champagne-gold)" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--warm-ivory)" }}>4.9/5 Rating</span>
              </div>
              <span style={{ color: "rgba(214, 181, 116, 0.4)" }}>•</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--champagne-light)" }}>
                <Check size={16} color="var(--champagne-gold)" />
                <span>Zero guest app download required</span>
              </div>
              <span style={{ color: "rgba(214, 181, 116, 0.4)" }}>•</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--champagne-light)" }}>
                <MessageCircle size={16} color="var(--champagne-gold)" />
                <span>One-tap WhatsApp RSVP</span>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Layered Luxury Invitation Card Collage */}
          <div style={{ position: "relative", minHeight: 460, display: "flex", justifyContent: "center", alignItems: "center" }}>
            {/* Background Decorative Gold Frame */}
            <div
              style={{
                position: "absolute",
                inset: "10px",
                border: "1px dashed rgba(214, 181, 116, 0.4)",
                borderRadius: 28,
                pointerEvents: "none",
              }}
            />

            {/* Main Centerpiece Card (Royal Burgundy & Gold Theme) */}
            <div
              className="animate-float"
              style={{
                width: "min(340px, 90%)",
                backgroundColor: "var(--wine-dark)",
                color: "var(--pure-white)",
                borderRadius: 22,
                padding: "36px 28px",
                textAlign: "center",
                boxShadow: "0 28px 65px rgba(0, 0, 0, 0.45)",
                border: "2px solid rgba(214, 181, 116, 0.7)",
                position: "relative",
                zIndex: 2,
              }}
            >
              {/* Corner Accents */}
              <div style={{ position: "absolute", top: 12, left: 14, color: "var(--champagne-gold)", fontSize: "0.8rem" }}>✦</div>
              <div style={{ position: "absolute", top: 12, right: 14, color: "var(--champagne-gold)", fontSize: "0.8rem" }}>✦</div>
              <div style={{ position: "absolute", bottom: 12, left: 14, color: "var(--champagne-gold)", fontSize: "0.8rem" }}>✦</div>
              <div style={{ position: "absolute", bottom: 12, right: 14, color: "var(--champagne-gold)", fontSize: "0.8rem" }}>✦</div>

              <div style={{ fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--champagne-gold)", marginBottom: 12 }}>
                TOGETHER WITH THEIR FAMILIES
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "2rem",
                  lineHeight: 1.2,
                  fontWeight: 500,
                  margin: "8px 0 14px",
                  color: "#FAF6EF",
                }}
              >
                Siddharth <span style={{ fontStyle: "italic", color: "var(--champagne-gold)", fontWeight: 400 }}>&</span> Ananya
              </h2>

              <div className="gold-divider" style={{ margin: "14px auto" }} />

              <div style={{ fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--dusty-rose)", marginBottom: 16 }}>
                REQUEST THE HONOR OF YOUR PRESENCE
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: "0.88rem", color: "#F0ECE1", marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <Calendar size={14} color="var(--champagne-gold)" />
                  <span>Saturday, November 28, 2026</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: "0.82rem", color: "var(--champagne-light)" }}>
                  <Clock size={13} color="var(--champagne-gold)" />
                  <span>6:00 PM Onwards · Udaipur Palace</span>
                </div>
              </div>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 14px",
                  borderRadius: 999,
                  backgroundColor: "rgba(214, 181, 116, 0.16)",
                  border: "1px solid rgba(214, 181, 116, 0.4)",
                  fontSize: "0.75rem",
                  color: "var(--champagne-light)",
                }}
              >
                <Check size={12} color="var(--champagne-gold)" />
                <span>RSVP Enabled · Instant Access</span>
              </div>
            </div>

            {/* Floating Top Right Pill (WhatsApp Delivery Badge) */}
            <div
              style={{
                position: "absolute",
                top: 20,
                right: -10,
                zIndex: 3,
                backgroundColor: "var(--pure-white)",
                padding: "10px 16px",
                borderRadius: 14,
                boxShadow: "var(--shadow-lg)",
                border: "1px solid var(--border-gold)",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: "var(--rich-burgundy)", display: "grid", placeItems: "center", color: "var(--champagne-gold)" }}>
                <MessageCircle size={15} />
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--rich-burgundy)" }}>Instant WhatsApp Share</div>
                <div style={{ fontSize: "0.68rem", color: "var(--muted-taupe)" }}>One-click direct delivery</div>
              </div>
            </div>

            {/* Floating Bottom Left Card (RSVP Activity) */}
            <div
              style={{
                position: "absolute",
                bottom: 15,
                left: -15,
                zIndex: 3,
                backgroundColor: "var(--pure-white)",
                padding: "12px 18px",
                borderRadius: 16,
                boxShadow: "var(--shadow-lg)",
                border: "1px solid var(--border-gold)",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: "var(--soft-blush)", display: "grid", placeItems: "center", color: "var(--rich-burgundy)" }}>
                <Users size={18} />
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--rich-burgundy)" }}>128 Guests Attending</div>
                <div style={{ fontSize: "0.7rem", color: "#8C4B2E" }}>● Live RSVP responses tracked</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OCCASION CATEGORIES GRID ================= */}
      <section id="occasions" style={{ padding: "80px 0", backgroundColor: "var(--pure-white)", borderTop: "1px solid var(--light-border)", borderBottom: "1px solid var(--light-border)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 52px" }}>
            <div className="section-eyebrow dark" style={{ justifyContent: "center", marginBottom: 12 }}>
              <Sparkles size={14} />
              <span>Curated for Every Milestone</span>
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", color: "var(--rich-burgundy)", marginBottom: 14 }}>
              Designed for life’s most <span className="editorial-italic">cherished</span> moments.
            </h2>
            <p style={{ color: "var(--muted-taupe)", fontSize: "1.05rem" }}>
              Explore bespoke invitation aesthetics tailored with occasion-specific motifs, etiquette, and refined typography.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 20,
            }}
          >
            {occasionsList.map((occ) => (
              <div
                key={occ.name}
                onClick={() => {
                  setSelectedOccasion(occ.name as OccasionKey);
                  const el = document.getElementById("designs");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="luxury-card"
                style={{
                  padding: 24,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 160,
                  backgroundColor: "var(--warm-ivory)",
                  border: "1px solid var(--light-border)",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <span style={{ fontSize: "2rem" }}>{occ.icon}</span>
                    <span className="badge badge-gold">{occ.count}</span>
                  </div>
                  <h3 style={{ fontSize: "1.25rem", color: "var(--rich-burgundy)", marginBottom: 6 }}>{occ.name}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--muted-taupe)", lineHeight: 1.5 }}>{occ.desc}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", fontWeight: 700, color: "var(--rich-burgundy)", marginTop: 16 }}>
                  <span>View templates</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED INVITATION GALLERY ================= */}
      <section id="designs" style={{ padding: "96px 0", backgroundColor: "var(--warm-ivory)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 40 }}>
            <div>
              <div className="section-eyebrow dark" style={{ marginBottom: 10 }}>
                <Palette size={14} />
                <span>The Studio Gallery</span>
              </div>
              <h2 style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", color: "var(--rich-burgundy)", margin: 0 }}>
                Exquisite invitation <span className="editorial-italic">canvases.</span>
              </h2>
            </div>

            {/* Search Input */}
            <div style={{ position: "relative", minWidth: 260 }}>
              <Search size={17} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted-taupe)" }} />
              <input
                className="studio-input"
                style={{ paddingLeft: 42, borderRadius: 999 }}
                placeholder="Search by occasion or style..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Occasion Filter Tabs */}
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 14, marginBottom: 36, scrollbarWidth: "none" }}>
            {(["All", "Wedding", "Birthday", "Engagement", "Anniversary", "Baby Shower", "Festivals", "Corporate"] as OccasionKey[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedOccasion(tab)}
                style={{
                  padding: "9px 18px",
                  borderRadius: 999,
                  border: selectedOccasion === tab ? "1px solid var(--rich-burgundy)" : "1px solid var(--light-border)",
                  backgroundColor: selectedOccasion === tab ? "var(--rich-burgundy)" : "var(--pure-white)",
                  color: selectedOccasion === tab ? "var(--pure-white)" : "var(--charcoal)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease",
                }}
              >
                {tab === "All" ? "All Designs" : tab}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 28,
            }}
          >
            {filteredTemplates.map((template) => {
              const isDark = template.theme === "wine" || template.theme === "midnight";
              const bgColor =
                template.theme === "wine"
                  ? "#3A1424"
                  : template.theme === "midnight"
                    ? "#0E1A2B"
                    : template.theme === "blush"
                      ? "#F8EEEA"
                      : template.theme === "champagne"
                        ? "#FCF8F2"
                        : template.theme === "heritage"
                          ? "#FDF4ED"
                          : template.theme === "rose"
                            ? "#F9ECEF"
                            : "#FAF6EF";

              return (
                <div
                  key={template.id}
                  className="luxury-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    borderRadius: 20,
                    overflow: "hidden",
                  }}
                >
                  {/* Card Artwork Canvas */}
                  <div
                    style={{
                      height: 290,
                      backgroundColor: bgColor,
                      color: isDark ? "#FAF6EF" : "#252329",
                      padding: "28px 24px",
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      textAlign: "center",
                      borderBottom: "1px solid var(--light-border)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    {/* Delicate Border Inset */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 12,
                        border: `1px solid ${template.accent}44`,
                        borderRadius: 12,
                        pointerEvents: "none",
                      }}
                    />

                    <div>
                      <span className="badge" style={{ backgroundColor: `${template.accent}25`, color: isDark ? "#F4E8CA" : "var(--charcoal)", border: `1px solid ${template.accent}66` }}>
                        {template.tag}
                      </span>
                      <div style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 12, opacity: 0.8 }}>
                        {template.sampleEvent}
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.7rem",
                          lineHeight: 1.25,
                          fontWeight: 500,
                          color: isDark ? "var(--warm-ivory)" : "var(--rich-burgundy)",
                        }}
                      >
                        {template.sampleHost}
                      </div>
                      <div style={{ width: 36, height: 1, backgroundColor: template.accent, margin: "10px auto" }} />
                      <div style={{ fontSize: "0.78rem", opacity: 0.85 }}>{template.sampleDate}</div>
                      <div style={{ fontSize: "0.74rem", opacity: 0.7, marginTop: 2 }}>{template.sampleVenue}</div>
                    </div>

                    <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.75 }}>
                      INVITE STUDIO BESPOKE
                    </div>
                  </div>

                  {/* Card Metadata & Actions */}
                  <div style={{ padding: "20px 24px", backgroundColor: "var(--pure-white)", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                        <h3 style={{ fontSize: "1.15rem", color: "var(--rich-burgundy)", margin: 0 }}>{template.title}</h3>
                        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--champagne-gold)" }}>{template.occasion}</span>
                      </div>
                      <p style={{ fontSize: "0.85rem", color: "var(--muted-taupe)", marginBottom: 18 }}>{template.subtitle}</p>
                    </div>

                    <div style={{ display: "flex", gap: 10 }}>
                      <button
                        onClick={() => openBuilderWith(template)}
                        className="btn btn-primary"
                        style={{ flex: 1, padding: "10px 16px", fontSize: "0.85rem" }}
                      >
                        <span>Personalize</span>
                        <ArrowRight size={14} />
                      </button>
                      <button
                        onClick={() => {
                          setPreviewTemplate(template);
                        }}
                        className="btn btn-secondary"
                        style={{ padding: "10px 14px", fontSize: "0.85rem" }}
                        title="Live Card Preview"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS (3 LUXURY STEPS) ================= */}
      <section id="how-it-works" style={{ padding: "96px 0", backgroundColor: "var(--pure-white)", borderTop: "1px solid var(--light-border)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
            <div className="section-eyebrow dark" style={{ justifyContent: "center", marginBottom: 12 }}>
              <Clock size={14} />
              <span>Effortless Elegance</span>
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.85rem)", color: "var(--rich-burgundy)", marginBottom: 16 }}>
              From inspiration to invited in <span className="editorial-italic">three steps.</span>
            </h2>
            <p style={{ color: "var(--muted-taupe)", fontSize: "1.05rem" }}>
              No software installations or graphic design skills needed. Everything happens in your browser with real-time live preview.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 36,
            }}
          >
            {[
              {
                step: "01",
                title: "Curate Your Aesthetic",
                desc: "Select an invitation canvas tailored to your celebration—from rich wine & gold foil to minimalist ivory or romantic blush florals.",
                icon: <Palette size={24} color="var(--rich-burgundy)" />,
              },
              {
                step: "02",
                title: "Personalize Every Detail",
                desc: "Customize event titles, host names, dates, times, venue directions, and personalized notes with instant live preview.",
                icon: <Sparkles size={24} color="var(--rich-burgundy)" />,
              },
              {
                step: "03",
                title: "Deliver with Distinction",
                desc: "Send personalized invitations instantly via WhatsApp, Email, or your dedicated hosted page with automatic RSVP tracking.",
                icon: <Share2 size={24} color="var(--rich-burgundy)" />,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="luxury-card"
                style={{
                  padding: "36px 30px",
                  backgroundColor: "var(--warm-ivory)",
                  border: "1px solid var(--light-border)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "3.2rem",
                    fontWeight: 700,
                    color: "rgba(214, 181, 116, 0.4)",
                    position: "absolute",
                    top: 20,
                    right: 24,
                    lineHeight: 1,
                  }}
                >
                  {item.step}
                </div>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    backgroundColor: "var(--pure-white)",
                    display: "grid",
                    placeItems: "center",
                    boxShadow: "var(--shadow-sm)",
                    marginBottom: 24,
                    border: "1px solid var(--light-border)",
                  }}
                >
                  {item.icon}
                </div>
                <h3 style={{ fontSize: "1.35rem", color: "var(--rich-burgundy)", marginBottom: 12 }}>{item.title}</h3>
                <p style={{ color: "var(--muted-taupe)", fontSize: "0.92rem", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EDITORIAL SOCIAL PROOF / QUOTE ================= */}
      <section id="experience" style={{ padding: "80px 0", backgroundColor: "var(--soft-blush)" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: 780, margin: "0 auto" }}>
          <div style={{ color: "var(--champagne-gold)", fontSize: "2rem", marginBottom: 16 }}>✦ ✦ ✦</div>
          <blockquote
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.35rem, 2.6vw, 1.95rem)",
              fontStyle: "italic",
              lineHeight: 1.5,
              color: "var(--rich-burgundy)",
              marginBottom: 24,
            }}
          >
            “Our guests were genuinely stunned when they received our wedding invitation on WhatsApp. The typography, the gold accents, and the one-tap calendar sync made it feel like a royal invite delivered straight to their hands.”
          </blockquote>
          <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--deep-wine)" }}>Radhika & Devendra Sharma</div>
          <div style={{ fontSize: "0.8rem", color: "var(--muted-taupe)" }}>Royal Burgundy Wedding · 350 Guests</div>
        </div>
      </section>

      {/* ================= FINAL LUXURY CALL TO ACTION ================= */}
      <section style={{ padding: "96px 0", backgroundColor: "var(--warm-ivory)" }}>
        <div className="container">
          <div
            style={{
              backgroundColor: "var(--deep-wine)",
              color: "var(--pure-white)",
              borderRadius: 30,
              padding: "clamp(48px, 8vw, 84px) clamp(32px, 6vw, 64px)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              boxShadow: "var(--shadow-xl)",
              border: "1px solid rgba(214, 181, 116, 0.45)",
            }}
          >
            {/* Subtle background glow */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 600,
                height: 600,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(214, 181, 116, 0.18) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div className="section-eyebrow" style={{ justifyContent: "center", color: "var(--champagne-gold)", marginBottom: 16 }}>
              <Sparkles size={15} />
              <span>Create Something Timeless</span>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
                lineHeight: 1.15,
                color: "#FAF6EF",
                maxWidth: 680,
                margin: "0 auto 20px",
              }}
            >
              Your celebration deserves an <span className="editorial-italic">extraordinary</span> beginning.
            </h2>

            <p style={{ fontSize: "1.1rem", color: "var(--champagne-light)", maxWidth: 540, margin: "0 auto 40px", lineHeight: 1.7 }}>
              Join thousands of hosts creating memorable digital invitations for weddings, birthdays, and grand celebrations.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              <button
                onClick={() => setShowBuilder(true)}
                className="btn btn-gold"
                style={{ padding: "16px 36px", fontSize: "1.02rem" }}
              >
                <span>Design Your Invitation Now</span>
                <ArrowRight size={18} />
              </button>
              <Link href="/login" className="btn btn-ghost-light" style={{ padding: "16px 28px", fontSize: "1.02rem" }}>
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= REFINED FOOTER ================= */}
      <footer style={{ backgroundColor: "var(--wine-dark)", color: "var(--pure-white)", borderTop: "1px solid rgba(214, 181, 116, 0.25)", padding: "70px 0 35px" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 40,
              marginBottom: 60,
            }}
          >
            {/* Brand column */}
            <div style={{ maxWidth: 320 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: "rgba(214, 181, 116, 0.2)",
                    border: "1px solid var(--champagne-gold)",
                    display: "grid",
                    placeItems: "center",
                    color: "var(--champagne-gold)",
                  }}
                >
                  <Sparkles size={18} />
                </div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 700, color: "var(--warm-ivory)" }}>
                  Invite<span style={{ color: "var(--champagne-gold)", fontStyle: "italic", marginLeft: 4 }}>Studio</span>
                </div>
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--champagne-light)", opacity: 0.85, lineHeight: 1.7, marginBottom: 18 }}>
                The atelier for bespoke digital invitations. Designed with luxury editorial aesthetics, instant sharing, and seamless guest coordination.
              </p>
              <div style={{ fontSize: "0.78rem", color: "var(--champagne-gold)", letterSpacing: "0.1em" }}>
                ✦ CRAFTED FOR SPECIAL CELEBRATIONS ✦
              </div>
            </div>

            {/* Occasions Column */}
            <div>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--champagne-gold)", marginBottom: 18 }}>
                Occasions
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, fontSize: "0.88rem", opacity: 0.85 }}>
                <li><a href="#designs" style={{ color: "inherit", textDecoration: "none" }}>Wedding Invitations</a></li>
                <li><a href="#designs" style={{ color: "inherit", textDecoration: "none" }}>Birthday Soirées</a></li>
                <li><a href="#designs" style={{ color: "inherit", textDecoration: "none" }}>Engagement Ceremonies</a></li>
                <li><a href="#designs" style={{ color: "inherit", textDecoration: "none" }}>Silver & Golden Anniversaries</a></li>
                <li><a href="#designs" style={{ color: "inherit", textDecoration: "none" }}>Baby Showers</a></li>
                <li><a href="#designs" style={{ color: "inherit", textDecoration: "none" }}>Festivals & Galas</a></li>
              </ul>
            </div>

            {/* Studio Features Column */}
            <div>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--champagne-gold)", marginBottom: 18 }}>
                Studio Features
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, fontSize: "0.88rem", opacity: 0.85 }}>
                <li>Instant WhatsApp Delivery</li>
                <li>Real-Time RSVP Tracking</li>
                <li>Calendar Integration (.ics & Google)</li>
                <li>Dedicated Hosted Webpage</li>
                <li>High-Resolution PNG Download</li>
                <li>Zero App Download For Guests</li>
              </ul>
            </div>

            {/* User Account & Access */}
            <div>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--champagne-gold)", marginBottom: 18 }}>
                Account & Access
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, fontSize: "0.88rem", opacity: 0.85 }}>
                <li><Link href="/login" style={{ color: "inherit", textDecoration: "none" }}>Sign In</Link></li>
                <li><Link href="/dashboard" style={{ color: "inherit", textDecoration: "none" }}>My Invitations</Link></li>
                <li><a href="#designs" style={{ color: "inherit", textDecoration: "none" }}>Template Gallery</a></li>
                <li><a href="#experience" style={{ color: "inherit", textDecoration: "none" }}>How It Works</a></li>
              </ul>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(214, 181, 116, 0.25)",
              paddingTop: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
              fontSize: "0.82rem",
              opacity: 0.75,
            }}
          >
            <div>© {new Date().getFullYear()} Invite Studio. All rights reserved.</div>
            <div style={{ display: "flex", gap: 20 }}>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Support</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= INTERACTIVE LIVE BUILDER MODAL ================= */}
      {showBuilder && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            backgroundColor: "rgba(42, 13, 25, 0.78)",
            backdropFilter: "blur(8px)",
            display: "grid",
            placeItems: "center",
            padding: "20px 16px",
            overflowY: "auto",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowBuilder(false);
          }}
        >
          <div
            style={{
              width: "min(1060px, 100%)",
              maxHeight: "calc(100vh - 40px)",
              backgroundColor: "var(--pure-white)",
              borderRadius: 24,
              boxShadow: "var(--shadow-xl)",
              border: "1px solid var(--border-gold)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "16px 24px",
                borderBottom: "1px solid var(--light-border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "var(--warm-ivory)",
                flexShrink: 0,
              }}
            >
              <div>
                <div className="section-eyebrow dark" style={{ fontSize: "0.68rem" }}>
                  <Sparkles size={12} />
                  <span>Interactive Invitation Studio</span>
                </div>
                <h3 style={{ fontSize: "clamp(1.2rem, 3vw, 1.45rem)", color: "var(--rich-burgundy)", margin: "4px 0 0" }}>
                  Design Your Invitation
                </h3>
              </div>
              <button
                onClick={() => setShowBuilder(false)}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  border: "1px solid var(--light-border)",
                  backgroundColor: "var(--pure-white)",
                  cursor: "pointer",
                  display: "grid",
                  placeItems: "center",
                  color: "var(--rich-burgundy)",
                }}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Mobile Tab Switcher (Visible only on mobile/tablet <= 900px) */}
            <div className="builder-mobile-tabs" style={{ display: "none" }}>
              <button
                type="button"
                onClick={() => setBuilderTab("edit")}
                className={`builder-tab-btn ${builderTab === "edit" ? "active" : ""}`}
              >
                1. Edit Details
              </button>
              <button
                type="button"
                onClick={() => setBuilderTab("preview")}
                className={`builder-tab-btn ${builderTab === "preview" ? "active" : ""}`}
              >
                2. Live Preview ✨
              </button>
            </div>

            {/* Modal Body: Two Columns */}
            <div
              className={`builder-modal-grid builder-active-tab-${builderTab}`}
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 0.9fr",
                overflowY: "auto",
                flex: 1,
                minHeight: 0,
              }}
            >
              {/* Left Column: Form Controls */}
              <div
                className="builder-left-col"
                style={{
                  padding: "clamp(16px, 3vw, 32px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  overflowY: "auto",
                }}
              >
                <div>
                  <label className="studio-label">Occasion</label>
                  <select
                    className="studio-input"
                    value={form.occasion}
                    onChange={(e) => updateForm("occasion", e.target.value)}
                  >
                    {["Wedding", "Engagement", "Haldi", "God Bharai", "Nikah", "Walima", "Reception", "Birthday", "Anniversary", "Baby Shower", "Festivals", "Corporate", "Other"].map((occ) => (
                      <option key={occ} value={occ}>
                        {occ}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label className="studio-label">Invitation Title</label>
                    <input
                      className="studio-input"
                      value={form.title}
                      onChange={(e) => updateForm("title", e.target.value)}
                      placeholder="e.g. A Day to Remember"
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <label className="studio-label">Host Name(s)</label>
                    <input
                      className="studio-input"
                      value={form.host}
                      onChange={(e) => updateForm("host", e.target.value)}
                      placeholder="e.g. Alex & Jamie"
                      maxLength={100}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label className="studio-label">Date</label>
                    <input
                      type="date"
                      className="studio-input"
                      value={form.date}
                      onChange={(e) => updateForm("date", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="studio-label">Time</label>
                    <input
                      type="time"
                      className="studio-input"
                      value={form.time}
                      onChange={(e) => updateForm("time", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="studio-label">Venue / Location</label>
                  <input
                    className="studio-input"
                    value={form.venue}
                    onChange={(e) => updateForm("venue", e.target.value)}
                    placeholder="e.g. The Grand Palace, Mumbai"
                    maxLength={200}
                  />
                </div>

                <div>
                  <label className="studio-label">Personal Message / Note for Guests</label>
                  <textarea
                    className="studio-input"
                    rows={3}
                    value={form.message}
                    onChange={(e) => updateForm("message", e.target.value)}
                    placeholder="Write a heartfelt invitation message..."
                    maxLength={600}
                  />
                </div>

                <div>
                  <label className="studio-label">Design Palette / Theme</label>
                  <select
                    className="studio-input"
                    value={form.theme}
                    onChange={(e) => updateForm("theme", e.target.value as Template["theme"])}
                  >
                    <option value="lotus">Pink Lotus Ganesh Vivah (Traditional Indian)</option>
                    <option value="aqua">Aqua Floral Royal Engagement (Ring Ceremony)</option>
                    <option value="wisteria">Lavender Wisteria Royal Wedding (Floral Arch)</option>
                    <option value="marathi">Traditional Marathi God Bharai (Dohale Jevan)</option>
                    <option value="haldi">Marigold Haldi Celebration (Turmeric & Bells)</option>
                    <option value="walima">Champagne Walima Elegance (Islamic Banquet)</option>
                    <option value="embossed">Burgundy Embossed Luxury (Embossed Stationery)</option>
                    <option value="wine">Deep Burgundy Royal Nikah / Royale</option>
                    <option value="mughal">Royal Mughal Matrimony (Palace Arch)</option>
                    <option value="celestial">Midnight Celestial Wedding (Starry Night)</option>
                    <option value="minimal">Minimal Editorial Modernist</option>
                    <option value="rose">Rose Garden Engagement & Romance</option>
                    <option value="champagne">Pearl Ivory & Champagne Gala</option>
                    <option value="reception">Royal Wedding Reception Banquet</option>
                    <option value="heritage">Heritage Terracotta & Saffron</option>
                  </select>
                </div>



                {/* Bottom Actions */}
                {feedback && (
                  <div
                    role="status"
                    style={{
                      padding: "10px 14px",
                      borderRadius: 10,
                      backgroundColor: "var(--deep-wine)",
                      color: "var(--champagne-gold)",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      border: "1px solid var(--border-gold)",
                    }}
                  >
                    <Sparkles size={14} />
                    <span>{feedback}</span>
                  </div>
                )}

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
                  <button
                    type="button"
                    onClick={handleDownloadBuilderPng}
                    disabled={isExporting}
                    className="btn btn-gold"
                    style={{ flex: 1, fontSize: "0.85rem", justifyContent: "center" }}
                  >
                    {isExporting ? <RefreshCw size={16} className="animate-spin" /> : <Download size={16} />}
                    <span>Download PNG</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppShareBuilder}
                    disabled={isExporting}
                    className="btn btn-primary"
                    style={{ flex: 1, fontSize: "0.85rem", justifyContent: "center" }}
                  >
                    <MessageCircle size={16} />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleEmailShareBuilder}
                    disabled={isExporting}
                    className="btn btn-secondary"
                    style={{ flex: 1, fontSize: "0.85rem", justifyContent: "center" }}
                  >
                    <Mail size={16} />
                    <span>Email</span>
                  </button>

                  <button
                    onClick={copyText}
                    className="btn btn-secondary"
                    style={{ padding: "10px 14px", fontSize: "0.85rem" }}
                    title="Copy Invitation Text"
                  >
                    {copied ? <Check size={16} color="var(--rich-burgundy)" /> : <Copy size={16} />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, borderTop: "1px solid var(--light-border)", paddingTop: 14 }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--muted-taupe)" }}>Want to host and save this online?</span>
                  <Link href="/dashboard" className="btn btn-gold btn-sm">
                    <span>Open in Full Studio Dashboard</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Right Column: Live Luxury Preview Canvas */}
              <div
                className="builder-right-col"
                style={{
                  backgroundColor: "var(--ivory-surface)",
                  borderLeft: "1px solid var(--light-border)",
                  padding: "clamp(20px, 3vw, 32px) clamp(14px, 2.5vw, 24px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  overflowY: "auto",
                  minWidth: 0,
                  width: "100%",
                }}
              >
                <div style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--champagne-gold)", marginBottom: 16, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                  <Sparkles size={13} />
                  <span>PREMIUM INVITATION PREVIEW</span>
                  <Sparkles size={13} />
                </div>

                <div style={{ width: "100%", maxWidth: 520, display: "flex", justifyContent: "center", minWidth: 0 }}>
                  <InvitationCard
                    ref={builderCardRef}
                    data={{
                      title: form.title || "Celebration Title",
                      host: form.host || "Host / Couple Name",
                      occasion: form.occasion,
                      date: form.date,
                      time: form.time,
                      venue: form.venue || "Grand Ballroom / Venue Address",
                      message: form.message,
                      theme: form.theme,
                    }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ================= QUICK CARD PREVIEW MODAL ================= */}
      {previewTemplate && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            backgroundColor: "rgba(42, 13, 25, 0.85)",
            backdropFilter: "blur(10px)",
            display: "grid",
            placeItems: "center",
            padding: "24px 16px",
            overflowY: "auto",
          }}
          onClick={() => setPreviewTemplate(null)}
        >
          <div
            style={{
              width: "min(560px, 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ alignSelf: "flex-end" }}>
              <button
                onClick={() => setPreviewTemplate(null)}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  border: "1px solid rgba(214, 181, 116, 0.5)",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(4px)",
                  color: "#FAF6EF",
                  cursor: "pointer",
                  display: "grid",
                  placeItems: "center",
                }}
                aria-label="Close Preview"
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <InvitationCard
                ref={quickPreviewRef}
                data={{
                  title: previewTemplate.sampleEvent,
                  host: previewTemplate.sampleHost,
                  occasion: previewTemplate.occasion === "All" ? "Wedding" : previewTemplate.occasion,
                  date: previewTemplate.sampleDate,
                  venue: previewTemplate.sampleVenue,
                  theme: previewTemplate.theme,
                  badge: previewTemplate.tag,
                }}
              />
            </div>

            <div style={{ display: "flex", gap: 12, width: "100%", maxWidth: 520, marginTop: 4 }}>
              <button
                type="button"
                onClick={handleDownloadQuickPreviewPng}
                disabled={isExporting}
                className="btn btn-secondary"
                style={{ flex: 1, justifyContent: "center", backgroundColor: "rgba(255,255,255,0.9)" }}
              >
                {isExporting ? <RefreshCw size={16} className="animate-spin" /> : <Download size={16} />}
                <span>Download Sample PNG</span>
              </button>

              <button
                onClick={() => {
                  const t = previewTemplate;
                  setPreviewTemplate(null);
                  openBuilderWith(t);
                }}
                className="btn btn-gold"
                style={{ flex: 1, justifyContent: "center" }}
              >
                <span>Customize This Design</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global CSS Responsive Helpers */}
      <style jsx global>{`
        .builder-mobile-tabs {
          display: none;
          grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid var(--light-border);
          background-color: var(--warm-ivory);
          padding: 8px 12px;
          gap: 8px;
        }

        .builder-tab-btn {
          padding: 10px 14px;
          border-radius: 9999px;
          border: 1px solid var(--light-border);
          background-color: var(--pure-white);
          color: var(--charcoal);
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .builder-tab-btn.active {
          background-color: var(--rich-burgundy);
          color: var(--pure-white);
          border-color: var(--rich-burgundy);
          box-shadow: 0 2px 8px rgba(101, 30, 50, 0.2);
        }

        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-grid h1 {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-grid p {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-grid .hero-actions {
            justify-content: center;
          }
          .builder-mobile-tabs {
            display: grid !important;
          }
          .builder-modal-grid {
            grid-template-columns: 1fr !important;
            display: block !important;
          }
          .builder-modal-grid.builder-active-tab-edit .builder-right-col {
            display: none !important;
          }
          .builder-modal-grid.builder-active-tab-preview .builder-left-col {
            display: none !important;
          }
          .builder-right-col {
            border-left: none !important;
            border-top: 1px solid var(--light-border);
            padding: 20px 14px !important;
          }
        }
      `}</style>
    </div>
  );
}

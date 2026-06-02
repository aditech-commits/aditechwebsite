"use client";

import { useState } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Smartphone,
  TrendingUp,
  Palette,
  Clapperboard,
  Wallet,
  Scan,
  ShieldCheck,
  Info,
  Layers,
  Zap,
  BadgeDollarSign,
  Globe,
  Video,
  Megaphone,
  Mail,
  MessageSquare,
  MapPin,
  ExternalLink,
  CheckCircle,
  Clock,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Estimator State
  const [estMode, setEstMode] = useState("admob"); // 'admob' | 'custom'
  const [estMonths, setEstMonths] = useState(6);

  // Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formService, setFormService] = useState("admob");
  const [formBrief, setFormBrief] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Handle Tab Swapping
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Estimator logic
  const baseMonthlyPrice = estMode === "admob" ? 180000 : 350000;
  let finalPricePerMonth = baseMonthlyPrice;
  if (estMonths >= 12 && estMonths < 24) {
    finalPricePerMonth = baseMonthlyPrice * 0.9; // 10% Discount
  } else if (estMonths >= 24) {
    finalPricePerMonth = baseMonthlyPrice * 0.8; // 20% Discount
  }

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(finalPricePerMonth);

  // Form submit handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          service: formService,
          brief: formBrief,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitSuccess(true);
        setFormName("");
        setFormEmail("");
        setFormBrief("");
      } else {
        setSubmitError(result.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setSubmitError("A connection error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-canvas text-brand-slateDark font-sans overflow-x-hidden">
      {/* Ambient Dynamic Lighting Backdrops */}
      <div className="absolute top-0 left-0 w-full h-[800px] overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] ambient-glow-indigo"></div>
        <div className="absolute top-60 -right-40 w-[600px] h-[600px] ambient-glow-rose"></div>
        <div className="absolute inset-0 animate-grid-light opacity-75"></div>
      </div>

      {/* Global Glass Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 border-b border-brand-slateDark/[0.06]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Brand Logotype */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleTabChange("home");
            }}
            className="flex items-center gap-2 group"
          >
            <span className="font-display font-bold text-xl tracking-tight uppercase luxury-text-gradient">
              ADITECH
            </span>
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-indigo to-brand-rose animate-pulse"></span>
          </a>

          {/* Desktop Navigation Routes */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleTabChange("home")}
              className={`font-medium text-sm transition-colors hover:text-brand-indigo ${
                activeTab === "home" ? "text-brand-indigo" : "text-brand-slateMuted"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleTabChange("about")}
              className={`font-medium text-sm transition-colors hover:text-brand-indigo ${
                activeTab === "about" ? "text-brand-indigo" : "text-brand-slateMuted"
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleTabChange("services")}
              className={`font-medium text-sm transition-colors hover:text-brand-indigo ${
                activeTab === "services" ? "text-brand-indigo" : "text-brand-slateMuted"
              }`}
            >
              Services
            </button>
            <button
              onClick={() => handleTabChange("contact")}
              className={`font-medium text-sm transition-colors hover:text-brand-indigo ${
                activeTab === "contact" ? "text-brand-indigo" : "text-brand-slateMuted"
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* CTA Hub */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleTabChange("contact")}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-brand-indigo to-brand-rose hover:opacity-90 shadow-lg shadow-brand-indigo/10 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Initiate Project
            </button>
            {/* Mobile Navigation Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-brand-slateDark hover:bg-brand-slateDark/5 rounded-full transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Portal */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-brand-slateDark/10 px-6 py-8 flex flex-col gap-4 shadow-xl animate-fade-in">
            <button
              onClick={() => handleTabChange("home")}
              className={`text-left font-medium text-base py-2 hover:text-brand-indigo ${
                activeTab === "home" ? "text-brand-indigo" : "text-brand-slateDark"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleTabChange("about")}
              className={`text-left font-medium text-base py-2 hover:text-brand-indigo ${
                activeTab === "about" ? "text-brand-indigo" : "text-brand-slateDark"
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleTabChange("services")}
              className={`text-left font-medium text-base py-2 hover:text-brand-indigo ${
                activeTab === "services" ? "text-brand-indigo" : "text-brand-slateDark"
              }`}
            >
              Services
            </button>
            <button
              onClick={() => handleTabChange("contact")}
              className={`text-left font-medium text-base py-2 hover:text-brand-indigo ${
                activeTab === "contact" ? "text-brand-indigo" : "text-brand-slateDark"
              }`}
            >
              Contact Us
            </button>
            <button
              onClick={() => handleTabChange("contact")}
              className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-rose text-white font-semibold text-sm"
            >
              Initiate Project
            </button>
          </div>
        )}
      </header>

      <main className="relative z-10 pt-28 pb-20">
        {/* ======================================================== */}
        {/* SCREEN 1: LANDING PAGE VIEW (HOME) */}
        {/* ======================================================== */}
        {activeTab === "home" && (
          <section className="max-w-7xl mx-auto px-6 animate-fade-in">
            {/* Premium Hero Header */}
            <div className="text-center max-w-4xl mx-auto mt-8 sm:mt-12 mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-indigo/5 border border-brand-indigo/10 mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-indigo"></span>
                <span className="text-xs font-semibold tracking-wider uppercase text-brand-indigo">
                  Software & Monetization Engineering
                </span>
              </div>

              <h1 className="font-display font-bold text-4xl sm:text-6xl tracking-tight leading-none mb-6 luxury-text-gradient">
                We Build High-Yield Digital Solutions That Command Authority.
              </h1>

              <p className="text-brand-slateMuted text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
                Aditech Global Service transforms enterprise complexity into gorgeous,
                high-performance software. We build bulletproof cross-platform mobile apps,
                bespoke fintech solutions, e-commerce architectures, and high-CPM Admob utility networks.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => handleTabChange("contact")}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-indigo text-white font-semibold text-sm shadow-xl shadow-brand-indigo/20 hover:bg-brand-indigo/90 hover:shadow-brand-indigo/30 transform hover:-translate-y-0.5 transition-all"
                >
                  Get Started
                </button>
                <button
                  onClick={() => handleTabChange("services")}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-brand-slateDark font-semibold text-sm border border-brand-slateDark/10 hover:border-brand-indigo/30 hover:bg-brand-canvas transition-all flex items-center justify-center gap-2"
                >
                  Explore Capabilities <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Trust Bar */}
            <div className="border-y border-brand-slateDark/5 py-10 mb-20">
              <p className="text-center text-xs font-semibold tracking-wider uppercase text-brand-slateLight mb-6">
                Trusted by ambitious tech founders and modern enterprises globally
              </p>
              <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-50 hover:opacity-75 transition-opacity duration-300">
                <span className="font-display font-bold tracking-widest text-lg text-brand-slateDark">
                  VALO.AI
                </span>
                <span className="font-display font-bold tracking-widest text-lg text-brand-slateDark">
                  NEXUS
                </span>
                <span className="font-display font-bold tracking-widest text-lg text-brand-slateDark">
                  PAYSTREAM
                </span>
                <span className="font-display font-bold tracking-widest text-lg text-brand-slateDark">
                  FLOWSTATE
                </span>
              </div>
            </div>

            {/* Featured Services Highlights (Bento Section) */}
            <div className="mb-24">
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
                <div>
                  <span className="text-xs font-bold tracking-wider uppercase text-brand-indigo">
                    Our Capabilities
                  </span>
                  <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-brand-slateDark mt-2">
                    Bespoke Technologies Built To Scale
                  </h2>
                </div>
                <button
                  onClick={() => handleTabChange("services")}
                  className="text-sm font-semibold text-brand-indigo hover:text-brand-rose transition-colors flex items-center gap-2 mt-4 md:mt-0"
                >
                  View Complete Catalog <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Bento Grid Item 1 (Wide): Cross Platform Mobile & Web */}
                <div className="glass-card p-8 rounded-2xl md:col-span-2 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-brand-indigo/10 flex items-center justify-center text-brand-indigo mb-6">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-3">
                      Enterprise App & Web Engineering
                    </h3>
                    <p className="text-brand-slateMuted text-sm leading-relaxed mb-6">
                      Unified codebases delivering native-grade iOS & Android platforms alongside lightning-fast server-rendered web systems. Specialized in complex SaaS frameworks, automated banking portals, high-security fintech API layers, and highly optimized e-commerce software.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-brand-canvas border border-brand-slateDark/5 text-xs font-medium text-brand-slateMuted">
                      Flutter
                    </span>
                    <span className="px-3 py-1 rounded-full bg-brand-canvas border border-brand-slateDark/5 text-xs font-medium text-brand-slateMuted">
                      React Native
                    </span>
                    <span className="px-3 py-1 rounded-full bg-brand-canvas border border-brand-slateDark/5 text-xs font-medium text-brand-slateMuted">
                      Next.js
                    </span>
                    <span className="px-3 py-1 rounded-full bg-brand-canvas border border-brand-slateDark/5 text-xs font-medium text-brand-slateMuted">
                      Supabase
                    </span>
                  </div>
                </div>

                {/* Bento Grid Item 2: Recommended Admob Product */}
                <div className="glass-card p-8 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">
                      Recommended Model
                    </span>
                    <h3 className="font-display font-bold text-xl mb-3">
                      High-CPM Admob Utility Systems
                    </h3>
                    <p className="text-brand-slateMuted text-xs leading-relaxed">
                      Unlock high yield programmatic monetization. We construct AI-assisted workspace suites (such as AI PDF Document Workspace & Utilities) mapped with advanced mediation waterfalls, native banner layout models, and premium targeted keywords for maximum daily active retention.
                    </p>
                  </div>
                  <div className="pt-6">
                    <span
                      className="text-xs font-semibold text-brand-indigo flex items-center gap-1 hover:underline cursor-pointer"
                      onClick={() => handleTabChange("services")}
                    >
                      Learn monetization model <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Bento Grid Item 3: Identity & Creative Design */}
                <div className="glass-card p-8 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-brand-rose/10 flex items-center justify-center text-brand-rose mb-6">
                      <Palette className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-lg mb-3">
                      Bespoke UI/UX & Graphics
                    </h3>
                    <p className="text-brand-slateMuted text-xs leading-relaxed">
                      Converting branding layouts into high-conversion digital realities. We structure design systems from scratch, establishing elite visual presence that instantly raises brand authority.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-brand-slateDark/5 flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-brand-canvas border text-[10px] text-brand-slateLight">
                      Design Architecture
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-brand-canvas border text-[10px] text-brand-slateLight">
                      Figma Systems
                    </span>
                  </div>
                </div>

                {/* Bento Grid Item 4 (Wide): Digital Media Editing & Marketing Funnels */}
                <div className="glass-card p-8 rounded-2xl md:col-span-2 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-600 mb-6">
                      <Clapperboard className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-3">
                      High-Impact Media Post-Production & Marketing
                    </h3>
                    <p className="text-brand-slateMuted text-sm leading-relaxed mb-4">
                      We craft captivating visual narratives, ranging from highly polished SaaS explainer animations to high-performance advertising campaigns. Backed by high-ticket performance marketing arrays across meta platforms, designed to scale high-intent pipelines systematically.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-brand-canvas border border-brand-slateDark/5 text-xs font-medium text-brand-slateMuted">
                      DaVinci Colorist
                    </span>
                    <span className="px-3 py-1 rounded-full bg-brand-canvas border border-brand-slateDark/5 text-xs font-medium text-brand-slateMuted">
                      Meta Media Funnels
                    </span>
                    <span className="px-3 py-1 rounded-full bg-brand-canvas border border-brand-slateDark/5 text-xs font-medium text-brand-slateMuted">
                      Brand Storyboards
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Mockups Showcase Component */}
            <div className="mb-20">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-xs font-bold tracking-wider uppercase text-brand-rose">
                  Selected Artifacts
                </span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-brand-slateDark mt-2">
                  Engineered & Active Live Showcases
                </h2>
                <p className="text-brand-slateMuted text-sm mt-3">
                  An overview of interface systems developed and scaled by Aditech Global Service.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Mockup 1: Custom Fintech Mobile Dashboard */}
                <div className="glass-card overflow-hidden p-8 rounded-2xl flex flex-col justify-between">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-indigo"></span>
                      <span className="text-xs font-semibold uppercase tracking-widest text-brand-slateMuted">
                        Mobile App Architecture
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-2xl text-brand-slateDark">
                      The Apex Finance App
                    </h4>
                    <p className="text-brand-slateMuted text-xs mt-1">
                      Cross-platform digital banking ecosystem handling automated wire processing and localized wallets.
                    </p>
                  </div>

                  {/* Styled Mobile Frame Mockup inside UI */}
                  <div className="bg-brand-canvas/60 border border-brand-slateDark/5 rounded-2xl p-6 mt-4 relative overflow-hidden flex flex-col gap-4">
                    <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-brand-slateDark/[0.05]">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-brand-indigo/10 flex items-center justify-center text-brand-indigo">
                          <Wallet className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] text-brand-slateLight">Available Balance</p>
                          <p className="text-xs font-bold text-brand-slateDark">$384,120.00</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-semibold flex items-center gap-0.5">
                        <TrendingUp className="w-2.5 h-2.5" /> +14.2%
                      </span>
                    </div>

                    {/* Dummy Analytics Graph (Visual representation) */}
                    <div className="flex items-end justify-between h-20 pt-4">
                      <div className="w-4 bg-brand-indigo/20 h-8 rounded-sm"></div>
                      <div className="w-4 bg-brand-indigo/30 h-12 rounded-sm"></div>
                      <div className="w-4 bg-brand-indigo/40 h-10 rounded-sm"></div>
                      <div className="w-4 bg-brand-indigo/50 h-14 rounded-sm"></div>
                      <div className="w-4 bg-brand-indigo/70 h-[72px] rounded-sm"></div>
                      <div className="w-4 bg-brand-indigo/90 h-[55px] rounded-sm"></div>
                      <div className="w-4 bg-gradient-to-t from-brand-indigo to-brand-rose h-20 rounded-sm"></div>
                    </div>
                  </div>
                </div>

                {/* Mockup 2: Smart Admob Productivity Suite App */}
                <div className="glass-card overflow-hidden p-8 rounded-2xl flex flex-col justify-between">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      <span className="text-xs font-semibold uppercase tracking-widest text-brand-slateMuted">
                        Recommended Admob Ecosystem
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-2xl text-brand-slateDark">
                      AI Scanner & Productivity Suite
                    </h4>
                    <p className="text-brand-slateMuted text-xs mt-1">
                      High-utilization smart scanner engineered with programmatically optimized interstitial mediation setups.
                    </p>
                  </div>

                  {/* Styled Monetized App Mockup showing clean ads layout */}
                  <div className="bg-brand-canvas/60 border border-brand-slateDark/5 rounded-2xl p-6 mt-4 relative overflow-hidden flex flex-col gap-4">
                    {/* Smart Utilities Widget inside UI */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white p-3 rounded-xl border border-brand-slateDark/[0.05] flex flex-col gap-1">
                        <Scan className="w-4 h-4 text-brand-indigo" />
                        <p className="text-[10px] font-bold mt-1">Instant Smart Scan</p>
                        <p className="text-[8px] text-brand-slateLight">AI OCR Text Extraction</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-brand-slateDark/[0.05] flex flex-col gap-1">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        <p className="text-[10px] font-bold mt-1">Private VPN Node</p>
                        <p className="text-[8px] text-brand-slateLight">Fast secure protocol</p>
                      </div>
                    </div>

                    {/* High CPM Admob Unit Preview Block */}
                    <div className="bg-brand-indigo/[0.03] border-2 border-dashed border-brand-indigo/20 p-2.5 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="bg-brand-indigo/10 text-brand-indigo text-[8px] font-extrabold px-1.5 py-0.5 rounded border border-brand-indigo/20">
                          SPONSOR AD
                        </span>
                        <span className="text-[9px] font-semibold text-brand-slateMuted">
                          High-Value Advertiser Stream
                        </span>
                      </div>
                      <Info className="w-3.5 h-3.5 text-brand-slateLight" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ======================================================== */}
        {/* SCREEN 2: ABOUT US PAGE VIEW */}
        {/* ======================================================== */}
        {activeTab === "about" && (
          <section className="max-w-7xl mx-auto px-6 animate-fade-in">
            {/* Editorial About Title */}
            <div className="max-w-4xl mx-auto text-center mt-12 mb-20">
              <span className="text-xs font-bold tracking-wider uppercase text-brand-indigo">
                Who We Are
              </span>
              <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-brand-slateDark mt-4 mb-6 leading-tight">
                We Bridge The Chasm Between Complex Engineering & High-End Visual Design.
              </h1>
              <p className="text-brand-slateMuted text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                At Aditech Global Service, we don't believe in average development. We structure highly polished digital products that elevate your company's presence, streamline monetization flow, and scale customer pipelines smoothly.
              </p>
            </div>

            {/* Strategic Metrics Counters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-brand-slateDark/5 py-12 mb-20">
              <div className="text-center">
                <p className="font-display font-extrabold text-5xl sm:text-6xl text-brand-slateDark">100%</p>
                <p className="text-xs font-bold tracking-wider uppercase text-brand-slateLight mt-2">
                  App Store Approval Success Rate
                </p>
              </div>
              <div className="text-center border-y md:border-y-0 md:border-x border-brand-slateDark/5 py-8 md:py-0">
                <p className="font-display font-extrabold text-5xl sm:text-6xl text-brand-slateDark">20M+</p>
                <p className="text-xs font-bold tracking-wider uppercase text-brand-slateLight mt-2">
                  User Reach on Our Software Ecosystems
                </p>
              </div>
              <div className="text-center">
                <p className="font-display font-extrabold text-5xl sm:text-6xl text-brand-slateDark">₦1.5B+</p>
                <p className="text-xs font-bold tracking-wider uppercase text-brand-slateLight mt-2">
                  Monetized Revenue Handled
                </p>
              </div>
            </div>

            {/* Three Pillars of Engineering Core Values */}
            <div className="mb-12">
              <div className="text-center mb-16">
                <h2 className="font-display font-bold text-3xl text-brand-slateDark">
                  The Aditech Standard of Quality
                </h2>
                <p className="text-brand-slateMuted text-sm mt-2">
                  Our baseline standards built into every single client execution phase.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white border border-brand-slateDark/[0.06] p-8 rounded-2xl shadow-sm hover:border-brand-indigo/25 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-brand-indigo/5 flex items-center justify-center text-brand-indigo mb-6">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-3">Architectural Precision</h3>
                  <p className="text-brand-slateMuted text-xs leading-relaxed">
                    We compile code following rigorous enterprise patterns. We never cut corners with messy scripts or unsustainable templates. Everything is robustly modularized and optimized.
                  </p>
                </div>

                <div className="bg-white border border-brand-slateDark/[0.06] p-8 rounded-2xl shadow-sm hover:border-brand-rose/25 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-brand-rose/5 flex items-center justify-center text-brand-rose mb-6">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-3">Instant Load Speed</h3>
                  <p className="text-brand-slateMuted text-xs leading-relaxed">
                    Every millisecond of latency shaves percentages off your profit margins. We maintain a baseline rule: instantaneous state loads, strict image processing pipeline routines, and rapid UI execution.
                  </p>
                </div>

                <div className="bg-white border border-brand-slateDark/[0.06] p-8 rounded-2xl shadow-sm hover:border-brand-indigo/25 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/5 flex items-center justify-center text-emerald-600 mb-6">
                    <BadgeDollarSign className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-3">Monetization-First Design</h3>
                  <p className="text-brand-slateMuted text-xs leading-relaxed">
                    Whether deploying high-ticket fintech funnels, modern storefronts, or high-yield Admob mediation modules, our setups prioritize long-term, repeatable revenue.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ======================================================== */}
        {/* SCREEN 3: EXTENDED CAPABILITIES (SERVICES) */}
        {/* ======================================================== */}
        {activeTab === "services" && (
          <section className="max-w-7xl mx-auto px-6 animate-fade-in">
            {/* Section Title */}
            <div className="max-w-3xl mx-auto text-center mt-12 mb-20">
              <span className="text-xs font-bold tracking-wider uppercase text-brand-indigo">
                Service Catalogue
              </span>
              <h1 className="font-display font-bold text-4xl sm:text-5xl text-brand-slateDark mt-4 mb-6 leading-tight">
                Comprehensive Technology & Design Services
              </h1>
              <p className="text-brand-slateMuted text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
                From highly functional, secure web structures to specialized, passive ad-monetized software suites, we build robust products engineered for scalability.
              </p>
            </div>

            {/* Core Catalog Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
              {/* Core Service 1 */}
              <div className="glass-card p-8 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-brand-indigo/10 flex items-center justify-center text-brand-indigo mb-6">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-3">Native-Grade Mobile Apps</h3>
                  <p className="text-brand-slateMuted text-xs leading-relaxed mb-6">
                    High-performance iOS & Android application development compiled with Flutter and React Native. Fully optimized for fluid screen translations, complex storage structures, and high efficiency.
                  </p>
                </div>
                <div className="border-t border-brand-slateDark/5 pt-4 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-brand-canvas text-[10px] text-brand-slateLight font-semibold">
                    Flutter
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-brand-canvas text-[10px] text-brand-slateLight font-semibold">
                    React Native
                  </span>
                </div>
              </div>

              {/* Core Service 2 */}
              <div className="glass-card p-8 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-brand-indigo/10 flex items-center justify-center text-brand-indigo mb-6">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-3">Enterprise Web Architecture</h3>
                  <p className="text-brand-slateMuted text-xs leading-relaxed mb-6">
                    Bespoke websites and custom software solutions designed for instantaneous page loads and advanced technical SEO optimization. From high-conversion SaaS dashboard frameworks to secure custom portals.
                  </p>
                </div>
                <div className="border-t border-brand-slateDark/5 pt-4 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-brand-canvas text-[10px] text-brand-slateLight font-semibold">
                    Next.js
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-brand-canvas text-[10px] text-brand-slateLight font-semibold">
                    Node.js
                  </span>
                </div>
              </div>

              {/* Core Service 3 */}
              <div className="glass-card p-8 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6">
                    <BadgeDollarSign className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-3">High-Yield Admob Utility Apps</h3>
                  <p className="text-brand-slateMuted text-xs leading-relaxed mb-6">
                    Leverage programmatic utility loops. We design AI-powered document managers, scanner widgets, or secure VPN frameworks with integrated programmatic Admob networks, optimized to generate passive ad-revenue efficiently.
                  </p>
                </div>
                <div className="border-t border-brand-slateDark/5 pt-4 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-brand-canvas text-[10px] text-brand-slateLight font-semibold">
                    Admob SDK
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-brand-canvas text-[10px] text-brand-slateLight font-semibold">
                    AI Integrations
                  </span>
                </div>
              </div>

              {/* Core Service 4 */}
              <div className="glass-card p-8 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-brand-rose/10 flex items-center justify-center text-brand-rose mb-6">
                    <Palette className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-3">Visual Brand & Graphic Systems</h3>
                  <p className="text-brand-slateMuted text-xs leading-relaxed mb-6">
                    High-ticket digital design, corporate visual identity systems, and conversion-focused landing page UI/UX frameworks built to raise your business profile immediately.
                  </p>
                </div>
                <div className="border-t border-brand-slateDark/5 pt-4 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-brand-canvas text-[10px] text-brand-slateLight font-semibold">
                    Figma
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-brand-canvas text-[10px] text-brand-slateLight font-semibold">
                    Illustrator
                  </span>
                </div>
              </div>

              {/* Core Service 5 */}
              <div className="glass-card p-8 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-brand-rose/10 flex items-center justify-center text-brand-rose mb-6">
                    <Video className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-3">Cinematic Video Production</h3>
                  <p className="text-brand-slateMuted text-xs leading-relaxed mb-6">
                    High-impact cinematic editing, animated SaaS explainer videos, dynamic promotional advertisements, and top-tier post-production color grading designed to drive engagement.
                  </p>
                </div>
                <div className="border-t border-brand-slateDark/5 pt-4 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-brand-canvas text-[10px] text-brand-slateLight font-semibold">
                    Premiere Pro
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-brand-canvas text-[10px] text-brand-slateLight font-semibold">
                    After Effects
                  </span>
                </div>
              </div>

              {/* Core Service 6 */}
              <div className="glass-card p-8 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600 mb-6">
                    <Megaphone className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-3">Performance SMM Marketing</h3>
                  <p className="text-brand-slateMuted text-xs leading-relaxed mb-6">
                    Comprehensive social media growth management, highly targeted Meta and Google advertising funnels, and organic community-building systems tailored to capture market share.
                  </p>
                </div>
                <div className="border-t border-brand-slateDark/5 pt-4 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-brand-canvas text-[10px] text-brand-slateLight font-semibold">
                    Paid Campaigns
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-brand-canvas text-[10px] text-brand-slateLight font-semibold">
                    Growth Analytics
                  </span>
                </div>
              </div>
            </div>

            {/* INTERACTIVE SUBSCRIPTION COST ESTIMATOR WIDGET (AaaS Platform Mock) */}
            <div className="max-w-4xl mx-auto bg-white border border-brand-slateDark/[0.08] p-8 sm:p-12 rounded-3xl shadow-xl shadow-brand-indigo/[0.01] relative overflow-hidden mb-12">
              <div className="absolute -top-12 -right-12 w-48 h-48 ambient-glow-indigo"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-indigo"></span>
                  <span className="text-xs font-bold tracking-widest uppercase text-brand-indigo">
                    Interactive Planner
                  </span>
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-slateDark mb-4">
                  Estimate Your System & Monetization Scope
                </h2>
                <p className="text-brand-slateMuted text-xs sm:text-sm mb-10 max-w-xl">
                  Pick a technology focus, adjust your required deployment scale, and see your custom project pricing instantly. Select monthly subscription tiers or outright passive software model ownership.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Configurer Controls */}
                  <div className="flex flex-col gap-6">
                    <div>
                      <label className="block text-xs font-bold text-brand-slateDark uppercase tracking-widest mb-3">
                        1. Select Core Service Type
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setEstMode("admob")}
                          className={`px-4 py-3 rounded-xl border text-left text-xs font-bold transition-all ${
                            estMode === "admob"
                              ? "border-brand-indigo bg-brand-indigo/5 text-brand-indigo"
                              : "border-brand-slateDark/10 text-brand-slateMuted hover:border-brand-indigo/40"
                          }`}
                        >
                          Admob Utility App
                        </button>
                        <button
                          onClick={() => setEstMode("custom")}
                          className={`px-4 py-3 rounded-xl border text-left text-xs font-bold transition-all ${
                            estMode === "custom"
                              ? "border-brand-indigo bg-brand-indigo/5 text-brand-indigo"
                              : "border-brand-slateDark/10 text-brand-slateMuted hover:border-brand-indigo/40"
                          }`}
                        >
                          SaaS Web / App
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="block text-xs font-bold text-brand-slateDark uppercase tracking-widest">
                          2. Subscription Timeline
                        </label>
                        <span className="text-xs font-bold text-brand-indigo bg-brand-indigo/10 px-2 py-0.5 rounded">
                          {estMonths} {estMonths === 1 ? "Month" : "Months"}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="36"
                        value={estMonths}
                        onChange={(e) => setEstMonths(parseInt(e.target.value))}
                        className="w-full accent-brand-indigo cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-brand-slateLight font-semibold mt-1">
                        <span>1 Month</span>
                        <span>12 Months</span>
                        <span>24 Months</span>
                        <span>36 Months</span>
                      </div>
                    </div>
                  </div>

                  {/* Price Output & CTA Card */}
                  <div className="bg-brand-canvas/60 border border-brand-slateDark/[0.05] p-6 rounded-2xl flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-bold text-brand-slateLight uppercase tracking-wider mb-2">
                        {estMode === "admob"
                          ? "High-Yield Admob Utility Package"
                          : "Enterprise Custom SaaS / App Frameworks"}
                      </p>
                      <div className="flex items-baseline gap-1">
                        <span className="font-display font-extrabold text-3xl sm:text-4xl text-brand-slateDark">
                          {formattedPrice}
                        </span>
                        <span className="text-xs text-brand-slateLight">/month</span>
                      </div>
                      <p className="text-[10px] text-brand-slateMuted mt-4 leading-relaxed">
                        {estMode === "admob"
                          ? "Includes complete product setup: clean utility UX architecture, live optimized Admob ad placement waterfall, premium keyword targeting profiles, and dynamic update maintenance."
                          : "Includes full enterprise specs: headless cloud DB integration, native UX layouts, high-performance API structures, SEO optimization, and secure operations management support."}
                      </p>
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={() => handleTabChange("contact")}
                        className="w-full text-center py-3.5 rounded-xl bg-brand-indigo text-white font-semibold text-sm hover:bg-brand-indigo/90 transition-colors"
                      >
                        Initiate Order Pipeline
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ======================================================== */}
        {/* SCREEN 4: CONVERSION GATEWAY (CONTACT US) */}
        {/* ======================================================== */}
        {activeTab === "contact" && (
          <section className="max-w-7xl mx-auto px-6 animate-fade-in">
            {/* Layout Title */}
            <div className="max-w-3xl mx-auto text-center mt-12 mb-16">
              <span className="text-xs font-bold tracking-wider uppercase text-brand-indigo">
                Contact Portal
              </span>
              <h1 className="font-display font-bold text-4xl sm:text-5xl text-brand-slateDark mt-4 leading-tight">
                Let’s Engineer Something Exceptional Together
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
              {/* Left Side: Detail items & Context */}
              <div className="md:col-span-5 flex flex-col gap-10">
                <div>
                  <h3 className="font-display font-bold text-2xl text-brand-slateDark mb-4">
                    Establish A Strategic Engineering Pipeline
                  </h3>
                  <p className="text-brand-slateMuted text-sm leading-relaxed">
                    Have a complete project specification ready, or need high-tier guidance on setting up passive Admob app architecture? Connect directly with our lead design team.
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-indigo/5 flex items-center justify-center text-brand-indigo shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-brand-slateDark">
                        Direct Client Desk
                      </p>
                      <a
                        href="mailto:aditechglobalservice@gmail.com"
                        className="text-sm text-brand-slateMuted hover:text-brand-indigo transition-colors"
                      >
                        aditechglobalservice@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/5 flex items-center justify-center text-emerald-600 shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-brand-slateDark">
                        WhatsApp Instant Support
                      </p>
                      <a
                        href="https://wa.me/2349135271024"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-emerald-600 hover:underline transition-colors flex items-center gap-1"
                      >
                        Connect Instantly <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-rose/5 flex items-center justify-center text-brand-rose shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-brand-slateDark">
                        Operational Coordinates
                      </p>
                      <p className="text-sm text-brand-slateMuted">
                        Lagos, Nigeria & Distributed Globally
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Custom Glassmorphic Form Card */}
              <div className="md:col-span-7 bg-white border border-brand-slateDark/[0.08] p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 ambient-glow-rose font-semibold"></div>

                {submitSuccess ? (
                  <div className="relative z-10 flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h3 className="font-display font-bold text-2xl text-brand-slateDark mb-3">
                      Strategy Pipeline Initialized!
                    </h3>
                    <p className="text-brand-slateMuted text-sm max-w-sm mb-8">
                      Thank you for reaching out. The Aditech engineering lead desk will connect with you via email within the next 4 hours.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="px-6 py-2.5 rounded-full border border-brand-slateDark/10 text-xs font-bold text-brand-slateDark hover:bg-brand-canvas transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="relative z-10 flex flex-col gap-6">
                    <h3 className="font-display font-bold text-xl text-brand-slateDark border-b border-brand-slateDark/5 pb-4 mb-2">
                      Initialize Your Strategy Call
                    </h3>

                    {submitError && (
                      <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold leading-relaxed animate-fade-in">
                        {submitError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-brand-slateDark uppercase tracking-widest mb-2">
                          Corporate Identity / Name
                        </label>
                        <input
                          required
                          type="text"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="e.g. John Doe"
                          className="w-full px-4 py-3 bg-brand-canvas/50 border border-brand-slateDark/10 rounded-xl focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo text-sm outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-brand-slateDark uppercase tracking-widest mb-2">
                          Contact Email
                        </label>
                        <input
                          required
                          type="email"
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="e.g. john@company.com"
                          className="w-full px-4 py-3 bg-brand-canvas/50 border border-brand-slateDark/10 rounded-xl focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo text-sm outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-slateDark uppercase tracking-widest mb-2">
                        Chosen Service Segment
                      </label>
                      <select
                        value={formService}
                        onChange={(e) => setFormService(e.target.value)}
                        className="w-full px-4 py-3 bg-brand-canvas/50 border border-brand-slateDark/10 rounded-xl focus:border-brand-indigo text-sm outline-none transition-all"
                      >
                        <option value="admob">Passive Admob Monetized Apps (Utility)</option>
                        <option value="custom-apps">Cross-Platform Mobile App (iOS / Android)</option>
                        <option value="web-dev">Web App / SaaS / E-commerce Development</option>
                        <option value="creative">Creative Design & Cinematic Video Editing</option>
                        <option value="marketing">Social Media Marketing Funnel Setups</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-slateDark uppercase tracking-widest mb-2">
                        Project Brief / Message
                      </label>
                      <textarea
                        required
                        rows="4"
                        value={formBrief}
                        onChange={(e) => setFormBrief(e.target.value)}
                        placeholder="Briefly outline your software goals, desired timeline, or targeted monetization requirements..."
                        className="w-full px-4 py-3 bg-brand-canvas/50 border border-brand-slateDark/10 rounded-xl focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo text-sm outline-none transition-all"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-rose text-white font-bold text-sm tracking-wider uppercase shadow-xl shadow-brand-indigo/10 hover:opacity-95 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="w-4 h-4 animate-spin" />
                          Processing strategy call request...
                        </>
                      ) : (
                        "Submit Form & Book Strategy Call"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Premium Minimalist Footer */}
      <footer className="border-t border-brand-slateDark/5 py-12 relative z-10 bg-white/40">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleTabChange("home")}
          >
            <span className="font-display font-bold text-base tracking-tight uppercase text-brand-slateDark">
              ADITECH GLOBAL
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-rose"></span>
          </div>

          <p className="text-xs text-brand-slateLight text-center sm:text-left">
            &copy; 2026 Aditech Global Service. All rights reserved. Precision Software Systems.
          </p>

          <div className="flex items-center gap-4 text-xs text-brand-slateLight">
            <button
              onClick={() => handleTabChange("about")}
              className="hover:text-brand-indigo transition-colors"
            >
              Privacy Policy
            </button>
            <span>&middot;</span>
            <button
              onClick={() => handleTabChange("contact")}
              className="hover:text-brand-indigo transition-colors"
            >
              Terms of Operations
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

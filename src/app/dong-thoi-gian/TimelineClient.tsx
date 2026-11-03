"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HistoricalEvent } from "@/types/content.types";
import {
  Calendar,
  MapPin,
  ArrowRight,
  BookOpen,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
  Clock,
  Sparkles,
  Compass,
} from "lucide-react";
import Link from "next/link";
import SafeImage from "@/components/common/SafeImage";

interface TimelineClientProps {
  events: HistoricalEvent[];
}

export default function TimelineClient({ events }: TimelineClientProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [lightboxEvent, setLightboxEvent] = useState<HistoricalEvent | null>(null);
  const timelineScrollRef = useRef<HTMLDivElement>(null);

  const currentEvent = events[activeIndex] || events[0];

  // Alternating card styles like the Canary Museum exhibition
  // Variant 0: Gold Outline on Dark
  // Variant 1: Solid Gold
  // Variant 2: Solid White Paper
  const getCardStyle = (idx: number, isActive: boolean) => {
    if (isActive) {
      return "border-2 border-[#E5B84B] bg-[#141311]/90 text-[#FAF5ED] shadow-2xl ring-2 ring-[#8D2926] scale-[1.03]";
    }
    const variant = idx % 3;
    switch (variant) {
      case 0:
        return "border-2 border-[#A88A52]/70 bg-[#1A1917]/85 text-[#FAF5ED] hover:border-[#E5B84B]";
      case 1:
        return "bg-[#A88A52] text-[#141311] border-2 border-[#A88A52] hover:bg-[#b8995e]";
      case 2:
      default:
        return "bg-[#FAF5ED] text-[#242321] border-2 border-[#D5C7AD] hover:bg-white";
    }
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % events.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const handleSelect = (idx: number) => {
    setActiveIndex(idx);
  };

  // Keyboard navigation & Esc for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxEvent) {
        if (e.key === "Escape") setLightboxEvent(null);
        return;
      }
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxEvent, events.length]);

  // Smooth scroll active card into view horizontally without any vertical scroll
  useEffect(() => {
    if (timelineScrollRef.current) {
      const activeEl = timelineScrollRef.current.querySelector(
        `[data-event-index="${activeIndex}"]`
      ) as HTMLElement | null;
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeIndex]);

  return (
    <div className="relative w-full h-[calc(100vh-105px)] min-h-[640px] max-h-[960px] overflow-hidden bg-[#0D0C0B] text-[#FAF5ED] select-none flex flex-col justify-between">
      {/* 1. DYNAMIC FULL-BLEED ARCHIVAL BACKGROUND (Crossfading on milestone click) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEvent.image || currentEvent.id || activeIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {currentEvent.image && (
              <SafeImage
                src={currentEvent.image}
                alt={currentEvent.title}
                className="w-full h-full object-cover object-center grayscale contrast-125 brightness-90 filter"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Vintage Dark Vignette & Gradient Overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0C0B]/95 via-[#0D0C0B]/80 to-[#0D0C0B]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0B] via-transparent to-[#0D0C0B]/70" />

        {/* Subtle Archival Vertical Guidelines (Museum Exhibition Style) */}
        <div className="absolute inset-0 grid grid-cols-6 sm:grid-cols-12 pointer-events-none opacity-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-white h-full" />
          ))}
        </div>
      </div>

      {/* 2. TOP EXHIBITION NAV STRIP */}
      <div className="relative z-10 px-6 sm:px-10 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs uppercase tracking-widest text-[#D5C7AD] hover:text-[#FAF5ED] transition-colors flex items-center gap-1.5 font-mono"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Về Trang Chủ</span>
          </Link>
          <span className="text-white/20">|</span>
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#A88A52]">
            TRIỂN LÃM TƯ LIỆU SỐ (1954 – 1975)
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-[#D5C7AD]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#E5B84B] animate-pulse" />
            <span>Mốc son {activeIndex + 1} / {events.length}</span>
          </span>
          <span className="text-white/20">•</span>
          <span className="text-[#A88A52] font-semibold">{currentEvent.year}</span>
        </div>
      </div>

      {/* 3. MAIN EXHIBITION STAGE: LEFT STORYTELLING + RIGHT HORIZONTAL TIMELINE AXIS */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 px-6 sm:px-10 items-center overflow-hidden">
        {/* === LEFT COLUMN: EDITORIAL STORYTELLING (~38% width on desktop) === */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center max-w-xl z-20 space-y-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#8D2926]/90 border border-[#A88A52]/50 text-[#FAF5ED] text-[11px] font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5B84B]" />
              <span>Giai đoạn: {currentEvent.era || "1954 – 1975"}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-black uppercase tracking-tight text-[#FAF5ED] leading-[1.08]">
              <span className="text-[#E5B84B] block drop-shadow-sm">KHÚC HÙNG CA</span>
              THÁI NGUYÊN <span className="font-light text-xl lg:text-2xl text-[#D5C7AD] font-sans">1954–1975</span>
            </h1>
          </div>

          {/* Active Event Narrative Container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentEvent.id || activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-3"
            >
              {/* Date & Location Pill */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#FAF5ED]/80 font-mono">
                <span className="px-2 py-0.5 rounded bg-white/10 text-[#E5B84B] font-bold border border-[#E5B84B]/30 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#E5B84B]" />
                  {currentEvent.date}
                </span>
                <span className="flex items-center gap-1 text-[#D5C7AD]">
                  <MapPin className="w-3 h-3 text-[#E5B84B]" />
                  {currentEvent.location}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF5ED] leading-snug">
                {currentEvent.title}
              </h2>

              {/* Narrative description */}
              <p className="text-xs sm:text-sm text-[#FAF5ED]/90 leading-relaxed font-light line-clamp-4">
                {currentEvent.detailedText || currentEvent.description}
              </p>

              {/* Historical Quote (if any) */}
              {currentEvent.quote && (
                <div className="border-l-2 border-[#E5B84B] pl-3 py-1 italic text-xs text-[#D5C7AD] font-serif bg-white/5 rounded-r">
                  &ldquo;{currentEvent.quote.text}&rdquo;
                  <div className="text-[10px] font-sans font-normal text-[#A88A52] mt-0.5 not-italic">
                    — {currentEvent.quote.author}
                  </div>
                </div>
              )}

              {/* Arrow Link to Related Historical Research Topic */}
              {currentEvent.relatedSlug && (
                <div>
                  <Link
                    href={`/chuyen-de/${currentEvent.relatedSlug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E5B84B] hover:text-[#FAF5ED] transition-colors group"
                  >
                    <span>-&gt; Đọc chuyên đề lịch sử liên quan</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Action Pills: Map, Archives, Lightbox */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
            {currentEvent.mapLocationId && (
              <Link
                href="/#ban-do"
                className="px-3.5 py-1.5 rounded-full border border-white/40 hover:border-[#E5B84B] bg-black/40 hover:bg-black/60 text-xs font-medium text-[#FAF5ED] transition-all flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-[#E5B84B]" />
                <span>Bản đồ tọa độ</span>
              </Link>
            )}
            <Link
              href="/tu-lieu"
              className="px-3.5 py-1.5 rounded-full border border-white/40 hover:border-[#E5B84B] bg-black/40 hover:bg-black/60 text-xs font-medium text-[#FAF5ED] transition-all flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#E5B84B]" />
              <span>Kho tư liệu</span>
            </Link>
            <button
              onClick={() => setLightboxEvent(currentEvent)}
              className="px-3.5 py-1.5 rounded-full border border-[#E5B84B]/70 hover:border-[#E5B84B] bg-[#8D2926]/80 hover:bg-[#8D2926] text-xs font-semibold text-[#FAF5ED] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Xem ảnh tư liệu kích thước lớn"
            >
              <ZoomIn className="w-3.5 h-3.5 text-[#E5B84B]" />
              <span>Phóng to ảnh tư liệu</span>
            </button>
          </div>
        </div>

        {/* === RIGHT COLUMN: HORIZONTAL TIMELINE AXIS & CARDS WITH ATTACHED PHOTOS === */}
        <div className="lg:col-span-7 xl:col-span-7 relative h-full flex flex-col justify-center overflow-hidden">
          {/* Continuous Horizontal Gold Timeline Line */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-[#A88A52] z-0 shadow-sm opacity-80" />

          {/* Horizontal Scrollable Track */}
          <div
            ref={timelineScrollRef}
            className="flex items-center gap-6 sm:gap-8 overflow-x-auto py-12 px-6 no-scrollbar scroll-smooth z-10"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {events.map((event, idx) => {
              const isActive = idx === activeIndex;
              const cardClass = getCardStyle(idx, isActive);
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={event.id || idx}
                  data-event-index={idx}
                  className="flex flex-col items-center shrink-0 w-[240px] sm:w-[270px] transition-all duration-300 relative"
                >
                  {/* Photo Vignette Mounted ABOVE the axis for even index */}
                  {isEven && event.image && (
                    <div className="mb-4 flex flex-col items-center">
                      <div
                        onClick={() => handleSelect(idx)}
                        className={`relative w-36 h-24 sm:w-44 sm:h-28 rounded-md overflow-hidden border-2 cursor-pointer transition-all duration-300 shadow-lg ${
                          isActive
                            ? "border-[#E5B84B] ring-2 ring-[#8D2926] scale-105"
                            : "border-[#A88A52]/60 hover:border-[#E5B84B] opacity-80 hover:opacity-100"
                        }`}
                      >
                        <SafeImage
                          src={event.image}
                          alt={event.title}
                          className={`w-full h-full object-cover transition-all duration-300 ${
                            isActive ? "grayscale-0" : "grayscale contrast-125"
                          }`}
                        />
                        <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors" />
                        <span className="absolute bottom-1 right-1 bg-black/75 px-1.5 py-0.5 rounded text-[10px] font-mono text-[#E5B84B]">
                          {event.year}
                        </span>
                      </div>
                      {/* Stem connecting photo to the card/axis */}
                      <div className={`w-0.5 h-4 ${isActive ? "bg-[#E5B84B]" : "bg-[#A88A52]/60"}`} />
                    </div>
                  )}

                  {/* Milestone Card on the Axis */}
                  <div
                    onClick={() => handleSelect(idx)}
                    className={`cursor-pointer rounded-lg p-4 sm:p-5 transition-all duration-300 w-full relative ${cardClass}`}
                  >
                    {/* Active Milestone Indicator Dot */}
                    {isActive && (
                      <span className="absolute -top-2 right-3 px-2 py-0.5 rounded-full bg-[#8D2926] text-[#FAF5ED] text-[10px] font-mono uppercase font-bold border border-[#E5B84B] shadow-md animate-pulse">
                        Đang chọn
                      </span>
                    )}

                    {/* Year Headline */}
                    <div className="flex items-baseline justify-between gap-2 mb-2">
                      <span className="font-sans text-2xl sm:text-3xl font-black tracking-tight leading-none">
                        {event.year}
                      </span>
                      <span className="text-[11px] font-mono opacity-75 truncate">
                        {event.date}
                      </span>
                    </div>

                    {/* Short Title */}
                    <h3 className="font-serif text-sm sm:text-base font-bold line-clamp-2 leading-tight mb-2">
                      {event.title}
                    </h3>

                    {/* Brief description */}
                    <p className="text-xs opacity-90 line-clamp-3 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Photo Vignette Mounted BELOW the axis for odd index */}
                  {!isEven && event.image && (
                    <div className="mt-4 flex flex-col items-center">
                      {/* Stem connecting card/axis to photo */}
                      <div className={`w-0.5 h-4 ${isActive ? "bg-[#E5B84B]" : "bg-[#A88A52]/60"}`} />
                      <div
                        onClick={() => handleSelect(idx)}
                        className={`relative w-36 h-24 sm:w-44 sm:h-28 rounded-md overflow-hidden border-2 cursor-pointer transition-all duration-300 shadow-lg ${
                          isActive
                            ? "border-[#E5B84B] ring-2 ring-[#8D2926] scale-105"
                            : "border-[#A88A52]/60 hover:border-[#E5B84B] opacity-80 hover:opacity-100"
                        }`}
                      >
                        <SafeImage
                          src={event.image}
                          alt={event.title}
                          className={`w-full h-full object-cover transition-all duration-300 ${
                            isActive ? "grayscale-0" : "grayscale contrast-125"
                          }`}
                        />
                        <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors" />
                        <span className="absolute bottom-1 right-1 bg-black/75 px-1.5 py-0.5 rounded text-[10px] font-mono text-[#E5B84B]">
                          {event.year}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. BOTTOM SCRUBBER & CONTROLS (Canary Museum Style) */}
      <div className="relative z-10 px-6 sm:px-10 py-3 bg-[#0D0C0B]/90 backdrop-blur-md border-t border-[#A88A52]/30 flex flex-wrap items-center justify-between gap-4">
        {/* Keyboard hints & Current Index */}
        <div className="flex items-center gap-3 text-xs text-[#D5C7AD] font-mono">
          <span className="hidden md:inline text-white/50">
            Dùng phím <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">←</kbd> /{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">→</kbd> để đổi mốc
          </span>
          <span className="hidden md:inline text-white/20">|</span>
          <span className="text-[#E5B84B]">
            {currentEvent.date} — {currentEvent.location}
          </span>
        </div>

        {/* Year Selector Ticks */}
        <div className="flex items-center gap-3 sm:gap-5 overflow-x-auto no-scrollbar py-1">
          {events.map((event, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={event.id || idx}
                onClick={() => handleSelect(idx)}
                className={`text-xs sm:text-sm font-mono tracking-wider transition-all duration-200 cursor-pointer relative py-1 ${
                  isActive
                    ? "text-[#E5B84B] font-bold scale-110"
                    : "text-[#D5C7AD]/60 hover:text-[#FAF5ED]"
                }`}
              >
                {event.year}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#E5B84B] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Prev / Next Chevrons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-full border border-[#A88A52]/60 hover:border-[#E5B84B] bg-white/5 hover:bg-white/15 text-[#FAF5ED] transition-colors cursor-pointer"
            aria-label="Mốc trước"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-1.5 rounded-full border border-[#A88A52]/60 hover:border-[#E5B84B] bg-white/5 hover:bg-white/15 text-[#FAF5ED] transition-colors cursor-pointer"
            aria-label="Mốc kế tiếp"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5. LIGHTBOX MODAL FOR HISTORICAL PHOTOGRAPHS */}
      <AnimatePresence>
        {lightboxEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxEvent(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-[#1B1A18] rounded-xl border border-[#A88A52] overflow-hidden shadow-2xl p-6 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[#A88A52]/30 pb-3">
                <div className="flex items-center gap-2 font-mono text-xs text-[#E5B84B]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{lightboxEvent.date}</span>
                  <span className="text-white/30">•</span>
                  <span>{lightboxEvent.location}</span>
                </div>
                <button
                  onClick={() => setLightboxEvent(null)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF5ED] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {lightboxEvent.image && (
                <div className="relative w-full h-[320px] sm:h-[460px] rounded-lg overflow-hidden border border-[#D5C7AD]/20 bg-black">
                  <SafeImage
                    src={lightboxEvent.image}
                    alt={lightboxEvent.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              <div className="space-y-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#FAF5ED]">
                  {lightboxEvent.title}
                </h3>
                {lightboxEvent.imageCaption && (
                  <p className="text-xs sm:text-sm text-[#D5C7AD] italic font-serif">
                    Chú thích: {lightboxEvent.imageCaption}
                  </p>
                )}
                {lightboxEvent.imageSource && (
                  <p className="text-[11px] font-mono text-[#A88A52]">
                    Nguồn ảnh: {lightboxEvent.imageSource}
                  </p>
                )}
                <p className="text-xs text-[#FAF5ED]/80 leading-relaxed pt-2 border-t border-white/10">
                  {lightboxEvent.detailedText || lightboxEvent.description}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

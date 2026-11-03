"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HISTORICAL_EVENTS } from "@/lib/historical-data";
import { HistoricalEvent } from "@/types/content.types";
import { Calendar, MapPin, Award, Clock, ArrowRight, BookOpen, Shield, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";

const ERAS = [
  { id: "all", label: "Toàn bộ giai đoạn 1954–1975" },
  { id: "1954-1964", label: "1954–1964: Khôi phục & Khu Gang thép" },
  { id: "1965-1968", label: "1965–1968: Hợp nhất & Chống phá hoại" },
  { id: "1969-1972", label: "1969–1972: Ga Lưu Xá & Trận địa B-52" },
  { id: "1973-1975", label: "1973–1975: Chi viện & Đại thắng 1975" },
];

export default function TimelineSection() {
  const [selectedEra, setSelectedEra] = useState<string>("all");
  const [activeEventIndex, setActiveEventIndex] = useState<number>(0);

  const filteredEvents = selectedEra === "all"
    ? HISTORICAL_EVENTS
    : HISTORICAL_EVENTS.filter((e) => e.era === selectedEra);

  // Ensure active event is within bounds of current filter
  const currentEvent = filteredEvents[Math.min(activeEventIndex, filteredEvents.length - 1)] || filteredEvents[0];

  const handleNext = () => {
    setActiveEventIndex((prev) => (prev + 1) % filteredEvents.length);
  };

  const handlePrev = () => {
    setActiveEventIndex((prev) => (prev - 1 + filteredEvents.length) % filteredEvents.length);
  };

  return (
    <section id="timeline" className="py-20 sm:py-24 bg-[#F3EBDD] border-t border-b border-[#D5C7AD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8D2926]/10 border border-[#8D2926]/30 text-xs font-bold uppercase tracking-widest text-[#8D2926]">
            <Clock className="w-3.5 h-3.5 text-[#8D2926]" />
            <span>Biên Niên Sử Bảo Tàng</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#242321] tracking-tight">
            Niên Biểu Lịch Sử Thái Nguyên (1954 – 1975)
          </h2>
          <p className="text-base text-[#4A4742] leading-relaxed">
            Hành trình 21 năm vẻ vang: từ những ngày đầu tiếp quản, khôi phục kinh tế, xây dựng biểu tượng Gang thép Thái Nguyên, kiên cường đánh bại chiến tranh phá hoại của giặc Mỹ cho đến ngày non sông thu về một mối.
          </p>
        </div>

        {/* Era Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {ERAS.map((era) => {
            const isSelected = selectedEra === era.id;
            return (
              <button
                key={era.id}
                onClick={() => {
                  setSelectedEra(era.id);
                  setActiveEventIndex(0);
                }}
                className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 border ${
                  isSelected
                    ? "bg-[#8D2926] text-[#FAF5ED] border-[#8D2926] shadow-xs"
                    : "bg-[#FAF5ED] text-[#4A4742] border-[#D5C7AD] hover:bg-[#FAF5ED]/80 hover:text-[#8D2926]"
                }`}
              >
                {era.label}
              </button>
            );
          })}
        </div>

        {/* Desktop Interactive Timeline Scrubbing Bar & Selected Milestone Card */}
        <div className="hidden lg:block space-y-8">
          {/* Horizontal Scrubber Strip */}
          <div className="relative bg-[#FAF5ED] border border-[#D5C7AD] rounded-xl p-4 archival-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#4A4742]">
                Mốc sự kiện: <strong>{activeEventIndex + 1}</strong> / {filteredEvents.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-1.5 rounded-md border border-[#D5C7AD] bg-[#F3EBDD] hover:bg-[#8D2926] hover:text-[#FAF5ED] text-[#242321] transition-colors"
                  aria-label="Mốc trước"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1.5 rounded-md border border-[#D5C7AD] bg-[#F3EBDD] hover:bg-[#8D2926] hover:text-[#FAF5ED] text-[#242321] transition-colors"
                  aria-label="Mốc kế tiếp"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Horizontal timeline track */}
            <div className="relative py-4">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#D5C7AD] -translate-y-1/2" />
              <div className="relative flex items-center justify-between gap-1 overflow-x-auto no-scrollbar py-2">
                {filteredEvents.map((event, idx) => {
                  const isActive = idx === activeEventIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveEventIndex(idx)}
                      className="group flex flex-col items-center focus:outline-hidden min-w-[70px] px-1 transition-transform"
                    >
                      {/* Node Circle */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 z-10 ${
                          isActive
                            ? "bg-[#8D2926] text-[#FAF5ED] border-2 border-[#A88A52] ring-3 ring-[#8D2926]/20 scale-125"
                            : "bg-[#FAF5ED] border border-[#D5C7AD] text-[#4A4742] group-hover:border-[#8D2926] group-hover:scale-110"
                        }`}
                      >
                        <span className="font-mono text-[10px] font-bold">{idx + 1}</span>
                      </div>
                      {/* Year Label */}
                      <span
                        className={`mt-2 font-mono text-xs transition-colors ${
                          isActive ? "font-bold text-[#8D2926]" : "text-[#4A4742] group-hover:text-[#242321]"
                        }`}
                      >
                        {event.year}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Event Archival Inspector Showcase */}
          <AnimatePresence mode="wait">
            {currentEvent && (
              <motion.div
                key={currentEvent.title + currentEvent.date}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl bg-[#FAF5ED] border-2 border-[#D5C7AD] p-8 sm:p-10 archival-shadow grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                <div className="md:col-span-8 space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-md bg-[#8D2926] text-[#FAF5ED] text-xs font-bold font-mono tracking-wider shadow-xs">
                      {currentEvent.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#4A4742] bg-[#F3EBDD] px-2.5 py-1 rounded border border-[#D5C7AD]">
                      <MapPin className="w-3.5 h-3.5 text-[#8D2926]" />
                      <span>{currentEvent.location}</span>
                    </span>
                    {currentEvent.featured && (
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#A88A52] px-2 py-0.5 rounded bg-[#A88A52]/10 border border-[#A88A52]/30">
                        Mốc son trọng đại
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#8D2926] leading-snug">
                    {currentEvent.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-[#242321] leading-relaxed">
                    {currentEvent.description}
                  </p>

                  {/* Action Link */}
                  <div className="pt-2 flex items-center gap-4">
                    <Link
                      href="/chuyen-de"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8D2926] hover:text-[#6E1F1D] group"
                    >
                      <BookOpen className="w-4 h-4 text-[#A88A52]" />
                      <span>Đọc tài liệu lịch sử liên quan</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Archival Seal Card Graphic */}
                <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-xl bg-[#F3EBDD] border border-[#D5C7AD] text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#8D2926] border-2 border-[#A88A52] flex items-center justify-center text-[#FAF5ED] shadow-sm">
                    <Shield className="w-8 h-8 text-[#A88A52]" />
                  </div>
                  <div>
                    <div className="font-mono text-2xl font-bold text-[#8D2926] tracking-tight">
                      NĂM {currentEvent.year}
                    </div>
                    <div className="text-xs text-[#4A4742] uppercase tracking-wider mt-0.5">
                      Tư liệu Lịch sử Bắc Thái
                    </div>
                  </div>
                  <div className="text-[11px] text-[#4A4742]/80 italic border-t border-[#D5C7AD] pt-2 w-full">
                    Ghi chép theo Văn kiện Lịch sử Đảng bộ tỉnh Thái Nguyên (1954–1975)
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile & Tablet Vertical Timeline Flow */}
        <div className="lg:hidden space-y-6">
          <div className="space-y-4">
            {filteredEvents.map((event, index) => (
              <div
                key={index}
                className="rounded-xl bg-[#FAF5ED] border border-[#D5C7AD] p-5 space-y-3 archival-shadow"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#8D2926] text-[#FAF5ED] text-xs font-bold font-mono">
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#4A4742]">
                    <MapPin className="w-3.5 h-3.5 text-[#8D2926]" />
                    <span>{event.location}</span>
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#8D2926] leading-snug">
                  {event.title}
                </h3>

                <p className="text-sm text-[#242321] leading-relaxed">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HISTORICAL_LOCATIONS } from "@/lib/historical-data";
import { HistoricalLocation } from "@/types/content.types";
import { MapPin, Navigation, Compass, Shield, ArrowRight, ExternalLink, Filter, Info, Eye } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  { id: "all", label: "Tất cả tọa độ lịch sử" },
  { id: "battlefield", label: "Trận địa & Chiến công" },
  { id: "logistics", label: "Cảng cạn & Giao thông" },
  { id: "industry", label: "Công nghiệp & Năng lượng" },
  { id: "memorial", label: "Di tích & Tưởng niệm" },
];

export default function HistoricalMapSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLocationId, setSelectedLocationId] = useState<string>(HISTORICAL_LOCATIONS[0].id);

  const filteredLocations = selectedCategory === "all"
    ? HISTORICAL_LOCATIONS
    : HISTORICAL_LOCATIONS.filter((loc) => loc.category === selectedCategory);

  const activeLocation = HISTORICAL_LOCATIONS.find((l) => l.id === selectedLocationId) || filteredLocations[0] || HISTORICAL_LOCATIONS[0];

  return (
    <section id="ban-do" className="py-20 sm:py-24 bg-[#FAF5ED] border-b border-[#D5C7AD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8D2926]/10 border border-[#8D2926]/30 text-xs font-bold uppercase tracking-widest text-[#8D2926]">
            <Compass className="w-3.5 h-3.5 text-[#8D2926]" />
            <span>Địa Bàn Chiến Lược & Địa Chỉ Đỏ</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#242321] tracking-tight">
            Bản Đồ Lịch Sử Thái Nguyên (1954 – 1975)
          </h2>
          <p className="text-base text-[#4A4742] leading-relaxed">
            Khám phá các tọa độ trọng yếu của vùng đất phên dậu: từ trận địa đồi Tiến Lập, cầu Gia Bẩy, cảng cạn ga Lưu Xá đến cái nôi Khu Gang thép và các điểm di tích lịch sử quốc gia.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 border ${
                selectedCategory === cat.id
                  ? "bg-[#8D2926] text-[#FAF5ED] border-[#8D2926] shadow-xs"
                  : "bg-[#F3EBDD] text-[#4A4742] border-[#D5C7AD] hover:bg-[#F3EBDD]/80 hover:text-[#8D2926]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Map & Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Top: Interactive Stylized Archival Map (7 cols) */}
          <div className="lg:col-span-7 bg-[#F3EBDD] border-2 border-[#D5C7AD] rounded-2xl p-6 sm:p-8 archival-shadow relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 border-b border-[#D5C7AD] pb-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8D2926] uppercase">
                <Navigation className="w-4 h-4 text-[#A88A52]" />
                <span>SƠ ĐỒ TỌA ĐỘ LỊCH SỬ THÁI NGUYÊN (TỈNH BẮC THÁI)</span>
              </div>
              <span className="text-[11px] font-mono text-[#4A4742]">TỶ LỆ LƯU TRỮ SỐ HÓA</span>
            </div>

            {/* Stylized Vector Map Canvas */}
            <div className="relative w-full aspect-[4/3] bg-[#ECE2D2] rounded-xl border border-[#D5C7AD] overflow-hidden select-none">
              {/* Background Geographic Contour / Water Grid */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
              >
                {/* River Sông Cầu (Huyết mạch thủy văn) */}
                <path
                  d="M 58 0 C 56 18, 54 28, 56 40 C 58 50, 52 65, 50 78 C 48 88, 54 95, 52 100"
                  fill="none"
                  stroke="#9DAFC2"
                  strokeWidth="2.2"
                  strokeDasharray="4 2"
                />
                {/* River Label */}
                <text x="59" y="16" fill="#6A8196" fontSize="3" fontStyle="italic" fontFamily="serif">
                  Sông Cầu
                </text>

                {/* Road QL3 (Trục Hà Nội - Thái Nguyên - Bắc Kạn) */}
                <path
                  d="M 45 100 L 48 68 L 51 45 L 48 20 L 46 0"
                  fill="none"
                  stroke="#C5B59A"
                  strokeWidth="1.2"
                />
                <text x="40" y="88" fill="#8C7D64" fontSize="2.5" fontFamily="monospace">
                  QL3
                </text>

                {/* Railway Kép - Lưu Xá (Tuyến chi viện quốc tế) */}
                <path
                  d="M 100 68 L 78 62 L 53 56"
                  fill="none"
                  stroke="#8D2926"
                  strokeWidth="1.2"
                  strokeDasharray="2 2"
                />
                <text x="75" y="60" fill="#8D2926" fontSize="2.5" fontFamily="monospace">
                  Đường sắt Kép - Lưu Xá
                </text>

                {/* Stylized Regional Districts Boundaries */}
                <circle cx="50" cy="50" r="16" fill="#F7F3EA" fillOpacity="0.3" stroke="#D5C7AD" strokeWidth="0.8" strokeDasharray="2 2" />
                <text x="43" y="52" fill="#8D2926" fontSize="3.5" fontWeight="bold" fontFamily="serif">
                  TP. Thái Nguyên
                </text>

                <text x="68" y="32" fill="#8C7D64" fontSize="3" fontFamily="serif">
                  H. Đồng Hỷ
                </text>
                <text x="18" y="48" fill="#8C7D64" fontSize="3" fontFamily="serif">
                  H. Đại Từ
                </text>
                <text x="44" y="18" fill="#8C7D64" fontSize="3" fontFamily="serif">
                  H. Phú Lương
                </text>
                <text x="16" y="24" fill="#8C7D64" fontSize="3" fontFamily="serif">
                  H. Định Hóa
                </text>
                <text x="76" y="48" fill="#8C7D64" fontSize="3" fontFamily="serif">
                  H. Võ Nhai
                </text>
                <text x="65" y="74" fill="#8C7D64" fontSize="3" fontFamily="serif">
                  H. Phú Bình
                </text>
                <text x="40" y="82" fill="#8C7D64" fontSize="3" fontFamily="serif">
                  TP. Sông Công & Phổ Yên
                </text>
              </svg>

              {/* Interactive Markers on Map */}
              {filteredLocations.map((loc) => {
                const isSelected = loc.id === activeLocation.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocationId(loc.id)}
                    style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-hidden z-20"
                    title={`${loc.name} (${loc.district})`}
                  >
                    {/* Ripple on active */}
                    {isSelected && (
                      <span className="absolute -inset-2 rounded-full bg-[#8D2926]/30 animate-ping pointer-events-none" />
                    )}

                    {/* Marker Pin */}
                    <div
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                        isSelected
                          ? "bg-[#8D2926] text-[#FAF5ED] ring-4 ring-[#A88A52]/40 scale-125 z-30"
                          : "bg-[#FAF5ED] text-[#8D2926] border-2 border-[#8D2926] group-hover:scale-110 group-hover:bg-[#8D2926] group-hover:text-[#FAF5ED]"
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5 fill-current" />
                    </div>

                    {/* Marker Title Tag (hover & selected) */}
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 -bottom-6 px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap pointer-events-none transition-all shadow-xs ${
                        isSelected
                          ? "bg-[#8D2926] text-[#FAF5ED] opacity-100 z-30"
                          : "bg-[#242321]/80 text-[#FAF5ED] opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      {loc.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="mt-6 pt-4 border-t border-[#D5C7AD] flex flex-wrap items-center justify-between text-xs text-[#4A4742] gap-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8D2926]" />
                  <span>Điểm tọa độ lịch sử</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-[#9DAFC2]" />
                  <span>Sông Cầu huyết mạch</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 border-t border-dashed border-[#8D2926]" />
                  <span>Đường sắt Kép – Lưu Xá</span>
                </span>
              </div>
              <div className="text-[11px] font-mono text-[#A88A52]">
                Nhấp vào từng điểm để xem tư liệu chi tiết
              </div>
            </div>
          </div>

          {/* Right: Archival Location Inspector Panel (5 cols) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {activeLocation && (
                <motion.div
                  key={activeLocation.id}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -14 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl bg-[#F3EBDD] border-2 border-[#D5C7AD] p-6 sm:p-8 archival-shadow space-y-5"
                >
                  {/* Category & Historic Period Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-md bg-[#8D2926] text-[#FAF5ED] text-xs font-bold uppercase tracking-wider">
                      {activeLocation.categoryLabel}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#A88A52]">
                      {activeLocation.yearRange}
                    </span>
                  </div>

                  {/* Title & Historic Name */}
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#8D2926] leading-snug">
                      {activeLocation.name}
                    </h3>
                    {activeLocation.historicName && (
                      <p className="font-serif italic text-xs sm:text-sm text-[#A88A52] font-semibold mt-1">
                        &ldquo;{activeLocation.historicName}&rdquo;
                      </p>
                    )}
                  </div>

                  {/* Coordinates & District */}
                  <div className="flex items-center gap-4 text-xs font-mono text-[#4A4742] bg-[#FAF5ED] p-2.5 rounded-lg border border-[#D5C7AD]">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#8D2926]" />
                      <span>{activeLocation.district}</span>
                    </div>
                    {activeLocation.realGeo && (
                      <div className="text-[11px] text-[#A88A52]">
                        Tọa độ: {activeLocation.realGeo}
                      </div>
                    )}
                  </div>

                  {/* Optional Image */}
                  {activeLocation.image && (
                    <div className="relative h-44 rounded-xl overflow-hidden border border-[#D5C7AD] bg-[#242321]/5">
                      <img
                        src={activeLocation.image}
                        alt={activeLocation.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.parentElement?.classList.add("hidden");
                        }}
                      />
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-sm text-[#242321] leading-relaxed">
                    {activeLocation.description}
                  </p>

                  {/* Historic Significance Box */}
                  <div className="p-3.5 rounded-lg bg-[#FAF5ED] border-l-4 border-[#8D2926] text-xs text-[#4A4742] leading-relaxed space-y-1">
                    <span className="font-bold text-[#8D2926] uppercase text-[10px] tracking-wider block">
                      Giá trị lịch sử & Ý nghĩa:
                    </span>
                    <span>{activeLocation.significance}</span>
                  </div>

                  {/* Action Link */}
                  <div className="pt-2 flex items-center justify-between border-t border-[#D5C7AD]">
                    {activeLocation.relatedSlug && (
                      <Link
                        href={`/chuyen-de/${activeLocation.relatedSlug}`}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#8D2926] hover:text-[#6E1F1D]"
                      >
                        <span>Đọc chuyên đề liên quan</span>
                        <ArrowRight className="w-4 h-4 text-[#A88A52]" />
                      </Link>
                    )}
                    {activeLocation.id === "di-tich-915" && (
                      <Link
                        href="/dai-doi-915"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#8D2926] hover:text-[#6E1F1D]"
                      >
                        <span>Xem hồ sơ 60 Liệt sĩ</span>
                        <Shield className="w-4 h-4 text-[#A88A52]" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}


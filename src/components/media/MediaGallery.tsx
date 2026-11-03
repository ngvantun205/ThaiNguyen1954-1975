"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MEDIA_GALLERY } from "@/lib/historical-data";
import { MediaItem } from "@/types/content.types";
import { Image as ImageIcon, Video, Shield, Calendar, X, ExternalLink, Play, Search, MapPin, Info, ZoomIn, Filter } from "lucide-react";

export default function MediaGallery() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const tabs = [
    { id: "all", label: "Tất cả tư liệu" },
    { id: "image", label: "Hình ảnh lịch sử" },
    { id: "relic", label: "Hiện vật & Kỷ vật" },
    { id: "video", label: "Video tư liệu" },
  ];

  const filteredMedia = useMemo(() => {
    return MEDIA_GALLERY.filter((item) => {
      const matchTab = activeTab === "all" || item.category === activeTab;
      const q = searchQuery.trim().toLowerCase();
      const matchQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q) ||
        item.year.toLowerCase().includes(q) ||
        (item.location && item.location.toLowerCase().includes(q));

      return matchTab && matchQuery;
    });
  }, [activeTab, searchQuery]);

  // Lead item for the editorial showcase
  const leadItem = filteredMedia[0] || null;
  const secondaryItems = filteredMedia.slice(1);

  return (
    <div className="space-y-12">
      {/* Search & Filter Bar */}
      <div className="bg-[#FAF5ED] border-2 border-[#D5C7AD] rounded-2xl p-6 archival-shadow space-y-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#8D2926] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm tư liệu theo từ khóa, năm, địa điểm..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#F3EBDD] border border-[#D5C7AD] text-sm text-[#242321] placeholder-[#4A4742]/60 focus:outline-hidden focus:border-[#8D2926]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#4A4742] hover:text-[#8D2926]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                  activeTab === tab.id
                    ? "bg-[#8D2926] text-[#FAF5ED] border-[#8D2926] shadow-xs"
                    : "bg-[#F3EBDD] text-[#4A4742] hover:bg-[#FAF5ED] border-[#D5C7AD]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#4A4742] pt-3 border-t border-[#D5C7AD]/60 font-mono">
          <span>HIỂN THỊ <strong>{filteredMedia.length}</strong> HIỆN VẬT & TƯ LIỆU SỐ HÓA</span>
          {searchQuery && (
            <span className="text-[#8D2926]">Kết quả theo từ khóa &ldquo;{searchQuery}&rdquo;</span>
          )}
        </div>
      </div>

      {filteredMedia.length === 0 ? (
        <div className="text-center py-16 bg-[#FAF5ED] rounded-2xl border border-[#D5C7AD] p-8 space-y-3">
          <Info className="w-8 h-8 text-[#A88A52] mx-auto" />
          <h3 className="font-serif text-lg font-bold text-[#8D2926]">Không tìm thấy tư liệu phù hợp</h3>
          <p className="text-sm text-[#4A4742]">
            Hãy thử tìm với từ khóa khác như: &ldquo;1972&rdquo;, &ldquo;pháo cao xạ&rdquo;, &ldquo;ga Lưu Xá&rdquo;, &ldquo;cầu Gia Bẩy&rdquo;.
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {/* 1. EDITORIAL LEAD SHOWCASE (Prominent Museum Centerpiece) */}
          {leadItem && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setSelectedMedia(leadItem)}
              className="rounded-2xl bg-[#FAF5ED] border-2 border-[#D5C7AD] p-6 sm:p-8 archival-shadow hover:border-[#8D2926] transition-all cursor-pointer group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Visual Showcase (7 cols) */}
              <div className="lg:col-span-7 relative h-72 sm:h-96 rounded-xl overflow-hidden border border-[#D5C7AD] bg-[#242321] group-hover:shadow-md transition-shadow">
                <img
                  src={leadItem.thumbnail}
                  alt={leadItem.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                {/* Badges */}
                <span className="absolute top-3 left-3 px-3 py-1 rounded bg-[#8D2926] text-[#FAF5ED] text-xs font-mono font-bold">
                  Năm {leadItem.year}
                </span>

                <span className="absolute top-3 right-3 px-3 py-1 rounded bg-[#A88A52] text-[#FAF5ED] text-xs font-bold uppercase tracking-wider">
                  {leadItem.category === "relic" ? "Hiện vật" : leadItem.category === "video" ? "Video tư liệu" : "Ảnh tư liệu"}
                </span>

                {/* Inspect Zoom Pill */}
                <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-md bg-[#242321]/80 text-[#FAF5ED] text-xs font-semibold flex items-center gap-1.5 backdrop-blur-xs group-hover:bg-[#8D2926] transition-colors">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Xem kích thước lớn</span>
                </div>
              </div>

              {/* Editorial Description Panel (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#8D2926] font-bold uppercase">
                  <span>TIÊU ĐIỂM TRƯNG BÀY</span>
                  <span>•</span>
                  <span>LƯU TRỮ QUỐC GIA</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#8D2926] group-hover:text-[#6E1F1D] leading-snug">
                  {leadItem.title}
                </h3>

                {leadItem.location && (
                  <div className="flex items-center gap-1.5 text-xs text-[#4A4742] font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#8D2926]" />
                    <span>{leadItem.location}</span>
                  </div>
                )}

                <p className="text-sm text-[#242321] leading-relaxed">
                  {leadItem.description}
                </p>

                {leadItem.significance && (
                  <div className="p-3 rounded-lg bg-[#F3EBDD] border-l-4 border-[#A88A52] text-xs text-[#4A4742] italic">
                    {leadItem.significance}
                  </div>
                )}

                <div className="pt-3 border-t border-[#D5C7AD] flex items-center justify-between text-xs text-[#4A4742]">
                  <span className="truncate max-w-[240px]">Nguồn: <strong>{leadItem.source}</strong></span>
                  <span className="text-[#8D2926] font-bold group-hover:underline">Chi tiết tư liệu →</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. ASYMMETRIC EDITORIAL GRID (Secondary Items) */}
          {secondaryItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {secondaryItems.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  onClick={() => setSelectedMedia(item)}
                  className="rounded-2xl bg-[#FAF5ED] border-2 border-[#D5C7AD] overflow-hidden archival-shadow hover:border-[#8D2926] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  {/* Photo Header */}
                  <div className="relative h-60 bg-[#242321] overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Central Icon for relic or video */}
                    {item.category === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#8D2926]/90 border-2 border-[#A88A52] flex items-center justify-center text-[#FAF5ED] group-hover:scale-110 transition-transform shadow-lg">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    )}

                    {/* Year stamp */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#8D2926] text-[#FAF5ED] text-xs font-mono font-bold shadow-xs">
                      {item.year}
                    </span>

                    {/* Category pill */}
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#FAF5ED] text-[#242321] text-[11px] font-bold uppercase tracking-wider border border-[#D5C7AD]">
                      {item.category === "relic" ? "Hiện vật" : item.category === "video" ? "Video" : "Ảnh tư liệu"}
                    </span>

                    {item.location && (
                      <span className="absolute bottom-2 left-2 flex items-center gap-1 text-[11px] text-[#FAF5ED] drop-shadow-xs truncate max-w-[80%]">
                        <MapPin className="w-3 h-3 text-[#A88A52]" />
                        <span>{item.location}</span>
                      </span>
                    )}
                  </div>

                  {/* Caption & Metadata */}
                  <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#8D2926] group-hover:text-[#6E1F1D] transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#4A4742] mt-2 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#D5C7AD] text-xs text-[#4A4742] font-mono flex items-center justify-between">
                      <span className="truncate max-w-[180px]">{item.source}</span>
                      <span className="text-[#8D2926] font-bold font-sans group-hover:underline">Xem lớn →</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. MUSEUM LIGHTBOX INSPECTOR MODAL */}
      <AnimatePresence>
        {selectedMedia && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#FAF5ED] border-2 border-[#A88A52] shadow-2xl p-6 sm:p-8 space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#F3EBDD] hover:bg-[#8D2926] hover:text-[#FAF5ED] text-[#242321] transition-colors border border-[#D5C7AD]"
                aria-label="Đóng cửa sổ"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Top Metadata */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded bg-[#8D2926] text-[#FAF5ED] text-xs font-mono font-bold">
                  Năm {selectedMedia.year}
                </span>
                <span className="text-xs font-bold text-[#A88A52] uppercase tracking-wider">
                  {selectedMedia.category === "relic" ? "Kỷ vật chiến trường" : selectedMedia.category === "video" ? "Thước phim tài liệu" : "Hình ảnh lịch sử"}
                </span>
                {selectedMedia.location && (
                  <span className="inline-flex items-center gap-1 text-xs text-[#4A4742] bg-[#F3EBDD] px-2.5 py-1 rounded border border-[#D5C7AD]">
                    <MapPin className="w-3.5 h-3.5 text-[#8D2926]" />
                    <span>{selectedMedia.location}</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#8D2926] pr-10 leading-snug">
                {selectedMedia.title}
              </h3>

              {/* High Res Media Display */}
              {selectedMedia.youtubeId ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border-2 border-[#8D2926] shadow-xl bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedMedia.youtubeId}?autoplay=1&rel=0`}
                    title={selectedMedia.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="relative max-h-[500px] rounded-xl overflow-hidden border-2 border-[#D5C7AD] bg-[#242321] flex items-center justify-center">
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.title}
                    className="w-full h-auto max-h-[500px] object-contain"
                  />
                </div>
              )}

              {/* Archival Documentation Description */}
              <div className="space-y-3 bg-[#F3EBDD] p-5 rounded-xl border border-[#D5C7AD]">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8D2926]">
                  THUYẾT MINH LỊCH SỬ & CHỨNG TÍCH:
                </h4>
                <p className="text-sm sm:text-base text-[#242321] leading-relaxed">
                  {selectedMedia.description}
                </p>
                {selectedMedia.significance && (
                  <p className="text-xs sm:text-sm text-[#4A4742] italic border-t border-[#D5C7AD] pt-2">
                    <strong>Ý nghĩa:</strong> {selectedMedia.significance}
                  </p>
                )}
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-[#D5C7AD] flex flex-wrap items-center justify-between gap-4 text-xs text-[#4A4742]">
                <div>
                  Nguồn lưu trữ: <strong>{selectedMedia.source}</strong>
                </div>
                <div className="flex items-center gap-3">
                  {selectedMedia.youtubeId && (
                    <a
                      href={selectedMedia.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-[#8D2926] text-[#FAF5ED] font-semibold flex items-center gap-1.5 hover:bg-[#6E1F1D] transition-colors"
                    >
                      <span>Xem trên YouTube</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#A88A52]" />
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedMedia(null)}
                    className="px-4 py-2 rounded-lg bg-[#FAF5ED] border border-[#D5C7AD] text-[#242321] hover:bg-[#F3EBDD] font-medium transition-colors"
                  >
                    Đóng cửa sổ
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

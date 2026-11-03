"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MEDIA_GALLERY } from "@/lib/historical-data";
import { MediaItem } from "@/types/content.types";
import { Image as ImageIcon, Video, Shield, Calendar, X, ExternalLink, Play } from "lucide-react";

export default function MediaGallery() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const filteredMedia = activeTab === "all"
    ? MEDIA_GALLERY
    : MEDIA_GALLERY.filter((item) => item.category === activeTab);

  const tabs = [
    { id: "all", label: "Tất cả tư liệu" },
    { id: "image", label: "Ảnh tư liệu chiến sự" },
    { id: "relic", label: "Hiện vật & Kỷ vật" },
    { id: "video", label: "Video tư liệu" },
  ];

  return (
    <div className="space-y-10">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-[#8B0000] text-[#FDFBF7] shadow-md border border-[#DAA520]"
                : "bg-[#F7F3EA] text-[#4A3B32] hover:bg-[#E8E1D3] border border-[#E8E1D3]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMedia.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            onClick={() => setSelectedMedia(item)}
            className="rounded-2xl bg-[#F7F3EA] border-2 border-[#E8E1D3] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#DAA520] transition-all cursor-pointer group flex flex-col justify-between"
          >
            {/* Visual Header / Thumbnail */}
            <div className="relative h-56 bg-gradient-to-br from-[#2D3142] via-[#1E212D] to-[#2D3142] flex items-center justify-center overflow-hidden">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors pointer-events-none" />
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#DAA520_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

              {/* Center icon representation (khi chưa có ảnh hoặc dạng video) */}
              <div className="w-14 h-14 rounded-full bg-[#8B0000]/85 border-2 border-[#DAA520] flex items-center justify-center text-[#DAA520] group-hover:scale-110 transition-transform duration-300 shadow-lg relative z-10">
                {item.category === "video" ? (
                  <Play className="w-7 h-7 fill-[#DAA520]" />
                ) : item.category === "relic" ? (
                  <Shield className="w-7 h-7" />
                ) : (
                  <ImageIcon className="w-7 h-7" />
                )}
              </div>

              {/* Year badge */}
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#8B0000] text-[#FDFBF7] text-xs font-bold shadow-xs z-10">
                {item.year}
              </span>

              {/* Category pill */}
              <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#DAA520] text-[#1E212D] text-xs font-bold uppercase tracking-wider z-10">
                {item.category === "relic" ? "Hiện vật" : item.category === "video" ? "Video" : "Ảnh tư liệu"}
              </span>
            </div>

            {/* Details */}
            <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#8B0000] group-hover:text-[#660000] transition-colors line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#4A3B32] mt-2 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E1D3] text-xs text-[#8C786A] font-medium flex items-center justify-between">
                <span className="truncate max-w-[200px]">{item.source}</span>
                <span className="text-[#DAA520] font-bold group-hover:underline">Chi tiết →</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl rounded-3xl bg-[#FDFBF7] border-2 border-[#DAA520] shadow-2xl overflow-hidden p-6 sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#E8E1D3] hover:bg-[#8B0000] hover:text-[#FDFBF7] text-[#2D3142] transition-colors"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#8B0000] text-[#FDFBF7] text-xs font-bold">
                    Năm {selectedMedia.year}
                  </span>
                  <span className="text-xs font-bold text-[#DAA520] uppercase">
                    {selectedMedia.category === "relic" ? "Kỷ vật lịch sử" : "Tư liệu lưu trữ"}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#8B0000]">
                  {selectedMedia.title}
                </h3>

                {/* Media Showcase Box: Video Iframe hoặc Ảnh phóng to */}
                {selectedMedia.youtubeId ? (
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-[#DAA520] shadow-xl bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedMedia.youtubeId}?autoplay=1&rel=0`}
                      title={selectedMedia.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="h-64 sm:h-80 rounded-2xl bg-gradient-to-br from-[#1E212D] to-[#2D3142] border border-[#DAA520]/40 flex flex-col items-center justify-center p-6 text-center text-[#FDFBF7] relative overflow-hidden">
                    <img
                      src={selectedMedia.url}
                      alt={selectedMedia.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                    <div className="relative z-10 p-4 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-[#8B0000]/90 border-2 border-[#DAA520] flex items-center justify-center text-[#DAA520] mb-3 shadow-lg">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                      <p className="text-sm font-semibold text-[#DAA520] drop-shadow-sm">
                        Tư liệu Số hoá Lịch sử Kháng chiến Thái Nguyên
                      </p>
                      <p className="text-xs text-[#D1D5DB] mt-1 max-w-md drop-shadow-xs">
                        {selectedMedia.source}
                      </p>
                    </div>
                  </div>
                )}

                {/* Comprehensive Description */}
                <p className="text-sm sm:text-base text-[#4A3B32] leading-relaxed">
                  {selectedMedia.description}
                </p>

                <div className="pt-4 border-t border-[#E8E1D3] flex flex-wrap items-center justify-between gap-3 text-xs text-[#8C786A]">
                  <span>Nguồn: <strong>{selectedMedia.source}</strong></span>
                  <div className="flex items-center gap-2">
                    {selectedMedia.youtubeId && (
                      <a
                        href={selectedMedia.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-[#DAA520] text-[#1E212D] font-bold text-xs hover:bg-[#F4D06F] transition-all flex items-center gap-1.5"
                      >
                        <span>Mở trên YouTube</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedMedia(null)}
                      className="px-4 py-2 rounded-xl bg-[#8B0000] text-[#FDFBF7] font-semibold text-xs hover:bg-[#660000] transition-colors"
                    >
                      Đóng cửa sổ
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


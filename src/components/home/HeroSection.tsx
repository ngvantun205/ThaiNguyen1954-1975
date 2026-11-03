"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, ArrowRight, Compass, Calendar, MapPin, Shield, BookOpen } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#1B1A18] text-[#F3EBDD] py-24 sm:py-28 px-4 sm:px-6 lg:px-8 border-b-2 border-[#A88A52]/40">
      {/* 1. Real Archival Image as Centerpiece Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero/hero-banner.jpg"
          alt="Chiến sĩ pháo cao xạ Thái Nguyên canh giữ vùng trời gang thép 1954–1975"
          className="w-full h-full object-cover object-center scale-105 filter grayscale contrast-125 brightness-75 transition-transform duration-1000"
          onError={(e) => {
            // Fallback gracefully
            e.currentTarget.style.display = "none";
          }}
        />
        {/* Archival dark multi-layer museum overlay for pristine typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1A18] via-[#1B1A18]/85 to-[#1B1A18]/70" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#1B1A18]/60 to-[#1B1A18]" />
        
        {/* Subtle Archival Grid & Film Grain Texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#A88A52_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        {/* Deep Historical Red Ambient Light */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#8D2926]/20 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* 2. Main Narrative Content */}
      <div className="relative max-w-5xl mx-auto text-center z-10 space-y-8">
        {/* Museum Provenance Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#8D2926]/80 border border-[#A88A52]/50 text-xs sm:text-sm font-semibold text-[#F3EBDD] shadow-md backdrop-blur-xs tracking-wider"
        >
          <span className="w-2 h-2 rounded-full bg-[#A88A52]" />
          <span>TRIỂN LÃM TƯ LIỆU SỐ HÓA • BẢO TÀNG LỊCH SỬ</span>
          <span className="text-[#A88A52] font-mono">1954 – 1975</span>
        </motion.div>

        {/* Grand Historical Title in Lora */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="space-y-4"
        >
          <div className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#A88A52]">
            KHÚC HÙNG CA THỜI ĐẠI HỒ CHÍ MINH
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.12] text-[#FAF5ED]">
            THÁI NGUYÊN <span className="text-[#A88A52] font-serif font-light">1954 – 1975</span>
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#D5C7AD] max-w-3xl mx-auto font-normal leading-snug">
            Phên dậu Việt Bắc – Trái tim công nghiệp – Khúc tráng ca bất tử
          </p>
        </motion.div>

        {/* Historical Narrative Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-3xl mx-auto space-y-3"
        >
          <p className="text-base sm:text-lg text-[#FAF5ED]/90 leading-relaxed font-light">
            Từ dấu mốc tiếp quản sau Hiệp định Giơ-ne-vơ năm 1954, Thái Nguyên trở thành cái nôi công nghiệp luyện kim đầu tiên của miền Bắc với Khu Gang thép rực lửa, đồng thời là thủ phủ của Khu tự trị Việt Bắc.
          </p>
          <p className="text-sm sm:text-base text-[#D5C7AD]/90 leading-relaxed font-light border-t border-[#A88A52]/20 pt-3">
            Trong khói lửa chiến tranh phá hoại, mảnh đất phên dậu ấy kiên cường đánh trả hàng ngàn lượt oanh kích, vít cổ 61 máy bay Mỹ, hạ 2 &lsquo;pháo đài bay&rsquo; B-52 và khắc sâu khúc bi tráng của 60 liệt sĩ TNXP Đại đội 915 tại cảng cạn Ga Lưu Xá đêm Noel 1972 vì sự nghiệp thống nhất non sông năm 1975.
          </p>
        </motion.div>

        {/* Archival Museum Metadata Stamp */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 py-3 px-6 rounded-xl bg-[#242321]/60 border border-[#D5C7AD]/30 text-xs text-[#D5C7AD] font-mono"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-[#8D2926] font-bold">●</span>
            <span>21 NĂM LỊCH SỬ (1954–1975)</span>
          </div>
          <div className="hidden sm:inline text-[#A88A52]">|</div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#A88A52] font-bold">●</span>
            <span>61 MÁY BAY MỸ BỊ BẮN HẠ</span>
          </div>
          <div className="hidden sm:inline text-[#A88A52]">|</div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#8D2926] font-bold">●</span>
            <span>60 LIỆT SĨ TNXP ĐẠI ĐỘI 915</span>
          </div>
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
        >
          <a
            href="#timeline"
            className="px-6 py-3.5 rounded-lg bg-[#8D2926] hover:bg-[#6E1F1D] text-[#FAF5ED] font-semibold text-sm sm:text-base flex items-center gap-2 border border-[#A88A52]/50 shadow-md hover:scale-102 transition-all duration-200"
          >
            <Calendar className="w-4 h-4 text-[#A88A52]" />
            <span>Khám phá Dòng thời gian</span>
            <ArrowRight className="w-4 h-4 text-[#A88A52]" />
          </a>

          <a
            href="#ban-do"
            className="px-6 py-3.5 rounded-lg bg-[#242321]/80 hover:bg-[#242321] text-[#FAF5ED] font-semibold text-sm sm:text-base flex items-center gap-2 border border-[#D5C7AD]/60 hover:border-[#A88A52] transition-all duration-200"
          >
            <MapPin className="w-4 h-4 text-[#A88A52]" />
            <span>Bản đồ Lịch sử Thái Nguyên</span>
          </a>

          <Link
            href="/tu-lieu"
            className="px-6 py-3.5 rounded-lg bg-[#FAF5ED]/10 hover:bg-[#FAF5ED]/20 text-[#FAF5ED] font-medium text-sm sm:text-base flex items-center gap-2 border border-[#D5C7AD]/30 transition-all duration-200 backdrop-blur-xs"
          >
            <Compass className="w-4 h-4 text-[#A88A52]" />
            <span>Kho Tư liệu Số</span>
          </Link>

          <Link
            href="/tuong-niem"
            className="px-6 py-3.5 rounded-lg bg-[#A88A52]/20 hover:bg-[#A88A52]/30 text-[#FAF5ED] font-semibold text-sm sm:text-base flex items-center gap-2 border border-[#A88A52] transition-all duration-200"
          >
            <Flame className="w-4 h-4 text-[#A88A52] fill-[#A88A52]" />
            <span>Thắp Nến Tri Ân</span>
          </Link>
        </motion.div>
      </div>

      {/* Archival Caption of Hero Visual */}
      <div className="absolute bottom-3 right-4 z-10 hidden sm:flex items-center gap-2 text-[11px] text-[#D5C7AD]/70 font-mono">
        <span>ẢNH TƯ LIỆU:</span>
        <span className="italic">Trận địa pháo cao xạ bảo vệ bầu trời Gang thép Thái Nguyên (1966)</span>
      </div>
    </section>
  );
}

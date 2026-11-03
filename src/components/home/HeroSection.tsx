"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, ArrowRight, ShieldAlert, Award, Compass } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1E212D] via-[#2D3142] to-[#1E212D] text-[#FDFBF7] py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Decorative Graphic Elements & Radial Lights */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#DAA520_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#8B0000]/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#DAA520]/15 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center z-10 space-y-8">
        {/* Top Historical Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B0000]/80 border border-[#DAA520]/50 text-xs sm:text-sm font-semibold text-[#FDFBF7] shadow-lg backdrop-blur-xs"
        >
          <Award className="w-4 h-4 text-[#DAA520]" />
          <span>BẢO TÀNG SỐ LỊCH SỬ THÁI NGUYÊN (1965 – 1972)</span>
        </motion.div>

        {/* Main Historic Slogan */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-[#FDFBF7] drop-shadow-md">
            <span className="block text-[#DAA520] mb-2 font-black">THÁI NGUYÊN (1965 – 1972)</span>
            <span className="bg-gradient-to-r from-[#FDFBF7] via-[#F5EFEB] to-[#DAA520] bg-clip-text text-transparent">
              Phên dậu Việt Bắc – Trái tim công nghiệp
            </span>
          </h1>
          <p className="font-serif italic text-lg sm:text-2xl text-[#E8E1D3] max-w-3xl mx-auto font-normal">
            &ldquo;Khúc hùng ca kiên cường chống chiến tranh phá hoại của đế quốc Mỹ&rdquo;
          </p>
        </motion.div>

        {/* Historic Summary Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg text-[#D1D5DB] max-w-3xl mx-auto leading-relaxed font-light"
        >
          Nơi hứng chịu hàng ngàn tấn bom đạn giặc Mỹ trút xuống cầu Gia Bẩy, ga Lưu Xá, khu Gang thép;
          nhưng cũng là nơi rực sáng ý chí kiên trung của quân và dân tỉnh Bắc Thái với 61 máy bay Mỹ bị bắn rơi,
          hạ gục 2 &lsquo;pháo đài bay&rsquo; B-52 và khúc tráng ca bất tử của 60 liệt sĩ TNXP Đại đội 915.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <Link
            href="/chuyen-de"
            className="px-6 py-3.5 rounded-xl bg-[#8B0000] hover:bg-[#A52A2A] text-[#FDFBF7] font-semibold text-base flex items-center gap-2.5 shadow-lg border border-[#DAA520]/40 hover:scale-105 transition-all duration-300"
          >
            <span>Khám phá 4 Chuyên đề</span>
            <ArrowRight className="w-5 h-5 text-[#DAA520]" />
          </Link>

          <Link
            href="/tuong-niem"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#DAA520] to-[#B8860B] hover:from-[#E5B53B] hover:to-[#C99718] text-[#1E212D] font-bold text-base flex items-center gap-2.5 shadow-lg hover:scale-105 transition-all duration-300"
          >
            <Flame className="w-5 h-5 text-[#8B0000] fill-[#8B0000] animate-pulse" />
            <span>Thắp Nến Tưởng Niệm</span>
          </Link>

          <Link
            href="/tu-lieu"
            className="px-6 py-3.5 rounded-xl bg-[#2D3142]/90 hover:bg-[#3D4258] text-[#E8E1D3] font-medium text-base flex items-center gap-2 border border-[#4F5568] hover:border-[#DAA520]/50 transition-all duration-300"
          >
            <Compass className="w-5 h-5 text-[#DAA520]" />
            <span>Thư viện Tư liệu</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


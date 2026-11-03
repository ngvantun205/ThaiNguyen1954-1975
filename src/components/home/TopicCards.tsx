"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HISTORICAL_TOPICS } from "@/lib/historical-data";
import { ArrowRight, BookOpen, Clock, Target } from "lucide-react";

export default function TopicCards() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DAA520]/15 border border-[#DAA520]/40 text-xs font-bold uppercase tracking-widest text-[#8B0000]">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Hệ Thống 4 Chuyên Đề Cốt Lõi</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2D3142] tracking-tight">
          Hành Trình Lịch Sử Kháng Chiến (1965 – 1972)
        </h2>
        <p className="text-base text-[#4A3B32] leading-relaxed">
          Từng trang sử hào hùng của quân và dân Thái Nguyên được tái hiện qua 4 chuyên đề nghiên cứu chuyên sâu,
          dựa trên nguồn sử liệu chính thống của Đảng bộ tỉnh và Quân khu Việt Bắc.
        </p>
      </div>

      {/* Grid of 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {HISTORICAL_TOPICS.map((topic, index) => (
          <motion.article
            key={topic.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-2xl bg-[#F7F3EA] border border-[#E8E1D3] p-7 sm:p-8 flex flex-col justify-between hover:shadow-xl hover:border-[#8B0000]/60 transition-all duration-300 relative group overflow-hidden"
          >
            {/* Top Chapter badge & Period */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B0000] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider shadow-xs">
                  Chuyên Đề 0{topic.number}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C786A]">
                  <Clock className="w-3.5 h-3.5 text-[#DAA520]" />
                  {topic.timeframe}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#8B0000] group-hover:text-[#660000] transition-colors line-clamp-2 leading-snug">
                  <Link href={`/chuyen-de/${topic.slug}`}>
                    {topic.title}
                  </Link>
                </h3>
                <p className="text-xs font-semibold text-[#DAA520] tracking-wide uppercase mt-1">
                  {topic.subtitle}
                </p>
              </div>

              {/* Summary */}
              <p className="text-sm text-[#4A3B32] leading-relaxed line-clamp-3">
                {topic.summary}
              </p>

              {/* Key Highlights Mini Grid */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#E8E1D3]">
                {topic.keyStats.map((stat, i) => (
                  <div key={i} className="bg-[#FDFBF7] p-2.5 rounded-lg border border-[#E8E1D3]/80 text-center">
                    <div className="font-serif text-base sm:text-lg font-bold text-[#8B0000]">{stat.value}</div>
                    <div className="text-[11px] text-[#4A3B32] line-clamp-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Read Chapter Link */}
            <div className="pt-6 mt-4">
              <Link
                href={`/chuyen-de/${topic.slug}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#8B0000] hover:text-[#660000] group-hover:translate-x-1 transition-all"
              >
                <span>Xem chi tiết chuyên đề</span>
                <ArrowRight className="w-4 h-4 text-[#DAA520]" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}


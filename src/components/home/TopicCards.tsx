"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HISTORICAL_TOPICS } from "@/lib/historical-data";
import { ArrowRight, BookOpen, Clock, ShieldCheck, ChevronRight } from "lucide-react";

export default function TopicCards() {
  return (
    <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8D2926]/10 border border-[#8D2926]/30 text-xs font-bold uppercase tracking-widest text-[#8D2926]">
          <BookOpen className="w-3.5 h-3.5 text-[#8D2926]" />
          <span>Hệ Thống 4 Chuyên Đề Nghiên Cứu</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#242321] tracking-tight">
          Các Chuyên Đề Lịch Sử Kháng Chiến Trọng Điểm
        </h2>
        <p className="text-base text-[#4A4742] leading-relaxed">
          Từng trang sử hào hùng của quân và dân Bắc Thái được hệ thống hóa khoa học qua 4 chuyên đề chuyên sâu, dựa trên nguồn sử liệu chính thống của Đảng bộ tỉnh và Bộ Tư lệnh Quân khu Việt Bắc.
        </p>
      </div>

      {/* Grid of 4 Editorial Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {HISTORICAL_TOPICS.map((topic, index) => (
          <motion.article
            key={topic.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-2xl bg-[#FAF5ED] border-2 border-[#D5C7AD] p-7 sm:p-8 flex flex-col justify-between archival-shadow hover:border-[#8D2926] transition-all duration-300 group relative"
          >
            {/* Top metadata */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#D5C7AD]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#8D2926] text-[#FAF5ED] text-xs font-bold uppercase tracking-wider font-mono">
                  Chuyên Đề 0{topic.number}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#A88A52]">
                  <Clock className="w-3.5 h-3.5" />
                  {topic.timeframe}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#8D2926] group-hover:text-[#6E1F1D] transition-colors leading-snug">
                  <Link href={`/chuyen-de/${topic.slug}`}>
                    {topic.title}
                  </Link>
                </h3>
                <p className="text-xs font-semibold text-[#A88A52] tracking-wide uppercase mt-1.5">
                  {topic.subtitle}
                </p>
              </div>

              {/* Topic Archival Image */}
              {topic.heroImage && (
                <div className="relative h-48 rounded-xl overflow-hidden border border-[#D5C7AD] bg-[#242321]/5">
                  <img
                    src={topic.heroImage}
                    alt={topic.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.parentElement?.classList.add("hidden");
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#242321]/40 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded bg-[#242321]/80 text-[#FAF5ED] text-[10px] font-mono">
                    Tư liệu chuyên đề 0{topic.number}
                  </span>
                </div>
              )}

              {/* Summary */}
              <p className="text-sm text-[#4A4742] leading-relaxed line-clamp-3">
                {topic.summary}
              </p>

              {/* Key Stats Strip */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#D5C7AD]">
                {topic.keyStats.map((stat, i) => (
                  <div key={i} className="bg-[#F3EBDD] p-2.5 rounded-lg border border-[#D5C7AD] text-center">
                    <div className="font-serif text-base sm:text-lg font-bold text-[#8D2926]">{stat.value}</div>
                    <div className="text-[11px] text-[#4A4742] line-clamp-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Read Detail Link */}
            <div className="pt-6 mt-4 border-t border-[#D5C7AD]">
              <Link
                href={`/chuyen-de/${topic.slug}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#8D2926] hover:text-[#6E1F1D] group-hover:translate-x-1 transition-all"
              >
                <span>Xem toàn văn chuyên đề nghiên cứu</span>
                <ArrowRight className="w-4 h-4 text-[#A88A52]" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

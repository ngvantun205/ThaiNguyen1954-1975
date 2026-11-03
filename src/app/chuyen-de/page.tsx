import { HISTORICAL_TOPICS } from "@/lib/historical-data";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight, Shield, Award } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "4 Chuyên Đề Lịch Sử Kháng Chiến (1965 – 1972)",
  description:
    "Hệ thống 4 chuyên đề lịch sử Thái Nguyên giai đoạn 1965-1972: Vị thế chiến lược, chuyển hướng kinh tế, những trận đánh bảo vệ vùng trời và khúc hùng ca Đại đội 915.",
};

export default function TopicsPage() {
  return (
    <div className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B0000]/10 border border-[#8B0000]/30 text-xs font-bold uppercase tracking-widest text-[#8B0000]">
          <Award className="w-3.5 h-3.5" />
          <span>Hệ Thống Nghiên Cứu Lịch Sử</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#2D3142] tracking-tight">
          4 Chuyên Đề Lịch Sử Thái Nguyên (1965 – 1972)
        </h1>
        <p className="text-base text-[#4A3B32] leading-relaxed">
          Tái hiện đầy đủ, chân thực và khoa học quá trình chiến đấu, sản xuất và chi viện của quân và dân Bắc Thái trong cuộc kháng chiến chống Mỹ cứu nước.
        </p>
      </div>

      {/* Grid of 4 Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {HISTORICAL_TOPICS.map((topic) => (
          <div
            key={topic.id}
            className="rounded-3xl bg-[#F7F3EA] border-2 border-[#E8E1D3] p-8 shadow-sm hover:shadow-xl hover:border-[#DAA520] transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-[#8B0000] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider">
                  Chuyên Đề 0{topic.number}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-[#8C786A] font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#DAA520]" />
                  {topic.timeframe}
                </span>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-[#8B0000] hover:text-[#660000] transition-colors">
                  <Link href={`/chuyen-de/${topic.slug}`}>
                    {topic.title}
                  </Link>
                </h2>
                <p className="text-xs font-bold text-[#DAA520] uppercase tracking-wider mt-1">
                  {topic.subtitle}
                </p>
              </div>

              <p className="text-sm text-[#4A3B32] leading-relaxed">
                {topic.summary}
              </p>

              {/* Stats Highlights */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#E8E1D3]">
                {topic.keyStats.map((stat, i) => (
                  <div key={i} className="bg-[#FDFBF7] p-3 rounded-xl border border-[#E8E1D3] text-center">
                    <div className="font-serif text-lg font-bold text-[#8B0000]">{stat.value}</div>
                    <div className="text-[11px] text-[#4A3B32] line-clamp-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E8E1D3]">
              <Link
                href={`/chuyen-de/${topic.slug}`}
                className="w-full py-3 px-5 rounded-xl bg-[#8B0000] hover:bg-[#660000] text-[#FDFBF7] font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <span>Đọc toàn văn chuyên đề</span>
                <ArrowRight className="w-4 h-4 text-[#DAA520]" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

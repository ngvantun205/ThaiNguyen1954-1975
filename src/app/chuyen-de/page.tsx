import { HISTORICAL_TOPICS } from "@/lib/historical-data";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight, Shield, Award } from "lucide-react";
import SafeImage from "@/components/common/SafeImage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "4 Chuyên Đề Lịch Sử Kháng Chiến (1954 – 1975)",
  description:
    "Hệ thống 4 chuyên đề lịch sử Thái Nguyên giai đoạn 1954-1975: Vị thế chiến lược, chuyển hướng kinh tế, những trận đánh bảo vệ vùng trời và khúc hùng ca Đại đội 915.",
};

export default function TopicsPage() {
  return (
    <div className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8D2926]/10 border border-[#8D2926]/30 text-xs font-bold uppercase tracking-widest text-[#8D2926]">
          <Award className="w-3.5 h-3.5" />
          <span>Hệ Thống Nghiên Cứu Lịch Sử</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#242321] tracking-tight">
          4 Chuyên Đề Lịch Sử Thái Nguyên (1954 – 1975)
        </h1>
        <p className="text-base text-[#4A4742] leading-relaxed">
          Tái hiện đầy đủ, chân thực và khoa học quá trình kiến thiết, sản xuất, chiến đấu và dốc lòng chi viện của quân dân Thái Nguyên trong thời kỳ kháng chiến chống Mỹ cứu nước.
        </p>
      </div>

      {/* Grid of 4 Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {HISTORICAL_TOPICS.map((topic) => (
          <article
            key={topic.id}
            className="rounded-2xl bg-[#FAF5ED] border-2 border-[#D5C7AD] p-8 archival-shadow hover:border-[#8D2926] transition-all flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#D5C7AD]">
                <span className="px-3 py-1 rounded bg-[#8D2926] text-[#FAF5ED] text-xs font-mono font-bold uppercase tracking-wider">
                  Chuyên Đề 0{topic.number}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-[#A88A52] font-mono font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  {topic.timeframe}
                </span>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-[#8D2926] group-hover:text-[#6E1F1D] transition-colors leading-snug">
                  <Link href={`/chuyen-de/${topic.slug}`}>
                    {topic.title}
                  </Link>
                </h2>
                <p className="text-xs font-bold text-[#A88A52] uppercase tracking-wider mt-1.5">
                  {topic.subtitle}
                </p>
              </div>

              {topic.heroImage && (
                <div className="relative h-48 rounded-xl overflow-hidden border border-[#D5C7AD] bg-[#242321]/5">
                  <SafeImage
                    src={topic.heroImage}
                    alt={topic.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>
              )}

              <p className="text-sm text-[#4A4742] leading-relaxed">
                {topic.summary}
              </p>

              {/* Stats Highlights */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#D5C7AD]">
                {topic.keyStats.map((stat, i) => (
                  <div key={i} className="bg-[#F3EBDD] p-3 rounded-xl border border-[#D5C7AD] text-center">
                    <div className="font-serif text-lg font-bold text-[#8D2926]">{stat.value}</div>
                    <div className="text-[11px] text-[#4A4742] line-clamp-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#D5C7AD]">
              <Link
                href={`/chuyen-de/${topic.slug}`}
                className="w-full py-3 px-5 rounded-lg bg-[#8D2926] hover:bg-[#6E1F1D] text-[#FAF5ED] font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <span>Đọc toàn văn chuyên đề</span>
                <ArrowRight className="w-4 h-4 text-[#A88A52]" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

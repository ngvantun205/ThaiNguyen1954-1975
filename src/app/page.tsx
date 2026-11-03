import HeroSection from "@/components/home/HeroSection";
import HistoricalStats from "@/components/home/HistoricalStats";
import TopicCards from "@/components/home/TopicCards";
import TimelineSection from "@/components/home/TimelineSection";
import CandleLightWidget from "@/components/memorial/CandleLightWidget";
import Link from "next/link";
import { BookOpen, Flame, Compass, ArrowRight, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-12 pb-20">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Thống kê lịch sử nhanh */}
      <HistoricalStats />

      {/* 3. 4 Chuyên đề lịch sử cốt lõi */}
      <TopicCards />

      {/* 4. Dòng thời gian niên biểu */}
      <TimelineSection />

      {/* 5. Khu vực Thắp nến tri ân trọng tâm */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <CandleLightWidget />
      </section>

      {/* 6. Lời kết và Kêu gọi Hành động */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="rounded-3xl bg-gradient-to-r from-[#8B0000] via-[#A52A2A] to-[#8B0000] text-[#FDFBF7] p-8 sm:p-12 border-2 border-[#DAA520] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#DAA520] bg-black/20 px-3 py-1 rounded-full">
              Khúc Tráng Ca Bất Tử
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold leading-snug">
              Cùng lan tỏa niềm tự hào truyền thống quê hương Thái Nguyên anh hùng
            </h3>
            <p className="text-sm sm:text-base text-[#F5EFEB] leading-relaxed">
              Mời các thầy cô giáo, các bạn học sinh sinh viên và bạn đọc khắp mọi miền đất nước cùng khám phá kho tư liệu số hóa và gửi gắm lời tri ân thành kính.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <Link
              href="/tuong-niem"
              className="px-6 py-3.5 rounded-xl bg-[#DAA520] hover:bg-[#F4D06F] text-[#1E212D] font-bold text-center text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Flame className="w-4 h-4 text-[#8B0000] fill-[#8B0000]" />
              <span>Gửi lời tri ân</span>
            </Link>
            <Link
              href="/tu-lieu"
              className="px-6 py-3.5 rounded-xl bg-black/30 hover:bg-black/50 text-[#FDFBF7] font-semibold text-center text-sm border border-[#DAA520]/50 transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#DAA520]" />
              <span>Xem tư liệu</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

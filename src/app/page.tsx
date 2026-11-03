import HeroSection from "@/components/home/HeroSection";
import HistoricalStats from "@/components/home/HistoricalStats";
import TimelineSection from "@/components/home/TimelineSection";
import HistoricalMapSection from "@/components/home/HistoricalMapSection";
import TopicCards from "@/components/home/TopicCards";
import CandleLightWidget from "@/components/memorial/CandleLightWidget";
import Link from "next/link";
import { BookOpen, Flame, Compass, ArrowRight, Shield, MapPin, Award } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-10 sm:space-y-16 pb-24">
      {/* 1. Hero Section: Digital Museum Experience */}
      <HeroSection />

      {/* 2. Key Historical Stats Metrics */}
      <HistoricalStats />

      {/* 3. Interactive Historical Timeline (1954 – 1975) */}
      <TimelineSection />

      {/* 4. Interactive Historical Map of Thái Nguyên Strategic Coordinates */}
      <HistoricalMapSection />

      {/* 5. 4 Core Historical Research Topics */}
      <TopicCards />

      {/* 6. Sacred Memorial Candle Lighting Zone */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <CandleLightWidget />
      </section>

      {/* 7. Archival Museum Callout & Provenance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="rounded-2xl bg-[#8D2926] text-[#FAF5ED] p-8 sm:p-12 border-2 border-[#A88A52] archival-shadow flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#A88A52] bg-black/25 px-3 py-1 rounded">
              LƯU TRỮ VÀ GIÁO DỤC TRUYỀN THỐNG
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-snug">
              Lan tỏa niềm tự hào truyền thống Thái Nguyên anh hùng
            </h3>
            <p className="text-sm sm:text-base text-[#FAF5ED]/85 leading-relaxed font-light">
              Mời các thầy cô giáo, các nhà nghiên cứu, học sinh, sinh viên và đồng bào cả nước cùng tra cứu kho tư liệu số hóa và gửi gắm những dòng lưu bút tri ân thành kính tới các anh hùng liệt sĩ.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <Link
              href="/tuong-niem"
              className="px-6 py-3.5 rounded-lg bg-[#FAF5ED] hover:bg-[#F3EBDD] text-[#8D2926] font-bold text-center text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Flame className="w-4 h-4 text-[#8D2926] fill-[#8D2926]" />
              <span>Gửi lời tri ân</span>
            </Link>
            <Link
              href="/tu-lieu"
              className="px-6 py-3.5 rounded-lg bg-black/30 hover:bg-black/40 text-[#FAF5ED] font-semibold text-center text-sm border border-[#A88A52]/60 transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#A88A52]" />
              <span>Khám phá kho tư liệu</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

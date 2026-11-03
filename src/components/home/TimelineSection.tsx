import Link from "next/link";
import { Clock, ArrowRight, Sparkles, Compass, Shield, Calendar, Image as ImageIcon, MapPin } from "lucide-react";
import SafeImage from "@/components/common/SafeImage";

const HIGHLIGHT_MILESTONES = [
  {
    year: "1954",
    title: "Bác Hồ thăm đập Thác Huống",
    category: "Khôi phục kinh tế",
    image: "/images/topics/02-chuyen-huong-kinh-te.jpg",
  },
  {
    year: "1959",
    title: "Khởi công Khu Gang thép",
    category: "Cái nôi luyện kim",
    image: "/images/topics/01-vi-the-chien-luoc.jpg",
  },
  {
    year: "1965",
    title: "Trận đầu cầu Gia Bẩy",
    category: "Khói lửa chống chiến tranh phá hoại",
    image: "/images/relics/cau-gia-bay.jpg",
  },
  {
    year: "1966",
    title: "Bắn rơi máy bay thứ 1.000",
    category: "Chiến công hiển hách",
    image: "/images/relics/phao-cao-xa.jpg",
  },
  {
    year: "1972",
    title: "Khúc tráng ca Lưu Xá & 915",
    category: "Địa chỉ đỏ bất tử",
    image: "/images/topics/04-dai-doi-915.jpg",
  },
  {
    year: "1975",
    title: "Đại thắng Mùa Xuân 1975",
    category: "Non sông liền một dải",
    image: "/images/relics/dai-doi-915.jpg",
  },
];

export default function TimelineSection() {
  return (
    <section id="timeline" className="py-16 sm:py-24 bg-[#1B1A18] text-[#FAF5ED] relative overflow-hidden border-t-2 border-b-2 border-[#A88A52]">
      {/* Archival dark museum backdrop overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#A88A52_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#A88A52]/30 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#8D2926] border border-[#A88A52]/60 text-xs font-mono font-bold uppercase tracking-widest text-[#FAF5ED]">
              <Clock className="w-3.5 h-3.5 text-[#E5B84B]" />
              <span>Phòng Trưng Bày Chuyên Sâu</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#FAF5ED] tracking-tight leading-tight">
              Triển Lãm Tương Tác Dòng Thời Gian <span className="text-[#E5B84B] font-serif">(1954 – 1975)</span>
            </h2>
            <p className="text-sm sm:text-base text-[#D5C7AD] leading-relaxed font-light">
              Trải nghiệm bảo tàng số hiện đại: khi chọn từng mốc son, toàn bộ bối cảnh không gian sẽ đổi thay cùng hình ảnh tư liệu gốc, âm vang thời đại và tọa độ lịch sử.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/dong-thoi-gian"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#8D2926] hover:bg-[#6E1F1D] text-[#FAF5ED] font-bold text-sm tracking-wide border border-[#E5B84B] shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <span>Mở Triển Lãm Toàn Màn Hình</span>
              <ArrowRight className="w-4 h-4 text-[#E5B84B] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Milestone Previews Horizontal Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {HIGHLIGHT_MILESTONES.map((item, idx) => (
            <Link
              key={idx}
              href="/dong-thoi-gian"
              className="group relative rounded-xl border border-[#A88A52]/40 bg-[#141311]/80 hover:border-[#E5B84B] p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden"
            >
              {/* Top Image Vignette */}
              <div className="relative w-full h-28 rounded-lg overflow-hidden mb-3 border border-white/10">
                <SafeImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-1.5 left-2 font-sans font-black text-xl text-[#E5B84B]">
                  {item.year}
                </span>
              </div>

              {/* Title & Category */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D5C7AD]/80 block">
                  {item.category}
                </span>
                <h3 className="font-serif text-sm font-bold text-[#FAF5ED] group-hover:text-[#E5B84B] transition-colors leading-snug line-clamp-2">
                  {item.title}
                </h3>
              </div>

              <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#A88A52] font-mono group-hover:text-[#FAF5ED]">
                <span>Khám phá</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Museum Feature Pills */}
        <div className="p-6 rounded-xl bg-black/40 border border-[#A88A52]/30 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#8D2926] border border-[#E5B84B]/60 flex items-center justify-center shrink-0">
              <ImageIcon className="w-4 h-4 text-[#E5B84B]" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-[#FAF5ED]">Bối cảnh động đổi theo mốc</h4>
              <p className="text-xs text-[#D5C7AD] mt-1 leading-relaxed">
                Tự động crossfade ảnh tư liệu tư liệu gốc phủ tràn toàn màn hình khi nhấp chọn sự kiện.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#8D2926] border border-[#E5B84B]/60 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-[#E5B84B]" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-[#FAF5ED]">Trải nghiệm không cuộn trang</h4>
              <p className="text-xs text-[#D5C7AD] mt-1 leading-relaxed">
                Thiết kế trọn vẹn trong một khung nhìn bảo tàng chuẩn quốc tế, thao tác phím bấm và thanh trượt trực quan.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#8D2926] border border-[#E5B84B]/60 flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4 text-[#E5B84B]" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-[#FAF5ED]">Kết nối đa chiều tư liệu</h4>
              <p className="text-xs text-[#D5C7AD] mt-1 leading-relaxed">
                Liên kết trực tiếp tới 4 chuyên đề nghiên cứu sâu, bản đồ tọa độ chiến trường và kho kỷ vật.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

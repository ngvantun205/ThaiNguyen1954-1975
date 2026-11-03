import MediaGallery from "@/components/media/MediaGallery";
import { Image as ImageIcon, Award, Shield, FileText, Compass } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kho Lưu Trữ Tư Liệu Lịch Sử Số Hóa (1954 – 1975)",
  description:
    "Kho lưu trữ hình ảnh, hiện vật số hóa và video phóng sự tư liệu quý giá về lịch sử Thái Nguyên giai đoạn 1954 – 1975.",
};

export default function MediaLibraryPage() {
  return (
    <div className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8D2926]/10 border border-[#8D2926]/30 text-xs font-bold uppercase tracking-widest text-[#8D2926]">
          <ImageIcon className="w-3.5 h-3.5 text-[#8D2926]" />
          <span>Phòng Trưng Bày Tư Liệu Lịch Sử</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#242321] tracking-tight">
          Kho Tư Liệu Số Hóa Thái Nguyên (1954 – 1975)
        </h1>
        <p className="text-base text-[#4A4742] leading-relaxed">
          Tập hợp các bức ảnh tư liệu quý báu từ chiến trường, di vật thiêng liêng của các liệt sĩ và những thước phim tài liệu chân thực về thời kỳ xây dựng, chiến đấu và chi viện vẻ vang của quân dân Thái Nguyên.
        </p>
      </div>

      {/* Main Gallery with Search, Filters, and Editorial Layout */}
      <MediaGallery />
    </div>
  );
}

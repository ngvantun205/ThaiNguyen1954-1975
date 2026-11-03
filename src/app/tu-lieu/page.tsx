import MediaGallery from "@/components/media/MediaGallery";
import { Image as ImageIcon, Award, Shield, FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thư Viện Tư Liệu Lịch Sử (1965 – 1972)",
  description:
    "Kho lưu trữ hình ảnh, hiện vật số hóa và video phóng sự tư liệu về cuộc kháng chiến chống Mỹ của quân và dân Thái Nguyên.",
};

export default function MediaLibraryPage() {
  return (
    <div className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B0000]/10 border border-[#8B0000]/30 text-xs font-bold uppercase tracking-widest text-[#8B0000]">
          <ImageIcon className="w-3.5 h-3.5 text-[#8B0000]" />
          <span>Kho Lưu Trữ Hiện Vật Số Hóa</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#2D3142] tracking-tight">
          Thư Viện Tư Liệu Lịch Sử Thái Nguyên
        </h1>
        <p className="text-base text-[#4A3B32] leading-relaxed">
          Tập hợp các bức ảnh tư liệu quý báu từ chiến trường, di vật thiêng liêng của các liệt sĩ và những thước phim tài liệu chân thực về một thời bom đạn hào hùng.
        </p>
      </div>

      {/* Main Gallery */}
      <MediaGallery />
    </div>
  );
}


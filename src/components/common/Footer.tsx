import Link from "next/link";
import { Shield, Flame, BookOpen, ExternalLink, Heart, MapPin, Compass } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1B1A18] text-[#FAF5ED] border-t-2 border-[#A88A52] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#D5C7AD]/20">
          {/* Cột 1: Thông tin tổng quan & Bảo tàng số */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#8D2926] border border-[#A88A52] flex items-center justify-center text-[#FAF5ED]">
                <Shield className="w-5 h-5 text-[#A88A52]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#FAF5ED]">THÁI NGUYÊN</h3>
                <p className="text-xs text-[#A88A52] font-mono font-medium tracking-wider">1954 – 1975</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#D5C7AD] leading-relaxed font-light">
              Nền tảng lưu trữ và trưng bày tư liệu số hóa lịch sử Thái Nguyên thời kỳ 1954–1975: Phên dậu Việt Bắc kiên cường, trái tim công nghiệp luyện kim của miền Bắc và biểu tượng anh hùng bất tử của 60 liệt sĩ TNXP Đại đội 915.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#A88A52] font-mono">
              <Flame className="w-4 h-4 fill-[#A88A52]" />
              <span>Đời đời ghi nhớ công ơn các anh hùng liệt sĩ</span>
            </div>
          </div>

          {/* Cột 2: 4 Chuyên đề lịch sử */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#A88A52] uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              4 Chuyên Đề Nghiên Cứu
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#D5C7AD]">
              <li>
                <Link href="/chuyen-de/vi-the-chien-luoc" className="hover:text-[#FAF5ED] transition-colors">
                  1. Vị thế chiến lược & Âm mưu của Mỹ
                </Link>
              </li>
              <li>
                <Link href="/chuyen-de/chuyen-huong-kinh-te" className="hover:text-[#FAF5ED] transition-colors">
                  2. Chuyển hướng kinh tế & Tổ chức chiến đấu
                </Link>
              </li>
              <li>
                <Link href="/chuyen-de/nhung-tran-danh-lich-su" className="hover:text-[#FAF5ED] transition-colors">
                  3. Những trận đánh bảo vệ vùng trời
                </Link>
              </li>
              <li>
                <Link href="/chuyen-de/khuc-hung-ca-dai-doi-915" className="hover:text-[#FAF5ED] transition-colors">
                  4. Khúc tráng ca Ga Lưu Xá & Đại đội 915
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Khám phá & Không gian Tương tác */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#A88A52] uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4" />
              Khám Phá & Tương Tác
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#D5C7AD]">
              <li>
                <Link href="/dong-thoi-gian" className="hover:text-[#FAF5ED] transition-colors">
                  Niên biểu lịch sử (1954 – 1975)
                </Link>
              </li>
              <li>
                <a href="/#ban-do" className="hover:text-[#FAF5ED] transition-colors flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#A88A52]" />
                  Bản đồ tọa độ chiến trường
                </a>
              </li>
              <li>
                <Link href="/dai-doi-915" className="hover:text-[#FAF5ED] transition-colors">
                  Hồ sơ 60 Anh hùng Liệt sĩ Đại đội 915
                </Link>
              </li>
              <li>
                <Link href="/tu-lieu" className="hover:text-[#FAF5ED] transition-colors">
                  Kho ảnh, kỷ vật & video tư liệu
                </Link>
              </li>
              <li>
                  <Link href="/tuong-niem" className="hover:text-[#FAF5ED] transition-colors flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-[#A88A52]" />
                <span>Nghi thức thắp nến tri ân</span>
              </Link>
            </li>
            <li>
                <Link href="/quyen-gop-915" className="hover:text-[#FAF5ED] transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#A88A52]" />
                  <span>Quyên góp 915 &amp; Sao kê minh bạch</span>
                </Link>
            </li>
          </ul>
        </div>

        {/* Cột 4: Nguồn tư liệu & Địa chỉ đỏ */}
        <div className="space-y-3">
          <h4 className="font-serif text-sm font-bold text-[#A88A52] uppercase tracking-wider">
            Địa Chỉ Đỏ & Nguồn Sử Liệu
          </h4>
          <p className="text-xs text-[#D5C7AD] leading-relaxed">
            <strong>Khu di tích lịch sử Quốc gia Đại đội 915</strong><br />
            Phường Gia Sàng, TP. Thái Nguyên, tỉnh Thái Nguyên.
          </p>
          <p className="text-xs text-[#D5C7AD] leading-relaxed">
            <strong>Khu di tích Cầu Gia Bẩy & Đồi Két Nước</strong><br />
            Phường Đồng Bẩm & Hoàng Văn Thụ, TP. Thái Nguyên.
          </p>
          <div className="pt-2 text-[11px] text-[#D5C7AD]/70 leading-normal border-t border-[#D5C7AD]/20 font-mono">
            Nguồn trích dẫn: Lịch sử Đảng bộ tỉnh Thái Nguyên (1954–1975), Lịch sử Quân khu 1, Ban Tuyên giáo Tỉnh ủy và Ban Chỉ huy TNXP 91 Bắc Thái.
          </div>
        </div>
      </div>

      {/* Bottom copyright & attribution */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#D5C7AD]/70 gap-4 font-mono">
        <p>© 1954 – 1975 • BẢO TÀNG TƯ LIỆU LỊCH SỬ SỐ THÁI NGUYÊN.</p>
        <p className="flex items-center gap-1.5 font-sans">
          Hiện đại trong trải nghiệm – Trường tồn trong bản sắc
        </p>
      </div>
    </div>
    </footer >
  );
}

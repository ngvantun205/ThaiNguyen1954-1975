import Link from "next/link";
import { Shield, Flame, BookOpen, ExternalLink, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#2D3142] text-[#FDFBF7] border-t-4 border-[#DAA520] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#4F5568]">
          {/* Cột 1: Thông tin tổng quan */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#8B0000] border border-[#DAA520] flex items-center justify-center text-[#DAA520]">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#FDFBF7]">THÁI NGUYÊN</h3>
                <p className="text-xs text-[#DAA520] font-medium tracking-wider">1965 – 1972</p>
              </div>
            </div>
            <p className="text-sm text-[#D1D5DB] leading-relaxed">
              Trang thông tin và tưởng niệm số hóa lịch sử Thái Nguyên giai đoạn chống chiến tranh phá hoại của đế quốc Mỹ (1965–1972). Phên dậu Việt Bắc kiên cường, trái tim công nghiệp nặng của Tổ quốc.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#DAA520]">
              <Flame className="w-4 h-4 fill-[#DAA520]" />
              <span>Đời đời ghi nhớ công ơn các anh hùng liệt sĩ</span>
            </div>
          </div>

          {/* Cột 2: 4 Chuyên đề lịch sử */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-[#DAA520] uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              4 Chuyên đề Lịch sử
            </h4>
            <ul className="space-y-2 text-sm text-[#D1D5DB]">
              <li>
                <Link href="/chuyen-de/vi-the-chien-luoc" className="hover:text-[#DAA520] transition-colors">
                  1. Âm mưu của Mỹ & Vị thế chiến lược
                </Link>
              </li>
              <li>
                <Link href="/chuyen-de/chuyen-huong-kinh-te" className="hover:text-[#DAA520] transition-colors">
                  2. Chuyển hướng kinh tế & Tổ chức chiến đấu
                </Link>
              </li>
              <li>
                <Link href="/chuyen-de/nhung-tran-danh-lich-su" className="hover:text-[#DAA520] transition-colors">
                  3. Những trận đánh bảo vệ vùng trời
                </Link>
              </li>
              <li>
                <Link href="/chuyen-de/khuc-hung-ca-dai-doi-915" className="hover:text-[#DAA520] transition-colors">
                  4. Khúc hùng ca Ga Lưu Xá & Đại đội 915
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Không gian tương tác */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-[#DAA520] uppercase tracking-wider">
              Không gian Tương tác
            </h4>
            <ul className="space-y-2 text-sm text-[#D1D5DB]">
              <li>
                <Link href="/tuong-niem" className="hover:text-[#DAA520] transition-colors flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#DAA520]" />
                  Nghi thức Thắp nến tri ân
                </Link>
              </li>
              <li>
                <Link href="/tuong-niem#guestbook" className="hover:text-[#DAA520] transition-colors">
                  Sổ lưu bút & Lời tri ân trực tuyến
                </Link>
              </li>
              <li>
                <Link href="/tu-lieu" className="hover:text-[#DAA520] transition-colors">
                  Thư viện ảnh, hiện vật & video tư liệu
                </Link>
              </li>
              <li>
                <Link href="/dai-doi-915" className="hover:text-[#DAA520] transition-colors flex items-center gap-1.5 font-semibold text-[#DAA520]">
                  <Shield className="w-4 h-4 text-[#DAA520]" />
                  Đại đội 915 & 60 Anh hùng Liệt sĩ
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 4: Nguồn tư liệu & Địa chỉ đỏ */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-[#DAA520] uppercase tracking-wider">
              Địa Chỉ Đỏ Giáo Dục
            </h4>
            <p className="text-xs text-[#D1D5DB] leading-relaxed">
              <strong>Khu di tích lịch sử quốc gia Đại đội 915</strong><br />
              Phường Gia Sàng, TP. Thái Nguyên, tỉnh Thái Nguyên.
            </p>
            <p className="text-xs text-[#D1D5DB] leading-relaxed">
              <strong>Bảo tàng Văn hóa các Dân tộc Việt Nam</strong><br />
              Số 01 đường Đội Cấn, TP. Thái Nguyên.
            </p>
            <div className="pt-2 text-xs text-[#9CA3AF]">
              Nguồn trích dẫn: Lịch sử Đảng bộ tỉnh Thái Nguyên, Lịch sử Quân khu 1, tư liệu Bảo tàng Lực lượng Vũ trang.
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9CA3AF] gap-4">
          <p>© 1965 – 1972 • Dự án số hóa lịch sử kháng chiến Thái Nguyên vì cộng đồng.</p>
          <p className="flex items-center gap-1">
            Xây dựng với lòng tự hào và tri ân sâu sắc <Heart className="w-3.5 h-3.5 text-[#8B0000] fill-[#8B0000]" />
          </p>
        </div>
      </div>
    </footer>
  );
}


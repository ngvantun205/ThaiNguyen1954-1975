"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Menu, X, BookOpen, Compass, Image as ImageIcon, HeartHandshake, Shield, MapPin, Calendar, ExternalLink } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Trang chủ", icon: Compass },
    { href: "/chuyen-de", label: "4 Chuyên đề", icon: BookOpen },
    { href: "/dong-thoi-gian", label: "Niên biểu", icon: Calendar },
    { href: "/#ban-do", label: "Bản đồ lịch sử", icon: MapPin },
    { href: "/dai-doi-915", label: "Đại đội 915", icon: Shield },
    { href: "/tu-lieu", label: "Kho tư liệu", icon: ImageIcon },
    { href: "/tuong-niem", label: "Tưởng niệm", icon: HeartHandshake },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Museum Provenance Top Ribbon */}
      <div className="bg-[#8D2926] text-[#F3EBDD] text-[11px] sm:text-xs py-1.5 px-4 tracking-[0.18em] uppercase font-medium flex items-center justify-between border-b border-[#6E1F1D]">
        <div className="hidden sm:flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A88A52]" />
          <span>BẢO TÀNG TƯ LIỆU LỊCH SỬ SỐ THÁI NGUYÊN (1954 – 1975)</span>
        </div>
        <div className="mx-auto sm:mx-0 text-center flex items-center gap-2">
          <span className="text-[#A88A52] font-serif italic text-xs tracking-normal font-normal">
            &ldquo;Hiện đại trong trải nghiệm – Trường tồn trong bản sắc&rdquo;
          </span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-[10px] tracking-wider text-[#F3EBDD]/80">
          <span>HẬU PHƯƠNG VIỆT BẮC</span>
          <span>•</span>
          <span>KHÚC TRÁNG CA BẤT TỬ</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`transition-all duration-300 border-b ${
          isScrolled
            ? "bg-[#F3EBDD]/95 backdrop-blur-md border-[#D5C7AD] shadow-sm py-2.5"
            : "bg-[#F3EBDD] border-[#D5C7AD]/80 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo & Archival Museum Brand */}
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-lg bg-[#8D2926] border-2 border-[#D5C7AD] flex items-center justify-center text-[#F3EBDD] shadow-sm group-hover:border-[#A88A52] group-hover:scale-105 transition-all duration-300">
                <Shield className="w-5 h-5 text-[#A88A52]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#8D2926] leading-none">
                    THÁI NGUYÊN
                  </span>
                  <span className="text-[11px] font-bold text-[#A88A52] px-1.5 py-0.5 rounded-sm bg-[#A88A52]/10 border border-[#A88A52]/30 font-mono">
                    1954–1975
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-medium text-[#4A4742] tracking-wider uppercase mt-1">
                  Bảo tàng Tư liệu Lịch sử số
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                      active
                        ? "bg-[#8D2926] text-[#F3EBDD] shadow-xs"
                        : "text-[#242321] hover:text-[#8D2926] hover:bg-[#FAF5ED]"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${active ? "text-[#A88A52]" : "text-[#4A4742]"}`} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              {/* Action Button: Thắp nến tri ân */}
              <Link
                href="/tuong-niem"
                className="ml-3 px-3.5 py-1.5 rounded-md bg-[#8D2926] hover:bg-[#6E1F1D] text-[#F3EBDD] text-xs sm:text-sm font-semibold flex items-center gap-2 border border-[#A88A52]/60 shadow-xs hover:shadow-sm transition-all duration-200"
              >
                <Flame className="w-3.5 h-3.5 text-[#A88A52] fill-[#A88A52] animate-flame" />
                <span>Thắp Nến Tri Ân</span>
              </Link>
            </nav>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/tuong-niem"
                className="px-3 py-1.5 rounded-md bg-[#8D2926] text-[#F3EBDD] text-xs font-semibold flex items-center gap-1.5 border border-[#A88A52]/50 shadow-xs"
              >
                <Flame className="w-3.5 h-3.5 text-[#A88A52] fill-[#A88A52]" />
                <span>Thắp nến</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-[#242321] hover:text-[#8D2926] hover:bg-[#FAF5ED] border border-[#D5C7AD] focus:outline-hidden"
                aria-label="Mở menu điều hướng"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#D5C7AD] bg-[#FAF5ED] px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="pb-2 mb-2 border-b border-[#D5C7AD]/60 text-[11px] font-bold text-[#8D2926] uppercase tracking-wider">
            Phòng Trưng Bày & Các Khu Vực
          </div>
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#8D2926] text-[#F3EBDD]"
                    : "text-[#242321] hover:bg-[#F3EBDD] hover:text-[#8D2926]"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-[#A88A52]" : "text-[#4A4742]"}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

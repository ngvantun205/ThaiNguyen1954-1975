"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Menu, X, BookOpen, Compass, Image as ImageIcon, HeartHandshake, Shield } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Trang chủ", icon: Compass },
    { href: "/chuyen-de", label: "4 Chuyên đề lịch sử", icon: BookOpen },
    { href: "/tu-lieu", label: "Thư viện tư liệu", icon: ImageIcon },
    { href: "/tuong-niem", label: "Góc tưởng niệm & Tri ân", icon: HeartHandshake },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E8E1D3] shadow-xs">
      {/* Top Banner Ribbon */}
      <div className="bg-[#8B0000] text-[#FDFBF7] text-xs py-1.5 px-4 text-center tracking-widest uppercase font-medium flex items-center justify-center gap-2 border-b border-[#660000]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#DAA520] animate-pulse"></span>
        <span>Kỷ niệm Khúc hùng ca Thái Nguyên thời kỳ kháng chiến chống Mỹ (1965 – 1972)</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#DAA520] animate-pulse"></span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Emblem */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B0000] to-[#660000] border-2 border-[#DAA520] flex items-center justify-center text-[#DAA520] shadow-md group-hover:scale-105 transition-transform duration-300">
              <Shield className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#8B0000] group-hover:text-[#660000] transition-colors leading-tight">
                THÁI NGUYÊN
              </span>
              <span className="text-[11px] font-semibold text-[#DAA520] tracking-widest uppercase">
                1965 – 1972 • Phên Dậu Việt Bắc
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    active
                      ? "bg-[#8B0000] text-[#FDFBF7] shadow-xs"
                      : "text-[#2D3142] hover:text-[#8B0000] hover:bg-[#F5EFEB]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-[#DAA520]" : "text-[#8C786A]"}`} />
                  {link.label}
                </Link>
              );
            })}

            {/* Quick Memorial CTA */}
            <Link
              href="/tuong-niem"
              className="ml-3 px-4 py-2 rounded-lg bg-gradient-to-r from-[#DAA520] to-[#C49110] text-[#1E212D] text-sm font-bold flex items-center gap-2 shadow-xs hover:shadow-md hover:scale-105 transition-all duration-200"
            >
              <Flame className="w-4 h-4 text-[#8B0000] fill-[#8B0000] animate-bounce" />
              <span>Thắp Nến</span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/tuong-niem"
              className="px-3 py-1.5 rounded-lg bg-[#DAA520] text-[#1E212D] text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <Flame className="w-3.5 h-3.5 text-[#8B0000] fill-[#8B0000]" />
              <span>Thắp nến</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#2D3142] hover:text-[#8B0000] hover:bg-[#F5EFEB] focus:outline-hidden"
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E1D3] bg-[#FDFBF7] px-4 pt-3 pb-6 space-y-1 shadow-lg">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  active
                    ? "bg-[#8B0000] text-[#FDFBF7]"
                    : "text-[#2D3142] hover:bg-[#F5EFEB]"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "text-[#DAA520]" : "text-[#8C786A]"}`} />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}


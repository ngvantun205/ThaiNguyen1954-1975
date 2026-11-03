"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Article915 } from "@/lib/daidoi915-articles";
import { MartyrProfile } from "@/lib/martyrs-data";
import {
  Shield,
  Flame,
  BookOpen,
  Users,
  Award,
  Search,
  Filter,
  Calendar,
  MapPin,
  User,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Heart,
  Sparkles,
  Quote,
  Share2,
  Check,
} from "lucide-react";

interface DaiDoi915ClientProps {
  articles: Article915[];
  martyrs: MartyrProfile[];
}

export default function DaiDoi915Client({
  articles,
  martyrs,
}: DaiDoi915ClientProps) {
  // Main Tab: "articles" | "martyrs"
  const [activeTab, setActiveTab] = useState<"articles" | "martyrs">("articles");

  // Selected article for detailed reading view (null = show article cards list)
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  // Selected martyr for modal profile popup (null = closed)
  const [selectedMartyrId, setSelectedMartyrId] = useState<string | null>(null);

  // Search & Filters for Martyrs
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "has_photo" | "bac_kan" | "thai_nguyen" | "nu" | "nam">("all");
  const [copiedLink, setCopiedLink] = useState(false);

  // Active article object if one is selected
  const activeArticle = useMemo(() => {
    if (!selectedArticleId) return null;
    return articles.find((a) => a.id === selectedArticleId) || null;
  }, [articles, selectedArticleId]);

  // Active martyr object if modal is opened
  const activeMartyrIndex = useMemo(() => {
    if (!selectedMartyrId) return -1;
    return martyrs.findIndex((m) => m.id === selectedMartyrId);
  }, [martyrs, selectedMartyrId]);

  const activeMartyr = activeMartyrIndex >= 0 ? martyrs[activeMartyrIndex] : null;

  // Filtered martyrs
  const filteredMartyrs = useMemo(() => {
    return martyrs.filter((m) => {
      // Search matching
      const query = searchQuery.trim().toLowerCase();
      const matchQuery =
        !query ||
        m.name.toLowerCase().includes(query) ||
        (m.alias && m.alias.toLowerCase().includes(query)) ||
        m.hometown.toLowerCase().includes(query) ||
        m.ethnicity.toLowerCase().includes(query) ||
        m.position.toLowerCase().includes(query) ||
        String(m.order) === query;

      if (!matchQuery) return false;

      // Category filter
      if (selectedFilter === "has_photo") return m.hasPhoto;
      if (selectedFilter === "bac_kan") return m.hometown.toLowerCase().includes("bắc kạn");
      if (selectedFilter === "thai_nguyen") return m.hometown.toLowerCase().includes("thái nguyên");
      if (selectedFilter === "nu") return m.gender === "Nữ";
      if (selectedFilter === "nam") return m.gender === "Nam";

      return true;
    });
  }, [martyrs, searchQuery, selectedFilter]);

  // Handle modal keyboard navigation (Esc to close, left/right arrows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedMartyrId(null);
      }
      if (selectedMartyrId && activeMartyrIndex >= 0) {
        if (e.key === "ArrowLeft" && activeMartyrIndex > 0) {
          setSelectedMartyrId(martyrs[activeMartyrIndex - 1].id);
        } else if (e.key === "ArrowRight" && activeMartyrIndex < martyrs.length - 1) {
          setSelectedMartyrId(martyrs[activeMartyrIndex + 1].id);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMartyrId, activeMartyrIndex, martyrs]);

  // Scroll to top when article is selected
  useEffect(() => {
    if (selectedArticleId) {
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  }, [selectedArticleId]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D3142]">
      {/* Hero Header Section */}
      <section className="relative bg-gradient-to-b from-[#8B0000] via-[#750000] to-[#5C0000] text-[#FDFBF7] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b-4 border-[#DAA520] overflow-hidden">
        {/* Subtle background ornamentation */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#DAA520_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DAA520]/20 border border-[#DAA520]/40 text-[#DAA520] text-xs font-bold uppercase tracking-widest shadow-inner">
            <Flame className="w-4 h-4 text-[#DAA520] animate-pulse" />
            <span>Khu Di Tích Lịch Sử Quốc Gia • Đội TNXP 91 Bắc Thái</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-[#FDFBF7] tracking-tight leading-tight drop-shadow-md">
            ĐẠI ĐỘI 915 ANH HÙNG
          </h1>

          <p className="font-serif text-lg sm:text-2xl text-[#DAA520] font-medium italic max-w-3xl mx-auto leading-relaxed">
            “Huyền thoại tuổi hai mươi — 60 đóa hoa bất tử bên thềm Noel 1972 tại Ga Lưu Xá”
          </p>

          <p className="text-sm sm:text-base text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Nơi ghi dấu sự hy sinh oanh liệt của 60 cán bộ, đội viên Thanh niên xung phong trong đêm giáng sinh 24/12/1972 khi làm nhiệm vụ giải tỏa hàng hóa chi viện cho chiến trường miền Nam.
          </p>

          {/* Key Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto pt-4 text-left">
            <div className="bg-black/30 backdrop-blur-sm border border-[#DAA520]/30 rounded-2xl p-3.5 sm:p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#DAA520] font-serif">60</div>
              <div className="text-xs text-gray-300 font-medium mt-1">Liệt sĩ TNXP hy sinh</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm border border-[#DAA520]/30 rounded-2xl p-3.5 sm:p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#DAA520] font-serif">17 – 25</div>
              <div className="text-xs text-gray-300 font-medium mt-1">Độ tuổi đời rất trẻ</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm border border-[#DAA520]/30 rounded-2xl p-3.5 sm:p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#DAA520] font-serif">20.000+</div>
              <div className="text-xs text-gray-300 font-medium mt-1">Tấn hàng giải tỏa</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm border border-[#DAA520]/30 rounded-2xl p-3.5 sm:p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#DAA520] font-serif">24/12</div>
              <div className="text-xs text-gray-300 font-medium mt-1">Đêm Noel 1972 bất tử</div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs Bar */}
      <div className="sticky top-20 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E8E1D3] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => {
                  setActiveTab("articles");
                  setSelectedArticleId(null);
                }}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer ${
                  activeTab === "articles"
                    ? "bg-[#8B0000] text-[#FDFBF7] shadow-md shadow-[#8B0000]/20"
                    : "bg-[#F7F3EA] text-[#4A3B32] hover:bg-[#EAE4D5] hover:text-[#8B0000]"
                }`}
              >
                <BookOpen className="w-4 h-4 text-[#DAA520]" />
                <span>5 Khúc Tráng Ca Lịch Sử</span>
              </button>

              <button
                onClick={() => setActiveTab("martyrs")}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer ${
                  activeTab === "martyrs"
                    ? "bg-[#8B0000] text-[#FDFBF7] shadow-md shadow-[#8B0000]/20"
                    : "bg-[#F7F3EA] text-[#4A3B32] hover:bg-[#EAE4D5] hover:text-[#8B0000]"
                }`}
              >
                <Users className="w-4 h-4 text-[#DAA520]" />
                <span>60 Anh Hùng Liệt Sĩ</span>
                <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-[#DAA520] text-[#2D3142] font-black">
                  60
                </span>
              </button>
            </div>

            <button
              onClick={handleCopyLink}
              title="Sao chép liên kết trang"
              className="hidden sm:flex items-center gap-1.5 text-xs text-[#8C786A] hover:text-[#8B0000] px-3 py-1.5 rounded-lg border border-[#E8E1D3] hover:border-[#DAA520] transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-green-600 font-medium">Đã sao chép</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Chia sẻ trang</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* ======================================================== */}
        {/* TAB 1: 5 KHÚC TRÁNG CA LỊCH SỬ                            */}
        {/* ======================================================== */}
        {activeTab === "articles" && (
          <div className="space-y-10">
            {/* If an article is selected, show Article Detail view */}
            {activeArticle ? (
              <div className="space-y-8 animate-fadeIn">
                {/* Back to list button */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSelectedArticleId(null)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F7F3EA] hover:bg-[#8B0000] hover:text-[#FDFBF7] text-[#8B0000] font-bold text-sm border border-[#E8E1D3] transition-all duration-200 cursor-pointer shadow-xs"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Quay lại 5 chuyên mục lịch sử</span>
                  </button>

                  <div className="text-xs text-[#8C786A] font-medium">
                    Tư liệu nguyên văn Đại đội 915
                  </div>
                </div>

                {/* Article Header */}
                <article className="rounded-3xl bg-[#F7F3EA] border-2 border-[#E8E1D3] p-6 sm:p-10 shadow-md space-y-6">
                  <div className="space-y-3 border-b border-[#E8E1D3] pb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B0000] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider">
                      <Shield className="w-3.5 h-3.5 text-[#DAA520]" />
                      <span>Chuyên mục 0{activeArticle.order}</span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-4xl font-black text-[#8B0000] leading-tight">
                      {activeArticle.title}
                    </h2>
                  </div>

                  {/* Article Lead */}
                  <div className="bg-[#EAE4D5]/70 border-l-4 border-[#DAA520] p-4 sm:p-5 rounded-r-2xl">
                    <div className="flex items-start gap-3">
                      <Quote className="w-5 h-5 text-[#8B0000] shrink-0 mt-1" />
                      <p className="font-serif text-base sm:text-lg text-[#2D3142] font-semibold italic leading-relaxed">
                        {activeArticle.lead}
                      </p>
                    </div>
                  </div>

                  {/* Article Paragraphs - 100% Faithful */}
                  <div className="space-y-5 text-base sm:text-lg text-[#4A3B32] leading-relaxed pt-2">
                    {activeArticle.paragraphs.map((paragraph, idx) => (
                      <p key={idx} className="text-justify font-sans">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Historical Sign-off */}
                  <div className="mt-8 pt-6 border-t border-[#E8E1D3] flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs sm:text-sm text-[#8C786A] gap-3">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-[#DAA520]" />
                      <span>Nguồn: Tư liệu lịch sử chính thống Đại đội 915 - Đội TNXP 91 Bắc Thái</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Previous article button */}
                      {activeArticle.order > 1 && (
                        <button
                          onClick={() => {
                            const prev = articles.find((a) => a.order === activeArticle.order - 1);
                            if (prev) setSelectedArticleId(prev.id);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#EAE4D5] hover:bg-[#8B0000] hover:text-white transition-colors cursor-pointer font-medium"
                        >
                          ← Bài trước
                        </button>
                      )}
                      {/* Next article button */}
                      {activeArticle.order < articles.length && (
                        <button
                          onClick={() => {
                            const next = articles.find((a) => a.order === activeArticle.order + 1);
                            if (next) setSelectedArticleId(next.id);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#EAE4D5] hover:bg-[#8B0000] hover:text-white transition-colors cursor-pointer font-medium"
                        >
                          Bài tiếp →
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              </div>
            ) : (
              /* Article Cards List */
              <div className="space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#8B0000]">
                    <Sparkles className="w-4 h-4 text-[#DAA520]" />
                    <span>Toàn văn tư liệu lịch sử Đại đội 915</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-4xl font-black text-[#2D3142]">
                    5 Dấu Ấn & Chiến Công Oanh Liệt
                  </h2>
                  <p className="text-sm sm:text-base text-[#6B5E55]">
                    Nhấp vào từng chuyên mục bên dưới để đọc toàn văn bài viết chi tiết, trích xuất chính xác 100% từ hồ sơ lịch sử không thay đổi bất kỳ thông tin nào.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => setSelectedArticleId(art.id)}
                      className="group cursor-pointer rounded-3xl bg-[#F7F3EA] border-2 border-[#E8E1D3] hover:border-[#DAA520] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-[#8B0000] text-[#FDFBF7] text-xs font-black uppercase tracking-wider">
                            Mục 0{art.order}
                          </span>
                          <span className="text-xs font-semibold text-[#8C786A] flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5 text-[#DAA520]" />
                            {art.paragraphs.length} đoạn tư liệu
                          </span>
                        </div>

                        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#8B0000] group-hover:text-[#660000] transition-colors leading-snug">
                          {art.title}
                        </h3>

                        <p className="text-sm text-[#4A3B32] line-clamp-4 leading-relaxed font-sans">
                          {art.lead}
                        </p>
                      </div>

                      <div className="pt-6 mt-4 border-t border-[#E8E1D3] flex items-center justify-between text-xs font-bold text-[#8B0000] group-hover:text-[#660000]">
                        <span>Xem chi tiết toàn văn</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    </div>
                  ))}

                  {/* Extra Highlight Card: Chuyển sang danh sách liệt sĩ */}
                  <div
                    onClick={() => setActiveTab("martyrs")}
                    className="group cursor-pointer rounded-3xl bg-gradient-to-br from-[#8B0000] to-[#5C0000] border-2 border-[#DAA520] p-6 text-[#FDFBF7] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-[#DAA520] text-[#2D3142] text-xs font-black uppercase tracking-wider">
                          Không gian tưởng niệm
                        </span>
                        <Flame className="w-5 h-5 text-[#DAA520] animate-pulse" />
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FDFBF7] leading-snug">
                        Hồ Sơ 60 Anh Hùng Liệt Sĩ Đại Đội 915
                      </h3>

                      <p className="text-sm text-gray-200 leading-relaxed">
                        Tra cứu và xem đầy đủ chân dung, quê quán, dân tộc, chức vụ và thông tin thờ cúng của trọn vẹn 60 liệt sĩ đã anh dũng ngã xuống tại Ga Lưu Xá.
                      </p>
                    </div>

                    <div className="pt-6 mt-4 border-t border-[#DAA520]/40 flex items-center justify-between text-xs font-bold text-[#DAA520]">
                      <span>Xem toàn bộ 60 liệt sĩ</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: KHÔNG GIAN 60 ANH HÙNG LIỆT SĨ                   */}
        {/* ======================================================== */}
        {activeTab === "martyrs" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Tab Introduction */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#8B0000]">
                <Shield className="w-4 h-4 text-[#DAA520]" />
                <span>Bia vàng chiến công • Đời đời ghi nhớ</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-black text-[#2D3142]">
                Danh Sách 60 Anh Hùng Liệt Sĩ Đại Đội 915
              </h2>
              <p className="text-sm sm:text-base text-[#6B5E55]">
                Toàn bộ thông tin được số hóa từ tư liệu chính thức tại Khu di tích lịch sử quốc gia Đại đội 915. Nhấp vào thẻ của từng liệt sĩ để xem hồ sơ chi tiết và thông tin thờ cúng.
              </p>
            </div>

            {/* Search and Filters Bar */}
            <div className="bg-[#F7F3EA] border-2 border-[#E8E1D3] rounded-3xl p-4 sm:p-6 space-y-4 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search Input */}
                <div className="relative w-full md:w-96">
                  <Search className="w-4 h-4 text-[#8C786A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm theo họ tên, quê quán, dân tộc, STT..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FDFBF7] border border-[#E8E1D3] text-sm text-[#2D3142] placeholder-[#8C786A] focus:outline-hidden focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000] transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  <span className="text-xs font-bold text-[#8C786A] flex items-center gap-1 mr-1">
                    <Filter className="w-3.5 h-3.5" /> Lọc:
                  </span>
                  {[
                    { id: "all", label: `Tất cả (${martyrs.length})` },
                    { id: "has_photo", label: "Có ảnh chân dung (26)" },
                    { id: "thai_nguyen", label: "Thái Nguyên (33)" },
                    { id: "bac_kan", label: "Bắc Kạn (27)" },
                    { id: "nu", label: "Nữ (54)" },
                    { id: "nam", label: "Nam (6)" },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedFilter === filter.id
                          ? "bg-[#8B0000] text-[#FDFBF7] shadow-xs"
                          : "bg-[#FDFBF7] text-[#4A3B32] border border-[#E8E1D3] hover:border-[#DAA520]"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status summary */}
              <div className="text-xs text-[#8C786A] pt-2 border-t border-[#E8E1D3] flex items-center justify-between">
                <span>
                  Đang hiển thị <strong className="text-[#8B0000]">{filteredMartyrs.length}</strong> / 60 Anh hùng Liệt sĩ
                </span>
                <span className="italic hidden sm:inline">
                  (Ảnh đại diện: Liệt sĩ có ảnh chân dung hiển thị ảnh thật, liệt sĩ chưa có ảnh hiển thị khung nền gỗ trang trọng)
                </span>
              </div>
            </div>

            {/* Martyrs Grid */}
            {filteredMartyrs.length === 0 ? (
              <div className="text-center py-16 bg-[#F7F3EA] rounded-3xl border border-[#E8E1D3] p-8 space-y-3">
                <Search className="w-10 h-10 text-[#8C786A] mx-auto opacity-50" />
                <h3 className="font-serif text-xl font-bold text-[#8B0000]">Không tìm thấy liệt sĩ phù hợp</h3>
                <p className="text-sm text-[#6B5E55]">
                  Vui lòng thử tìm kiếm với từ khóa khác (ví dụ: tên, quê quán Bắc Kạn, Thái Nguyên, Chợ Đồn...)
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedFilter("all");
                  }}
                  className="px-4 py-2 rounded-xl bg-[#8B0000] text-white font-bold text-xs cursor-pointer hover:bg-[#660000]"
                >
                  Xóa bộ lọc
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                {filteredMartyrs.map((martyr) => (
                  <div
                    key={martyr.id}
                    onClick={() => setSelectedMartyrId(martyr.id)}
                    className="group cursor-pointer rounded-2xl bg-[#F7F3EA] border-2 border-[#E8E1D3] hover:border-[#DAA520] hover:shadow-xl transition-all duration-300 p-3.5 flex flex-col justify-between"
                  >
                    <div>
                      {/* Photo Container */}
                      <div className="relative aspect-3/4 rounded-xl overflow-hidden bg-[#2D3142] border border-[#DAA520]/50 shadow-inner group-hover:border-[#DAA520] transition-colors">
                        <img
                          src={martyr.image}
                          alt={martyr.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/images/anh-liet-si/image.png";
                          }}
                        />

                        {/* Order Badge */}
                        <div className="absolute top-2 left-2 bg-[#8B0000]/90 backdrop-blur-xs text-[#DAA520] text-[10px] font-black px-2 py-0.5 rounded-md border border-[#DAA520]/40 shadow-xs">
                          STT {martyr.order < 10 ? `0${martyr.order}` : martyr.order}
                        </div>

                        {/* Photo indicator */}
                        {martyr.hasPhoto && (
                          <div
                            title="Có ảnh chân dung tư liệu"
                            className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#DAA520] ring-2 ring-[#8B0000] shadow-xs"
                          />
                        )}
                      </div>

                      {/* Info below photo */}
                      <div className="mt-3 space-y-1">
                        <h4 className="font-serif text-sm sm:text-base font-bold text-[#8B0000] group-hover:text-[#660000] leading-snug line-clamp-1">
                          {martyr.name}
                        </h4>

                        <div className="flex items-center justify-between text-xs text-[#6B5E55]">
                          <span>{martyr.birthYear} ({martyr.age} tuổi)</span>
                          <span className="font-medium text-[#8B0000]">{martyr.gender}</span>
                        </div>

                        <div className="text-[11px] text-[#8C786A] truncate">
                          Dân tộc: <strong>{martyr.ethnicity}</strong>
                        </div>

                        <div className="text-[11px] text-[#8C786A] truncate">
                          Chức vụ: <strong>{martyr.position}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#E8E1D3] flex items-center justify-between text-[11px] font-bold text-[#8B0000] group-hover:text-[#660000]">
                      <span>Xem hồ sơ</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ======================================================== */}
      {/* DETAILED MARTYR MODAL POPUP                               */}
      {/* ======================================================== */}
      {activeMartyr && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedMartyrId(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-3xl border-4 border-[#DAA520] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-scaleUp"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#8B0000] via-[#750000] to-[#8B0000] text-[#FDFBF7] p-5 sm:p-6 border-b-2 border-[#DAA520] relative">
              <button
                onClick={() => setSelectedMartyrId(null)}
                aria-label="Đóng"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors cursor-pointer border border-[#DAA520]/40"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#DAA520]">
                <Flame className="w-4 h-4" />
                <span>Hồ Sơ Anh Hùng Liệt Sĩ • Số Thứ Tự {activeMartyr.order}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-black text-white mt-1">
                {activeMartyr.name}
              </h3>
              {activeMartyr.alias && (
                <div className="text-xs text-[#DAA520] font-medium">
                  Bí danh: <strong>{activeMartyr.alias}</strong>
                </div>
              )}
            </div>

            {/* Modal Body with scroll */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm text-[#2D3142]">
              {/* Photo & Core Information Row */}
              <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
                {/* Frame with Golden border */}
                <div className="relative w-36 sm:w-44 aspect-3/4 rounded-2xl overflow-hidden border-2 border-[#DAA520] shadow-md shrink-0 bg-[#2D3142]">
                  <img
                    src={activeMartyr.image}
                    alt={activeMartyr.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/images/anh-liet-si/image.png";
                    }}
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-center">
                    <span className="text-[10px] text-[#DAA520] font-bold uppercase tracking-wider">
                      {activeMartyr.hasPhoto ? "Ảnh chân dung tư liệu" : "Hình ảnh lưu niệm"}
                    </span>
                  </div>
                </div>

                {/* Core Attributes */}
                <div className="flex-1 space-y-3 w-full">
                  <div className="grid grid-cols-2 gap-3 bg-[#F7F3EA] p-4 rounded-2xl border border-[#E8E1D3]">
                    <div>
                      <span className="text-xs text-[#8C786A] block">Năm sinh:</span>
                      <strong className="text-base text-[#8B0000]">{activeMartyr.birthYear}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-[#8C786A] block">Tuổi hy sinh:</span>
                      <strong className="text-base text-[#8B0000]">{activeMartyr.age} tuổi</strong>
                    </div>
                    <div>
                      <span className="text-xs text-[#8C786A] block">Giới tính:</span>
                      <strong className="text-sm font-semibold text-[#2D3142]">{activeMartyr.gender}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-[#8C786A] block">Dân tộc:</span>
                      <strong className="text-sm font-semibold text-[#2D3142]">{activeMartyr.ethnicity}</strong>
                    </div>
                  </div>

                  <div className="bg-[#F7F3EA] p-4 rounded-2xl border border-[#E8E1D3] space-y-2">
                    <div>
                      <span className="text-xs text-[#8C786A] block">Chức vụ trong Đại đội 915:</span>
                      <strong className="text-sm font-bold text-[#8B0000]">{activeMartyr.position}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-[#8C786A] block">Đoàn thể chính trị:</span>
                      <span className="text-xs font-semibold text-[#2D3142]">
                        {activeMartyr.partyMember ? "Đảng viên Đảng Lao động Việt Nam" : "Đoàn viên Đoàn TNCS Hồ Chí Minh"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hometown & Sacrifice Info */}
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#F7F3EA] border border-[#E8E1D3] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#8B0000]">
                    <MapPin className="w-4 h-4 text-[#DAA520]" />
                    <span>Quê quán:</span>
                  </div>
                  <p className="text-sm text-[#4A3B32] pl-5 leading-relaxed font-medium">
                    {activeMartyr.hometown}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F3EA] border border-[#E8E1D3] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#8B0000]">
                    <Calendar className="w-4 h-4 text-[#DAA520]" />
                    <span>Thời gian & Địa điểm hy sinh:</span>
                  </div>
                  <p className="text-sm text-[#4A3B32] pl-5 leading-relaxed">
                    <strong>Đêm 24 tháng 12 năm 1972</strong> (Đêm Noel) tại Khu vực ga Lưu Xá, Gia Sàng, thành phố Thái Nguyên, tỉnh Bắc Thái trong khi làm nhiệm vụ giải tỏa hàng hóa chi viện chiến trường.
                  </p>
                </div>

                {activeMartyr.award && (
                  <div className="p-4 rounded-2xl bg-[#F7F3EA] border border-[#E8E1D3] space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#8B0000]">
                      <Award className="w-4 h-4 text-[#DAA520]" />
                      <span>Khen thưởng của Đảng & Nhà nước:</span>
                    </div>
                    <p className="text-sm text-[#4A3B32] pl-5 leading-relaxed font-semibold">
                      {activeMartyr.award}
                    </p>
                  </div>
                )}

                <div className="p-4 rounded-2xl bg-[#EAE4D5]/60 border border-[#DAA520]/40 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#8B0000]">
                    <Flame className="w-4 h-4 text-[#DAA520]" />
                    <span>Thân nhân & Địa chỉ thờ cúng hiện nay:</span>
                  </div>
                  <p className="text-sm text-[#2D3142] pl-5 leading-relaxed font-medium">
                    {activeMartyr.worshipAddress || "Đang cập nhật thông tin thân nhân"}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer with Prev / Next Navigation */}
            <div className="bg-[#F7F3EA] border-t border-[#E8E1D3] p-4 flex items-center justify-between">
              <button
                disabled={activeMartyrIndex <= 0}
                onClick={() => {
                  if (activeMartyrIndex > 0) {
                    setSelectedMartyrId(martyrs[activeMartyrIndex - 1].id);
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeMartyrIndex <= 0
                    ? "opacity-40 cursor-not-allowed bg-gray-200 text-gray-400"
                    : "bg-[#FDFBF7] text-[#8B0000] border border-[#E8E1D3] hover:border-[#DAA520]"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Liệt sĩ trước</span>
              </button>

              <Link
                href="/tuong-niem"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8B0000] hover:bg-[#660000] text-[#FDFBF7] text-xs font-bold transition-all shadow-xs"
              >
                <Flame className="w-4 h-4 text-[#DAA520] animate-pulse" />
                <span>Thắp nến tri ân</span>
              </Link>

              <button
                disabled={activeMartyrIndex >= martyrs.length - 1}
                onClick={() => {
                  if (activeMartyrIndex < martyrs.length - 1) {
                    setSelectedMartyrId(martyrs[activeMartyrIndex + 1].id);
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeMartyrIndex >= martyrs.length - 1
                    ? "opacity-40 cursor-not-allowed bg-gray-200 text-gray-400"
                    : "bg-[#FDFBF7] text-[#8B0000] border border-[#E8E1D3] hover:border-[#DAA520]"
                }`}
              >
                <span>Liệt sĩ tiếp</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { HISTORICAL_TOPICS, MARTYRS_915_SAMPLE, HISTORICAL_EVENTS } from "@/lib/historical-data";
import SafeImage from "@/components/common/SafeImage";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  Quote,
  ShieldCheck,
  CheckCircle2,
  Flame,
  Award,
  List,
  MapPin,
  Calendar,
} from "lucide-react";

export async function generateStaticParams() {
  return HISTORICAL_TOPICS.map((topic) => ({
    slug: topic.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = HISTORICAL_TOPICS.find((t) => t.slug === slug);
  if (!topic) return { title: "Không tìm thấy chuyên đề" };

  return {
    title: `${topic.title} | Thái Nguyên (1954 – 1975)`,
    description: topic.summary,
    openGraph: {
      title: `${topic.title} | Thái Nguyên (1954 – 1975)`,
      description: topic.summary,
    },
  };
}

export default async function TopicDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topicIndex = HISTORICAL_TOPICS.findIndex((t) => t.slug === slug);

  if (topicIndex === -1) {
    notFound();
  }

  const topic = HISTORICAL_TOPICS[topicIndex];
  const prevTopic = topicIndex > 0 ? HISTORICAL_TOPICS[topicIndex - 1] : null;
  const nextTopic =
    topicIndex < HISTORICAL_TOPICS.length - 1
      ? HISTORICAL_TOPICS[topicIndex + 1]
      : null;

  return (
    <article className="py-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-mono font-semibold text-[#4A4742]">
        <Link href="/" className="hover:text-[#8D2926]">
          TRANG CHỦ
        </Link>
        <span>/</span>
        <Link href="/chuyen-de" className="hover:text-[#8D2926]">
          4 CHUYÊN ĐỀ
        </Link>
        <span>/</span>
        <span className="text-[#8D2926] font-bold">CHUYÊN ĐỀ 0{topic.number}</span>
      </nav>

      {/* Main Editorial Grid: Left/Center Main Content (8 cols) + Right Sticky Sidebar (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* LEFT / CENTER: Editorial Storytelling Content (8 cols) */}
        <div className="lg:col-span-8 space-y-10">
          {/* Article Header */}
          <header className="rounded-2xl bg-[#FAF5ED] border-2 border-[#D5C7AD] p-8 sm:p-10 space-y-6 archival-shadow">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#D5C7AD]">
              <span className="px-3.5 py-1 rounded bg-[#8D2926] text-[#FAF5ED] text-xs font-mono font-bold uppercase tracking-wider">
                Chuyên Đề 0{topic.number} • {topic.badge}
              </span>
              <span className="flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold text-[#A88A52]">
                <Clock className="w-4 h-4" />
                Thời kỳ: {topic.timeframe}
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#8D2926] tracking-tight leading-tight">
                {topic.title}
              </h1>
              <p className="font-serif text-base sm:text-lg text-[#A88A52] font-semibold italic">
                {topic.subtitle}
              </p>
            </div>

            <p className="text-base sm:text-lg text-[#242321] leading-relaxed border-t border-[#D5C7AD] pt-6 font-normal">
              {topic.summary}
            </p>

            {/* Topic Hero Archival Image */}
            {topic.heroImage && (
              <div className="space-y-2 pt-2">
                <div className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden border-2 border-[#D5C7AD] bg-[#242321]/5 shadow-sm">
                  <SafeImage
                    src={topic.heroImage}
                    alt={topic.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-[#4A4742] italic px-1 font-mono">
                  <span>Ảnh tư liệu: {topic.title}</span>
                  <span>Nguồn: Bảo tàng Lịch sử & Đảng bộ Thái Nguyên</span>
                </div>
              </div>
            )}

            {/* 3 Quick Stats Callouts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {topic.keyStats.map((stat, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-[#F3EBDD] border border-[#D5C7AD] p-4 text-center shadow-xs"
                >
                  <div className="font-serif text-2xl font-bold text-[#8D2926]">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-[#242321] mt-1">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-[#4A4742] mt-1 leading-normal">
                    {stat.detail}
                  </div>
                </div>
              ))}
            </div>
          </header>

          {/* Detailed Content Sections */}
          <div className="space-y-10">
            {topic.sections.map((section, idx) => (
              <section
                id={`muc-${idx + 1}`}
                key={idx}
                className="rounded-2xl bg-[#FAF5ED] border border-[#D5C7AD] p-8 sm:p-10 archival-shadow space-y-6 scroll-mt-28"
              >
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#8D2926] border-b border-[#D5C7AD] pb-4">
                  {section.title}
                </h2>

                {/* Paragraphs */}
                <div className="space-y-4 text-base sm:text-lg text-[#242321] leading-relaxed">
                  {section.content.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {/* Historical Quote */}
                {section.quote && (
                  <blockquote className="my-6 rounded-xl bg-[#F3EBDD] border-l-4 border-[#8D2926] p-6 sm:p-8 space-y-3 relative">
                    <Quote className="w-8 h-8 text-[#A88A52]/40 absolute top-4 right-4" />
                    <p className="font-serif italic text-base sm:text-xl text-[#8D2926] leading-snug">
                      &ldquo;{section.quote.text}&rdquo;
                    </p>
                    <footer className="text-xs sm:text-sm font-semibold text-[#4A4742] text-right font-mono">
                      — {section.quote.author}
                    </footer>
                  </blockquote>
                )}

                {/* Highlights Box */}
                {section.highlights && section.highlights.length > 0 && (
                  <div className="rounded-xl bg-[#F3EBDD]/70 p-6 border border-[#D5C7AD] space-y-3">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#8D2926] flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#A88A52]" />
                      <span>Các cứ liệu lịch sử quan trọng:</span>
                    </h3>
                    <ul className="space-y-2 text-sm sm:text-base text-[#242321]">
                      {section.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#8D2926] mt-1 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ))}

            {/* Special Section for Topic 4: Documentary Video */}
            {topic.slug === "khuc-hung-ca-dai-doi-915" && (
              <section id="phim-tai-lieu" className="rounded-2xl bg-[#FAF5ED] border-2 border-[#A88A52] p-6 sm:p-10 space-y-5 archival-shadow scroll-mt-28">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3.5 py-1 rounded bg-[#8D2926] text-[#FAF5ED] text-xs font-mono font-bold uppercase tracking-wider">
                    Thước Phim Tài Liệu Lịch Sử
                  </span>
                  <span className="text-xs text-[#4A4742] font-mono">Nguồn: Đài PT-TH Thái Nguyên (TNTV)</span>
                </div>
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#8D2926]">
                    Thước Phim Tư Liệu: Khúc Hùng Ca Đại Đội 915 Bất Tử
                  </h2>
                  <p className="text-sm text-[#4A4742] mt-1">
                    Ghi lại những lời kể của các nhân chứng lịch sử và sự hy sinh kiên cường của 60 cán bộ, đội viên Đại đội 915 TNXP đêm 24/12/1972 tại Ga Lưu Xá.
                  </p>
                </div>
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border-2 border-[#8D2926] shadow-xl bg-black">
                  <iframe
                    src="https://www.youtube.com/embed/XVh1vdnfSQI?rel=0"
                    title="Phim tài liệu Đại đội 915 bất tử"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </section>
            )}

            {/* Special Section for Topic 4: Martyrs Table */}
            {topic.slug === "khuc-hung-ca-dai-doi-915" && (
              <section id="danh-sach-liet-si" className="rounded-2xl bg-[#1B1A18] text-[#FAF5ED] p-8 sm:p-12 border-2 border-[#A88A52] shadow-2xl space-y-8 scroll-mt-28">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="px-3.5 py-1 rounded bg-[#8D2926] text-xs font-mono font-bold uppercase tracking-widest text-[#A88A52] border border-[#A88A52]/40">
                    BIA DANH DỰ LỊCH SỬ
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF5ED]">
                    Danh Sách 60 Liệt Sĩ TNXP Đại Đội 915 Bất Tử
                  </h2>
                  <p className="text-xs sm:text-sm text-[#D5C7AD] leading-relaxed font-light">
                    Hy sinh đêm Noel 24/12/1972 tại Ga Lưu Xá, phường Gia Sàng, thành phố Thái Nguyên.
                  </p>
                </div>

                <div className="overflow-x-auto rounded-xl border border-[#4A4742] bg-[#242321]">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#8D2926] text-[#A88A52] uppercase text-[11px] font-mono font-bold tracking-wider">
                      <tr>
                        <th className="py-3 px-4">STT</th>
                        <th className="py-3 px-4">Họ và tên</th>
                        <th className="py-3 px-4">Năm sinh</th>
                        <th className="py-3 px-4">Giới tính</th>
                        <th className="py-3 px-4">Quê quán</th>
                        <th className="py-3 px-4">Chức vụ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#4A4742] text-[#D5C7AD]">
                      {MARTYRS_915_SAMPLE.map((m) => (
                        <tr key={m.order} className="hover:bg-[#A88A52]/10 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-[#A88A52]">{m.order}</td>
                          <td className="py-3 px-4 font-bold text-[#FAF5ED]">{m.name}</td>
                          <td className="py-3 px-4">{m.birthYear}</td>
                          <td className="py-3 px-4">{m.gender}</td>
                          <td className="py-3 px-4">{m.hometown}</td>
                          <td className="py-3 px-4 text-[#A88A52]">{m.position}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="text-center pt-2">
                  <p className="text-xs text-[#D5C7AD]/70 italic">
                    (Trên đây là danh sách đại diện tiêu biểu trong số 60 liệt sĩ TNXP Đại đội 915 được lưu danh tại Khu di tích Quốc gia Gia Sàng)
                  </p>
                  <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
                    <Link
                      href="/dai-doi-915"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#8D2926] text-[#FAF5ED] border border-[#A88A52] font-semibold text-sm shadow-md hover:bg-[#6E1F1D] transition-all"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#A88A52]" />
                      <span>Xem hồ sơ đầy đủ 60 Liệt sĩ tại trang Đại đội 915</span>
                    </Link>
                    <Link
                      href="/tuong-niem"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#FAF5ED] text-[#8D2926] font-bold text-sm shadow-md hover:bg-[#F3EBDD] transition-all"
                    >
                      <Flame className="w-4 h-4 text-[#8D2926] fill-[#8D2926]" />
                      <span>Thắp nén hương thơm tưởng niệm</span>
                    </Link>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>

        {/* RIGHT: Sticky Editorial Table of Contents & Archival Sidebar (4 cols) */}
        <aside className="lg:col-span-4 sticky top-28 space-y-6">
          {/* Table of Contents Box */}
          <div className="rounded-2xl bg-[#FAF5ED] border-2 border-[#D5C7AD] p-6 archival-shadow space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#D5C7AD] text-xs font-mono font-bold text-[#8D2926] uppercase">
              <List className="w-4 h-4 text-[#A88A52]" />
              <span>MỤC LỤC CHUYÊN ĐỀ</span>
            </div>

            <nav className="space-y-2 text-xs sm:text-sm">
              {topic.sections.map((section, idx) => (
                <a
                  key={idx}
                  href={`#muc-${idx + 1}`}
                  className="block p-2 rounded-md hover:bg-[#F3EBDD] text-[#242321] hover:text-[#8D2926] transition-colors leading-snug"
                >
                  <span className="font-mono text-[#A88A52] font-bold mr-1.5">{idx + 1}.</span>
                  <span>{section.title.replace(/^[0-9.]+\s*/, "")}</span>
                </a>
              ))}
              {topic.slug === "khuc-hung-ca-dai-doi-915" && (
                <>
                  <a
                    href="#phim-tai-lieu"
                    className="block p-2 rounded-md hover:bg-[#F3EBDD] text-[#8D2926] font-semibold transition-colors"
                  >
                    ▶ Phim tư liệu Đại đội 915
                  </a>
                  <a
                    href="#danh-sach-liet-si"
                    className="block p-2 rounded-md hover:bg-[#F3EBDD] text-[#8D2926] font-semibold transition-colors"
                  >
                    ★ Danh sách 60 Liệt sĩ TNXP
                  </a>
                </>
              )}
            </nav>
          </div>

          {/* Quick Context & Map Shortcut Box */}
          <div className="rounded-2xl bg-[#F3EBDD] border border-[#D5C7AD] p-6 space-y-4 text-xs text-[#4A4742]">
            <div className="font-mono font-bold uppercase text-[#8D2926] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#A88A52]" />
              <span>TỌA ĐỘ VÀ SỰ KIỆN LIÊN QUAN</span>
            </div>
            <p className="leading-relaxed">
              Các di tích, trận địa và hiện vật thuộc chuyên đề này được kết nối trực tiếp trên <strong>Bản đồ Lịch sử Thái Nguyên</strong>.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/#ban-do"
                className="w-full py-2.5 px-3 rounded-lg bg-[#FAF5ED] border border-[#D5C7AD] text-[#8D2926] font-semibold text-center hover:bg-[#8D2926] hover:text-[#FAF5ED] transition-colors"
              >
                Mở bản đồ lịch sử
              </Link>
              <Link
                href="/tu-lieu"
                className="w-full py-2.5 px-3 rounded-lg bg-[#FAF5ED] border border-[#D5C7AD] text-[#242321] font-semibold text-center hover:bg-[#F3EBDD] transition-colors"
              >
                Xem ảnh tư liệu liên quan
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Prev / Next Topic Navigation */}
      <footer className="pt-8 border-t-2 border-[#D5C7AD] flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevTopic ? (
          <Link
            href={`/chuyen-de/${prevTopic.slug}`}
            className="w-full sm:w-auto p-4 rounded-xl bg-[#FAF5ED] border border-[#D5C7AD] hover:border-[#8D2926] flex items-center gap-3 text-left transition-all archival-shadow"
          >
            <ArrowLeft className="w-5 h-5 text-[#8D2926] shrink-0" />
            <div>
              <div className="text-[11px] font-mono font-bold text-[#A88A52] uppercase">Chuyên đề trước</div>
              <div className="font-serif text-sm font-bold text-[#8D2926]">{prevTopic.shortTitle}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextTopic ? (
          <Link
            href={`/chuyen-de/${nextTopic.slug}`}
            className="w-full sm:w-auto p-4 rounded-xl bg-[#FAF5ED] border border-[#D5C7AD] hover:border-[#8D2926] flex items-center justify-end gap-3 text-right transition-all archival-shadow"
          >
            <div>
              <div className="text-[11px] font-mono font-bold text-[#A88A52] uppercase">Chuyên đề kế tiếp</div>
              <div className="font-serif text-sm font-bold text-[#8D2926]">{nextTopic.shortTitle}</div>
            </div>
            <ArrowRight className="w-5 h-5 text-[#8D2926] shrink-0" />
          </Link>
        ) : (
          <div />
        )}
      </footer>
    </article>
  );
}

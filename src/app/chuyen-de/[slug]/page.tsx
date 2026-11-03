import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { HISTORICAL_TOPICS, MARTYRS_915_SAMPLE } from "@/lib/historical-data";
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
    title: topic.title,
    description: topic.summary,
    openGraph: {
      title: `${topic.title} | Thái Nguyên (1965 – 1972)`,
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
    <article className="py-12 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-[#8C786A]">
        <Link href="/" className="hover:text-[#8B0000]">
          Trang chủ
        </Link>
        <span>/</span>
        <Link href="/chuyen-de" className="hover:text-[#8B0000]">
          4 Chuyên đề
        </Link>
        <span>/</span>
        <span className="text-[#8B0000]">Chuyên đề 0{topic.number}</span>
      </nav>

      {/* Header Banner */}
      <header className="rounded-3xl bg-[#F7F3EA] border-2 border-[#E8E1D3] p-8 sm:p-12 space-y-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-4 py-1.5 rounded-full bg-[#8B0000] text-[#FDFBF7] text-xs font-bold uppercase tracking-widest shadow-xs">
            Chuyên Đề 0{topic.number} • {topic.badge}
          </span>
          <span className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8C786A]">
            <Clock className="w-4 h-4 text-[#DAA520]" />
            Thời kỳ: {topic.timeframe}
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#8B0000] tracking-tight leading-tight">
            {topic.title}
          </h1>
          <p className="font-serif text-base sm:text-lg text-[#DAA520] font-semibold italic">
            {topic.subtitle}
          </p>
        </div>

        <p className="text-base sm:text-lg text-[#4A3B32] leading-relaxed border-t border-[#E8E1D3] pt-6 font-normal">
          {topic.summary}
        </p>

        {/* 3 Quick Stats Callouts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          {topic.keyStats.map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl bg-[#FDFBF7] border border-[#E8E1D3] p-4 text-center shadow-xs"
            >
              <div className="font-serif text-2xl font-black text-[#8B0000]">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-[#2D3142] mt-0.5">
                {stat.label}
              </div>
              <div className="text-[11px] text-[#8C786A] mt-1 leading-normal">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* Detailed Content Sections */}
      <div className="space-y-12">
        {topic.sections.map((section, idx) => (
          <section
            key={idx}
            className="rounded-3xl bg-[#FDFBF7] border border-[#E8E1D3] p-8 sm:p-10 shadow-sm space-y-6"
          >
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D3142] border-b border-[#E8E1D3] pb-4">
              {section.title}
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4 text-base sm:text-lg text-[#4A3B32] leading-relaxed">
              {section.content.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>

            {/* Historical Quote (if any) */}
            {section.quote && (
              <blockquote className="my-6 rounded-2xl bg-[#F7F3EA] border-l-4 border-[#8B0000] p-6 sm:p-8 space-y-3 relative">
                <Quote className="w-8 h-8 text-[#DAA520]/40 absolute top-4 right-4" />
                <p className="font-serif italic text-base sm:text-xl text-[#8B0000] leading-snug">
                  &ldquo;{section.quote.text}&rdquo;
                </p>
                <footer className="text-xs sm:text-sm font-semibold text-[#8C786A] text-right">
                  — {section.quote.author}
                </footer>
              </blockquote>
            )}

            {/* Highlights Bullet List (if any) */}
            {section.highlights && section.highlights.length > 0 && (
              <div className="rounded-2xl bg-[#F5EFEB]/70 p-6 border border-[#E8E1D3] space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#8B0000] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#DAA520]" />
                  <span>Các điểm ghi nhận lịch sử quan trọng:</span>
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-[#2D3142]">
                  {section.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#8B0000] mt-1 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}

        {/* Special Section for Topic 4: Danh sách Liệt sĩ Đại đội 915 */}
        {topic.slug === "khuc-hung-ca-dai-doi-915" && (
          <section id="danh-sach-liet-si" className="rounded-3xl bg-gradient-to-b from-[#1E212D] via-[#2D3142] to-[#1E212D] text-[#FDFBF7] p-8 sm:p-12 border-2 border-[#DAA520] shadow-2xl space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="px-4 py-1.5 rounded-full bg-[#8B0000] text-xs font-bold uppercase tracking-widest text-[#DAA520] border border-[#DAA520]">
                Tấm Bia Lịch Sử
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#FDFBF7]">
                Danh Sách 60 Liệt Sĩ TNXP Đại Đội 915 Bất Tử
              </h2>
              <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                Hy sinh đêm Noel 24/12/1972 tại Ga Lưu Xá, phường Gia Sàng, thành phố Thái Nguyên.
              </p>
            </div>

            {/* Martyrs Table */}
            <div className="overflow-x-auto rounded-2xl border border-[#4F5568] bg-[#1B1E2B]/80">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#8B0000] text-[#DAA520] uppercase text-[11px] font-bold tracking-wider">
                  <tr>
                    <th className="py-3 px-4">STT</th>
                    <th className="py-3 px-4">Họ và tên</th>
                    <th className="py-3 px-4">Năm sinh</th>
                    <th className="py-3 px-4">Giới tính</th>
                    <th className="py-3 px-4">Quê quán</th>
                    <th className="py-3 px-4">Chức vụ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#4F5568]/60 text-[#E8E1D3]">
                  {MARTYRS_915_SAMPLE.map((m) => (
                    <tr key={m.order} className="hover:bg-[#DAA520]/10 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#DAA520]">{m.order}</td>
                      <td className="py-3 px-4 font-bold text-[#FDFBF7]">{m.name}</td>
                      <td className="py-3 px-4">{m.birthYear}</td>
                      <td className="py-3 px-4">{m.gender}</td>
                      <td className="py-3 px-4">{m.hometown}</td>
                      <td className="py-3 px-4 text-[#DAA520]">{m.position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center pt-2">
              <p className="text-xs text-[#9CA3AF] italic">
                (Trên đây là danh sách đại diện tiêu biểu trong số 60 liệt sĩ TNXP Đại đội 915 được lưu danh tại Khu di tích Quốc gia Gia Sàng)
              </p>
              <div className="pt-6">
                <Link
                  href="/tuong-niem"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-[#1E212D] font-bold text-sm shadow-lg hover:scale-105 transition-all"
                >
                  <Flame className="w-4 h-4 text-[#8B0000] fill-[#8B0000]" />
                  <span>Dâng nén hương thơm & Thắp nến tưởng niệm</span>
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Prev / Next Topic Navigation */}
      <footer className="pt-8 border-t-2 border-[#E8E1D3] flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevTopic ? (
          <Link
            href={`/chuyen-de/${prevTopic.slug}`}
            className="w-full sm:w-auto p-4 rounded-2xl bg-[#F7F3EA] border border-[#E8E1D3] hover:border-[#8B0000] flex items-center gap-3 text-left transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-[#8B0000] shrink-0" />
            <div>
              <div className="text-[11px] font-bold text-[#8C786A] uppercase">Chuyên đề trước</div>
              <div className="font-serif text-sm font-bold text-[#8B0000]">{prevTopic.shortTitle}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextTopic ? (
          <Link
            href={`/chuyen-de/${nextTopic.slug}`}
            className="w-full sm:w-auto p-4 rounded-2xl bg-[#F7F3EA] border border-[#E8E1D3] hover:border-[#8B0000] flex items-center justify-end gap-3 text-right transition-all"
          >
            <div>
              <div className="text-[11px] font-bold text-[#8C786A] uppercase">Chuyên đề kế tiếp</div>
              <div className="font-serif text-sm font-bold text-[#8B0000]">{nextTopic.shortTitle}</div>
            </div>
            <ArrowRight className="w-5 h-5 text-[#8B0000] shrink-0" />
          </Link>
        ) : (
          <div />
        )}
      </footer>
    </article>
  );
}


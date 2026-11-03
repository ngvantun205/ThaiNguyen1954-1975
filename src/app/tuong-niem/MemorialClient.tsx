"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CandleLightWidget from "@/components/memorial/CandleLightWidget";
import GuestbookForm from "@/components/memorial/GuestbookForm";
import TributeWall from "@/components/memorial/TributeWall";
import { Tribute } from "@/types/content.types";
import { Flame, Shield, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function MemorialClient() {
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Tải toàn bộ lời tri ân thực tế từ Supabase
    fetch("/api/tributes")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data?.tributes)) {
          setTributes(data.tributes);
        }
      })
      .catch((err) => console.error("Error loading tributes:", err))
      .finally(() => setIsLoading(false));

    // 2. Kênh Realtime lắng nghe lời tri ân mới thêm vào database Supabase
    const channel = supabase
      .channel("tributes-realtime-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "memorial_tributes" },
        (payload: any) => {
          if (payload.new) {
            setTributes((prev) => [payload.new as Tribute, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleTributeAdded = (newTribute: Tribute) => {
    setTributes((prev) => {
      if (prev.some((t) => t.id === newTribute.id)) return prev;
      return [newTribute, ...prev];
    });
  };

  return (
    <div className="relative min-h-screen bg-[#11100F] text-[#FAF5ED] overflow-hidden">
      {/* Sacred Sanctum Ambient Lighting & Texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#181715] via-[#11100F] to-[#0A0A09] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#A88A52_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.08] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[#8D2926]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-96 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#A88A52]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between text-xs font-mono text-[#D5C7AD]/60 pb-2 border-b border-[#3A3630]/60">
          <Link href="/" className="flex items-center gap-1.5 hover:text-[#A88A52] transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>QUAY LẠI TRANG CHỦ</span>
          </Link>
          <span className="text-[#A88A52]">ĐÀI TƯỞNG NIỆM & TRI ÂN SỐ HÓA</span>
        </div>

        {/* Tiêu đề & Không gian thiêng liêng */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8D2926] text-[#FAF5ED] text-xs font-mono font-bold uppercase tracking-widest border border-[#A88A52]/60 shadow-lg">
            <Flame className="w-3.5 h-3.5 fill-[#A88A52] text-[#A88A52] animate-flame" />
            <span>Không Gian Tưởng Niệm & Tri Ân Thiêng Liêng</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#FAF5ED] tracking-tight leading-tight">
            Đời Đời Nhớ Ơn Các Anh Hùng Liệt Sĩ
          </h1>

          <p className="font-serif italic text-base sm:text-lg text-[#A88A52] max-w-2xl mx-auto font-normal">
            &ldquo;Máu đào của các liệt sĩ đã nhuộm màu cờ Tổ quốc vinh quang&rdquo;
          </p>

          <p className="text-sm sm:text-base text-[#D5C7AD] leading-relaxed font-light max-w-2xl mx-auto">
            Nơi hội tụ tấm lòng thành kính, sự tri ân sâu nặng của đồng bào cả nước gửi tới anh linh 60 liệt sĩ TNXP Đại đội 915
            và các cán bộ chiến sĩ, đồng bào Thái Nguyên đã cống hiến tuổi xuân vì độc lập non sông.
          </p>
        </div>

        {/* 1. Nghi thức Thắp nến tri ân kết nối trực tiếp Supabase Realtime */}
        <section className="max-w-4xl mx-auto">
          <CandleLightWidget />
        </section>

        {/* 2. Biểu mẫu gửi lời tri ân trực tuyến vào Supabase */}
        <section className="max-w-4xl mx-auto">
          <GuestbookForm onTributeAdded={handleTributeAdded} />
        </section>

        {/* 3. Tường lưu bút với dữ liệu thực từ Supabase */}
        <section className="pt-6">
          {isLoading ? (
            <div className="text-center py-12 text-sm text-[#D5C7AD]/60 italic font-light">
              Đang kết nối cơ sở dữ liệu lưu bút Supabase...
            </div>
          ) : (
            <TributeWall tributes={tributes} />
          )}
        </section>
      </div>
    </div>
  );
}

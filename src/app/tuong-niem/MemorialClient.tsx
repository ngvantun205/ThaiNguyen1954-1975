"use client";

import { useState, useEffect } from "react";
import CandleLightWidget from "@/components/memorial/CandleLightWidget";
import GuestbookForm from "@/components/memorial/GuestbookForm";
import TributeWall from "@/components/memorial/TributeWall";
import { Tribute } from "@/types/content.types";
import { Flame } from "lucide-react";
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
    <div className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Tiêu đề & Không gian thiêng liêng */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8D2926] text-[#FAF5ED] text-xs font-mono font-bold uppercase tracking-widest border border-[#A88A52]/40 shadow-xs">
          <Flame className="w-3.5 h-3.5 fill-[#A88A52] text-[#A88A52]" />
          <span>Không Gian Tưởng Niệm & Tri Ân Thiêng Liêng</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#242321] tracking-tight">
          Đời Đời Nhớ Ơn Các Anh Hùng Liệt Sĩ
        </h1>
        <p className="text-base sm:text-lg text-[#4A4742] leading-relaxed">
          Nơi hội tụ tấm lòng thành kính, sự tri ân của các thế hệ hôm nay gửi tới 60 liệt sĩ TNXP Đại đội 915
          và các cán bộ chiến sĩ, đồng bào Thái Nguyên đã cống hiến tuổi xuân vì Tổ quốc.
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
          <div className="text-center py-10 text-sm text-[#4A4742] italic">
            Đang tải dữ liệu lưu bút từ hệ thống Supabase...
          </div>
        ) : (
          <TributeWall tributes={tributes} />
        )}
      </section>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import CandleLightWidget from "@/components/memorial/CandleLightWidget";
import GuestbookForm from "@/components/memorial/GuestbookForm";
import TributeWall from "@/components/memorial/TributeWall";
import { Tribute } from "@/types/content.types";
import { Flame, Sparkles, Heart, Shield } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

export default function MemorialClient() {
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch tributes from API
    fetch("/api/tributes")
      .then((res) => res.json())
      .then((data) => {
        if (data?.tributes) {
          setTributes(data.tributes);
        }
      })
      .catch((err) => console.error("Error loading tributes:", err))
      .finally(() => setIsLoading(false));

    // 2. Realtime listener if Supabase is active
    const client = supabase;
    if (isSupabaseConfigured && client) {
      const channel = client
        .channel("tributes-realtime")
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
        client.removeChannel(channel);
      };
    }
  }, []);

  const handleTributeAdded = (newTribute: Tribute) => {
    setTributes((prev) => [newTribute, ...prev]);
  };

  return (
    <div className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Page Title & Sacred Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B0000] text-[#DAA520] text-xs font-bold uppercase tracking-widest border border-[#DAA520] shadow-sm">
          <Flame className="w-3.5 h-3.5 fill-[#DAA520]" />
          <span>Không Gian Tưởng Niệm & Tri Ân Thiêng Liêng</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#2D3142] tracking-tight">
          Đời Đời Nhớ Ơn Các Anh Hùng Liệt Sĩ
        </h1>
        <p className="text-base sm:text-lg text-[#4A3B32] leading-relaxed">
          Nơi hội tụ tấm lòng thành kính, sự tri ân của thế hệ hôm nay gửi tới 60 liệt sĩ TNXP Đại đội 915
          và các cán bộ chiến sĩ, đồng bào Thái Nguyên đã cống hiến tuổi xuân vì Tổ quốc.
        </p>
      </div>

      {/* 1. Realtime Candle Light Ceremony Widget */}
      <section className="max-w-4xl mx-auto">
        <CandleLightWidget />
      </section>

      {/* 2. Interactive Guestbook Form */}
      <section className="max-w-4xl mx-auto">
        <GuestbookForm onTributeAdded={handleTributeAdded} />
      </section>

      {/* 3. Tributes Wall */}
      <section className="pt-6">
        <TributeWall tributes={tributes} />
      </section>
    </div>
  );
}

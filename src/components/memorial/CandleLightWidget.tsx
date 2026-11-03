"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Sparkles, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import { supabase } from "@/lib/supabase/client";

export default function CandleLightWidget() {
  const [candleCount, setCandleCount] = useState<number | null>(null);
  const [hasLit, setHasLit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [justLit, setJustLit] = useState<boolean>(false);

  useEffect(() => {
    // 1. Kiểm tra localStorage trạng thái đã thắp nến của thiết bị
    const saved = localStorage.getItem("has_lit_candle_thai_nguyen");
    if (saved) {
      setHasLit(true);
    }

    // 2. Tải số lượng nến từ Supabase qua API
    fetch("/api/candles")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data?.count === "number") {
          setCandleCount(data.count);
        }
      })
      .catch((err) => console.error("Failed to load candle count:", err));

    // 3. Đăng ký nhận sự kiện Realtime trực tiếp từ Supabase
    const channel = supabase
      .channel("candle-realtime-channel")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "candle_stats" },
        (payload: any) => {
          if (payload.new?.total_candles !== undefined) {
            setCandleCount(Number(payload.new.total_candles));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleLightCandle = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/candles", { method: "POST" });
      const data = await res.json();

      if (data?.success && typeof data?.count === "number") {
        setCandleCount(data.count);
      }

      setHasLit(true);
      setJustLit(true);
      localStorage.setItem("has_lit_candle_thai_nguyen", "true");

      // Hiệu ứng hạt ánh sáng trang nghiêm
      confetti({
        particleCount: 40,
        spread: 55,
        origin: { y: 0.65 },
        colors: ["#A88A52", "#C4A66C", "#8D2926", "#FAF5ED"],
        ticks: 200,
        gravity: 0.8,
      });

      setTimeout(() => {
        setJustLit(false);
      }, 5000);
    } catch (error) {
      console.error("Error lighting candle:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative rounded-2xl bg-[#1B1A18] p-8 sm:p-12 border-2 border-[#A88A52] shadow-2xl text-center text-[#FAF5ED] overflow-hidden">
      {/* Background warm glowing aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#8D2926]/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Title & Memorial Context */}
      <div className="relative z-10 max-w-2xl mx-auto space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8D2926] border border-[#A88A52]/50 text-xs font-mono font-bold uppercase tracking-widest text-[#FAF5ED]">
          <Sparkles className="w-3.5 h-3.5 text-[#A88A52]" />
          <span>Nghi Thức Tri Ân Thiêng Liêng</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#FAF5ED] tracking-tight">
          Thắp Nén Tri Ân Các Anh Hùng Liệt Sĩ
        </h3>
        <p className="text-sm sm:text-base text-[#D5C7AD] leading-relaxed font-light">
          Mỗi ngọn nến được thắp lên là một nén tâm hương thành kính dâng lên anh linh 60 cán bộ,
          chiến sĩ TNXP Đại đội 915 và hàng vạn người con quê hương Thái Nguyên đã ngã xuống vì độc lập tự do của Tổ quốc.
        </p>
      </div>

      {/* The Animated Candle Display */}
      <div className="relative z-10 my-8 flex flex-col items-center justify-center">
        <div className="relative w-36 h-48 flex flex-col items-center justify-end">
          {/* Flame Container */}
          <div className="relative -mb-1 flex flex-col items-center">
            {/* Outer golden halo */}
            <div className="absolute -top-12 w-28 h-28 bg-[#A88A52]/20 rounded-full blur-xl animate-pulse" />

            {/* Flickering Flame */}
            <div className="w-7 h-13 bg-gradient-to-t from-[#8D2926] via-[#A88A52] to-[#FAF5ED] rounded-[50%_50%_35%_35%/70%_70%_30%_30%] animate-flame shadow-lg relative z-10">
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-6 bg-white rounded-full opacity-90 blur-[1px]" />
            </div>

            {/* Candle wick */}
            <div className="w-1 h-3 bg-[#4A4742] -mt-1" />
          </div>

          {/* Candle Body */}
          <div className="w-16 h-28 bg-gradient-to-r from-[#FAF5ED] via-[#F3EBDD] to-[#E7DECD] rounded-t-sm rounded-b-md shadow-2xl relative border-t-2 border-[#A88A52]/40 flex flex-col items-center justify-start pt-2">
            <span className="text-[10px] font-mono font-bold text-[#8D2926] tracking-widest uppercase">915</span>
            <div className="w-3/4 h-0.5 bg-[#A88A52]/60 my-1" />
            <div className="w-3/4 h-0.5 bg-[#8D2926]/40" />
          </div>

          {/* Candle Pedestal / Altar */}
          <div className="w-28 h-4 bg-gradient-to-r from-[#82693A] via-[#A88A52] to-[#82693A] rounded-full shadow-lg -mt-1 border border-[#A88A52]" />
        </div>

        {/* Realtime Candle Counter từ Supabase */}
        <div className="mt-4 space-y-1">
          <motion.div
            key={candleCount ?? 0}
            initial={{ scale: 1.12, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-serif text-4xl sm:text-5xl font-bold text-[#A88A52] tracking-tight drop-shadow-md font-mono"
          >
            {candleCount === null ? "..." : candleCount.toLocaleString("vi-VN")}
          </motion.div>
          <div className="text-xs uppercase tracking-widest text-[#D5C7AD] font-mono">
            Lượt nén tri ân đã được thắp sáng
          </div>
        </div>
      </div>

      {/* Button & Feedback */}
      <div className="relative z-10 max-w-md mx-auto pt-4 space-y-4">
        <button
          onClick={handleLightCandle}
          disabled={isLoading}
          className={`w-full py-3.5 px-8 rounded-xl font-serif text-base sm:text-lg font-bold flex items-center justify-center gap-3 shadow-lg transition-all duration-300 cursor-pointer ${
            hasLit
              ? "bg-[#FAF5ED] hover:bg-[#F3EBDD] text-[#8D2926] border border-[#A88A52]"
              : "bg-[#8D2926] hover:bg-[#6E1F1D] text-[#FAF5ED] border-2 border-[#A88A52]"
          } active:scale-98 disabled:opacity-50`}
        >
          <Flame className={`w-5 h-5 ${hasLit ? "text-[#8D2926] fill-[#8D2926]" : "text-[#A88A52] fill-[#A88A52]"}`} />
          <span>{hasLit ? "Thắp Thêm Một Ngọn Nến Tri Ân" : "Thắp Nén Tri Ân Liệt Sĩ"}</span>
        </button>

        <AnimatePresence>
          {justLit && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#A88A52] bg-[#A88A52]/15 py-2.5 px-4 rounded-lg border border-[#A88A52]/40"
            >
              <CheckCircle2 className="w-4 h-4 text-[#A88A52]" />
              <span>Nguyện cầu anh linh các anh hùng liệt sĩ trường tồn cùng sông núi!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

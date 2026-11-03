"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Sparkles, CheckCircle2, Heart } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

// Gentle solemn bronze bell sound synthesis (432Hz harmonic resonance)
function playMemorialBell() {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    const now = ctx.currentTime;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.14, now);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.2);
    masterGain.connect(ctx.destination);

    // Harmonic overtones of a solemn bronze memorial chime
    const harmonics = [
      { freq: 432, gain: 0.65, type: "sine" as OscillatorType, decay: 4.2 },
      { freq: 864, gain: 0.25, type: "sine" as OscillatorType, decay: 3.5 },
      { freq: 1296, gain: 0.12, type: "triangle" as OscillatorType, decay: 2.8 },
      { freq: 1728, gain: 0.05, type: "sine" as OscillatorType, decay: 2.0 },
    ];

    harmonics.forEach((h) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = h.type;
      osc.frequency.setValueAtTime(h.freq, now);
      osc.frequency.exponentialRampToValueAtTime(h.freq * 0.998, now + h.decay);

      oscGain.gain.setValueAtTime(h.gain, now);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + h.decay);

      osc.connect(oscGain);
      oscGain.connect(masterGain);

      osc.start(now);
      osc.stop(now + h.decay + 0.1);
    });
  } catch (err) {
    console.debug("Audio resonance not available:", err);
  }
}

interface RisingEmber {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
}

export default function CandleLightWidget() {
  const [candleCount, setCandleCount] = useState<number | null>(null);
  const [hasLit, setHasLit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [justLit, setJustLit] = useState<boolean>(false);
  const [auraPulse, setAuraPulse] = useState<number>(0);
  const [risingEmbers, setRisingEmbers] = useState<RisingEmber[]>([]);

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
      // 1. Phát âm vang chuông đồng thanh tịnh, trang nghiêm
      playMemorialBell();

      // 2. Kích hoạt hiệu ứng hào quang lan tỏa & đốm sáng linh thiêng bay lên
      setAuraPulse((prev) => prev + 1);

      // Tạo chùm hạt tàn hương / đốm lửa thiêng bay lượn hướng lên cõi vĩnh hằng
      const newEmbers: RisingEmber[] = Array.from({ length: 24 }).map((_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 80, // Tản ra xung quanh ngọn nến
        delay: Math.random() * 0.8,
        duration: 2.2 + Math.random() * 1.6,
        size: 3 + Math.random() * 4,
        drift: (Math.random() - 0.5) * 60,
      }));
      setRisingEmbers(newEmbers);

      // 3. Ghi nhận lượt thắp nến vào cơ sở dữ liệu Supabase
      const res = await fetch("/api/candles", { method: "POST" });
      const data = await res.json();

      if (data?.success && typeof data?.count === "number") {
        setCandleCount(data.count);
      }

      setHasLit(true);
      setJustLit(true);
      localStorage.setItem("has_lit_candle_thai_nguyen", "true");

      setTimeout(() => {
        setJustLit(false);
      }, 6000);
    } catch (error) {
      console.error("Error lighting candle:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative rounded-2xl bg-[#171614] p-8 sm:p-12 border-2 border-[#A88A52]/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] text-center text-[#FAF5ED] overflow-hidden">
      {/* Background Sacred Altar Ambiance */}
      <div className="absolute inset-0 bg-[radial-gradient(#A88A52_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-[#8D2926]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] bg-[#A88A52]/20 rounded-full blur-[80px] pointer-events-none" />

      {/* Concentric Expanding Sacred Aura Rings when Lit */}
      <AnimatePresence>
        {auraPulse > 0 && (
          <div key={auraPulse} className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            {/* Inner Ring */}
            <motion.div
              initial={{ scale: 0.2, opacity: 0.9 }}
              animate={{ scale: 2.8, opacity: 0 }}
              transition={{ duration: 2.4, ease: "easeOut" }}
              className="absolute w-64 h-64 rounded-full border-2 border-[#A88A52] shadow-[0_0_50px_rgba(168,138,82,0.8)]"
            />
            {/* Middle Warm Ring */}
            <motion.div
              initial={{ scale: 0.2, opacity: 0.8 }}
              animate={{ scale: 3.6, opacity: 0 }}
              transition={{ duration: 3.0, delay: 0.2, ease: "easeOut" }}
              className="absolute w-64 h-64 rounded-full border border-[#8D2926] shadow-[0_0_60px_rgba(141,41,38,0.6)]"
            />
            {/* Outer Sacred Glow */}
            <motion.div
              initial={{ scale: 0.3, opacity: 0.6 }}
              animate={{ scale: 4.4, opacity: 0 }}
              transition={{ duration: 3.6, delay: 0.4, ease: "easeOut" }}
              className="absolute w-72 h-72 rounded-full bg-radial from-[#A88A52]/30 to-transparent blur-md"
            />
          </div>
        )}
      </AnimatePresence>

      {/* Title & Memorial Context */}
      <div className="relative z-10 max-w-2xl mx-auto space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8D2926] border border-[#A88A52]/60 text-xs font-mono font-bold uppercase tracking-widest text-[#FAF5ED] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#A88A52]" />
          <span>Nghi Thức Dâng Hương & Thắp Nến Tri Ân</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#FAF5ED] tracking-tight">
          Thắp Nén Tri Ân Các Anh Hùng Liệt Sĩ
        </h3>
        <p className="text-sm sm:text-base text-[#D5C7AD] leading-relaxed font-light">
          Mỗi ngọn nến được thắp lên là một nén tâm hương thành kính dâng lên anh linh 60 cán bộ,
          chiến sĩ TNXP Đại đội 915 và hàng vạn người con quê hương Thái Nguyên đã ngã xuống vì độc lập tự do của Tổ quốc.
        </p>
      </div>

      {/* The Animated Candle Display & Altar */}
      <div className="relative z-10 my-8 flex flex-col items-center justify-center">
        {/* Rising Golden Embers (Đốm sáng tàn hương bay lượn hướng lên) */}
        <div className="absolute -top-16 inset-x-0 h-56 pointer-events-none overflow-visible flex justify-center">
          <AnimatePresence>
            {risingEmbers.map((ember) => (
              <motion.div
                key={ember.id}
                initial={{
                  opacity: 1,
                  y: 110,
                  x: ember.x,
                  scale: 0.6,
                }}
                animate={{
                  opacity: [1, 0.9, 0.6, 0],
                  y: -100 - Math.random() * 50,
                  x: ember.x + ember.drift,
                  scale: [0.6, 1.2, 0.8],
                }}
                transition={{
                  duration: ember.duration,
                  delay: ember.delay,
                  ease: "easeOut",
                }}
                style={{ width: ember.size, height: ember.size }}
                className="absolute rounded-full bg-gradient-to-t from-[#A88A52] via-[#FAF5ED] to-white shadow-[0_0_12px_rgba(250,245,237,0.9)]"
              />
            ))}
          </AnimatePresence>
        </div>

        <div className="relative w-36 h-48 flex flex-col items-center justify-end">
          {/* Flame Container */}
          <div className="relative -mb-1 flex flex-col items-center">
            {/* Outer golden halo */}
            <motion.div
              animate={{
                scale: justLit ? [1, 1.6, 1.2] : [1, 1.1, 1],
                opacity: justLit ? [0.6, 0.9, 0.7] : [0.35, 0.55, 0.35],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-14 w-32 h-32 bg-[#A88A52]/30 rounded-full blur-2xl"
            />

            {/* Flickering Flame */}
            <div className="w-7 h-14 bg-gradient-to-t from-[#8D2926] via-[#A88A52] to-[#FAF5ED] rounded-[50%_50%_35%_35%/70%_70%_30%_30%] animate-flame shadow-[0_0_25px_rgba(168,138,82,0.9)] relative z-10">
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-7 bg-white rounded-full opacity-95 blur-[0.8px]" />
            </div>

            {/* Candle wick */}
            <div className="w-1 h-3 bg-[#38342E] -mt-1" />
          </div>

          {/* Candle Body */}
          <div className="w-16 h-28 bg-gradient-to-r from-[#FAF5ED] via-[#F3EBDD] to-[#E7DECD] rounded-t-sm rounded-b-md shadow-2xl relative border-t-2 border-[#A88A52]/60 flex flex-col items-center justify-start pt-2">
            <span className="text-[10px] font-mono font-bold text-[#8D2926] tracking-widest uppercase">915</span>
            <div className="w-3/4 h-0.5 bg-[#A88A52]/70 my-1" />
            <div className="w-3/4 h-0.5 bg-[#8D2926]/40" />
            {/* Candle light reflection */}
            <div className="absolute inset-y-1 left-1.5 w-1.5 bg-white/40 rounded-full blur-[0.5px]" />
          </div>

          {/* Candle Pedestal / Altar */}
          <div className="w-28 h-4.5 bg-gradient-to-r from-[#82693A] via-[#A88A52] to-[#82693A] rounded-full shadow-lg -mt-1 border border-[#A88A52] flex items-center justify-center">
            <div className="w-24 h-0.5 bg-black/40 rounded-full" />
          </div>
        </div>

        {/* Realtime Candle Counter từ Supabase */}
        <div className="mt-5 space-y-1">
          <motion.div
            key={candleCount ?? 0}
            initial={{ scale: 1.15, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-serif text-4xl sm:text-5xl font-bold text-[#A88A52] tracking-tight drop-shadow-[0_2px_10px_rgba(168,138,82,0.4)] font-mono"
          >
            {candleCount === null ? "..." : candleCount.toLocaleString("vi-VN")}
          </motion.div>
          <div className="text-xs uppercase tracking-widest text-[#D5C7AD] font-mono">
            Ngọn nến tri ân đã được thắp sáng
          </div>
        </div>
      </div>

      {/* Button & Feedback */}
      <div className="relative z-10 max-w-md mx-auto pt-4 space-y-4">
        <button
          onClick={handleLightCandle}
          disabled={isLoading}
          className={`w-full py-4 px-8 rounded-xl font-serif text-base sm:text-lg font-bold flex items-center justify-center gap-3 shadow-xl transition-all duration-300 cursor-pointer ${
            hasLit
              ? "bg-[#FAF5ED] hover:bg-white text-[#8D2926] border-2 border-[#A88A52]"
              : "bg-[#8D2926] hover:bg-[#6E1F1D] text-[#FAF5ED] border-2 border-[#A88A52]"
          } active:scale-98 disabled:opacity-50`}
        >
          <Flame className={`w-5 h-5 ${hasLit ? "text-[#8D2926] fill-[#8D2926]" : "text-[#A88A52] fill-[#A88A52]"} animate-flame`} />
          <span>{hasLit ? "Thắp Thêm Một Ngọn Nến Tri Ân" : "Thắp Nén Tri Ân Liệt Sĩ"}</span>
        </button>

        <AnimatePresence>
          {justLit && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center gap-2.5 text-xs sm:text-sm text-[#FAF5ED] bg-[#8D2926]/90 py-3 px-5 rounded-xl border border-[#A88A52] shadow-lg backdrop-blur-xs font-serif"
            >
              <Heart className="w-4 h-4 text-[#A88A52] fill-[#A88A52] shrink-0" />
              <span>Tâm hương thành kính — Nguyện cầu anh linh các anh hùng liệt sĩ trường tồn cùng sông núi!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

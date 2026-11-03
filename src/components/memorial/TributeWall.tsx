"use client";

import { motion } from "framer-motion";
import { Tribute } from "@/types/content.types";
import { MessageSquareQuote, MapPin, Calendar, HeartHandshake } from "lucide-react";

interface TributeWallProps {
  tributes: Tribute[];
}

export default function TributeWall({ tributes }: TributeWallProps) {
  if (!tributes || tributes.length === 0) {
    return (
      <div className="text-center py-12 text-[#4A4742] italic">
        Chưa có lời tri ân nào. Hãy là người đầu tiên kính gửi lời tri ân!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#D5C7AD] pb-4">
        <h3 className="font-serif text-2xl font-bold text-[#8D2926] flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-[#8D2926]" />
          <span>Sổ Lưu Bút Tri Ân Trực Tuyến</span>
        </h3>
        <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-[#8D2926]/10 text-[#8D2926] border border-[#8D2926]/30">
          {tributes.length} Lời tri ân
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tributes.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="rounded-xl bg-[#FAF5ED] border-2 border-[#D5C7AD] p-6 archival-shadow hover:border-[#8D2926] transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Quote icon & Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-serif text-base font-bold text-[#8D2926]">
                    {item.author_name}
                  </h4>
                  <div className="text-xs text-[#4A4742] font-medium flex items-center gap-1.5 mt-0.5">
                    {item.author_title && <span>{item.author_title}</span>}
                    {item.location && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <MapPin className="w-3 h-3 text-[#A88A52]" />
                          {item.location}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <MessageSquareQuote className="w-5 h-5 text-[#A88A52]/60 shrink-0" />
              </div>

              {/* Message */}
              <p className="text-sm text-[#242321] italic leading-relaxed pt-2 border-t border-[#D5C7AD]/60 font-serif">
                &ldquo;{item.message}&rdquo;
              </p>
            </div>

            {/* Date */}
            <div className="pt-4 mt-3 border-t border-[#D5C7AD]/60 flex items-center justify-between text-[11px] text-[#4A4742] font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#A88A52]" />
                {new Date(item.created_at).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
              <span className="text-[#8D2926] font-semibold">Thành kính tri ân</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

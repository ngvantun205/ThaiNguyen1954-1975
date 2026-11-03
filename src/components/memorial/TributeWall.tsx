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
      <div className="text-center py-12 text-[#8C786A] italic">
        Chưa có lời tri ân nào. Hãy là người đầu tiên kính gửi lời tri ân!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#E8E1D3] pb-4">
        <h3 className="font-serif text-2xl font-bold text-[#2D3142] flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-[#8B0000]" />
          <span>Sổ Lưu Bút Tri Ân Trực Tuyến</span>
        </h3>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#DAA520]/20 text-[#8B0000]">
          {tributes.length} Lời tri ân
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tributes.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="rounded-2xl bg-[#F7F3EA] border border-[#E8E1D3] p-6 shadow-sm hover:shadow-md hover:border-[#DAA520] transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Quote icon & Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-serif text-base font-bold text-[#8B0000]">
                    {item.author_name}
                  </h4>
                  <div className="text-xs text-[#8C786A] font-medium flex items-center gap-1.5 mt-0.5">
                    {item.author_title && <span>{item.author_title}</span>}
                    {item.location && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <MapPin className="w-3 h-3 text-[#DAA520]" />
                          {item.location}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <MessageSquareQuote className="w-6 h-6 text-[#DAA520]/50 shrink-0" />
              </div>

              {/* Message */}
              <p className="text-sm text-[#2D3142] italic leading-relaxed pt-2 border-t border-[#E8E1D3]/80">
                &ldquo;{item.message}&rdquo;
              </p>
            </div>

            {/* Date */}
            <div className="pt-4 mt-3 border-t border-[#E8E1D3]/50 flex items-center justify-between text-[11px] text-[#8C786A]">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#DAA520]" />
                {new Date(item.created_at).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
              <span className="text-[#DAA520] font-semibold">Thành kính tri ân</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


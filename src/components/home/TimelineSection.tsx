"use client";

import { motion } from "framer-motion";
import { HISTORICAL_EVENTS } from "@/lib/historical-data";
import { Calendar, MapPin, Award, Clock } from "lucide-react";

export default function TimelineSection() {
  return (
    <section className="py-20 bg-[#F7F3EA] border-y border-[#E8E1D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B0000]/10 border border-[#8B0000]/30 text-xs font-bold uppercase tracking-widest text-[#8B0000]">
            <Clock className="w-3.5 h-3.5" />
            <span>Biên Niên Sử Kháng Chiến</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2D3142] tracking-tight">
            Niên Biểu Các Mốc Son Lịch Sử (1965 – 1972)
          </h2>
          <p className="text-base text-[#4A3B32]">
            Những dấu mốc chiến công rực rỡ và những khúc tráng ca không thể nào quên của quân và dân Thái Nguyên.
          </p>
        </div>

        {/* Timeline Line & Nodes */}
        <div className="relative">
          {/* Vertical Center Line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-[#8B0000] via-[#DAA520] to-[#8B0000]" />

          <div className="space-y-12">
            {HISTORICAL_EVENTS.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content card */}
                  <div className="w-full md:w-1/2 md:px-8">
                    <div className="p-6 sm:p-7 rounded-2xl bg-[#FDFBF7] border-2 border-[#E8E1D3] shadow-md hover:shadow-xl hover:border-[#DAA520] transition-all group">
                      {/* Date & Location tags */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B0000] text-[#FDFBF7] text-xs font-bold shadow-xs">
                          <Calendar className="w-3.5 h-3.5 text-[#DAA520]" />
                          {event.date}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-[#8C786A] font-medium">
                          <MapPin className="w-3.5 h-3.5 text-[#8B0000]" />
                          {event.location}
                        </span>
                      </div>

                      {/* Event Title */}
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#8B0000] group-hover:text-[#660000] transition-colors mb-2">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[#4A3B32] leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Node Circle */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#FDFBF7] border-4 border-[#DAA520] items-center justify-center shadow-lg z-10">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#8B0000]" />
                  </div>

                  {/* Empty spacer for alignment */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

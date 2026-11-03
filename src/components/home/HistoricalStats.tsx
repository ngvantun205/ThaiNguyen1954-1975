"use client";

import { motion } from "framer-motion";
import { Plane, Users, Flame, ShieldCheck } from "lucide-react";

export default function HistoricalStats() {
  const stats = [
    {
      id: "planes",
      icon: Plane,
      number: "61",
      unit: "Máy bay Mỹ bị bắn rơi",
      highlight: "Trong đó có 2 'pháo đài bay' B-52",
      description: "Quân và dân phòng không Thái Nguyên chiến đấu ngoan cường, lập kỳ tích bắn rơi máy bay thứ 1.000 trên miền Bắc.",
      accent: "from-[#8B0000] to-[#660000]",
      badge: "Chiến công phòng không",
    },
    {
      id: "youth",
      icon: Users,
      number: "40.827",
      unit: "Thanh niên lên đường nhập ngũ",
      highlight: "Qua 43 đợt tuyển quân vẻ vang",
      description: "Thế hệ thanh niên Bắc Thái mang theo khí thế 'Ba sẵn sàng' xẻ dọc Trường Sơn đi cứu nước vì miền Nam ruột thịt.",
      accent: "from-[#2D3142] to-[#1E212D]",
      badge: "Chi viện tiền tuyến lớn",
    },
    {
      id: "martyrs",
      icon: Flame,
      number: "60",
      unit: "Liệt sĩ TNXP Đại đội 915",
      highlight: "Hy sinh anh dũng đêm 24/12/1972",
      description: "Khúc bi tráng bất tử tại ga Lưu Xá khi đang kiên cường bốc xếp hàng ngàn tấn hàng hóa chi viện miền Nam.",
      accent: "from-[#DAA520] to-[#B8860B]",
      badge: "Khúc tráng ca bất tử",
      textColor: "text-[#DAA520]",
    },
  ];

  return (
    <section className="relative -mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className="relative rounded-2xl bg-[#FDFBF7] border-2 border-[#E8E1D3] shadow-xl p-7 flex flex-col justify-between overflow-hidden group hover:border-[#DAA520] transition-all duration-300"
            >
              {/* Corner historical badge ribbon */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#F5EFEB] text-[#8B0000] border border-[#E8E1D3]">
                  {stat.badge}
                </span>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B0000] to-[#660000] text-[#DAA520] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {/* Stat Number */}
              <div className="space-y-1 mb-3">
                <div className="font-serif text-4xl sm:text-5xl font-black text-[#8B0000] tracking-tight">
                  {stat.number}
                </div>
                <div className="font-serif text-lg font-bold text-[#2D3142]">
                  {stat.unit}
                </div>
                <div className="text-sm font-semibold text-[#B8860B] flex items-center gap-1.5 pt-0.5">
                  <ShieldCheck className="w-4 h-4 text-[#DAA520]" />
                  <span>{stat.highlight}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#4A3B32] leading-relaxed pt-2 border-t border-[#E8E1D3]/80">
                {stat.description}
              </p>

              {/* Bottom decorative gold line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#DAA520] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

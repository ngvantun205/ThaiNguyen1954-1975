"use client";

import { motion } from "framer-motion";
import { Plane, Users, Flame, ShieldCheck, Factory, Calendar } from "lucide-react";

export default function HistoricalStats() {
  const stats = [
    {
      id: "planes",
      icon: Plane,
      number: "61",
      unit: "Máy bay Mỹ bị bắn rơi",
      highlight: "Trong đó có 2 'pháo đài bay' B-52",
      description: "Lực lượng phòng không ba thứ quân Thái Nguyên ngoan cường chiến đấu, bắn rơi máy bay thứ 1.000 trên miền Bắc (29/4/1966) và 2 chiếc B-52 đêm Noel 1972.",
      badge: "Chiến công Phòng không",
    },
    {
      id: "youth",
      icon: Users,
      number: "40.827",
      unit: "Thanh niên lên đường nhập ngũ",
      highlight: "Qua 43 đợt tuyển quân vẻ vang",
      description: "Thế hệ thanh niên con em các dân tộc Bắc Thái mang theo hào khí 'Ba sẵn sàng' xẻ dọc Trường Sơn đi cứu nước, chi viện sức người sức của cho miền Nam.",
      badge: "Chi viện Tiền tuyến Lớn",
    },
    {
      id: "martyrs",
      icon: Flame,
      number: "60",
      unit: "Liệt sĩ TNXP Đại đội 915",
      highlight: "Hy sinh anh dũng đêm 24/12/1972",
      description: "Khúc bi tráng bất tử tại ga Lưu Xá khi đang bốc xếp hàng vạn tấn hàng chi viện trong đêm bom rải thảm ác liệt. Được phong tặng danh hiệu Anh hùng LLVTND.",
      badge: "Khúc Tráng ca Bất tử",
    },
  ];

  return (
    <section className="relative -mt-12 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -4 }}
              className="relative rounded-xl bg-[#FAF5ED] border border-[#D5C7AD] p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#8D2926] transition-all duration-300 group"
            >
              {/* Header Badge & Icon */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#D5C7AD]/60">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#F3EBDD] text-[#8D2926] border border-[#D5C7AD]">
                  {stat.badge}
                </span>
                <div className="w-9 h-9 rounded-md bg-[#8D2926] text-[#FAF5ED] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4 text-[#A88A52]" />
                </div>
              </div>

              {/* Stat Metric */}
              <div className="space-y-1 mb-3">
                <div className="font-serif text-4xl sm:text-5xl font-bold text-[#8D2926] tracking-tight">
                  {stat.number}
                </div>
                <div className="font-serif text-lg font-bold text-[#242321]">
                  {stat.unit}
                </div>
                <div className="text-xs font-semibold text-[#A88A52] flex items-center gap-1.5 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8D2926]" />
                  <span>{stat.highlight}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#4A4742] leading-relaxed pt-3 border-t border-[#D5C7AD]/60">
                {stat.description}
              </p>

              {/* Subtle accent line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8D2926] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

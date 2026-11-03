import type { Metadata } from "next";
import DaiDoi915Client from "./DaiDoi915Client";
import { ARTICLES_915 } from "@/lib/daidoi915-articles";
import { MARTYRS_915_ALL } from "@/lib/martyrs-data";

export const metadata: Metadata = {
  title: "Đại Đội 915 Anh Hùng - 60 Liệt Sĩ TNXP Bất Tử Tại Ga Lưu Xá",
  description:
    "Trang tư liệu lịch sử toàn diện về Đại đội 915 (Đội 91 Bắc Thái): 5 khúc tráng ca lịch sử nguyên văn và hồ sơ đầy đủ của 60 Anh hùng Liệt sĩ thanh niên xung phong hy sinh đêm 24/12/1972 tại Ga Lưu Xá.",
  openGraph: {
    title: "Đại Đội 915 Anh Hùng - Khúc Tráng Ca Ga Lưu Xá Đêm Noel 1972",
    description:
      "Tư liệu lịch sử nguyên văn và danh sách 60 Anh hùng Liệt sĩ Thanh niên xung phong Đại đội 915.",
  },
};

export default function DaiDoi915Page() {
  return <DaiDoi915Client articles={ARTICLES_915} martyrs={MARTYRS_915_ALL} />;
}


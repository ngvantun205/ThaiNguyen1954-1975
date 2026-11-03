import MemorialClient from "./MemorialClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Góc Tưởng Niệm & Sổ Lưu Bút Tri Ân",
  description:
    "Không gian thiêng liêng thắp nến tri ân tưởng niệm 60 liệt sĩ TNXP Đại đội 915 và các anh hùng liệt sĩ bảo vệ Thái Nguyên giai đoạn 1965–1972.",
};

export default function MemorialPage() {
  return <MemorialClient />;
}


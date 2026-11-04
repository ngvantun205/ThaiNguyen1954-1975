import MemorialClient from "./MemorialClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Không Gian Tưởng Niệm & Sổ Lưu Bút Tri Ân | Thái Nguyên (1954 – 1975)",
  description:
  "Không gian thiêng liêng thắp nến tri ân tưởng niệm 60 liệt sĩ TNXP Đại đội 915 và các anh hùng liệt sĩ Thái Nguyên giai đoạn 1954–1975.",
};

export default function MemorialPage() {
  return <MemorialClient />;
}

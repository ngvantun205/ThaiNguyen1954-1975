import DonateClient from "./DonateClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quyên Góp 915 | Quỹ Lưu Trữ & Tri Ân Lịch Sử Thái Nguyên (1954 – 1975)",
  description:
    "Không gian tiếp nhận quyên góp 915, ủng hộ quỹ lưu trữ và số hóa tư liệu lịch sử Đại đội 915 Thái Nguyên. Toàn bộ danh sách được sao kê công khai và minh bạch theo từng trang.",
  openGraph: {
    title: "Quyên Góp 915 - Quỹ Lưu Trữ & Tri Ân Lịch Sử Thái Nguyên",
    description:
      "Chung tay bảo tồn và số hóa tư liệu lịch sử. Minh bạch thời gian thực qua hệ thống sao kê từng trang trên cơ sở dữ liệu Supabase.",
  },
};

export default function QuyenGop915Page() {
  return <DonateClient />;
}


import type { Metadata } from "next";
import { Lora, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Thái Nguyên (1965 – 1972)",
    default: "Thái Nguyên (1965 – 1972) | Phên Dậu Việt Bắc – Khúc Hùng Ca Bất Tử",
  },
  description:
    "Trang tư liệu và tưởng niệm lịch sử Thái Nguyên giai đoạn 1965 – 1972: Phên dậu Việt Bắc, trái tim công nghiệp, khúc hùng ca kiên cường chống chiến tranh phá hoại của đế quốc Mỹ.",
  keywords: [
    "Thái Nguyên 1965 1972",
    "Lịch sử Thái Nguyên",
    "Đại đội 915",
    "Ga Lưu Xá",
    "Cầu Gia Bẩy",
    "Trung đoàn 210",
    "Trung đoàn 256",
    "Điện Biên Phủ trên không",
    "Thắp nến tri ân",
  ],
  authors: [{ name: "Bảo tàng Số Lịch sử Thái Nguyên" }],
  openGraph: {
    title: "Thái Nguyên (1965 – 1972) | Phên Dậu Việt Bắc – Khúc Hùng Ca Bất Tử",
    description:
      "Tái hiện hào khí chống Mỹ cứu nước của quân dân Thái Nguyên: 61 máy bay Mỹ bị bắn rơi, 40.827 thanh niên nhập ngũ và khúc tráng ca bất tử của 60 liệt sĩ TNXP Đại đội 915.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      data-scroll-behavior="smooth"
      className={`${lora.variable} ${beVietnamPro.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#FDFBF7] text-[#2D3142] antialiased selection:bg-[#DAA520]/30 selection:text-[#8B0000]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

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
    template: "%s | Thái Nguyên (1954 – 1975)",
    default: "Thái Nguyên (1954 – 1975) | Bảo Tàng Tư Liệu Lịch Sử Số",
  },
  description:
    "Bảo tàng tư liệu lịch sử số Thái Nguyên (1954 – 1975): Phên dậu Việt Bắc, trái tim công nghiệp nặng, khúc hùng ca chống chiến tranh phá hoại và bản tráng ca Đại đội 915 anh hùng.",
  keywords: [
    "Thái Nguyên 1954 1975",
    "Thái Nguyên 1965 1972",
    "Bảo tàng số Thái Nguyên",
    "Lịch sử Thái Nguyên",
    "Khu Gang thép Thái Nguyên",
    "Đại đội 915",
    "Ga Lưu Xá",
    "Cầu Gia Bẩy",
    "Trung đoàn 210",
    "Trung đoàn 256",
    "Điện Biên Phủ trên không",
    "Tư liệu lịch sử Việt Nam",
  ],
  authors: [{ name: "Bảo tàng Tư liệu Lịch sử Số Thái Nguyên" }],
  openGraph: {
    title: "Thái Nguyên (1954 – 1975) | Bảo Tàng Tư Liệu Lịch Sử Số",
    description:
      "Nền tảng lưu trữ và trưng bày tư liệu lịch sử số Thái Nguyên 1954 – 1975: Dòng thời gian, bản đồ tọa độ chiến trường, 4 chuyên đề nghiên cứu và không gian tưởng niệm 60 liệt sĩ TNXP Đại đội 915.",
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
      <body className="min-h-full flex flex-col bg-[#F3EBDD] text-[#242321] antialiased selection:bg-[#8D2926]/20 selection:text-[#8D2926]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

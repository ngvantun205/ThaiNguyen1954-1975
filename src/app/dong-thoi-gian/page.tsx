import type { Metadata } from "next";
import TimelineClient from "./TimelineClient";
import { HISTORICAL_EVENTS } from "@/lib/historical-data";

export const metadata: Metadata = {
  title: "Triển Lãm Dòng Thời Gian Tương Tác (1954 – 1975) | Thái Nguyên",
  description:
    "Không gian triển lãm tương tác toàn cảnh biên niên sử Thái Nguyên giai đoạn 1954 – 1975. Khám phá các mốc son lịch sử, hình ảnh tư liệu và chiến công hào hùng.",
  openGraph: {
    title: "Triển Lãm Dòng Thời Gian Tương Tác (1954 – 1975) | Thái Nguyên",
    description:
      "Tái hiện 21 năm lịch sử qua triển lãm tương tác: thay đổi bối cảnh hình ảnh tư liệu theo từng mốc thời gian từ 1954 đến 1975.",
  },
};

export default function DongThoiGianPage() {
  return <TimelineClient events={HISTORICAL_EVENTS} />;
}


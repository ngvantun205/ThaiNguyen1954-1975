"use client";

import { useState } from "react";
import { Send, Heart, CheckCircle2, AlertCircle } from "lucide-react";
import { Tribute } from "@/types/content.types";

interface GuestbookFormProps {
  onTributeAdded?: (newTribute: Tribute) => void;
}

export default function GuestbookForm({ onTributeAdded }: GuestbookFormProps) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setErrorMsg("Vui lòng nhập họ và tên cùng nội dung tri ân.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/tributes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author_name: name,
          author_title: title || "Nhân dân",
          location: location || "Việt Nam",
          message,
        }),
      });

      const data = await res.json();

      if (res.ok && data?.tribute) {
        setSuccess(true);
        setName("");
        setTitle("");
        setLocation("");
        setMessage("");
        if (onTributeAdded) {
          onTributeAdded(data.tribute);
        }
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setErrorMsg(data?.error || "Gửi lời tri ân không thành công, vui lòng thử lại.");
      }
    } catch (err) {
      console.error("Submit tribute error:", err);
      setErrorMsg("Có lỗi kết nối xảy ra. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="guestbook-form" className="rounded-2xl bg-[#171614] border-2 border-[#A88A52]/50 p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-[#FAF5ED]">
      <div className="space-y-2 mb-6 border-b border-[#3A3630] pb-5">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF5ED] flex items-center gap-2.5">
          <Heart className="w-5 h-5 text-[#8D2926] fill-[#8D2926]" />
          <span>Sổ Lưu Bút Tri Ân & Cảm Tưởng</span>
        </h3>
        <p className="text-sm text-[#D5C7AD] font-light">
          Kính gửi những dòng cảm xúc chân thành, lòng biết ơn sâu sắc của bạn đến các anh hùng liệt sĩ đã hiến dâng tuổi xuân vì Tổ quốc.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#D5C7AD] mb-1.5 font-mono">
              Họ và tên <span className="text-[#8D2926]">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nguyễn Văn A"
              className="w-full px-4 py-2.5 rounded-lg border border-[#3A3630] bg-[#22201D] text-[#FAF5ED] placeholder-[#D5C7AD]/30 text-sm focus:outline-hidden focus:border-[#A88A52] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#D5C7AD] mb-1.5 font-mono">
              Cương vị / Đơn vị
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Học sinh / Cựu chiến binh / ..."
              className="w-full px-4 py-2.5 rounded-lg border border-[#3A3630] bg-[#22201D] text-[#FAF5ED] placeholder-[#D5C7AD]/30 text-sm focus:outline-hidden focus:border-[#A88A52] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#D5C7AD] mb-1.5 font-mono">
              Địa phương
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Thái Nguyên, Hà Nội..."
              className="w-full px-4 py-2.5 rounded-lg border border-[#3A3630] bg-[#22201D] text-[#FAF5ED] placeholder-[#D5C7AD]/30 text-sm focus:outline-hidden focus:border-[#A88A52] transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#D5C7AD] mb-1.5 font-mono">
            Lời tri ân thành kính <span className="text-[#8D2926]">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Viết những cảm nghĩ, lời tri ân và lòng biết ơn sâu sắc của bạn..."
            className="w-full px-4 py-3 rounded-lg border border-[#3A3630] bg-[#22201D] text-[#FAF5ED] placeholder-[#D5C7AD]/30 text-sm focus:outline-hidden focus:border-[#A88A52] transition-colors resize-none leading-relaxed"
          />
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 text-sm text-[#FAF5ED] bg-[#8D2926]/90 p-3.5 rounded-lg border border-[#A88A52]">
            <AlertCircle className="w-4 h-4 text-[#A88A52] shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 text-sm text-[#FAF5ED] bg-emerald-950/80 p-3.5 rounded-lg border border-emerald-500/50">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Lời tri ân của bạn đã được trân trọng ghi nhận vào sổ lưu bút số thiêng liêng!</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3.5 rounded-lg bg-[#8D2926] hover:bg-[#6E1F1D] text-[#FAF5ED] font-semibold text-sm flex items-center gap-2 border border-[#A88A52]/60 shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
        >
          <Send className="w-4 h-4 text-[#A88A52]" />
          <span>{isSubmitting ? "Đang gửi lời tri ân..." : "Kính Gửi Lời Tri Ân"}</span>
        </button>
      </form>
    </div>
  );
}

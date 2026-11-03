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
    <div id="guestbook-form" className="rounded-2xl bg-[#FAF5ED] border-2 border-[#D5C7AD] p-6 sm:p-10 archival-shadow">
      <div className="space-y-2 mb-6">
        <h3 className="font-serif text-2xl font-bold text-[#8D2926] flex items-center gap-2">
          <Heart className="w-5 h-5 text-[#8D2926] fill-[#8D2926]" />
          <span>Sổ Lưu Bút Tri Ân & Cảm Tưởng</span>
        </h3>
        <p className="text-sm text-[#4A4742]">
          Kính gửi những dòng cảm xúc chân thành, lòng biết ơn sâu sắc của bạn đến các anh hùng liệt sĩ đã hiến dâng tuổi xuân vì Tổ quốc.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#242321] mb-1 font-mono">
              Họ và tên <span className="text-[#8D2926]">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nguyễn Văn A"
              className="w-full px-4 py-2.5 rounded-lg border border-[#D5C7AD] bg-[#F3EBDD] text-[#242321] placeholder-[#4A4742]/60 text-sm focus:outline-hidden focus:border-[#8D2926]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#242321] mb-1 font-mono">
              Cương vị / Đơn vị
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Học sinh / Cựu chiến binh / ..."
              className="w-full px-4 py-2.5 rounded-lg border border-[#D5C7AD] bg-[#F3EBDD] text-[#242321] placeholder-[#4A4742]/60 text-sm focus:outline-hidden focus:border-[#8D2926]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#242321] mb-1 font-mono">
              Địa phương
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Thái Nguyên, Hà Nội..."
              className="w-full px-4 py-2.5 rounded-lg border border-[#D5C7AD] bg-[#F3EBDD] text-[#242321] placeholder-[#4A4742]/60 text-sm focus:outline-hidden focus:border-[#8D2926]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#242321] mb-1 font-mono">
            Lời tri ân thành kính <span className="text-[#8D2926]">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Viết những cảm nghĩ, lời tri ân và lòng biết ơn của bạn..."
            className="w-full px-4 py-3 rounded-lg border border-[#D5C7AD] bg-[#F3EBDD] text-[#242321] placeholder-[#4A4742]/60 text-sm focus:outline-hidden focus:border-[#8D2926] resize-none"
          />
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 text-sm text-[#8D2926] bg-[#8D2926]/10 p-3 rounded-lg border border-[#8D2926]/30">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 text-sm text-[#2E7D32] bg-[#E8F5E9] p-3 rounded-lg border border-[#A5D6A7]">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Lời tri ân của bạn đã được lưu vào sổ lưu bút số thiêng liêng thành công!</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 rounded-lg bg-[#8D2926] hover:bg-[#6E1F1D] text-[#FAF5ED] font-semibold text-sm flex items-center gap-2 shadow-xs hover:shadow-sm transition-all disabled:opacity-50 cursor-pointer"
        >
          <Send className="w-4 h-4 text-[#A88A52]" />
          <span>{isSubmitting ? "Đang gửi lời tri ân..." : "Kính Gửi Lời Tri Ân"}</span>
        </button>
      </form>
    </div>
  );
}

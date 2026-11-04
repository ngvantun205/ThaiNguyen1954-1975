"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Shield,
  Copy,
  Check,
  QrCode,
  CreditCard,
  Flame,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Sparkles,
  ExternalLink,
  Search,
  RefreshCw,
  Eye,
  AlertCircle,
  Award,
} from "lucide-react";
import { Donation } from "@/types/content.types";
import { supabase } from "@/lib/supabase/client";
import SafeImage from "@/components/common/SafeImage";

const QUICK_AMOUNTS = [20000, 50000, 100000, 200000, 500000, 1000000];

export default function DonateClient() {
  // Form State
  const [donorName, setDonorName] = useState("");
  const [amount, setAmount] = useState<number>(100000);
  const [customAmountText, setCustomAmountText] = useState("100.000");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [transferCode, setTransferCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Copy states
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Pagination & Sao kê State
  const [donations, setDonations] = useState<Donation[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [qrZoomOpen, setQrZoomOpen] = useState(false);

  // Generate random transfer code on mount
  useEffect(() => {
    const randomCode = `TN1954-${Math.floor(100000 + Math.random() * 900000)}`;
    setTransferCode(randomCode);
  }, []);

  // Fetch paginated donations list
  const fetchDonations = (targetPage: number) => {
    setIsLoadingList(true);
    fetch(`/api/donations?page=${targetPage}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data?.donations)) {
          setDonations(data.donations);
          setTotalCount(data.total || data.donations.length);
          setTotalPages(data.totalPages || 1);
          setTotalAmount(data.totalAmount || 0);
          setPage(data.page || targetPage);
        }
      })
      .catch((err) => console.error("Error fetching donations:", err))
      .finally(() => setIsLoadingList(false));
  };

  useEffect(() => {
    fetchDonations(page);

    // Realtime Supabase listener
    const channel = supabase
      .channel("donations-realtime-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "donations" },
        (payload: any) => {
          if (payload.new) {
            setDonations((prev) => [payload.new as Donation, ...prev.slice(0, limit - 1)]);
            setTotalCount((prev) => prev + 1);
            setTotalAmount((prev) => prev + (Number(payload.new.amount) || 0));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Handle Amount Input with Formatter
  const handleAmountChange = (valStr: string) => {
    const numericOnly = valStr.replace(/\D/g, "");
    if (!numericOnly) {
      setAmount(0);
      setCustomAmountText("");
      return;
    }
    const num = parseInt(numericOnly, 10);
    setAmount(num);
    setCustomAmountText(num.toLocaleString("vi-VN"));
  };

  const handleSelectQuickAmount = (val: number) => {
    setAmount(val);
    setCustomAmountText(val.toLocaleString("vi-VN"));
  };

  // Copy helpers
  const handleCopy = (text: string, type: "account" | "code") => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      if (type === "account") {
        setCopiedAccount(true);
        setTimeout(() => setCopiedAccount(false), 2000);
      } else {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      }
    }
  };

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount < 1000) {
      setSubmitError("Số tiền ủng hộ tối thiểu là 2.000 VNĐ.");
      return;
    }
    if (!isAnonymous && !donorName.trim()) {
      setSubmitError("Vui lòng nhập họ và tên của bạn hoặc chọn 'Ủng hộ ẩn danh'.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donor_name: isAnonymous ? "Nhà hảo tâm ẩn danh" : donorName.trim(),
          amount,
          message: message.trim(),
          is_anonymous: isAnonymous,
          transfer_code: transferCode,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Không thể gửi đóng góp.");
      }

      setSubmitSuccess(true);
      fetchDonations(1); // Refresh page 1 to display new record immediately

      // Reset form fields
      setDonorName("");
      setMessage("");
      const newRandomCode = `TN1954-${Math.floor(100000 + Math.random() * 900000)}`;
      setTransferCode(newRandomCode);
    } catch (err: any) {
      setSubmitError(err.message || "Đã xảy ra lỗi khi ghi nhận thông tin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtered donations for search
  const filteredDonations = searchQuery.trim()
    ? donations.filter(
      (d) =>
        d.donor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.transfer_code?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : donations;

  return (
    <div className="relative min-h-screen bg-[#11100F] text-[#FAF5ED] pb-24 selection:bg-[#8D2926] selection:text-[#FAF5ED]">
      {/* Background Sacred Atmospheric Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#181715] via-[#11100F] to-[#0A0A09] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#A88A52_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.08] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[#8D2926]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-96 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#A88A52]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12">
        {/* Navigation Breadcrumb & Back Link */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#A88A52]/20 pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#D5C7AD] hover:text-[#FAF5ED] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Về Trang Chủ</span>
          </Link>

          {/* External Link to Dedicated Online Candle Lighting */}
          <a
            href="https://thai-nguyen1954-1975.vercel.app/tuong-niem"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8D2926]/40 hover:bg-[#8D2926] border border-[#E5B84B]/60 text-xs text-[#FAF5ED] font-medium transition-all group"
          >
            <Flame className="w-3.5 h-3.5 text-[#E5B84B] fill-[#E5B84B] animate-pulse" />
            <span>Thắp nến tri ân trực tuyến</span>
            <ExternalLink className="w-3 h-3 text-[#E5B84B] group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8D2926]/30 border border-[#A88A52]/50 text-xs font-mono font-bold uppercase tracking-widest text-[#E5B84B]">
            <Heart className="w-3.5 h-3.5 text-[#E5B84B] fill-[#E5B84B]" />
            <span>QUỸ LƯU TRỮ VÀ TRI ÂN LỊCH SỬ THÁI NGUYÊN</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#FAF5ED] leading-tight">
            Đồng Hành &amp; Ủng Hộ <span className="text-[#E5B84B] block sm:inline">Bảo Tồn Tư Liệu</span>
          </h1>

          <p className="text-sm sm:text-base text-[#D5C7AD] font-light leading-relaxed">
            Chung tay bảo tồn, số hóa các di vật lịch sử và thắp sáng truyền thống anh hùng Thái Nguyên (1954 – 1975).
            Mọi sự ủng hộ của quý vị đều được tự động lưu trữ trên cơ sở dữ liệu và công khai minh bạch qua hệ thống sao kê từng trang.
          </p>
        </div>

        {/* 3 Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          <div className="rounded-xl border border-[#A88A52]/40 bg-[#1A1917]/80 p-5 backdrop-blur-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#8D2926] border border-[#E5B84B]/60 flex items-center justify-center shrink-0 shadow-md">
              <Award className="w-6 h-6 text-[#E5B84B]" />
            </div>
            <div>
              <p className="text-xs font-mono text-[#D5C7AD] uppercase tracking-wider">Tổng Quỹ Tiếp Nhận</p>
              <p className="text-xl sm:text-2xl font-sans font-black text-[#E5B84B] mt-0.5">
                {totalAmount.toLocaleString("vi-VN")} đ
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[#A88A52]/40 bg-[#1A1917]/80 p-5 backdrop-blur-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#8D2926] border border-[#E5B84B]/60 flex items-center justify-center shrink-0 shadow-md">
              <Heart className="w-6 h-6 text-[#E5B84B]" />
            </div>
            <div>
              <p className="text-xs font-mono text-[#D5C7AD] uppercase tracking-wider">Lượt Đóng Góp</p>
              <p className="text-xl sm:text-2xl font-sans font-black text-[#FAF5ED] mt-0.5">
                {totalCount} <span className="text-xs font-normal text-[#D5C7AD]">tấm lòng</span>
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[#A88A52]/40 bg-[#1A1917]/80 p-5 backdrop-blur-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#8D2926] border border-[#E5B84B]/60 flex items-center justify-center shrink-0 shadow-md">
              <Shield className="w-6 h-6 text-[#E5B84B]" />
            </div>
            <div>
              <p className="text-xs font-mono text-[#D5C7AD] uppercase tracking-wider">Minh Bạch Thời Gian Thực</p>
              <p className="text-sm font-sans font-bold text-[#FAF5ED] mt-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Sao kê trực tuyến Supabase</span>
              </p>
            </div>
          </div>
        </div>

        {/* Main Stage: Left QR Bank Card + Right Donation Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* === LEFT: BANK ACCOUNT & QR CODE DISPLAY (5 cols) === */}
          <div className="lg:col-span-5 rounded-2xl border-2 border-[#A88A52] bg-[#141311] p-6 sm:p-7 shadow-2xl relative space-y-6">
            <div className="flex items-center justify-between border-b border-[#A88A52]/30 pb-4">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[#E5B84B]" />
                <h2 className="font-serif text-lg font-bold text-[#FAF5ED]">Tài Khoản &amp; Quét Mã QR</h2>
              </div>
              <span className="text-[10px] font-mono uppercase bg-[#8D2926] px-2 py-0.5 rounded text-[#FAF5ED] border border-[#E5B84B]/40">
                Chính thức
              </span>
            </div>

            {/* QR Card Frame */}
            <div className="flex flex-col items-center">
              <div
                onClick={() => setQrZoomOpen(true)}
                className="group relative w-64 h-64 sm:w-72 sm:h-72 rounded-xl overflow-hidden border-2 border-[#E5B84B] bg-white p-2 shadow-xl cursor-pointer hover:border-amber-300 transition-all flex items-center justify-center"
                title="Nhấp để phóng to ảnh mã QR"
              >
                <SafeImage
                  src="/images/donate/qr-bank.jpg"
                  alt="Mã QR chuyển khoản ngân hàng"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  fallback={
                    <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 bg-[#FAF5ED] text-[#242321]">
                      <QrCode className="w-16 h-16 text-[#8D2926] mb-2" />
                      <p className="font-serif font-bold text-sm">Ảnh QR Chuyển Khoản</p>
                      <p className="text-[10px] text-gray-500 mt-1">
                        Thêm ảnh của bạn vào thư mục:
                        <br />
                        <code className="text-[#8D2926] font-mono">public/images/donate/qr-bank.jpg</code>
                      </p>
                    </div>
                  }
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold">
                  <Eye className="w-4 h-4 text-[#E5B84B]" />
                  <span>Phóng to ảnh</span>
                </div>
              </div>
              <p className="text-[11px] font-mono text-[#D5C7AD] mt-2 flex items-center gap-1">
                <span>Quét mã qua app ngân hàng hoặc chuyển khoản theo thông tin:</span>
              </p>
            </div>

            {/* Bank Details List */}
            <div className="space-y-3 pt-2">
              {/* Account Number */}
              <div className="p-3 rounded-lg bg-black/40 border border-[#A88A52]/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#D5C7AD]/70 block">Số Tài Khoản</span>
                  <span className="font-mono text-base sm:text-lg font-bold text-[#E5B84B] tracking-wider">
                    104899605666
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("999919541975", "account")}
                  className="px-3 py-1.5 rounded-md bg-[#8D2926] hover:bg-[#6E1F1D] text-xs font-medium text-[#FAF5ED] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copiedAccount ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAccount ? "Đã chép" : "Sao chép"}</span>
                </button>
              </div>

              {/* Account Name & Bank */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-black/40 border border-[#A88A52]/30">
                  <span className="text-[10px] font-mono uppercase text-[#D5C7AD]/70 block">Ngân Hàng</span>
                  <span className="text-xs font-bold text-[#FAF5ED]">VietinBank</span>
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-[#A88A52]/30">
                  <span className="text-[10px] font-mono uppercase text-[#D5C7AD]/70 block">Chủ Tài Khoản</span>
                  <span className="text-xs font-bold text-[#FAF5ED] uppercase">QUY LUU TRU THAI NGUYEN</span>
                </div>
              </div>

              {/* Transfer Code Memo */}
              <div className="p-3 rounded-lg bg-[#8D2926]/30 border border-[#E5B84B]/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#E5B84B] block">Nội Dung Chuyển Khoản</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-[#FAF5ED]">
                    {transferCode}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(transferCode, "code")}
                  className="px-3 py-1.5 rounded-md bg-[#8D2926] hover:bg-[#6E1F1D] text-xs font-medium text-[#FAF5ED] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? "Đã chép" : "Sao chép"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* === RIGHT: DONATION CONFIRMATION FORM (7 cols) === */}
          <div className="lg:col-span-7 rounded-2xl border-2 border-[#A88A52] bg-[#141311] p-6 sm:p-8 shadow-2xl relative space-y-6">
            <div className="border-b border-[#A88A52]/30 pb-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF5ED] flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#E5B84B]" />
                <span>Nhập Số Tiền &amp; Thông Tin Ghi Danh</span>
              </h2>
              <p className="text-xs text-[#D5C7AD] mt-1 font-light">
                Sau khi chuyển khoản thành công, quý vị vui lòng gửi thông tin dưới đây để hệ thống tự động cập nhật vào danh sách sao kê minh bạch.
              </p>
            </div>

            {/* Success Alert */}
            {submitSuccess && (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-sm flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">Ghi nhận đóng góp thành công!</p>
                  <p className="text-xs text-emerald-300 font-light">
                    Xin chân thành cảm ơn tấm lòng hảo tâm của quý vị. Thông tin đã được lưu trữ và tự động xuất hiện tại bảng sao kê bên dưới.
                  </p>
                </div>
              </div>
            )}

            {/* Error Alert */}
            {submitError && (
              <div className="p-4 rounded-xl bg-red-950/80 border border-red-500 text-red-200 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-xs font-medium">{submitError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 1. Quick Select Amounts */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#D5C7AD] block">
                  1. Chọn Nhanh Số Tiền Ủng Hộ (VNĐ)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {QUICK_AMOUNTS.map((amt) => {
                    const isSelected = amount === amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handleSelectQuickAmount(amt)}
                        className={`py-2 px-1 rounded-lg text-xs font-mono font-bold transition-all border cursor-pointer ${isSelected
                            ? "bg-[#8D2926] text-[#FAF5ED] border-[#E5B84B] ring-2 ring-[#E5B84B]/40"
                            : "bg-black/40 text-[#D5C7AD] border-[#A88A52]/40 hover:border-[#E5B84B] hover:text-[#FAF5ED]"
                          }`}
                      >
                        {(amt / 1000).toLocaleString("vi-VN")}k
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Custom Amount Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-[#D5C7AD] block">
                  Hoặc Nhập Số Tiền Tùy Ý
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={customAmountText}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    placeholder="Ví dụ: 100.000"
                    className="w-full px-4 py-3 rounded-lg bg-black/60 border border-[#A88A52]/60 focus:border-[#E5B84B] focus:outline-hidden text-[#FAF5ED] font-mono text-lg font-bold placeholder-[#D5C7AD]/40 pr-16"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#E5B84B]">
                    VNĐ
                  </span>
                </div>
              </div>

              {/* 3. Donor Name & Anonymous Checkbox */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#D5C7AD]">
                    2. Họ Và Tên Người Ủng Hộ
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-[#E5B84B] select-none">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded border-[#A88A52] text-[#8D2926] focus:ring-[#8D2926]"
                    />
                    <span>Ủng hộ ẩn danh</span>
                  </label>
                </div>

                <input
                  type="text"
                  disabled={isAnonymous}
                  value={isAnonymous ? "Nhà hảo tâm ẩn danh" : donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="Nhập họ và tên hoặc cơ quan, đoàn thể..."
                  className={`w-full px-4 py-3 rounded-lg bg-black/60 border border-[#A88A52]/60 focus:border-[#E5B84B] focus:outline-hidden text-[#FAF5ED] text-sm placeholder-[#D5C7AD]/40 ${isAnonymous ? "opacity-50 cursor-not-allowed bg-black/80" : ""
                    }`}
                />
              </div>

              {/* 4. Message / Note */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-[#D5C7AD] block">
                  3. Lời Nhắn Gửi Gắm / Lời Tri Ân (Tùy chọn)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Gửi gắm lời tri ân thành kính tới các anh hùng liệt sĩ..."
                  className="w-full px-4 py-3 rounded-lg bg-black/60 border border-[#A88A52]/60 focus:border-[#E5B84B] focus:outline-hidden text-[#FAF5ED] text-sm placeholder-[#D5C7AD]/40 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-[#8D2926] hover:bg-[#6E1F1D] text-[#FAF5ED] font-bold text-sm tracking-wider uppercase border border-[#E5B84B] shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#E5B84B]" />
                    <span>Đang lưu vào danh sách sao kê...</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4 text-[#E5B84B] fill-[#E5B84B]" />
                    <span>Xác Nhận Đã Chuyển Khoản &amp; Ghi Danh</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* === SECTION: PUBLIC TRANSPARENCY & PAGINATED SAO KÊ TABLE === */}
        <div className="rounded-2xl border-2 border-[#A88A52] bg-[#141311] p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Table Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#A88A52]/30 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#8D2926] text-xs font-mono font-bold text-[#FAF5ED] uppercase tracking-wider mb-2">
                <Shield className="w-3.5 h-3.5 text-[#E5B84B]" />
                <span>Sao Kê Minh Bạch Phân Trang</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#FAF5ED]">
                Danh Sách Nhà Hảo Tâm &amp; Đồng Đội Tri Ân
              </h3>
              <p className="text-xs text-[#D5C7AD] font-light mt-1">
                Toàn bộ các khoản đóng góp được sắp xếp theo thời gian thực và phân trang chuẩn mực.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-[#A88A52] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm theo tên hoặc lời nhắn..."
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-black/60 border border-[#A88A52]/50 text-xs text-[#FAF5ED] placeholder-[#D5C7AD]/40 focus:border-[#E5B84B] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-[#A88A52] text-[#E5B84B] font-mono uppercase text-[11px] tracking-wider">
                  <th className="py-3 px-3">STT</th>
                  <th className="py-3 px-3">Thời Gian</th>
                  <th className="py-3 px-4">Người Đóng Góp</th>
                  <th className="py-3 px-4 text-right">Số Tiền (VNĐ)</th>
                  <th className="py-3 px-4">Lời Nhắn Tri Ân</th>
                  <th className="py-3 px-3 text-center">Trạng Thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#A88A52]/20 font-sans">
                {isLoadingList ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#D5C7AD]">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#E5B84B] mb-2" />
                      <span>Đang tải danh sách sao kê từ cơ sở dữ liệu...</span>
                    </td>
                  </tr>
                ) : filteredDonations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#D5C7AD]">
                      Chưa có lượt đóng góp nào khớp với tìm kiếm.
                    </td>
                  </tr>
                ) : (
                  filteredDonations.map((item, idx) => {
                    const rowOrder = (page - 1) * limit + idx + 1;
                    const dateFormatted = new Date(item.created_at).toLocaleString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    return (
                      <tr
                        key={item.id || idx}
                        className="hover:bg-white/5 transition-colors group"
                      >
                        {/* STT */}
                        <td className="py-3.5 px-3 font-mono text-[#D5C7AD]">{rowOrder}</td>

                        {/* Date */}
                        <td className="py-3.5 px-3 font-mono text-[11px] text-[#D5C7AD] whitespace-nowrap">
                          {dateFormatted}
                        </td>

                        {/* Donor Name */}
                        <td className="py-3.5 px-4 font-semibold text-[#FAF5ED] whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E5B84B]" />
                            <span>{item.donor_name}</span>
                          </div>
                        </td>

                        {/* Amount */}
                        <td className="py-3.5 px-4 text-right font-mono font-bold text-[#E5B84B] whitespace-nowrap text-sm">
                          + {item.amount.toLocaleString("vi-VN")} đ
                        </td>

                        {/* Message */}
                        <td className="py-3.5 px-4 text-xs text-[#FAF5ED]/80 max-w-xs sm:max-w-md line-clamp-2 italic">
                          {item.message ? `"${item.message}"` : <span className="text-[#D5C7AD]/40 font-mono not-italic">—</span>}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-3 text-center whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/80 border border-emerald-500/50 text-emerald-300">
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Đã xác nhận</span>
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls ("sao kê theo từng page") */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#A88A52]/30 text-xs font-mono text-[#D5C7AD]">
            <p>
              Hiển thị trang <strong className="text-[#E5B84B]">{page}</strong> / {totalPages}{" "}
              (Tổng cộng <strong className="text-[#FAF5ED]">{totalCount}</strong> lượt đóng góp)
            </p>

            <div className="flex items-center gap-1.5">
              {/* First Page */}
              <button
                type="button"
                onClick={() => fetchDonations(1)}
                disabled={page <= 1}
                className="p-1.5 rounded border border-[#A88A52]/40 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                title="Trang đầu"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>

              {/* Prev Page */}
              <button
                type="button"
                onClick={() => fetchDonations(page - 1)}
                disabled={page <= 1}
                className="p-1.5 rounded border border-[#A88A52]/40 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                title="Trang trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page Number Buttons */}
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                // Only show nearby pages if many
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= page - 1 && pageNum <= page + 1)
                ) {
                  const isActive = pageNum === page;
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => fetchDonations(pageNum)}
                      className={`min-w-[32px] h-8 rounded text-xs font-mono font-bold transition-all border cursor-pointer ${isActive
                          ? "bg-[#8D2926] text-[#FAF5ED] border-[#E5B84B]"
                          : "border-[#A88A52]/30 bg-black/40 text-[#D5C7AD] hover:bg-white/10 hover:text-[#FAF5ED]"
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (pageNum === page - 2 || pageNum === page + 2) {
                  return (
                    <span key={pageNum} className="px-1 text-white/30">
                      ...
                    </span>
                  );
                }
                return null;
              })}

              {/* Next Page */}
              <button
                type="button"
                onClick={() => fetchDonations(page + 1)}
                disabled={page >= totalPages}
                className="p-1.5 rounded border border-[#A88A52]/40 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                title="Trang sau"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Last Page */}
              <button
                type="button"
                onClick={() => fetchDonations(totalPages)}
                disabled={page >= totalPages}
                className="p-1.5 rounded border border-[#A88A52]/40 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                title="Trang cuối"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QR ZOOM MODAL */}
      <AnimatePresence>
        {qrZoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setQrZoomOpen(false)}
          >
            <div
              className="relative max-w-sm w-full bg-[#1A1917] rounded-2xl border-2 border-[#E5B84B] p-6 text-center space-y-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-serif text-lg font-bold text-[#FAF5ED]">Mã QR Chuyển Khoản Ngân Hàng</h3>
              <div className="relative w-64 h-64 mx-auto rounded-xl overflow-hidden border border-[#A88A52] bg-white p-2">
                <SafeImage
                  src="/images/donate/qr-bank.jpg"
                  alt="QR Ngân hàng"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-xs text-[#D5C7AD] font-mono">
                Số TK: <strong className="text-[#E5B84B]">9999 1954 1975</strong> (MB Bank)
              </p>
              <button
                type="button"
                onClick={() => setQrZoomOpen(false)}
                className="px-6 py-2 rounded-lg bg-[#8D2926] hover:bg-[#6E1F1D] text-xs font-bold text-[#FAF5ED] transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


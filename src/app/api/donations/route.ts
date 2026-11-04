import { NextResponse } from "next/server";
import { supabase, isConfigured } from "@/lib/supabase/client";

// Dữ liệu mẫu dự phòng khi database Supabase chưa chạy script tạo bảng
const FALLBACK_DONATIONS = [
  {
    id: "sample-1",
    donor_name: "Ban Liên lạc Cựu chiến binh Bắc Thái",
    amount: 2000000,
    message: "Kính cẩn nghiêng mình trước anh linh 60 liệt sĩ TNXP Đại đội 915 và các anh hùng liệt sĩ.",
    transfer_code: "TN1954-CCB01",
    is_anonymous: false,
    status: "verified",
    created_at: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: "sample-2",
    donor_name: "Nguyễn Thị Minh Hằng (Hà Nội)",
    amount: 500000,
    message: "Đồng hành cùng dự án số hóa lịch sử Thái Nguyên. Rất xúc động và tự hào khi đọc từng trang tư liệu!",
    transfer_code: "TN1954-MH02",
    is_anonymous: false,
    status: "confirmed",
    created_at: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: "sample-3",
    donor_name: "Nhà hảo tâm ẩn danh",
    amount: 200000,
    message: "Nguyện cầu cho linh hồn các anh hùng liệt sĩ luôn an nghỉ nơi cõi vĩnh hằng.",
    transfer_code: "TN1954-ANON03",
    is_anonymous: true,
    status: "confirmed",
    created_at: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: "sample-4",
    donor_name: "Trần Đức Nam (TP. Thái Nguyên)",
    amount: 1000000,
    message: "Ủng hộ quỹ lưu trữ bảo tàng. Tự hào là người con của mảnh đất gang thép anh hùng!",
    transfer_code: "TN1954-TN04",
    is_anonymous: false,
    status: "confirmed",
    created_at: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
  },
  {
    id: "sample-5",
    donor_name: "Tập thể Lớp Lịch sử K45 ĐH Sư phạm",
    amount: 500000,
    message: "Kính dâng nén tâm nhang tri ân thế hệ cha anh kiên cường.",
    transfer_code: "TN1954-SP05",
    is_anonymous: false,
    status: "confirmed",
    created_at: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
  },
];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, Math.min(50, parseInt(searchParams.get("limit") || "10", 10)));
    const offset = (page - 1) * limit;

    if (!isConfigured) {
      const total = FALLBACK_DONATIONS.length;
      const totalAmount = FALLBACK_DONATIONS.reduce((sum, item) => sum + item.amount, 0);
      const paginated = FALLBACK_DONATIONS.slice(offset, offset + limit);
      return NextResponse.json({
        donations: paginated,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
        totalAmount,
      });
    }

    // 1. Lấy dữ liệu phân trang từ Supabase
    const { data, error, count } = await supabase
      .from("donations")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      // Trường hợp bảng chưa được tạo trong Supabase
      if (error.code === "PGRST205" || error.message.includes("does not exist")) {
        const total = FALLBACK_DONATIONS.length;
        const totalAmount = FALLBACK_DONATIONS.reduce((sum, item) => sum + item.amount, 0);
        const paginated = FALLBACK_DONATIONS.slice(offset, offset + limit);
        return NextResponse.json({
          donations: paginated,
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit) || 1,
          totalAmount,
          warning: "Bảng donations chưa được tạo trong Supabase. Vui lòng chạy file supabase/donations_table.sql trong SQL Editor.",
        });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 2. Tính tổng số tiền ủng hộ toàn thời gian
    const { data: sumData } = await supabase
      .from("donations")
      .select("amount");

    const totalAmount = (sumData || []).reduce((acc: number, cur: any) => acc + (Number(cur.amount) || 0), 0);
    const totalCount = count || 0;

    return NextResponse.json({
      donations: data || [],
      total: totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit) || 1,
      totalAmount,
    });
  } catch (err: any) {
    console.error("Donations GET error:", err);
    return NextResponse.json({ error: err.message || "Lỗi máy chủ" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { donor_name, amount, message, is_anonymous, transfer_code } = body;

    const parsedAmount = Math.round(Number(amount));
    if (!parsedAmount || parsedAmount < 1000) {
      return NextResponse.json(
        { error: "Số tiền ủng hộ tối thiểu là 1.000 VNĐ." },
        { status: 400 }
      );
    }

    const finalName = is_anonymous
      ? "Nhà hảo tâm ẩn danh"
      : (donor_name || "Nhà hảo tâm").trim().slice(0, 150);

    const newRecord = {
      donor_name: finalName,
      amount: parsedAmount,
      message: (message || "").trim().slice(0, 1000),
      transfer_code: (transfer_code || `TN1954-${Math.floor(100000 + Math.random() * 900000)}`).trim(),
      is_anonymous: Boolean(is_anonymous),
      status: "confirmed",
    };

    if (!isConfigured) {
      const mockCreated = {
        id: "mock-" + Date.now(),
        ...newRecord,
        created_at: new Date().toISOString(),
      };
      FALLBACK_DONATIONS.unshift(mockCreated);
      return NextResponse.json({
        success: true,
        donation: mockCreated,
      });
    }

    const { data, error } = await supabase
      .from("donations")
      .insert([newRecord])
      .select()
      .single();

    if (error) {
      // Nếu bảng chưa có, vẫn phản hồi thành công và trả về dữ liệu mẫu
      if (error.code === "PGRST205" || error.message.includes("does not exist")) {
        const mockCreated = {
          id: "mock-" + Date.now(),
          ...newRecord,
          created_at: new Date().toISOString(),
        };
        FALLBACK_DONATIONS.unshift(mockCreated);
        return NextResponse.json({
          success: true,
          donation: mockCreated,
          warning: "Bảng donations chưa được tạo trong Supabase. Vui lòng chạy supabase/donations_table.sql.",
        });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      donation: data,
    });
  } catch (err: any) {
    console.error("Donations POST error:", err);
    return NextResponse.json({ error: err.message || "Lỗi máy chủ" }, { status: 500 });
  }
}


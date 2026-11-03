import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { Tribute } from "@/types/content.types";

// Initial sample tributes
let fallbackTributes: Tribute[] = [
  {
    id: "trib-1",
    author_name: "Nguyễn Văn Hùng",
    author_title: "Cựu chiến binh Quân khu Việt Bắc",
    location: "TP. Thái Nguyên",
    message:
      "Vô cùng xúc động và biết ơn sự hy sinh anh dũng của 60 đồng đội Đại đội 915 đêm Noel 1972. Sự hy sinh của các đồng chí đã góp phần cho ngày non sông thống nhất.",
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    is_approved: true,
  },
  {
    id: "trib-2",
    author_name: "Trần Thị Mai Anh",
    author_title: "Giáo viên Lịch sử THPT Chuyên Thái Nguyên",
    location: "Thái Nguyên",
    message:
      "Mỗi trang sử của quân dân Thái Nguyên giai đoạn 1965-1972 là bài học vô giá về lòng yêu nước và ý chí bất khuất. Thế hệ trẻ chúng em nguyện noi gương các anh hùng liệt sĩ.",
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    is_approved: true,
  },
  {
    id: "trib-3",
    author_name: "Lê Hoàng Long",
    author_title: "Đoàn viên thanh niên",
    location: "Hà Nội",
    message:
      "Kính cẩn nghiêng mình trước anh linh các bác, các cô chú Đại đội 915 và các chiến sĩ pháo cao xạ Trung đoàn 210, 256. Đời đời ghi nhớ công ơn!",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    is_approved: true,
  },
];

export async function GET() {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("memorial_tributes")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false })
        .limit(50);

      if (!error && data && data.length > 0) {
        return NextResponse.json({ tributes: data, source: "supabase" });
      }
    }

    return NextResponse.json({ tributes: fallbackTributes, source: "fallback" });
  } catch (error) {
    console.error("Tributes GET error:", error);
    return NextResponse.json({ tributes: fallbackTributes, source: "fallback" });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { author_name, author_title, location, message } = body;

    if (!author_name || !message || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Vui lòng nhập tên và nội dung tri ân (tối thiểu 5 ký tự)." },
        { status: 400 }
      );
    }

    const newTribute: Tribute = {
      id: "trib-" + Date.now(),
      author_name: author_name.trim().slice(0, 100),
      author_title: (author_title || "Nhân dân").trim().slice(0, 150),
      location: (location || "Việt Nam").trim().slice(0, 100),
      message: message.trim().slice(0, 1000),
      created_at: new Date().toISOString(),
      is_approved: true,
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("memorial_tributes")
        .insert([
          {
            author_name: newTribute.author_name,
            author_title: newTribute.author_title,
            location: newTribute.location,
            message: newTribute.message,
            is_approved: true,
          },
        ])
        .select()
        .single();

      if (!error && data) {
        return NextResponse.json({ success: true, tribute: data, source: "supabase" });
      }
    }

    fallbackTributes = [newTribute, ...fallbackTributes];
    return NextResponse.json({ success: true, tribute: newTribute, source: "fallback" });
  } catch (error) {
    console.error("Tributes POST error:", error);
    return NextResponse.json(
      { error: "Không thể gửi lời tri ân, vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}

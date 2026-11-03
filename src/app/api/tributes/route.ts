import { NextResponse } from "next/server";
import { supabase, isConfigured } from "@/lib/supabase/client";

export async function GET() {
  try {
    if (!isConfigured) {
      return NextResponse.json({ tributes: [] });
    }

    const { data, error } = await supabase
      .from("memorial_tributes")
      .select("*")
      .eq("is_approved", true)
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      if (error.code === "PGRST205") {
        return NextResponse.json({
          tributes: [],
          warning: "Bảng memorial_tributes chưa được tạo trong Supabase. Vui lòng chạy schema.sql.",
        });
      }
      return NextResponse.json({ tributes: [], error: error.message });
    }

    return NextResponse.json({ tributes: data || [] });
  } catch (error: any) {
    console.error("Tributes GET error:", error);
    return NextResponse.json({ tributes: [], error: error?.message });
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

    const newTributeData = {
      author_name: author_name.trim().slice(0, 100),
      author_title: (author_title || "Nhân dân").trim().slice(0, 150),
      location: (location || "Việt Nam").trim().slice(0, 100),
      message: message.trim().slice(0, 1000),
      is_approved: true,
    };

    if (!isConfigured) {
      return NextResponse.json({
        success: true,
        tribute: { id: "mock-" + Date.now(), ...newTributeData, created_at: new Date().toISOString() },
      });
    }

    const { data, error } = await supabase
      .from("memorial_tributes")
      .insert([newTributeData])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message, success: false },
        { status: error.code === "PGRST205" ? 400 : 500 }
      );
    }

    return NextResponse.json({ success: true, tribute: data });
  } catch (error: any) {
    console.error("Tributes POST error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error", success: false },
      { status: 500 }
    );
  }
}

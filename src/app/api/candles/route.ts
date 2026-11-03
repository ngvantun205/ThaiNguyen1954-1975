import { NextResponse } from "next/server";
import { supabase, isConfigured } from "@/lib/supabase/client";

export async function GET() {
  try {
    if (!isConfigured) {
      return NextResponse.json({
        count: 60,
        warning: "Supabase chưa được cấu hình biến môi trường.",
      });
    }

    const { data, error } = await supabase
      .from("candle_stats")
      .select("total_candles")
      .eq("id", 1)
      .single();

    if (error) {
      if (error.code === "PGRST205") {
        return NextResponse.json({
          count: 60,
          warning: "Bảng candle_stats chưa được tạo trong Supabase. Vui lòng chạy schema.sql.",
        });
      }
      return NextResponse.json({ count: 60, error: error.message });
    }

    return NextResponse.json({
      count: Number(data.total_candles),
    });
  } catch (error: any) {
    console.error("Candle API error:", error);
    return NextResponse.json({ count: 60, error: error?.message });
  }
}

export async function POST() {
  try {
    if (!isConfigured) {
      return NextResponse.json({
        success: true,
        count: 61,
      });
    }

    // 1. Thử gọi RPC
    const { data: rpcCount, error: rpcError } = await supabase.rpc("light_a_candle");

    if (!rpcError && rpcCount !== null) {
      return NextResponse.json({
        success: true,
        count: Number(rpcCount),
      });
    }

    // 2. Thử update trực tiếp bảng
    const { data: currentData, error: selectError } = await supabase
      .from("candle_stats")
      .select("total_candles")
      .eq("id", 1)
      .single();

    if (selectError) {
      return NextResponse.json(
        { error: selectError.message, success: false },
        { status: selectError.code === "PGRST205" ? 400 : 500 }
      );
    }

    const newCount = Number(currentData?.total_candles || 60) + 1;
    const { error: updateError } = await supabase
      .from("candle_stats")
      .update({ total_candles: newCount, updated_at: new Date().toISOString() })
      .eq("id", 1);

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message, success: false },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      count: newCount,
    });
  } catch (error: any) {
    console.error("Candle POST error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error", success: false },
      { status: 500 }
    );
  }
}

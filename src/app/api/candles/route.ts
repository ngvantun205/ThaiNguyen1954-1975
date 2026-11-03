import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("candle_stats")
      .select("total_candles")
      .eq("id", 1)
      .single();

    if (error) {
      // PGRST205: Bảng chưa được tạo trong Supabase
      if (error.code === "PGRST205") {
        console.warn("Chưa chạy file schema.sql trong Supabase SQL Editor (PGRST205).");
        return NextResponse.json({
          count: 60,
          warning: "Bảng candle_stats chưa tồn tại. Vui lòng chạy file supabase/schema.sql trên Supabase Dashboard.",
        });
      }

      console.error("Supabase candle_stats GET error:", error);
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
    // 1. Thử gọi hàm stored procedure RPC light_a_candle()
    const { data: rpcCount, error: rpcError } = await supabase.rpc("light_a_candle");

    if (!rpcError && rpcCount !== null) {
      return NextResponse.json({
        success: true,
        count: Number(rpcCount),
      });
    }

    // 2. Nếu RPC chưa có hoặc lỗi, thử update trực tiếp bảng candle_stats
    const { data: currentData, error: selectError } = await supabase
      .from("candle_stats")
      .select("total_candles")
      .eq("id", 1)
      .single();

    if (selectError) {
      if (selectError.code === "PGRST205") {
        return NextResponse.json(
          {
            success: false,
            error: "Bảng candle_stats chưa được tạo trong Supabase. Vui lòng vào SQL Editor chạy file schema.sql.",
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: selectError.message, success: false },
        { status: 500 }
      );
    }

    const newCount = Number(currentData?.total_candles || 0) + 1;
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

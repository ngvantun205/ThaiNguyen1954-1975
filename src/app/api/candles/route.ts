import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

// Global in-memory fallback store for development or when Supabase keys are not yet configured
let fallbackCandleCount = 1972;

export async function GET() {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("candle_stats")
        .select("total_candles")
        .eq("id", 1)
        .single();

      if (!error && data) {
        return NextResponse.json({
          count: Number(data.total_candles),
          source: "supabase",
        });
      }
    }

    return NextResponse.json({
      count: fallbackCandleCount,
      source: "fallback",
    });
  } catch (error) {
    console.error("Candle GET error:", error);
    return NextResponse.json(
      { count: fallbackCandleCount, source: "fallback" },
      { status: 200 }
    );
  }
}

export async function POST() {
  try {
    if (isSupabaseConfigured && supabase) {
      // Gọi stored procedure RPC light_a_candle() để tăng lượt atomic
      const { data, error } = await supabase.rpc("light_a_candle");

      if (!error && data !== null) {
        return NextResponse.json({
          success: true,
          count: Number(data),
          source: "supabase",
        });
      }

      // Fallback nếu RPC chưa tạo: trực tiếp update
      const { data: currentData } = await supabase
        .from("candle_stats")
        .select("total_candles")
        .eq("id", 1)
        .single();

      const newCount = (currentData?.total_candles || 60) + 1;
      await supabase
        .from("candle_stats")
        .update({ total_candles: newCount, updated_at: new Date().toISOString() })
        .eq("id", 1);

      return NextResponse.json({
        success: true,
        count: newCount,
        source: "supabase",
      });
    }

    // In-memory fallback
    fallbackCandleCount += 1;
    return NextResponse.json({
      success: true,
      count: fallbackCandleCount,
      source: "fallback",
    });
  } catch (error) {
    console.error("Candle POST error:", error);
    fallbackCandleCount += 1;
    return NextResponse.json({
      success: true,
      count: fallbackCandleCount,
      source: "fallback",
    });
  }
}

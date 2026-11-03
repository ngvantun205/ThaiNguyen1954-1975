-- =========================================================================
-- SUPABASE SCHEMA: WEBSITE LỊCH SỬ THÁI NGUYÊN (1965 – 1972)
-- Bản quyền cấu trúc dữ liệu: Bảo tàng Số Lịch sử Thái Nguyên
-- =========================================================================

-- 1. BẢNG candle_stats: Quản lý tổng số lượt thắp nến tri ân theo thời gian thực
CREATE TABLE IF NOT EXISTS public.candle_stats (
    id INT PRIMARY KEY DEFAULT 1,
    total_candles BIGINT NOT NULL DEFAULT 60, -- Khởi tạo ban đầu với biểu tượng 60 liệt sĩ TNXP
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT single_row_check CHECK (id = 1)
);

-- Khởi tạo hàng dữ liệu duy nhất nếu chưa tồn tại
INSERT INTO public.candle_stats (id, total_candles)
VALUES (1, 60)
ON CONFLICT (id) DO NOTHING;

-- 2. HÀM STORED PROCEDURE: Tăng lượt nến an toàn không bị Race Condition
CREATE OR REPLACE FUNCTION public.light_a_candle()
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_count BIGINT;
BEGIN
    UPDATE public.candle_stats
    SET total_candles = total_candles + 1,
        updated_at = timezone('utc'::text, now())
    WHERE id = 1
    RETURNING total_candles INTO new_count;

    RETURN new_count;
END;
$$;

-- 3. BẢNG memorial_tributes: Lưu trữ lời tri ân & sổ lưu bút trực tuyến
CREATE TABLE IF NOT EXISTS public.memorial_tributes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_name VARCHAR(100) NOT NULL,
    author_title VARCHAR(150),
    location VARCHAR(100),
    message TEXT NOT NULL CHECK (char_length(message) >= 5 AND char_length(message) <= 1000),
    is_approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tạo Index tăng tốc độ truy vấn danh sách lời tri ân mới nhất
CREATE INDEX IF NOT EXISTS idx_tributes_approved_created 
ON public.memorial_tributes (is_approved, created_at DESC);

-- 4. KÍCH HOẠT REALTIME CHO CÁC BẢNG TRÊN SUPABASE
-- Giúp cập nhật lượt nến và lời tri ân ngay tức khắc trên tất cả các máy đang mở trang
ALTER PUBLICATION supabase_realtime ADD TABLE public.candle_stats;
ALTER PUBLICATION supabase_realtime ADD TABLE public.memorial_tributes;

-- 5. CHÍNH SÁCH BẢO MẬT (ROW LEVEL SECURITY - RLS)
ALTER TABLE public.candle_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memorial_tributes ENABLE ROW LEVEL SECURITY;

-- Cho phép mọi người dùng xem số lượng nến
CREATE POLICY "Public read candle_stats"
ON public.candle_stats
FOR SELECT
USING (true);

-- Cho phép mọi người dùng xem các lời tri ân đã duyệt
CREATE POLICY "Public read approved tributes"
ON public.memorial_tributes
FOR SELECT
USING (is_approved = true);

-- Cho phép mọi người dùng gửi lời tri ân mới
CREATE POLICY "Public insert memorial_tributes"
ON public.memorial_tributes
FOR INSERT
WITH CHECK (char_length(message) >= 5 AND char_length(message) <= 1000);

-- Cho phép mọi người thực thi hàm thắp nến qua RPC
GRANT EXECUTE ON FUNCTION public.light_a_candle() TO anon, authenticated;

-- =========================================================================
-- HƯỚNG DẪN:
-- 1. Mở Supabase Dashboard -> Vào mục SQL Editor.
-- 2. Dán toàn bộ nội dung file này và bấm "Run".
-- 3. Lấy URL và Anon Key dán vào file .env.local trong dự án Next.js.
-- =========================================================================

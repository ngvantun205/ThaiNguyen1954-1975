-- =========================================================================
-- SUPABASE SCHEMA: BẢNG DONATIONS (ỦNG HỘ & SAO KÊ MINH BẠCH THEO TRANG)
-- Dự án: Bảo tàng Tư liệu Lịch sử số Thái Nguyên (1954 – 1975)
-- =========================================================================

-- 1. TẠO BẢNG donations
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_name VARCHAR(150) NOT NULL,
    amount BIGINT NOT NULL CHECK (amount > 0),
    message TEXT,
    transfer_code VARCHAR(50),
    is_anonymous BOOLEAN DEFAULT false,
    status VARCHAR(30) DEFAULT 'confirmed', -- 'pending', 'confirmed', 'verified'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. TẠO INDEXES TỐI ƯU HÓA TRUY VẤN VÀ PHÂN TRANG (PAGINATION)
CREATE INDEX IF NOT EXISTS idx_donations_created_at 
ON public.donations (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_donations_status 
ON public.donations (status);

-- 3. KÍCH HOẠT REALTIME SUPABASE CHO BẢNG donations
-- Cho phép danh sách sao kê tự động nhảy số khi có người chuyển khoản
ALTER PUBLICATION supabase_realtime ADD TABLE public.donations;

-- 4. CHÍNH SÁCH BẢO MẬT ROW LEVEL SECURITY (RLS)
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Cho phép công chúng xem danh sách sao kê (SELECT)
CREATE POLICY "Public read donations"
ON public.donations
FOR SELECT
USING (true);

-- Cho phép công chúng gửi thông tin ủng hộ (INSERT)
CREATE POLICY "Public insert donations"
ON public.donations
FOR INSERT
WITH CHECK (amount > 0 AND char_length(donor_name) >= 1);

-- 5. THÊM MỘT SỐ DỮ LIỆU MẪU BAN ĐẦU ĐỂ SAO KÊ HIỂN THỊ ĐẸP MẮT
INSERT INTO public.donations (donor_name, amount, message, transfer_code, is_anonymous, status, created_at)
VALUES 
  ('Ban Liên lạc Cựu chiến binh Bắc Thái', 2000000, 'Kính cẩn nghiêng mình trước anh linh 60 liệt sĩ TNXP Đại đội 915 và các anh hùng liệt sĩ đã hy sinh vì nền độc lập tự do của Tổ quốc.', 'TN1954-CCB01', false, 'verified', NOW() - INTERVAL '3 days'),
  ('Nguyễn Thị Minh Hằng (Hà Nội)', 500000, 'Đồng hành cùng dự án số hóa lịch sử Thái Nguyên. Rất xúc động và tự hào khi đọc từng trang tư liệu!', 'TN1954-MH02', false, 'confirmed', NOW() - INTERVAL '2 days'),
  ('Nhà hảo tâm ẩn danh', 200000, 'Nguyện cầu cho linh hồn các bác, các cô chú luôn an nghỉ nơi cõi vĩnh hằng.', 'TN1954-ANON03', true, 'confirmed', NOW() - INTERVAL '1 day'),
  ('Trần Đức Nam (TP. Thái Nguyên)', 1000000, 'Ủng hộ quỹ lưu trữ bảo tàng. Tự hào là người con của mảnh đất gang thép anh hùng!', 'TN1954-TN04', false, 'confirmed', NOW() - INTERVAL '18 hours'),
  ('Tập thể Lớp Lịch sử K45 ĐH Sư phạm', 500000, 'Kính dâng nén tâm nhang tri ân thế hệ cha anh.', 'TN1954-SP05', false, 'confirmed', NOW() - INTERVAL '6 hours')
ON CONFLICT DO NOTHING;

-- =========================================================================
-- HƯỚNG DẪN THỰC THI TRÊN SUPABASE:
-- 1. Truy cập https://supabase.com/dashboard -> Chọn dự án của bạn
-- 2. Vào mục "SQL Editor" ở menu bên trái
-- 3. Nhấp "New Query", dán toàn bộ mã này vào và bấm "Run" (hoặc Ctrl + Enter)
-- 4. Bảng `donations` và các chính sách sẽ được thiết lập tự động!
-- =========================================================================


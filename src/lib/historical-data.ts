import { Topic, Martyr915, MediaItem, HistoricalEvent } from "@/types/content.types";

export const HISTORICAL_TOPICS: Topic[] = [
  {
    id: "vi-the-chien-luoc",
    slug: "vi-the-chien-luoc",
    number: 1,
    shortTitle: "Vị Thế Chiến Lược",
    title: "Âm mưu của đế quốc Mỹ & Vị thế chiến lược của Thái Nguyên",
    subtitle: "Phên dậu bảo vệ Thủ đô, yết hầu giao thông và trung tâm công nghiệp của Khu tự trị Việt Bắc",
    timeframe: "1964 – 1965",
    badge: "Bối cảnh Chiến lược",
    heroImage: "/images/topics/01-vi-the-chien-luoc.jpg",
    summary:
      "Ngày 1/7/1965, Thái Nguyên hợp nhất với Bắc Kạn thành tỉnh Bắc Thái. TP. Thái Nguyên vừa là tỉnh lỵ vừa là trung tâm chính trị, kinh tế, văn hóa của Khu tự trị Việt Bắc. Nơi đây hội tụ Bộ Tư lệnh Quân khu Việt Bắc, Khu công nghiệp Gang thép và tuyến đường giao thông huyết mạch chi viện cho tiền tuyến lớn.",
    keyStats: [
      {
        label: "Lần/tốp trinh sát",
        value: "221",
        detail: "Mỹ đưa máy bay do thám bầu trời Thái Nguyên trong 9 tháng đầu năm 1965",
      },
      {
        label: "Hợp nhất Bắc Thái",
        value: "01/7/1965",
        detail: "Trở thành trung tâm chính trị - quân sự trọng yếu của cả vùng Việt Bắc",
      },
      {
        label: "Tuyến huyết mạch",
        value: "QL3 - 1B",
        detail: "Kết nối đường sắt Kép - Lưu Xá vận chuyển vũ khí khí tài chi viện",
      },
    ],
    sections: [
      {
        title: "1. Vị thế địa chính trị và quân sự đặc biệt quan trọng",
        content: [
          "Sau Hiệp định Giơ-ne-vơ năm 1954, Thái Nguyên là một trong những trung tâm công nghiệp luyện kim, cơ khí nặng đầu tiên của miền Bắc xã hội chủ nghĩa với 'cái nôi' Khu Gang thép Thái Nguyên cùng Nhà máy điện Cao Ngạn.",
          "Ngày 01/7/1965, Quốc hội nước Việt Nam Dân chủ Cộng hòa quyết nghị hợp nhất tỉnh Thái Nguyên và tỉnh Bắc Kạn thành tỉnh Bắc Thái. Thành phố Thái Nguyên giữ vị trí tỉnh lỵ, đồng thời là thủ phủ của Khu tự trị Việt Bắc.",
          "Về quân sự, Thái Nguyên là nơi đặt sở chỉ huy của Bộ Tư lệnh Quân khu Việt Bắc (tại Đồng Hỷ). Địa bàn tỉnh là nơi tập trung các trung tâm huấn luyện tân binh, kho tàng vũ khí, đạn dược, lương thực dự trữ chiến lược của Trung ương phục vụ cuộc kháng chiến giải phóng miền Nam.",
        ],
        quote: {
          text: "Thái Nguyên là yết hầu của Việt Bắc, là hậu phương trực tiếp của chiến trường và là chiếc cầu nối giữa hậu phương quốc tế với tiền tuyến miền Nam.",
          author: "Văn kiện Đảng bộ tỉnh Bắc Thái (1965)",
        },
        highlights: [
          "Nơi đóng quân của Bộ Tư lệnh Quân khu Việt Bắc (Đồng Hỷ).",
          "Trung tâm huấn luyện tân binh chi viện cho chiến trường miền Nam.",
          "Đầu mối giao thông huyết mạch: Quốc lộ 3, Quốc lộ 1B, đường sắt liên vận Kép - Lưu Xá.",
          "Trung tâm kinh tế công nghiệp nặng trọng yếu: Khu Gang thép Thái Nguyên, Nhà máy điện Cao Ngạn.",
        ],
      },
      {
        title: "2. Âm mưu thâm độc và các bước leo thang phá hoại của Mỹ",
        content: [
          "Nhận thấy vị trí chiến lược sống còn của Thái Nguyên đối với mạch máu chi viện cho chiến trường miền Nam, đế quốc Mỹ đã đưa Thái Nguyên vào danh sách các mục tiêu đánh phá hủy diệt hàng đầu trong chiến dịch 'Sấm Rền' (Rolling Thunder).",
          "Mục tiêu của Mỹ là bẻ gãy ý chí chiến đấu của nhân dân ta, phá hủy tận gốc tiềm lực công nghiệp non trẻ của miền Bắc, đồng thời cắt đứt hoàn toàn tuyến tiếp tế vũ khí, lương thực từ hậu phương lớn ra tiền tuyến.",
          "Ngay từ năm 1964, Mỹ đã cho 24 lần/tốp máy bay trinh sát do thám Thái Nguyên. Sang năm 1965, tần suất do thám tăng vọt: chỉ trong 9 tháng đầu năm 1965, đã có tới 221 lần/tốp máy bay trinh sát không trung Thái Nguyên nhằm lập bản đồ mục tiêu tọa độ ném bom.",
        ],
        highlights: [
          "Năm 1964: 24 lần/tốp máy bay do thám chụp ảnh không ảnh các nhà máy, cầu cống, ga tàu.",
          "9 tháng đầu 1965: 221 lần/tốp máy bay trinh sát tăng cường độ dọn đường cho chiến dịch hủy diệt.",
          "Mục tiêu then chốt: Cầu Gia Bẩy, Khu Gang thép, Ga Lưu Xá, Nhà máy điện Cao Ngạn, các kho xăng dầu và đạn dược.",
        ],
      },
    ],
  },
  {
    id: "chuyen-huong-kinh-te",
    slug: "chuyen-huong-kinh-te",
    number: 2,
    shortTitle: "Chuyển Hướng Kinh Tế & Chiến Đấu",
    title: "Đường lối chuyển hướng kinh tế & Tổ chức chiến đấu của quân dân Thái Nguyên",
    subtitle: "Vừa sản xuất, vừa chiến đấu – Tay búa tay súng, tay cày tay súng kiên cường bảo vệ hậu phương",
    timeframe: "1965 – 1968",
    badge: "Phòng Không & Sản Xuất",
    heroImage: "/images/topics/02-chuyen-huong-kinh-te.jpg",
    summary:
      "Thực hiện chủ trương của Trung ương, Thái Nguyên đã khẩn trương chuyển từ thời bình sang thời chiến. Mạng lưới phòng không nhân dân kỳ vĩ với 146 trận địa, hơn 210.000m giao thông hào và gần 80.000 hầm trú ẩn được xây dựng thần tốc.",
    keyStats: [
      {
        label: "Hào giao thông",
        value: "210.400m",
        detail: "Mạng lưới hào liên hoàn bảo vệ người dân và lực lượng chiến đấu",
      },
      {
        label: "Hầm trú ẩn",
        value: "79.600",
        detail: "Bảo toàn tối đa tính mạng cán bộ, công nhân và nhân dân",
      },
      {
        label: "Tân binh nhập ngũ",
        value: "40.827",
        detail: "Thanh niên ưu tú lên đường chi viện tiền tuyến qua 43 đợt tuyển quân",
      },
    ],
    sections: [
      {
        title: "1. Chủ động chuyển hướng kinh tế sang thời chiến và cuộc đại sơ tán",
        content: [
          "Đầu tháng 8/1965, chấp hành Nghị quyết của Tỉnh ủy, Thái Nguyên đã tổ chức cuộc sơ tán quy mô lớn nhất trong lịch sử: đưa đa số cán bộ, cơ quan hành chính, trường học, bệnh viện ra xa trung tâm thành phố và các trọng điểm ném bom của địch.",
          "Các cơ sở sản xuất công nghiệp được phân tán vào các hang đá, hầm hào, rừng núi để duy trì mạch máu sản xuất. Dù trong khói lửa bom đạn, phong trào 'Mỗi người làm việc bằng hai vì miền Nam ruột thịt' vẫn sục sôi trong từng nhà máy, hầm lò, công trường.",
        ],
        quote: {
          text: "Dù giặc Mỹ có tàn phá đến đâu, chúng ta cũng quyết không để gián đoạn sản xuất. Một hạt thóc chi viện cho tiền tuyến là một viên đạn bắn vào quân thù.",
          author: "Nghị quyết Đại hội Đảng bộ tỉnh Bắc Thái lần thứ I (1965)",
        },
      },
      {
        title: "2. Xây dựng thế trận phòng không nhân dân vững chắc",
        content: [
          "Quân và dân Thái Nguyên đã đồng lòng biến mảnh đất quê hương thành một pháo đài thép bất khả xâm phạm. Hàng triệu ngày công được huy động để xây dựng thế trận phòng không nhân dân rộng khắp.",
          "Toàn tỉnh đã thiết lập 146 trận địa phòng không cho các lực lượng pháo cao xạ bộ đội chủ lực và dân quân tự vệ; đào đắp hơn 210.400m giao thông hào, dựng 79.600 hầm trú ẩn các loại.",
          "Lực lượng tự vệ trực chiến thường xuyên được duy trì với 1.570 cán bộ, chiến sĩ dân quân bám sát trận địa 24/24 giờ, sẵn sàng nhả đạn tiêu diệt máy bay bay thấp của địch.",
        ],
        highlights: [
          "146 trận địa phòng không kiên cố trên các điểm cao khống chế bầu trời.",
          "210.400m giao thông hào nối liền các trận địa, xí nghiệp và khu dân cư.",
          "79.600 hầm trú ẩn đảm bảo an toàn cho nhân dân khi còi báo động vang lên.",
          "1.570 dân quân tự vệ trực chiến nòng cốt ngày đêm bám đài quan sát và mâm pháo.",
        ],
      },
      {
        title: "3. Những thành tựu rực rỡ trên mặt trận sản xuất và chi viện",
        content: [
          "Mặt trận Nông nghiệp: Bất chấp bom cày đạn xới, sản lượng lương thực vẫn tăng vọt. Sản lượng thóc toàn tỉnh tăng từ 84.670 tấn (1965) lên 110.145 tấn (1966), với 34 hợp tác xã nông nghiệp xuất sắc đạt mốc năng suất 5 tấn thóc/ha.",
          "Mặt trận Giao thông & Y tế: Quân dân mở mới 153 km đường ô tô chiến lược, dựng 37 cây cầu, khơi thông 17 bến phà huyết mạch; phát triển mạng lưới chăm sóc y tế thần tốc tới 18 bệnh viện và 236 trạm y tế cơ sở ngầm dưới lòng đất (1968).",
          "Mặt trận Chi viện: Qua 43 đợt tuyển quân vẻ vang, 40.827 thanh niên ưu tú của quê hương gió ngàn đã giương cao ngọn cờ 'Ba sẵn sàng', hăng hái lên đường vào Nam đánh Mỹ, góp phần quyết định vào thắng lợi của toàn dân tộc.",
        ],
      },
    ],
  },
  {
    id: "nhung-tran-danh-lich-su",
    slug: "nhung-tran-danh-lich-su",
    number: 3,
    shortTitle: "Những Trận Đánh Lịch Sử",
    title: "Những trận đánh lịch sử bảo vệ vùng trời gang thép",
    subtitle: "Từ trận đầu cầu Gia Bẩy, máy bay thứ 1.000 đến kỳ tích hạ gục 2 pháo đài bay B-52",
    timeframe: "1965 – 1972",
    badge: "Chiến Công Hiển Hách",
    heroImage: "/images/topics/03-nhung-tran-danh-lich-su.jpg",
    summary:
      "Lực lượng phòng không ba thứ quân Thái Nguyên đã kiên cường đánh trả hàng ngàn lượt oanh kích tàn khốc của không quân Mỹ, bắn rơi 61 máy bay hiện đại, trong đó có chiến công bắn rơi máy bay thứ 1.000 trên miền Bắc và hạ gục 2 'pháo đài bay' B-52 huyền thoại.",
    keyStats: [
      {
        label: "Máy bay Mỹ bị hạ",
        value: "61 chiếc",
        detail: "Trong đó xuất sắc bắn rơi 2 siêu pháo đài bay B-52 của giặc Mỹ",
      },
      {
        label: "Chiếc thứ 1.000",
        value: "29/4/1966",
        detail: "F-105 bị bắn rơi tại Tức Tranh - Phú Lương làm nức lòng quân dân cả nước",
      },
      {
        label: "Hạ B-52 ban đêm",
        value: "2 chiếc",
        detail: "Đại đội 5 (Trung đoàn 256) bắn rơi B-52 đêm 24 và 26/12/1972",
      },
    ],
    sections: [
      {
        title: "1. Trận mở đầu khói lửa bảo vệ cầu Gia Bẩy (17/10/1965)",
        content: [
          "Ngày 17/10/1965, không quân Mỹ ồ ạt huy động 29 lần/chiếc máy bay phản lực ném 116 quả bom phá hạng nặng xuống cầu Gia Bẩy và các trận địa pháo của Trung đoàn 210 ở Gia Sàng nhằm chặt đứt cây cầu cửa ngõ thành phố.",
          "Đại đội Tự vệ khu phố Hoàng Văn Thụ kiên cường bám trụ trận địa đồi Két Nước. Dưới làn mưa bom bão đạn mịt mù, các chiến sĩ tự vệ đã hiệp đồng chặt chẽ với bộ đội pháo cao xạ, nổ súng đánh đuổi máy bay địch.",
          "Trận chiến diễn ra vô cùng ác liệt: 80 người dân và cán bộ hy sinh, 67 người bị thương, 15 chiến sĩ tự vệ quả cảm đã ngã xuống trong tư thế ghì chặt tay cò súng. Cầu Gia Bẩy vẫn đứng vững như một biểu tượng bất khuất.",
        ],
        quote: {
          text: "Dù hy sinh đến giọt máu cuối cùng, trận địa đồi Két Nước và cầu Gia Bẩy vẫn phải đứng vững để bảo vệ mạch máu giao thông!",
          author: "Lời thề của Đội Tự vệ khu phố Hoàng Văn Thụ (17/10/1965)",
        },
      },
      {
        title: "2. Bắn rơi chiếc máy bay thứ 1.000 của Mỹ trên miền Bắc (29/4/1966)",
        content: [
          "Ngày 29/4/1966, giặc Mỹ mở đợt tập kích ồ ạt đánh phá ga Lưu Xá, ga Lập Tầu và Nhà máy điện Cao Ngạn.",
          "Tại trận địa đồi Tiến Lập, các pháo thủ Đại đội 101 (Trung đoàn 210) đã bình tĩnh đón địch, đón đúng đường bay bổ nhào và nã những loạt đạn cao xạ chính xác.",
          "Chiếc máy bay tiêm kích phản lực F-105 hiện đại của Mỹ bốc cháy như đuốc và cắm đầu rơi xuống làng Chùa, xã Tức Tranh, huyện Phú Lương. Đây chính là chiếc máy bay thứ 1.000 của đế quốc Mỹ bị quân dân miền Bắc bắn rơi, tạo tiếng vang lớn làm nức lòng chiến sĩ đồng bào cả nước và bạn bè năm châu.",
        ],
        highlights: [
          "Thời gian: Ngày 29 tháng 4 năm 1966.",
          "Đơn vị lập công: Đại đội 101, Trung đoàn Pháo cao xạ 210.",
          "Loại máy bay bị hạ: Thần sấm F-105 của không quân Mỹ.",
          "Địa điểm máy bay rơi: Làng Chùa, xã Tức Tranh, huyện Phú Lương, Thái Nguyên.",
        ],
      },
      {
        title: "3. Dân quân bắn rơi máy bay siêu thanh bằng súng bộ binh (01/8/1966)",
        content: [
          "Sáng ngày 01/8/1966, trên Đồi 100 xã Hà Thượng, huyện Đại Từ, 6 chiến sĩ Trung đội dân quân địa phương phát hiện máy bay trinh sát siêu âm RF-4C của Mỹ bay thấp luồn lách qua các khe núi.",
          "Không hề nao núng, các chiến sĩ dân quân đã đồng loạt nổ súng máy và súng trường bộ binh. Chỉ với đúng 18 viên đạn bộ binh chuẩn xác, chiếc phi cơ phản lực hiện đại tối tân của Mỹ đã trúng đạn bốc cháy rừng rực và lao đầu xuống núi.",
          "Chiến công vang dội của dân quân Hà Thượng là minh chứng sáng ngời cho nghệ thuật quân sự tài tình và lòng quả cảm phi thường của chiến tranh nhân dân Việt Nam.",
        ],
      },
      {
        title: "4. Vít cổ 'Pháo đài bay' B-52 trong 12 ngày đêm lịch sử (12/1972)",
        content: [
          "Trong chiến dịch 'Linebacker II' tháng 12/1972 (Hà Nội - Điện Biên Phủ trên không), Thái Nguyên trở thành mục tiêu ném bom rải thảm ác liệt của B-52 hòng hủy diệt các tuyến trung chuyển chi viện.",
          "Đại đội 5 (Trung đoàn Pháo cao xạ 256) đóng tại trận địa Quang Vinh đã mưu trí, dũng cảm phối hợp radar và phương pháp đón lõng mục tiêu trong đêm đen.",
          "Đêm 24/12/1972 và đêm 26/12/1972, Đại đội 5 đã lập chiến công vang dội: bắn rơi tại chỗ 2 'pháo đài bay' B-52 của giặc Mỹ, đập tan huyền thoại bất khả xâm phạm của không quân chiến lược Hoa Kỳ.",
        ],
        highlights: [
          "Đêm 24/12/1972: Bắn rơi chiếc B-52 đầu tiên trên bầu trời Thái Nguyên.",
          "Đêm 26/12/1972: Bắn rơi chiếc B-52 thứ hai, bảo vệ vùng trời trung tâm thành phố.",
          "Đơn vị anh hùng: Đại đội 5, Trung đoàn Pháo cao xạ 256 tại trận địa Quang Vinh.",
        ],
      },
    ],
  },
  {
    id: "khuc-hung-ca-dai-doi-915",
    slug: "khuc-hung-ca-dai-doi-915",
    number: 4,
    shortTitle: "Khúc Hùng Ca Ga Lưu Xá & Đại Đội 915",
    title: "Khúc hùng ca Ga Lưu Xá & Đại đội 915 Thanh niên xung phong",
    subtitle: "60 cánh hoa bất tử đêm Noel 1972 – Biểu tượng sáng ngời của chủ nghĩa anh hùng cách mạng",
    timeframe: "06/1972 – 12/1972",
    badge: "Khúc Tráng Ca Bất Tử",
    heroImage: "/images/topics/04-khuc-hung-ca-dai-doi-915.jpg",
    summary:
      "Đêm 24/12/1972, trong khi đang khẩn trương giải tỏa hàng vạn tấn hàng viện trợ quân sự tại ga Lưu Xá để chi viện cho đồng bào miền Nam, 60 cán bộ, đội viên Đại đội 915 TNXP đã anh dũng hy sinh dưới làn bom rải thảm của máy bay B-52 Mỹ.",
    keyStats: [
      {
        label: "Liệt sĩ TNXP hy sinh",
        value: "60 đồng chí",
        detail: "Hầu hết là nữ thanh niên tuổi đời mười tám, đôi mươi ngát hương trinh",
      },
      {
        label: "Đêm Noel lịch sử",
        value: "24/12/1972",
        detail: "Khắc sâu khúc tráng ca đau thương nhưng ngời sáng khí phách anh hùng",
      },
      {
        label: "Địa chỉ đỏ quốc gia",
        value: "Khu DTLS QG",
        detail: "Khu di tích lịch sử Quốc gia Đại đội 915 tại Gia Sàng, TP. Thái Nguyên",
      },
    ],
    sections: [
      {
        title: "1. Bối cảnh 'Cảng cạn Lưu Xá' – Yết hầu trung chuyển của cả nước",
        content: [
          "Từ tháng 6 đến tháng 12 năm 1972, đế quốc Mỹ điên cuồng thả thủy lôi và bom từ trường phong tỏa toàn bộ các cảng biển miền Bắc, đặc biệt là cảng Hải Phòng, nhằm cắt đứt nguồn viện trợ quốc tế của Liên Xô, Trung Quốc và các nước XHCN anh em.",
          "Trong tình thế ngàn cân treo sợi tóc, tuyến đường sắt Kép - Lưu Xá nối liền biên giới phía Bắc với Thái Nguyên trở thành tuyến vận tải huyết mạch duy nhất. Hàng chục vạn tấn lương thực, vũ khí, khí tài, xăng dầu dồn về tập kết tại ga Lưu Xá.",
          "Ga Lưu Xá trở thành một 'cảng cạn' chiến lược lớn nhất miền Bắc lúc bấy giờ. Nơi đây như một lòng chảo rực lửa, luôn nằm trong tầm ngắm ném bom hủy diệt hàng ngày của không quân Mỹ.",
        ],
        quote: {
          text: "Tất cả vì miền Nam ruột thịt! Phải giải tỏa bằng hết số hàng tồn đọng tại ga Lưu Xá, không để một bao gạo, một viên đạn bị bom giặc phá hủy!",
          author: "Mệnh lệnh của Tỉnh ủy và Ban Chỉ huy TNXP Bắc Thái (12/1972)",
        },
      },
      {
        title: "2. Đêm 24/12/1972 bi tráng và sự hy sinh anh dũng của 60 liệt sĩ",
        content: [
          "Trước nguy cơ không quân Mỹ tiếp tục đánh phá ga Lưu Xá làm hư hại kho hàng chi viện, sáng ngày 24/12/1972, 66 cán bộ, đội viên Đại đội 915 (thuộc Đội 91 TNXP Bắc Thái) nhận lệnh hành quân cấp tốc về ga Lưu Xá làm nhiệm vụ giải tỏa hàng hóa tồn đọng.",
          "Sau cả một ngày làm việc cật lực dưới trời mưa rét buốt, các anh chị đã bốc xếp, giải tỏa được hàng ngàn tấn hàng hóa quân sự an toàn vào nơi sơ tán.",
          "Chập tối 24/12, khi toàn đội vừa tạm nghỉ tay ăn bữa cơm chiều đạm bạc và vào hầm trú ẩn tại khu vực bản Gia Sàng, giặc Mỹ bất ngờ điều nhiều tốp B-52 trút hàng trăm quả bom rải thảm xuống toàn khu vực ga Lưu Xá và các hầm trú ẩn.",
          "Bom đạn bạo tàn đã cướp đi sinh mạng của 60 cán bộ, đội viên TNXP Đại đội 915 và 2 thủ kho ngành lương thực. Đa số các chị, các anh tuổi đời còn rất trẻ (từ 16 đến 22 tuổi), mang theo bao ước mơ, hoài bão thanh xuân hóa thân vào lòng đất mẹ.",
        ],
        highlights: [
          "Nhiệm vụ: Giải tỏa khẩn cấp hàng ngàn tấn vũ khí, lương thực chi viện tại Ga Lưu Xá.",
          "Thời gian hy sinh: Khoảng 19 giờ 45 phút đêm 24/12/1972 (đêm Noel).",
          "Số lượng hy sinh: 60 cán bộ, chiến sĩ TNXP Đại đội 915 (trong đó có 41 nữ, 19 nam).",
          "Tuổi đời bình quân: Chỉ từ 17 đến 22 tuổi, nhiều người chuẩn bị đón ngày cưới hoặc nhập ngũ.",
        ],
      },
      {
        title: "3. Tượng đài bất tử trong lòng dân tộc và địa chỉ đỏ hôm nay",
        content: [
          "Sự hy sinh anh dũng của Đại đội 915 là một trong những tổn thất to lớn nhất của lực lượng Thanh niên xung phong trong toàn bộ cuộc kháng chiến chống Mỹ cứu nước.",
          "Sự kiện bi tráng này là biểu tượng rực rỡ của chủ nghĩa anh hùng cách mạng, của tinh thần 'Quyết tử cho Tổ quốc quyết sinh', thể hiện khí phách kiên trung của tuổi trẻ Thái Nguyên.",
          "Ngày 28/4/2009, Đại đội 915 đã được Chủ tịch nước truy tặng danh hiệu cao quý 'Anh hùng Lực lượng Vũ trang Nhân dân'.",
          "Ngày nay, Khu di tích lịch sử quốc gia Đại đội 915 tại phường Gia Sàng, TP. Thái Nguyên đã được tôn tạo khang trang, trở thành 'địa chỉ đỏ' thiêng liêng để các thế hệ người Việt Nam đến dâng hương, tưởng nhớ và hun đúc lòng yêu nước nồng nàn.",
        ],
      },
    ],
  },
];

export const MARTYRS_915_SAMPLE: Martyr915[] = [
  { order: 1, name: "Nguyễn Thế Cường", birthYear: 1951, gender: "Nam", hometown: "Đồng Hỷ, Thái Nguyên", position: "Đại đội phó", sacrificeDate: "24/12/1972" },
  { order: 2, name: "Trần Thị Răm", birthYear: 1953, gender: "Nữ", hometown: "Bạch Thông, Bắc Kạn", position: "Đội viên", sacrificeDate: "24/12/1972" },
  { order: 3, name: "Hoàng Thị Cát", birthYear: 1954, gender: "Nữ", hometown: "Phú Lương, Thái Nguyên", position: "Đội viên", sacrificeDate: "24/12/1972" },
  { order: 4, name: "Nguyễn Thị Doan", birthYear: 1952, gender: "Nữ", hometown: "Đại Từ, Thái Nguyên", position: "Tiểu đội trưởng", sacrificeDate: "24/12/1972" },
  { order: 5, name: "Lương Thị Hội", birthYear: 1955, gender: "Nữ", hometown: "Chợ Đồn, Bắc Kạn", position: "Đội viên", sacrificeDate: "24/12/1972" },
  { order: 6, name: "Dương Thị Hồng", birthYear: 1953, gender: "Nữ", hometown: "Phổ Yên, Thái Nguyên", position: "Đội viên", sacrificeDate: "24/12/1972" },
  { order: 7, name: "Triệu Thị Lầu", birthYear: 1954, gender: "Nữ", hometown: "Na Rì, Bắc Kạn", position: "Đội viên", sacrificeDate: "24/12/1972" },
  { order: 8, name: "Ngô Thị Miên", birthYear: 1953, gender: "Nữ", hometown: "Định Hóa, Thái Nguyên", position: "Tiểu đội phó", sacrificeDate: "24/12/1972" },
  { order: 9, name: "Lê Thị Nga", birthYear: 1954, gender: "Nữ", hometown: "TP. Thái Nguyên", position: "Đội viên", sacrificeDate: "24/12/1972" },
  { order: 10, name: "Nông Thị Nhẫn", birthYear: 1952, gender: "Nữ", hometown: "Ngân Sơn, Bắc Kạn", position: "Đội viên", sacrificeDate: "24/12/1972" },
  { order: 11, name: "Nguyễn Thị Nhan", birthYear: 1954, gender: "Nữ", hometown: "Võ Nhai, Thái Nguyên", position: "Đội viên", sacrificeDate: "24/12/1972" },
  { order: 12, name: "Bùi Thị Ninh", birthYear: 1953, gender: "Nữ", hometown: "Phú Bình, Thái Nguyên", position: "Đội viên", sacrificeDate: "24/12/1972" },
  { order: 13, name: "Trần Văn Giao", birthYear: 1952, gender: "Nam", hometown: "Đồng Hỷ, Thái Nguyên", position: "Đội viên", sacrificeDate: "24/12/1972" },
  { order: 14, name: "Hoàng Văn Hùng", birthYear: 1954, gender: "Nam", hometown: "Ba Bể, Bắc Kạn", position: "Đội viên", sacrificeDate: "24/12/1972" },
  { order: 15, name: "Ma Văn Thắng", birthYear: 1953, gender: "Nam", hometown: "Định Hóa, Thái Nguyên", position: "Đội viên", sacrificeDate: "24/12/1972" },
];

export const HISTORICAL_EVENTS: HistoricalEvent[] = [
  {
    year: "1965",
    date: "01/07/1965",
    title: "Hợp nhất tỉnh Thái Nguyên và Bắc Kạn",
    location: "Khu tự trị Việt Bắc",
    description: "Nghị quyết Quốc hội hợp nhất thành tỉnh Bắc Thái; TP. Thái Nguyên là tỉnh lỵ và trung tâm công nghiệp – quân sự của Việt Bắc.",
    category: "diplomatic",
    featured: true,
  },
  {
    year: "1965",
    date: "17/10/1965",
    title: "Trận đánh bảo vệ Cầu Gia Bẩy",
    location: "Cầu Gia Bẩy, Đồi Két Nước",
    description: "Không quân Mỹ xuất kích 29 lần đánh phá; Đội tự vệ Hoàng Văn Thụ và Trung đoàn 210 kiên cường bám trận địa nổ súng đánh trả.",
    category: "military",
    featured: true,
  },
  {
    year: "1966",
    date: "29/04/1966",
    title: "Bắn rơi chiếc máy bay Mỹ thứ 1.000 trên miền Bắc",
    location: "Đồi Tiến Lập / Xã Tức Tranh (Phú Lương)",
    description: "Đại đội 101 Trung đoàn 210 bắn hạ tiêm kích F-105 rơi tại xã Tức Tranh, lập chiến công vẻ vang làm nức lòng cả nước.",
    category: "military",
    featured: true,
  },
  {
    year: "1966",
    date: "01/08/1966",
    title: "Dân quân Hà Thượng bắn rơi máy bay phản lực bằng súng bộ binh",
    location: "Đồi 100, Xã Hà Thượng (Đại Từ)",
    description: "6 chiến sĩ dân quân chỉ dùng 18 viên đạn súng máy, súng trường bắn rơi máy bay trinh sát siêu thanh RF-4C của Mỹ.",
    category: "military",
  },
  {
    year: "1968",
    date: "1965 - 1968",
    title: "Hoàn thành 210.400m giao thông hào & 79.600 hầm trú ẩn",
    location: "Toàn tỉnh Bắc Thái",
    description: "Xây dựng 146 trận địa pháo và mạng lưới công sự ngầm khổng lồ, bảo vệ toàn vẹn tính mạng nhân dân và dây chuyền sản xuất thép.",
    category: "economic",
  },
  {
    year: "1972",
    date: "Tháng 6 - 12/1972",
    title: "Ga Lưu Xá trở thành 'Cảng bốc xếp cạn' lớn nhất miền Bắc",
    location: "Ga Lưu Xá, TP. Thái Nguyên",
    description: "Tiếp nhận và giải tỏa hàng chục vạn tấn vũ khí, lương thực từ các nước anh em chi viện cho chiến trường miền Nam.",
    category: "economic",
  },
  {
    year: "1972",
    date: "Đêm 24/12/1972",
    title: "Khúc bi tráng Đại đội 915 TNXP hy sinh tại Ga Lưu Xá",
    location: "Ga Lưu Xá & Bản Gia Sàng",
    description: "60 cán bộ đội viên TNXP Đại đội 915 anh dũng hy sinh khi đang bốc xếp hàng nghìn tấn lương thực, vũ khí chi viện trong đợt rải thảm B-52.",
    category: "memorial",
    featured: true,
  },
  {
    year: "1972",
    date: "Đêm 24 & 26/12/1972",
    title: "Hạ gục 2 'Pháo đài bay' B-52 trong chiến dịch Điện Biên Phủ trên không",
    location: "Trận địa Quang Vinh, TP. Thái Nguyên",
    description: "Đại đội 5 (Trung đoàn Pháo cao xạ 256) xuất sắc bắn rơi 2 máy bay chiến lược B-52 của không quân Mỹ.",
    category: "military",
    featured: true,
  },
];

export const MEDIA_GALLERY: MediaItem[] = [
  {
    id: "media-1",
    title: "Trận địa pháo cao xạ Trung đoàn 210 bảo vệ vùng trời gang thép",
    category: "image",
    thumbnail: "/images/relics/phao-cao-xa.jpg",
    url: "/images/relics/phao-cao-xa.jpg",
    year: "1966",
    description: "Các chiến sĩ pháo cao xạ Trung đoàn 210 kiên cường bám trận địa đồi Tiến Lập, bắn rơi chiếc máy bay thứ 1.000 của Mỹ trên miền Bắc.",
    source: "Tư liệu Bảo tàng Lực lượng Vũ trang Quân khu 1",
  },
  {
    id: "media-2",
    title: "Cầu Gia Bẩy kiên cường trong khói lửa bom đạn năm 1965",
    category: "image",
    thumbnail: "/images/relics/cau-gia-bay.jpg",
    url: "/images/relics/cau-gia-bay.jpg",
    year: "1965",
    description: "Cầu Gia Bẩy - cây cầu huyết mạch bắc qua sông Cầu nối thành phố Thái Nguyên với chiến khu Việt Bắc sau trận ném bom ngày 17/10/1965.",
    source: "Tư liệu Ban Tuyên giáo Tỉnh ủy Thái Nguyên",
  },
  {
    id: "media-3",
    title: "Ga Lưu Xá - 'Cảng cạn' huyết mạch mùa đông 1972",
    category: "image",
    thumbnail: "/images/relics/ga-luu-xa.jpg",
    url: "/images/relics/ga-luu-xa.jpg",
    year: "1972",
    description: "Hình ảnh các đoàn tàu hỏa vận chuyển hàng hóa, đạn dược quân sự chi viện tập kết tại ga Lưu Xá trước đợt tập kích B-52.",
    source: "Tư liệu Lịch sử Đường sắt Việt Nam",
  },
  {
    id: "media-4",
    title: "Di vật chiếc ba lô, lược chải tóc và sổ tay của liệt sĩ TNXP 915",
    category: "relic",
    thumbnail: "/images/relics/di-vat-915.jpg",
    url: "/images/relics/di-vat-915.jpg",
    year: "1972",
    description: "Những kỷ vật đơn sơ của các nữ TNXP Đại đội 915 hy sinh đêm 24/12/1972 tại Ga Lưu Xá, hiện lưu giữ trang trọng tại Khu di tích Quốc gia.",
    source: "Khu di tích Lịch sử Quốc gia Đại đội 915 (Gia Sàng)",
  },
  {
    id: "media-5",
    title: "Mảnh xác máy bay B-52 bị Trung đoàn 256 bắn rơi đêm 24/12/1972",
    category: "relic",
    thumbnail: "/images/relics/xac-b52.jpg",
    url: "/images/relics/xac-b52.jpg",
    year: "1972",
    description: "Mảnh kim loại từ siêu pháo đài bay B-52 bị Đại đội 5 (Trung đoàn 256) vít cổ trên bầu trời Thái Nguyên.",
    source: "Bảo tàng Lịch sử Quân sự Việt Nam",
  },
  {
    id: "media-6",
    title: "Phim tài liệu: Bản hùng ca Đại đội 915 bất tử",
    category: "video",
    thumbnail: "https://img.youtube.com/vi/XVh1vdnfSQI/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=XVh1vdnfSQI",
    youtubeId: "XVh1vdnfSQI",
    year: "1972 - 2022",
    description: "Thước phim tư liệu quý giá ghi lại lời kể của các nhân chứng lịch sử và sự hy sinh anh dũng của 60 cán bộ, đội viên Đại đội 915 TNXP đêm 24/12/1972.",
    source: "Đài Phát thanh - Truyền hình Thái Nguyên (TNTV)",
  },
];


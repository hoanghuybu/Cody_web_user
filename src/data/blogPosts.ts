// Images for post #1 are delivered via Cloudinary with format auto-conversion

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  fullContent: string[];
  category: 'environment' | 'lifestyle' | 'cuisine' | 'culture';
  author: string;
  date: string;
  image: string;
  images?: string[];
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'CODY | Sharing Sweet Gratitude with the Working Hands of Ben Tre',
    excerpt:
      'On International Workers’ Day (May 1st), CODY chose to honor the people who shape the flavor of this land — sanitation workers, factory workers, and street vendors in Ben Tre. ',
    content:
      'On International Workers’ Day, instead of promotions, CODY returned to the people who bring this land to life, sharing small boxes of coconut candy with the note: “Thank you for adding sweetness to life.””',
    fullContent: [
      '💚 CODY | Sharing Sweet Gratitude with the Working Hands of Ben Tre',
      '📸 Insert image: Article 1/5',
      'On International Workers’ Day (May 1st), instead of running sales promotions or marketing campaigns, CODY chose a simpler, more heartfelt path — returning to the people who bring the true flavor of this land to life: the street vendors, factory workers, and sanitation workers of Ben Tre.',
      'They are the ones who quietly keep the world moving — with their smiles and calloused hands. 🌿',
      'From early morning, the CODY team together with Founder Le Bao Long walked through the streets of Ben Tre, handing out small boxes of coconut candy along with a note that read:',
      '“Thank you for adding sweetness to life.”',
      'It wasn’t a grand gift — but it carried the sincere gratitude of a brand born from the land of coconuts, hoping to share appreciation with those who labor every day.',
      '“At CODY, we’ve always believed:',
      ' Every piece of coconut candy carries not only the sweetness of Ben Tre,',
      ' but also the sweetness of humanity.” 💚',
      '🎥 Coming soon, CODY will release a short video capturing the smiles, stories, and heartfelt moments from this special day — a tribute to the simple beauty of everyday work.',
      '---------------------------------------------------------------------------------------------------------',
      '💚 CODY | Gửi vị ngọt tri ân đến những đôi tay lao động Bến Tre',
      'Ngày Quốc tế Lao động 1/5, thay vì khuyến mãi hay chiến dịch quảng bá, CODY chọn cách quay về với những con người làm nên hương vị của đất này – những cô chú lao công, công nhân, người bán hàng rong…',
      'Họ là những người vẫn âm thầm giữ cho cuộc sống vận hành, bằng nụ cười và đôi tay chai sạn của mình. 🌿',
      'Từ sáng sớm, team CODY cùng Long – Founder của thương hiệu đã đi qua từng con đường ở Bến Tre, gửi tận tay những hộp kẹo dừa nhỏ xinh cùng lời nhắn:',
      '“Cảm ơn cô chú vì đã làm nên vị ngọt của đời sống.”',
      'Không phải món quà lớn, nhưng là tấm lòng chân thành từ một thương hiệu sinh ra trên mảnh đất dừa, mong được lan tỏa sự biết ơn đến những người đang lao động mỗi ngày.',
      '“CODY luôn tin rằng:',
      ' Mỗi viên kẹo dừa không chỉ mang vị ngọt của Bến Tre,',
      ' mà còn là vị ngọt của tình người.” 💚',
      '🎥 Sắp tới, CODY sẽ chia sẻ video hành trình nhỏ này – ghi lại nụ cười, câu chuyện và những khoảnh khắc thật nhất trong ngày đặc biệt ấy.',
    ],
    category: 'culture',
    author: 'CODY Team',
    date: '2024-05-01',
    image: 'https://res.cloudinary.com/dutzdkelx/image/upload/f_auto,q_auto,w_800/v1761551423/file.heic',
  images: ['https://res.cloudinary.com/dutzdkelx/image/upload/f_auto,q_auto,w_800/v1761551423/file.heic', 'https://res.cloudinary.com/dutzdkelx/image/upload/f_auto,q_auto,w_800/v1761556705/file.heic', 'https://res.cloudinary.com/dutzdkelx/image/upload/f_auto,q_auto,w_800/v1761556815/file.heic'],
    readTime: '3 phút đọc',
  },
  {
    id: 2,
    title: '🎓 CODY SCHOLARSHIP BOX — Spreading Love, Supporting the Journey of Learning',
    excerpt:
      'On the journey of “bringing the sweetness of Ben Tre to every corner of Vietnam,” CODY goes beyond sharing coconut candy — we share faith, hope, and learning opportunities. — Trên hành trình “mang vị ngọt từ Bến Tre đến mọi miền”, CODY lan tỏa niềm tin, hi vọng và cơ hội học tập cho các em nhỏ.',
    content:
      'Recently, the CODY Scholarship Box closed with many touching moments as we awarded scholarships to five schools in Ba Ria – Vung Tau. — Vừa qua, dự án CODY Scholarship Box khép lại đầy cảm xúc khi chúng tôi trao học bổng đến 5 trường tại Bà Rịa – Vũng Tàu.',
    fullContent: [
      '🎓 CODY SCHOLARSHIP BOX — Spreading Love, Supporting the Journey of Learning',
      '📸 Insert images: Scholarship Project',
      'On the journey of “bringing the sweetness of Ben Tre to every corner of Vietnam,” CODY’s mission goes beyond sharing the flavor of traditional coconut candy — it’s about sharing faith, hope, and opportunities for education with children striving each day to build a brighter future. 🌱',
      'Recently, the CODY Scholarship Box project came to a heartfelt close, leaving behind countless touching moments.',
      'Our team had the honor of visiting and awarding scholarships to five schools across the Ba Ria – Vung Tau region:',
      '🏫 Phuoc Hoi Primary School',
      '🏫 Phuoc Hai 1 Primary School',
      '🏫 Dat Do Secondary School',
      '🏫 Vo Thi Sau High School',
      '🏫 Long Hai – Phuoc Tinh High School',
      'Each school received a scholarship package worth 8,500,000 VND, bringing the total scholarship fund to 42,500,000 VND — a sincere gift from CODY and Founder Le Bao Long, hoping to inspire students to keep pursuing their dreams with passion and perseverance.',
      '“A scholarship is not just a reward — it’s a reminder that every effort is worth believing in. And within every CODY candy lies the sweetness of sharing and hope.” 💚',
      'CODY extends our heartfelt thanks to all the teachers, students, and supporters who have accompanied us, making this journey of kindness more complete and meaningful.',
      '📦 CODY Scholarship Box — Sharing Sweetness, Planting Hope!',
      '---------------------------------------------------------------------------------------------------------',
      '🎓 CODY SCHOLARSHIP BOX — Lan tỏa yêu thương, tiếp sức hành trình học tập',
      'Chèn hình ảnh: Bài học bổng',
      'Trên hành trình “mang vị ngọt từ Bến Tre đến mọi miền”, CODY không chỉ mong muốn lan tỏa hương vị kẹo dừa Việt, mà còn muốn trao đi niềm tin và cơ hội học tập cho những em nhỏ đang nỗ lực từng ngày. 🌱',
      'Vừa qua, dự án CODY Scholarship Box đã chính thức khép lại với thật nhiều cảm xúc.',
      'Chúng tôi đã có dịp đến thăm và trao học bổng cho 5 trường học tại khu vực Bà Rịa – Vũng Tàu:',
      '🏫 Trường Tiểu học Phước Hội',
      '🏫 Trường Tiểu học Phước Hải 1',
      '🏫 Trường THCS Đất Đỏ',
      '🏫 Trường THPT Võ Thị Sáu',
      '🏫 Trường THPT Long Hải – Phước Tỉnh',
      'Mỗi trường nhận suất học bổng trị giá 8.500.000 VNĐ, tổng giá trị quỹ học bổng lên đến 42.500.000 VNĐ — như một lời gửi gắm chân thành từ CODY và Founder Lê Bảo Long, mong rằng các em học sinh sẽ có thêm động lực để theo đuổi ước mơ của mình.',
      '“Học bổng không chỉ là phần thưởng, mà còn là niềm tin rằng mọi nỗ lực đều đáng trân trọng. Và trong từng viên kẹo CODY, luôn có vị ngọt của sẻ chia và hi vọng.” 💚',
      'CODY xin cảm ơn các thầy cô, các em học sinh, và những người bạn đã đồng hành, giúp chúng tôi lan tỏa hành trình này trở nên trọn vẹn hơn.',
      '📦 CODY Scholarship Box — Trao vị ngọt, gieo hi vọng!',
    ],
    category: 'culture',
    author: 'CODY Team',
    date: '2024-03-15',
    image:
      'https://res.cloudinary.com/dutzdkelx/image/upload/f_auto,q_auto,w_800/v1761560129/file.heic',
    images: [
      'https://res.cloudinary.com/dutzdkelx/image/upload/f_auto,q_auto,w_800/v1761560063/file.jpg',
      'https://res.cloudinary.com/dutzdkelx/image/upload/f_auto,q_auto,w_800/v1761560181/file.jpg',
      'https://res.cloudinary.com/dutzdkelx/image/upload/f_auto,q_auto,w_800/v1761560237/file.jpg',
    ],
    readTime: '4 phút đọc',
  },
  {
    id: 3,
    title: '🌿 CODY tại Trường Tiểu học Đốc Bình Kiều 1 — Trao vị ngọt, gửi yêu thương',
    excerpt:
      'Trong hành trình lan tỏa tinh thần "ngọt lành từ thiên nhiên – sẻ chia từ trái tim", CODY đã có dịp dừng chân tại Trường Tiểu học Đốc Bình Kiều 1 (Bến Tre) — nơi những nụ cười trong trẻo của các em nhỏ đã khiến chuyến đi trở nên ý nghĩa hơn bao giờ hết.',
    content:
      'Trong hành trình lan tỏa tinh thần "ngọt lành từ thiên nhiên – sẻ chia từ trái tim", CODY đã có dịp dừng chân tại Trường Tiểu học Đốc Bình Kiều 1 (Bến Tre) — nơi những nụ cười trong trẻo của các em nhỏ đã khiến chuyến đi trở nên ý nghĩa hơn bao giờ hết. 🍬',
    fullContent: [
      'Trong hành trình lan tỏa tinh thần "ngọt lành từ thiên nhiên – sẻ chia từ trái tim", CODY đã có dịp dừng chân tại Trường Tiểu học Đốc Bình Kiều 1 (Bến Tre) — nơi những nụ cười trong trẻo của các em nhỏ đã khiến chuyến đi trở nên ý nghĩa hơn bao giờ hết. 🍬',
      '🎯 Mục tiêu: Mang vị ngọt – Gieo nhận thức xanh',
      'Không chỉ đơn thuần là hoạt động thiện nguyện, CODY mong muốn mang đến cho các em học sinh một ngày học mà chơi – chơi mà học, qua những trải nghiệm gần gũi và đầy cảm hứng về môi trường, tái chế, và lối sống xanh.',
      'Trong chương trình, đội ngũ CODY cùng các tình nguyện viên đã:',
      '🌱 Trao tặng hơn 200 phần quà gồm kẹo dừa xanh, sổ tay và đồ dùng học tập.',
      '🎨 Tổ chức workshop đất sét tái chế, nơi các em được tự tay tạo hình những món đồ nhỏ từ rác thải nhựa — vừa sáng tạo, vừa ý nghĩa.',
      '♻️ Cùng nhau chơi trò chơi phân loại rác, giúp các em hiểu rõ hơn về cách bảo vệ môi trường ngay từ những hành động nhỏ.',
      '🍬 Và đặc biệt, mỗi em học sinh đều nhận được những viên kẹo dừa CODY – món quà ngọt ngào từ chính quê hương mình.',
      '💬 Chia sẻ từ Founder Lê Bảo Long',
      '"Tôi tin rằng những bài học về yêu thương và bảo vệ môi trường cần được gieo từ sớm. Khi thấy các em vui vẻ cười, say sưa nhào nặn đất sét, tôi cảm nhận được rằng – những hạt mầm xanh đã bắt đầu nảy nở." 🌿',
      '💚 Lan tỏa vị ngọt bền lâu',
      'Chuyến đi khép lại với thật nhiều khoảnh khắc đáng nhớ — những ánh mắt rạng rỡ, những bàn tay nhỏ xíu cầm viên kẹo CODY và nụ cười ngọt ngào như chính hương vị quê hương Bến Tre.',
      'CODY tin rằng mỗi hành trình trao đi yêu thương, dù nhỏ, đều là bước khởi đầu cho một tương lai bền vững hơn — nơi mọi người đều có thể cùng nhau sống xanh, sống tốt, và sống có ý nghĩa.',
      '📦 CODY – Không chỉ là kẹo, mà là câu chuyện của sẻ chia.',
    ],
    category: 'culture',
    author: 'CODY Team',
    date: '2024-06-15',
    image:
      'https://res.cloudinary.com/dutzdkelx/image/upload/f_auto,q_auto,w_800/v1761560237/file.jpg',
    images: [
      'https://res.cloudinary.com/dutzdkelx/image/upload/f_auto,q_auto,w_800/v1761560237/file.jpg',
      'https://res.cloudinary.com/dutzdkelx/image/upload/f_auto,q_auto,w_800/v1761560237/file.jpg',
      'https://res.cloudinary.com/dutzdkelx/image/upload/f_auto,q_auto,w_800/v1761560237/file.jpg',

    ],
    readTime: '5 phút đọc',
  },
  {
    id: 4,
    title: '🌿 CODY tại Trường Nguyễn Văn Đồn — Hành trình gieo hạt xanh trong tim nhỏ',
    excerpt:
      'Sau những bước chân đầu tiên tại Đốc Bình Kiều, hành trình "CODY – Trao vị ngọt, gửi yêu thương" tiếp tục đến với Trường Tiểu học – THCS Nguyễn Văn Đồn. Một buổi sáng đầy nắng, tiếng cười vang khắp sân trường, nơi những viên kẹo dừa ngọt lành hòa cùng niềm vui của các em học sinh.',
    content:
      'Sau những bước chân đầu tiên tại Đốc Bình Kiều, hành trình "CODY – Trao vị ngọt, gửi yêu thương" tiếp tục đến với Trường Tiểu học – THCS Nguyễn Văn Đồn. Một buổi sáng đầy nắng, tiếng cười vang khắp sân trường, nơi những viên kẹo dừa ngọt lành hòa cùng niềm vui của các em học sinh. 🍬',
    fullContent: [
      'Sau những bước chân đầu tiên tại Đốc Bình Kiều, hành trình "CODY – Trao vị ngọt, gửi yêu thương" tiếp tục đến với Trường Tiểu học – THCS Nguyễn Văn Đồn. Một buổi sáng đầy nắng, tiếng cười vang khắp sân trường, nơi những viên kẹo dừa ngọt lành hòa cùng niềm vui của các em học sinh. 🍬',
      '💚 Không chỉ là kẹo – là câu chuyện của sẻ chia',
      'Đối với CODY, mỗi chuyến đi đều mang trong mình một sứ mệnh: mang vị ngọt từ quê hương Bến Tre đến gần hơn với trái tim con người, đồng thời khơi dậy trong thế hệ trẻ tình yêu với môi trường và ý thức sống xanh.',
      'Tại Trường Nguyễn Văn Đồn, CODY cùng các tình nguyện viên đã mang đến:',
      '🌱 Workshop "Đất sét tái sinh" – nơi các em tự tay tạo hình những món đồ nhỏ xinh từ rác thải nhựa, học cách biến "rác" thành "tác phẩm".',
      '♻️ Trò chơi phân loại rác vui nhộn, giúp các em nhận biết cách xử lý và tái chế đúng cách.',
      '🎁 Hơn 200 phần quà gồm kẹo dừa, sổ tay học tập và dụng cụ học sinh được trao tận tay.',
      '🍈 Và đặc biệt là giây phút các em cùng nhau thưởng thức những viên kẹo dừa CODY – sản phẩm từ chính quê hương của mình.',
      '💬 Chia sẻ từ Founder Lê Bảo Long',
      '"Tôi luôn tin rằng, những điều nhỏ bé nhất có thể làm nên thay đổi lớn lao. Khi các em học sinh cười và hô to khẩu hiệu \'Sống xanh cùng CODY\', tôi biết rằng thông điệp của chúng tôi đã chạm đến trái tim các em." 🌍',
      '✨ Kết nối – Lan tỏa – Bền vững',
      'Buổi thiện nguyện khép lại bằng những ánh mắt trong veo và những lời cảm ơn giản dị. Nhưng với CODY, đó không phải là kết thúc – mà là khởi đầu cho một hành trình dài: hành trình kết nối con người – gìn giữ môi trường – lan tỏa yêu thương.',
      'Mỗi viên kẹo dừa CODY không chỉ mang hương vị quê hương, mà còn là thông điệp: "Ngọt ngào hôm nay, xanh lành cho mai sau." 🌴',
      '📦 CODY – Sweet from the heart, green from the soul.',
    ],
    category: 'culture',
    author: 'CODY Team',
    date: '2024-07-20',
    image:
      'https://res.cloudinary.com/dutzdkelx/image/upload/f_auto,q_auto,w_800/v1761560237/file.jpg',
    images: [
      'https://res.cloudinary.com/dutzdkelx/image/upload/f_auto,q_auto,w_800/v1761560237/file.jpg',
      'https://res.cloudinary.com/dutzdkelx/image/upload/f_auto,q_auto,w_800/v1761560237/file.jpg',
    ],
    readTime: '5 phút đọc',
  },
  {
    id: 5,
    title: '🌿 "Ngọt lành – Sống xanh": Hành trình của người trẻ Bến Tre và thương hiệu CODY',
    excerpt:
      'Bến Tre – vùng đất của dừa, của nắng, và của những con người mộc mạc. Từ những hàng dừa nghiêng mình soi bóng xuống dòng sông Hàm Luông, một câu chuyện nhỏ bắt đầu – câu chuyện của CODY, thương hiệu kẹo dừa xanh do một nhóm bạn trẻ khởi xướng.',
    content:
      'Bến Tre – vùng đất của dừa, của nắng, và của những con người mộc mạc. Từ những hàng dừa nghiêng mình soi bóng xuống dòng sông Hàm Luông, một câu chuyện nhỏ bắt đầu – câu chuyện của CODY, thương hiệu kẹo dừa xanh do một nhóm bạn trẻ khởi xướng, mang trong mình mong muốn gìn giữ vị ngọt quê hương theo một cách thật mới mẻ và bền vững.',
    fullContent: [
      'Bến Tre – vùng đất của dừa, của nắng, và của những con người mộc mạc. Từ những hàng dừa nghiêng mình soi bóng xuống dòng sông Hàm Luông, một câu chuyện nhỏ bắt đầu – câu chuyện của CODY, thương hiệu kẹo dừa xanh do một nhóm bạn trẻ khởi xướng, mang trong mình mong muốn gìn giữ vị ngọt quê hương theo một cách thật mới mẻ và bền vững.',
      '🧩 Khi một ý tưởng sinh viên trở thành hành trình thật',
      'CODY khởi đầu chỉ là một dự án sinh viên – nơi những người trẻ yêu miền Tây muốn thử sức với tinh thần khởi nghiệp. Founder Lê Bảo Long, sinh ra ở Bến Tre, luôn mang trong mình câu hỏi:',
      '"Làm sao để viên kẹo dừa – biểu tượng quê hương – không chỉ là món quà ngọt, mà còn là biểu tượng của một lối sống xanh?"',
      'Câu hỏi ấy trở thành điểm khởi đầu cho hành trình của CODY. Thay vì chỉ sản xuất kẹo dừa theo cách truyền thống, CODY chọn hướng đi khác: xây dựng thương hiệu xanh, tôn trọng con người và thiên nhiên.',
      '💡 "Ngọt lành" – không chỉ là vị ngọt của kẹo',
      'CODY tin rằng vị ngọt thật sự không nằm trong đường, mà trong cách con người trao đi yêu thương. Từ mỗi viên kẹo nhỏ được gói cẩn thận trong bao bì thân thiện, CODY muốn gửi gắm tình cảm của người làm ra sản phẩm – những cô chú thợ Bến Tre, những bạn trẻ đầy nhiệt huyết, và những người tin rằng quê hương mình xứng đáng được kể bằng một câu chuyện đẹp.',
      '🌱 CODY và ước mơ "ngọt lành" lan tỏa',
      'Từ những ngày đầu tiên đến nay, CODY đã đồng hành cùng hàng trăm học sinh, thầy cô và người dân Bến Tre qua các chương trình thiện nguyện, học bổng và workshop tái chế. Không chỉ mang kẹo dừa đi xa hơn, CODY muốn đưa tinh thần sống xanh, tử tế đến gần hơn với mỗi người.',
      'Một viên kẹo dừa có thể nhỏ bé, nhưng nếu đủ nhiều bàn tay cùng sẻ chia, nó sẽ trở thành hương vị ngọt lành của cả một cộng đồng.',
      '👉 CODY – Ngọt lành từ Bến Tre, xanh từ trái tim người trẻ.',
    ],
    category: 'culture',
    author: 'CODY Team',
    date: '2024-08-10',
    image:
      'https://res.cloudinary.com/dutzdkelx/image/upload/f_auto,q_auto,w_800/v1761560237/file.jpg',
    images: [
      'https://res.cloudinary.com/dutzdkelx/image/upload/f_auto,q_auto,w_800/v1761560237/file.jpg',
      'https://res.cloudinary.com/dutzdkelx/image/upload/f_auto,q_auto,w_800/v1761560237/file.jpg',
      'https://res.cloudinary.com/dutzdkelx/image/upload/f_auto,q_auto,w_800/v1761394506/file.png',      'https://res.cloudinary.com/dutzdkelx/image/upload/f_auto,q_auto,w_800/v1761560237/file.jpg',

    ],
    readTime: '6 phút đọc',
  },
];

export const categories = [
  { id: 'all', name: 'Tất cả' },
  { id: 'environment', name: 'Môi trường' },
  { id: 'lifestyle', name: 'Lối sống xanh' },
  { id: 'cuisine', name: 'Ẩm thực' },
  { id: 'culture', name: 'Văn hóa' },
];

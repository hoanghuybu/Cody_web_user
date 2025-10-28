const blog6Img1 = new URL('../assets/images/blogs-6/Heart-Shaped Polaroid Black Photo Collage .png', import.meta.url).href;
const blog7Img1 = new URL('../assets/images/blogs-7/335293299-868833150850529-8754795172613805743-n-1719389789.jpg', import.meta.url).href;
const blog7Img2 = new URL('../assets/images/blogs-7/hkk-6477-jpg-1474252697.jpg', import.meta.url).href;
const blog7Img3 = new URL('../assets/images/blogs-7/mcn_cho_noi_dua_1262023_2_253484321.jpg', import.meta.url).href;

const blog3Img2 = new URL('../assets/images/blogs-3/school_event_2.jpg', import.meta.url).href;
const blog3Img3 = new URL('../assets/images/blogs-3/school_event_4.jpg', import.meta.url).href;

const blog4Img1 = new URL('../assets/images/blogs-4/4_1.jpg', import.meta.url).href;
const blog4Img2 = new URL('../assets/images/blogs-4/4_2.jpg', import.meta.url).href;
const blog4Img3 = new URL('../assets/images/blogs-4/4_3.jpg', import.meta.url).href;

const blog5Img1 = new URL('../assets/images/blogs-5/5_1.jpg', import.meta.url).href;
const blog5Img2 = new URL('../assets/images/blogs-5/5_2.jpg', import.meta.url).href;
const blog5Img3 = new URL('../assets/images/blogs-5/5_3.jpg', import.meta.url).href;

const blog2Img1 = new URL('../assets/images/blogs-2/IMG_5684.JPG', import.meta.url).href;
const blog2Img2 = new URL('../assets/images/blogs-2/IMG_5685.JPG', import.meta.url).href;

const blog1Img1 = new URL('../assets/images/blogs-1/worker1.jpg', import.meta.url).href;
const blog1Img2 = new URL('../assets/images/blogs-1/worker2.jpg', import.meta.url).href;
const blog1Img3 = new URL('../assets/images/blogs-1/worker3.jpg', import.meta.url).href;
const blog1Img4 = new URL('../assets/images/blogs-1/worker4.jpg', import.meta.url).href;

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
    category: 'community',
    author: 'CODY Team',
    date: '2025-10-04',
    image: blog1Img1,
  images: [blog1Img1, blog1Img2, blog1Img3, blog1Img4],
    readTime: '3 phút đọc',
  },
  {
    id: 2,
    title: '🎓 CODY SCHOLARSHIP BOX — Spreading Love, Supporting the Journey of Learning',
    excerpt:
      'On the journey of “bringing the sweetness of Ben Tre to every corner of Vietnam,” CODY goes beyond sharing coconut candy — we share faith, hope, and learning opportunities.',
    content:
      'Recently, the CODY Scholarship Box closed with many touching moments as we awarded scholarships to five schools in Ba Ria – Vung Tau.',
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
    category: 'community',
    author: 'CODY Team',
    date: '2025-10-03',
    image:
      blog2Img1,
    images: [
      blog2Img1,
      blog2Img2,
    ],
    readTime: '4 minutes read',
  },

  {
    id: 3,
    title: '🌿 CODY at Doc Binh Kieu 1 Primary School — Sharing Sweetness, Spreading Love.',
    excerpt:
      'In the journey of spreading the spirit of “sweetness from nature – sharing from the heart,” CODY had the privilege of visiting Doc Binh Kieu 1 Primary School (Ben Tre) — where the pure smiles of the children made the trip more meaningful than ever. 🍬.',
    content:
      'CODY aimed to create a joyful and educational day — where students could learn through play, discovering the beauty of sustainability, recycling, and eco-friendly living.',
    fullContent: [
      '🌿 CODY at Doc Binh Kieu 1 Primary School — Sharing Sweetness, Spreading Love',
      'In the journey of spreading the spirit of “sweetness from nature – sharing from the heart,” CODY had the privilege of visiting Doc Binh Kieu 1 Primary School (Ben Tre) — where the pure smiles of the children made the trip more meaningful than ever. 🍬',
      '🎯 Our Mission: Spreading Sweetness – Planting Green Awareness',
      'More than just a volunteer activity, CODY aimed to create a joyful and educational day — where students could learn through play, discovering the beauty of sustainability, recycling, and eco-friendly living.',
      'During the visit, the CODY team and volunteers:',
      '🌱 Distributed over 200 gift sets, including eco-friendly coconut candies, notebooks, and school supplies.',
      '🎨 Hosted a “Recycled Clay Workshop”, where students crafted small items from plastic waste — creative, fun, and full of purpose.',
      '♻️ Engaged the children in a waste-sorting game, helping them understand how to protect the environment through small, everyday actions.',
      '🍬 And of course, every student received CODY coconut candies — a sweet gift from their very own hometown.',
      '📸 Insert images from Doc Binh Kieu 1 visit',
      '💬 Message from Founder Le Bao Long',
      '“I believe that lessons about love and environmental protection should be planted early. When I saw the students smiling, excitedly shaping their clay creations, I knew — the green seeds had already begun to sprout.” 🌿',
      '💚 Spreading Sweetness That Lasts',
      'The visit ended with countless memorable moments — bright eyes, little hands holding CODY candies, and smiles as warm and sweet as the flavor of Ben Tre itself.',
      'CODY believes that every act of kindness, no matter how small, is a step toward a more sustainable future — one where everyone can live greener, kinder, and more meaningfully together.',
      '📦 CODY – More than candy, it’s a story of sharing.',
      '---------------------------------------------------------------------------------------------------------',
      '🌿 CODY tại Trường Tiểu học Đốc Bình Kiều 1 — Trao vị ngọt, gửi yêu thương',
      'Trong hành trình lan tỏa tinh thần “ngọt lành từ thiên nhiên – sẻ chia từ trái tim”, CODY đã có dịp dừng chân tại Trường Tiểu học Đốc Bình Kiều 1 (Bến Tre) — nơi những nụ cười trong trẻo của các em nhỏ đã khiến chuyến đi trở nên ý nghĩa hơn bao giờ hết. 🍬',
      '🎯 Mục tiêu: Mang vị ngọt – Gieo nhận thức xanh',
      'Không chỉ đơn thuần là hoạt động thiện nguyện, CODY mong muốn mang đến cho các em học sinh một ngày học mà chơi – chơi mà học, qua những trải nghiệm gần gũi và đầy cảm hứng về môi trường, tái chế, và lối sống xanh.',
      'Trong chương trình, đội ngũ CODY cùng các tình nguyện viên đã:',
      '🌱 Trao tặng hơn 200 phần quà gồm kẹo dừa xanh, sổ tay và đồ dùng học tập.',
      '🎨 Tổ chức workshop đất sét tái chế, nơi các em được tự tay tạo hình những món đồ nhỏ từ rác thải nhựa — vừa sáng tạo, vừa ý nghĩa.',
      '♻️ Cùng nhau chơi trò chơi phân loại rác, giúp các em hiểu rõ hơn về cách bảo vệ môi trường ngay từ những hành động nhỏ.',
      '🍬 Và đặc biệt, mỗi em học sinh đều nhận được những viên kẹo dừa CODY – món quà ngọt ngào từ chính quê hương mình.',
      '💬 Chia sẻ từ Founder Lê Bảo Long',
      '“Tôi tin rằng những bài học về yêu thương và bảo vệ môi trường cần được gieo từ sớm. Khi thấy các em vui vẻ cười, say sưa nhào nặn đất sét, tôi cảm nhận được rằng – những hạt mầm xanh đã bắt đầu nảy nở.” 🌿',
      '💚 Lan tỏa vị ngọt bền lâu',
      'Chuyến đi khép lại với thật nhiều khoảnh khắc đáng nhớ — những ánh mắt rạng rỡ, những bàn tay nhỏ xíu cầm viên kẹo CODY và nụ cười ngọt ngào như chính hương vị quê hương Bến Tre.',
      'CODY tin rằng mỗi hành trình trao đi yêu thương, dù nhỏ, đều là bước khởi đầu cho một tương lai bền vững hơn — nơi mọi người đều có thể cùng nhau sống xanh, sống tốt, và sống có ý nghĩa.',
      '📦 CODY – Không chỉ là kẹo, mà là câu chuyện của sẻ chia.'
    ],
    category: 'community',
    author: 'CODY Team',
    date: '2024-09-15',
    image: blog3Img2,
    images: [blog3Img2, blog3Img3],
    readTime: '5 minutes read',
  },
  {
    id: 4,
    title: '🌿 CODY at Nguyễn Văn Đồn School — Planting Green Seeds in Young Hearts.',
    excerpt:
      'After the first steps at Đốc Bình Kiều Primary School, the journey of “CODY – Sharing Sweetness, Spreading Love” continued to Nguyễn Văn Đồn Primary and Secondary School. It was a bright sunny morning filled with laughter across the schoolyard, where the sweetness of coconut candy blended with the joy of the students. 🍬',
    content:
      'For CODY, every trip carries a mission: to bring the sweetness of Ben Tre closer to people’s hearts, while inspiring the younger generation to love the environment and live sustainably.',
    fullContent: [
      '🌿 CODY at Nguyễn Văn Đồn School — Planting Green Seeds in Young Hearts',
      'After the first steps at Đốc Bình Kiều Primary School, the journey of “CODY – Sharing Sweetness, Spreading Love” continued to Nguyễn Văn Đồn Primary and Secondary School. It was a bright sunny morning filled with laughter across the schoolyard, where the sweetness of coconut candy blended with the joy of the students. 🍬',
      '💚 More Than Candy — A Story of Sharing',
      'For CODY, every trip carries a mission: to bring the sweetness of Ben Tre closer to people’s hearts, while inspiring the younger generation to love the environment and live sustainably.',
      '(Insert Image: Nguyễn Văn Đồn School)',
      'At Nguyễn Văn Đồn School, CODY and the volunteers organized:',
      '🌱 “Reborn Clay” Workshop – where students hand-crafted small items from recycled plastic, learning how to turn “waste” into “wonder.”',
      '♻️ A fun waste-sorting game, helping them recognize proper ways to recycle and manage trash.',
      '🎁 Over 200 gift sets including coconut candies, notebooks, and school supplies were given to the students.',
      '🍈 And the most memorable moment — when the children sat together, smiling as they enjoyed CODY coconut candies made from their very own hometown.',
      '💬 Founder Lê Bảo Long shared:',
      '“I’ve always believed that even the smallest acts can create the biggest changes. When the students smiled and shouted our motto ‘Live Green with CODY,’ I knew our message had truly touched their hearts.” 🌍',
      '✨ Connect – Inspire – Sustain',
      'The volunteer day ended with bright eyes and heartfelt thank-yous. But for CODY, it wasn’t an ending — it was the beginning of a longer journey: a journey to connect people, protect the environment, and spread kindness.',
      'Every CODY coconut candy carries not only the flavor of Ben Tre but also a message: “Sweet for today, green for tomorrow.” �',
      '📦 CODY – Sweet from the heart, green from the soul.',
      '---------------------------------------------------------------------------------------------------------',
      '🌿 CODY tại Trường Nguyễn Văn Đồn — Hành trình gieo hạt xanh trong tim nhỏ',
      'Sau những bước chân đầu tiên tại Đốc Bình Kiều, hành trình “CODY – Trao vị ngọt, gửi yêu thương” tiếp tục đến với Trường Tiểu học – THCS Nguyễn Văn Đồn. Một buổi sáng đầy nắng, tiếng cười vang khắp sân trường, nơi những viên kẹo dừa ngọt lành hòa cùng niềm vui của các em học sinh. 🍬',
      '💚 Không chỉ là kẹo – là câu chuyện của sẻ chia',
      'Đối với CODY, mỗi chuyến đi đều mang trong mình một sứ mệnh: mang vị ngọt từ quê hương Bến Tre đến gần hơn với trái tim con người, đồng thời khơi dậy trong thế hệ trẻ tình yêu với môi trường và ý thức sống xanh.',
      'Chèn hình ảnh: Bài Nguyễn Văn Đồn',
      'Tại Trường Nguyễn Văn Đồn, CODY cùng các tình nguyện viên đã mang đến:',
      '🌱 Workshop “Đất sét tái sinh” – nơi các em tự tay tạo hình những món đồ nhỏ xinh từ rác thải nhựa, học cách biến “rác” thành “tác phẩm”.',
      '♻️ Trò chơi phân loại rác vui nhộn, giúp các em nhận biết cách xử lý và tái chế đúng cách.',
      '🎁 Hơn 200 phần quà gồm kẹo dừa, sổ tay học tập và dụng cụ học sinh được trao tận tay.',
      '🍈 Và đặc biệt là giây phút các em cùng nhau thưởng thức những viên kẹo dừa CODY – sản phẩm từ chính quê hương của mình.',
      '💬 Chia sẻ từ Founder Lê Bảo Long',
      '“Tôi luôn tin rằng, những điều nhỏ bé nhất có thể làm nên thay đổi lớn lao. Khi các em học sinh cười và hô to khẩu hiệu ‘Sống xanh cùng CODY’, tôi biết rằng thông điệp của chúng tôi đã chạm đến trái tim các em.” 🌍',
      '✨ Kết nối – Lan tỏa – Bền vững',
      'Buổi thiện nguyện khép lại bằng những ánh mắt trong veo và những lời cảm ơn giản dị. Nhưng với CODY, đó không phải là kết thúc – mà là khởi đầu cho một hành trình dài: hành trình kết nối con người – gìn giữ môi trường – lan tỏa yêu thương.',
      'Mỗi viên kẹo dừa CODY không chỉ mang hương vị quê hương, mà còn là thông điệp: “Ngọt ngào hôm nay, xanh lành cho mai sau.” 🌴',
      '📦 CODY – Sweet from the heart, green from the soul.'
    ],
    category: 'community',
    author: 'CODY Team',
    date: '2025-08-20',
    image: blog4Img1,
    images: [blog4Img2, blog4Img3, blog4Img1],
    readTime: '5 minutes read',
  },
  {
    id: 5,
    title: '🌿 “Sweetness & Sustainability”: The Journey of Ben Tre Youth and the CODY Brand ',
    excerpt:
      'Ben Tre — the land of coconuts, sunshine, and kind-hearted people. Amidst the rows of coconut trees reflecting on the Ham Luong River, a small story began — the story of CODY, a green coconut candy brand founded by a group of young dreamers who wished to preserve the sweetness of their hometown in a new and sustainable way.',
    content:
      'CODY started as a simple student project — where young people from the Mekong Delta came together with an entrepreneurial spirit. Instead of following the traditional production model, CODY chose a different path — building a green brand that respects both people and nature.',
    fullContent: [
      '🌿 “Sweetness & Sustainability”: The Journey of Ben Tre Youth and the CODY Brand',
      'Ben Tre — the land of coconuts, sunshine, and kind-hearted people. Amidst the rows of coconut trees reflecting on the Ham Luong River, a small story began — the story of CODY, a green coconut candy brand founded by a group of young dreamers who wished to preserve the sweetness of their hometown in a new and sustainable way.',
      '🧩 When a Student Idea Became a Real Journey',
      'CODY started as a simple student project — where young people from the Mekong Delta came together with an entrepreneurial spirit. Founder Lê Bảo Long, born and raised in Ben Tre, carried with him one persistent question:',
      '“How can the coconut candy — the symbol of my hometown — become not just a sweet treat, but a symbol of a greener lifestyle?”',
      'That question became the starting point of CODY’s journey. Instead of following the traditional production model, CODY chose a different path — building a green brand that respects both people and nature.',
      '(Insert Image: Page 5)',
      '💡 “Sweetness” — More Than Just the Taste of Sugar',
      'At CODY, we believe that true sweetness doesn’t come from sugar, but from the way people give and share love. Every small piece of candy, carefully wrapped in eco-friendly packaging, carries the warmth of its makers — the artisans of Ben Tre, the passionate young team, and those who believe their homeland deserves to be told through a beautiful story.',
      '🌱 CODY and the Dream of Spreading Kindness',
      'Since its early days, CODY has accompanied hundreds of students, teachers, and local residents of Ben Tre through charitable programs, scholarships, and recycling workshops. Beyond making and sharing candy, CODY aims to spread a lifestyle of kindness, care, and sustainability — starting from the simplest things.',
      'A single piece of coconut candy may seem small, but when shared by many caring hands, it becomes the sweet flavor of an entire community.',
      '👉 CODY – Sweetness from Ben Tre, Green from the Hearts of the Young.',
      '---------------------------------------------------------------------------------------------------------',
      '🌿 “Ngọt lành – Sống xanh”: Hành trình của người trẻ Bến Tre và thương hiệu CODY',
      'Bến Tre – vùng đất của dừa, của nắng, và của những con người mộc mạc.',
      'Từ những hàng dừa nghiêng mình soi bóng xuống dòng sông Hàm Luông, một câu chuyện nhỏ bắt đầu – câu chuyện của CODY, thương hiệu kẹo dừa xanh do một nhóm bạn trẻ khởi xướng, mang trong mình mong muốn gìn giữ vị ngọt quê hương theo một cách thật mới mẻ và bền vững.',
      '🧩 Khi một ý tưởng sinh viên trở thành hành trình thật',
      'CODY khởi đầu chỉ là một dự án sinh viên – nơi những người trẻ yêu miền Tây muốn thử sức với tinh thần khởi nghiệp. Founder Lê Bảo Long, sinh ra ở Bến Tre, luôn mang trong mình câu hỏi:',
      '“Làm sao để viên kẹo dừa – biểu tượng quê hương – không chỉ là món quà ngọt, mà còn là biểu tượng của một lối sống xanh?”',
      'Câu hỏi ấy trở thành điểm khởi đầu cho hành trình của CODY. Thay vì chỉ sản xuất kẹo dừa theo cách truyền thống, CODY chọn hướng đi khác: xây dựng thương hiệu xanh, tôn trọng con người và thiên nhiên.',
      'Chèn hình ảnh: Bài 5',
      '💡 “Ngọt lành” – không chỉ là vị ngọt của kẹo',
      'CODY tin rằng vị ngọt thật sự không nằm trong đường, mà trong cách con người trao đi yêu thương. Từ mỗi viên kẹo nhỏ được gói cẩn thận trong bao bì thân thiện, CODY muốn gửi gắm tình cảm của người làm ra sản phẩm – những cô chú thợ Bến Tre, những bạn trẻ đầy nhiệt huyết, và những người tin rằng quê hương mình xứng đáng được kể bằng một câu chuyện đẹp.',
      '🌱 CODY và ước mơ “ngọt lành” lan tỏa',
      'Từ những ngày đầu tiên đến nay, CODY đã đồng hành cùng hàng trăm học sinh, thầy cô và người dân Bến Tre qua các chương trình thiện nguyện, học bổng và workshop tái chế. Không chỉ mang kẹo dừa đi xa hơn, CODY muốn đưa tinh thần sống xanh, tử tế đến gần hơn với mỗi người.',
      'Một viên kẹo dừa có thể nhỏ bé, nhưng nếu đủ nhiều bàn tay cùng sẻ chia, nó sẽ trở thành hương vị ngọt lành của cả một cộng đồng.',
      '👉 CODY – Ngọt lành từ Bến Tre, xanh từ trái tim người trẻ.'
    ],
    category: 'community',
    author: 'CODY Team',
    date: '2025-07-10',
    image: blog5Img1,
    images: [
      blog5Img1,
      blog5Img2,
      blog5Img3,
    ],
    readTime: '6 minutes read',
  },
    {
    id: 6,
    title: '💚 CODY | A SWEET THANK-YOU TO OUR DEAR COMPANIONS',
    excerpt:
      'Each candy carries not only sweetness, but the warmth of every heart walking with us.',
    content:
      'A heartfelt note to our community who made every step possible.',
    fullContent: [
      '💚 CODY | A SWEET THANK-YOU TO OUR DEAR COMPANIONS',
      '“Each candy doesn’t just carry the sweetness of coconut, but also the warmth of every heart that has walked this journey with us.”',
      'When CODY began, we had only a small dream — to share the pure sweetness of Bến Tre coconuts with everyone. Not merely as a treat, but as a story about people, hometown, and kindness.',
      'Today, as we look back, we realize that every step — from crafting our first candies and designing our packaging, to our community visits and first customer orders — was made possible because of you. Your love, trust, and belief have shaped every part of CODY’s story.',
      '💫 To our very first customers – thank you for choosing CODY, not only for its flavor but for the story behind each candy.',
      '💫 To our friends and partners – thank you for helping us spread the message: “Sweetness to live green, and living green to love more.”',
      '💫 To the people of Bến Tre – thank you for sharing your craft, your pride, and your heart to preserve our heritage through sweetness.',
      'Every box sent, every smile received, is a part of this sweet journey. We believe CODY is more than a brand — it’s a small community built on care, sustainability, and shared purpose.',
      '🌿 Thank you for being part of our sweet journey. CODY will continue to grow — to make sure every candy carries not only sweetness, but also faith, love, and the gentle spirit of Bến Tre wherever it goes.',
      '“Be kind. Be local. Build something that lasts.” — The CODY Team',
      '---------------------------------------------------------------------------------------------------------',
      '💚 CODY | LỜI CẢM ƠN GỬI ĐẾN NHỮNG NGƯỜI ĐỒNG HÀNH NGỌT LÀNH',
      '“Mỗi viên kẹo không chỉ có vị ngọt của dừa, mà còn là vị ngọt của những tấm lòng đã cùng chúng tôi đi qua hành trình này.”',
      'Khi CODY bắt đầu, chúng tôi chỉ có một ước mơ nhỏ: mang vị ngọt lành từ dừa Bến Tre đến gần hơn với mọi người — không chỉ như một món kẹo, mà như một câu chuyện về quê hương, con người và sự tử tế.',
      'Hôm nay, khi nhìn lại hành trình đã qua, chúng tôi biết rằng mọi bước tiến — từ những ngày đầu thử vị kẹo, hoàn thiện bao bì, đến những chuyến đi thiện nguyện hay các đơn hàng đầu tiên — đều không thể có được nếu thiếu đi sự yêu thương và tin tưởng của mọi người.',
      '💫 Cảm ơn những khách hàng đầu tiên – những người đã chọn CODY không chỉ vì vị ngọt, mà vì câu chuyện đằng sau từng viên kẹo.',
      '💫 Cảm ơn những người bạn, những đối tác – đã giúp lan tỏa thông điệp “Ngọt lành để sống xanh, sống xanh để yêu thương.”',
      '💫 Cảm ơn những người con Bến Tre – đã chia sẻ, góp sức và cùng chúng tôi giữ gìn hương vị truyền thống bằng niềm tự hào và trái tim chân thành.',
      'Mỗi hộp kẹo được gửi đi, mỗi nụ cười nhận lại là một phần của hành trình ngọt lành này. Chúng tôi tin rằng CODY không chỉ là thương hiệu, mà là một cộng đồng nhỏ – nơi những giá trị bền vững được vun đắp mỗi ngày.',
      '🌿 Cảm ơn bạn, vì đã cùng chúng tôi xây nên một hành trình ngọt lành. CODY sẽ tiếp tục cố gắng – để mỗi viên kẹo không chỉ mang vị ngọt, mà còn mang theo niềm tin, tình yêu và tinh thần Bến Tre đến thật xa.',
      '“Be kind. Be local. Build something that lasts.” — CODY Team',
    ],
    category: 'stories',
    author: 'CODY Team',
    date: '2025-07-04',
    image: blog6Img1,
    images: [blog6Img1],
    readTime: '4 phút đọc',
  },
    {
    id: 7,
    title: 'The Culture and People of Bến Tre — The Sweet Journey of Coconut Candy.',
    excerpt:
      'Bến Tre, the land of gentle rivers and endless coconut groves, has always carried within it a quiet strength. Here, life flows like the river: calm yet deeply rooted. For generations, coconuts have been more than just a fruit — they are a symbol of the Bến Tre people’s resilience.',
    content:
      'CODY was born from the same soil, the same coconut trees, and the same desire to share that sweetness — but with a modern heart. Each product from CODY is not only about taste, but about sustainability, connection, and gratitude — to the land, to the people, and to the culture that made it all possible.',
    fullContent: [
      '🌴 The Culture and People of Bến Tre — The Sweet Journey of Coconut Candy',
      '“If you listen closely, you can hear the whisper of the coconut leaves — telling stories of land, love, and perseverance.”',
      'Bến Tre, the land of gentle rivers and endless coconut groves, has always carried within it a quiet strength. Here, life flows like the river: calm yet deeply rooted. Every home, every smile, and every rhythm of daily life connects to one familiar image — the coconut tree. For generations, coconuts have been more than just a fruit. They have been a companion, a livelihood, and a symbol of the Bến Tre people’s resilience. From the thatched roofs made of coconut leaves to simple kitchen utensils, every part of the tree is cherished. But perhaps the most heartwarming creation born from it — is the coconut candy.',
      '🍬 The Birth of a Local Legend',
      'The story of Bến Tre coconut candy began in the early 20th century, when local artisans discovered how to turn coconut milk and malt syrup into a chewy, fragrant treat. It started in small family workshops — where each candy was cooked over wood fire, poured into molds by hand, and wrapped with care. In those times, a piece of coconut candy wasn’t just a snack; it was a gift of affection, often shared during holidays or sent to loved ones far away. The sweetness carried with it the spirit of the land — simple, pure, and enduring.',
      '🌾 People Behind the Sweetness',
      'Behind every candy is a craftsman — someone who wakes up before dawn to stir a pot of golden syrup, checking the exact texture by feel and experience. These are people who don’t rush time. They let sweetness form slowly, like the patience of their own hearts. Bến Tre’s people are known for that — quiet but steadfast, humble yet full of pride. They find happiness in creating something lasting, something that carries the identity of their hometown into the world.',
      '💚 CODY and the Continuation of a Tradition',
      'CODY was born from the same soil, the same coconut trees, and the same desire to share that sweetness — but with a modern heart. We believe that tradition and innovation can stand together, that every candy can tell both an old story and a new dream. Each product from CODY is not only about taste, but about sustainability, connection, and gratitude — to the land, to the people, and to the culture that made it all possible.',
      '“To taste a piece of Bến Tre coconut candy is to taste the kindness of its people.” May every sweetness remind us where we come from — and inspire us to build something that lasts.',
      '🌿 CODY – Sweetness from the Land of Coconuts',
      '---------------------------------------------------------------------------------------------------------',
      '🌴 Văn hoá và Con người Bến Tre – Hành trình ngọt ngào của Kẹo Dừa',
      '“Nếu lắng nghe thật khẽ, bạn sẽ nghe tiếng thì thầm của những tàu lá dừa — kể về câu chuyện của đất, của tình người và của sự kiên cường.”',
      '📸 Chèn hình ảnh: Bài 7',
      'Bến Tre – vùng đất được bao quanh bởi những con sông hiền hòa và rợp bóng dừa xanh – từ lâu đã mang trong mình sức sống bền bỉ và tinh thần hiếu khách. Cuộc sống nơi đây trôi chậm rãi như dòng nước, nhưng luôn đong đầy yêu thương. Người dân Bến Tre gắn bó với cây dừa như với người bạn tri kỷ, khi từng phần của cây – từ lá, thân, trái cho đến xơ – đều trở thành nguồn sống, nguồn cảm hứng và niềm tự hào.',
      '🍬 Hành trình ra đời của một biểu tượng ngọt ngào',
      'Câu chuyện của kẹo dừa Bến Tre bắt đầu từ đầu thế kỷ 20, khi những người thợ thủ công nơi đây tìm ra cách kết hợp nước cốt dừa, mạch nha và đường để tạo nên món kẹo dẻo thơm, béo ngậy, tan nơi đầu lưỡi. Ban đầu, kẹo dừa chỉ được nấu trong những gian bếp nhỏ, bằng nồi đồng và củi lửa, rồi đổ khuôn, cắt và gói bằng tay – tất cả đều mang hương vị của sự chân thành và cần mẫn. Với người Bến Tre, một viên kẹo dừa không chỉ là món ăn vặt — mà là một món quà của tình cảm, thường được trao trong những dịp lễ Tết, hay gửi theo những chuyến hàng ra khắp mọi miền đất nước. Vị ngọt ấy mang theo tinh thần của quê hương — mộc mạc, giản dị nhưng nồng hậu.',
      '🌾 Những con người đứng sau vị ngọt',
      'Đằng sau mỗi viên kẹo dừa là hình ảnh những người thợ cần mẫn bên nồi kẹo nghi ngút khói. Họ đo nhiệt độ không bằng máy móc, mà bằng kinh nghiệm và cảm giác — chỉ cần nhìn sắc kẹo, nghe tiếng sôi là biết đã “tới lửa” hay chưa. Họ thức dậy từ tinh mơ, khuấy nồi kẹo trong mùi thơm béo ngậy của nước cốt dừa, rồi nhẹ nhàng đổ khuôn, cắt từng miếng kẹo vuông vức, bọc lại bằng tay – như gửi gắm trong đó niềm tự hào về nghề. Người Bến Tre là thế — lặng lẽ mà kiên cường, khiêm nhường nhưng luôn trọn vẹn trong từng việc làm. Họ không chỉ tạo ra một sản phẩm, mà còn gìn giữ một phần ký ức và văn hóa của quê hương.',
      '💚 CODY – Tiếp nối truyền thống bằng tinh thần hiện đại',
      'CODY Candy ra đời từ chính tinh thần ấy – mang sứ mệnh gìn giữ hương vị truyền thống của Bến Tre trong hình hài của một thương hiệu trẻ, năng động và hiện đại hơn. Mỗi viên kẹo dừa CODY vẫn được làm từ nguyên liệu tự nhiên, vẫn giữ vị ngọt béo đặc trưng, nhưng được hoàn thiện trong quy trình đảm bảo chất lượng và bao bì mang tính thẩm mỹ cao. Chúng tôi tin rằng, truyền thống và đổi mới có thể song hành — rằng những giá trị xưa cũ không mất đi, mà chỉ cần được thổi vào đó hơi thở mới. Với CODY, mỗi hộp kẹo không chỉ là món quà, mà còn là lời tri ân gửi đến vùng đất đã nuôi dưỡng bao thế hệ người con cần cù, sáng tạo.',
      '🌺 Vị ngọt của quê hương, vị ngọt của lòng người',
      'Ngày nay, khi kẹo dừa Bến Tre đã có mặt khắp nơi – từ những cửa hàng nhỏ đến các sân bay quốc tế – vị ngọt ấy vẫn giữ nguyên sự dung dị ban đầu. Đó là vị ngọt của bàn tay lao động, của nụ cười hiền hậu và của niềm tin rằng những điều giản dị nhất mới là điều bền lâu nhất. “Nếm một viên kẹo dừa Bến Tre là cảm nhận được vị ngọt của tình người nơi đây.” Và với CODY, chúng tôi mong rằng – mỗi vị ngọt ấy sẽ nhắc bạn nhớ về cội nguồn, và truyền cảm hứng để bạn tạo nên những điều tốt đẹp, bền vững cho mai sau.',
      '🌿 CODY – Vị ngọt từ đất dừa quê hương. Từ những gì giản dị nhất, chúng tôi gửi đến bạn món quà của yêu thương, của sự kết nối và niềm tự hào mang tên Bến Tre.'
    ],
    category: 'culture',
    author: 'CODY Team',
    date: '2025-06-01',
    image: blog7Img1,
    images: [blog7Img1, blog7Img2, blog7Img3],
    readTime: '5 minutes read',
  },
];

export const categories = [
  { id: 'all', name: 'All' },
  { id: 'stories', name: 'Stories' },
  { id: 'community', name: 'Community' },
  { id: 'culture', name: 'Culture' },
];

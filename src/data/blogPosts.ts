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
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Tái chế bao bì: Hành động nhỏ, tác động lớn',
    excerpt:
      'Khám phá cách CODY áp dụng bao bì thân thiện môi trường và cách bạn có thể tham gia vào việc bảo vệ hành tinh.',
    content:
      'Trong thời đại biến đổi khí hậu, việc sử dụng bao bì thân thiện với môi trường không chỉ là xu hướng mà đã trở thành trách nhiệm...',
    fullContent: [
      'Trong thời đại biến đổi khí hậu, việc sử dụng bao bì thân thiện với môi trường không chỉ là xu hướng mà đã trở thành trách nhiệm của mỗi doanh nghiệp. Tại CODY, chúng tôi cam kết sử dụng 100% bao bì có thể tái chế và phân hủy sinh học.',
      'Theo nghiên cứu của Tổ chức Môi trường Thế giới, mỗi năm có hơn 8 triệu tấn rác thải nhựa đổ ra đại dương. Con số này đáng báo động và đòi hỏi sự thay đổi cấp bách từ các doanh nghiệp sản xuất.',
      'CODY đã chuyển đổi hoàn toàn sang sử dụng bao bì giấy kraft tái chế cho các sản phẩm kẹo dừa và cà phê. Loại giấy này không chỉ thân thiện với môi trường mà còn giữ được độ tươi ngon của sản phẩm.',
      'Chúng tôi cũng khuyến khích khách hàng tái sử dụng bao bì bằng cách tổ chức chương trình "Trả bao bì - Nhận ưu đãi". Mỗi bao bì trả lại sẽ được quy đổi thành điểm tích lũy để đổi quà.',
      'Bên cạnh đó, CODY đầu tư vào nghiên cứu các vật liệu mới như bao bì từ bã mía, vỏ dừa - những phụ phẩm nông nghiệp có thể phân hủy hoàn toàn trong 6 tháng.',
      'Hành động nhỏ từ mỗi người có thể tạo nên tác động lớn. Hãy cùng CODY bảo vệ môi trường từ những việc đơn giản như phân loại rác, tái chế bao bì và lựa chọn sản phẩm thân thiện với môi trường.',
    ],
    category: 'environment',
    author: 'Minh Anh',
    date: '2024-01-15',
    image:
      'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=600',
    readTime: '5 phút đọc',
  },
  {
    id: 2,
    title: 'Đặc sản Bến Tre: Hành trình từ vườn dừa đến bàn ăn',
    excerpt:
      'Tìm hiểu về quy trình sản xuất kẹo dừa truyền thống và cách CODY hiện đại hóa để giữ nguyên hương vị quê hương.',
    content:
      'Bến Tre được mệnh danh là "xứ dừa" với hơn 200.000 hecta vườn dừa, cung cấp nguồn nguyên liệu dồi dào cho ngành chế biến...',
    fullContent: [
      'Bến Tre được mệnh danh là "xứ dừa" với hơn 200.000 hecta vườn dừa, cung cấp nguồn nguyên liệu dồi dào cho ngành chế biến. Mỗi năm, tỉnh này sản xuất hơn 600 triệu trái dừa, góp phần tạo ra những đặc sản nổi tiếng khắp cả nước.',
      'Kẹo dừa Bến Tre không chỉ là món ăn truyền thống mà còn mang trong mình câu chuyện văn hóa của miền sông nước. Nghề làm kẹo dừa đã có từ hàng trăm năm trước, được truyền từ thế hệ này sang thế hệ khác.',
      'Quy trình làm kẹo dừa truyền thống bắt đầu từ việc chọn những trái dừa già, cơm dày và thơm. Cơm dừa được bào mịn, trộn với đường mía và nấu trên lửa than nhỏ trong nhiều giờ đồng hồ.',
      'Tại CODY, chúng tôi kết hợp công nghệ hiện đại với bí quyết truyền thống. Dây chuyền sản xuất được kiểm soát nghiêm ngặt về nhiệt độ và độ ẩm, đảm bảo mỗi viên kẹo đều có chất lượng hoàn hảo.',
      'Chúng tôi làm việc trực tiếp với các hợp tác xã nông dân tại Bến Tre, cam kết mua dừa với giá công bằng và hỗ trợ họ áp dụng phương pháp canh tác hữu cơ. Điều này không chỉ đảm bảo chất lượng nguyên liệu mà còn cải thiện đời sống của bà con nông dân.',
      'Từ vườn dừa xanh mát đến những viên kẹo thơm ngon trên bàn ăn, mỗi sản phẩm CODY đều mang theo tâm huyết và sự chăm sóc tỉ mỉ. Đó chính là điều làm nên hương vị đặc biệt của đặc sản Bến Tre.',
    ],
    category: 'cuisine',
    author: 'Tuấn Việt',
    date: '2024-01-10',
    image:
      'https://images.pexels.com/photos/8142081/pexels-photo-8142081.jpeg?auto=compress&cs=tinysrgb&w=600',
    readTime: '7 phút đọc',
  },
  {
    id: 3,
    title: 'Lối sống xanh: Bắt đầu từ những thói quen đơn giản',
    excerpt:
      'Những thay đổi nhỏ trong cuộc sống hàng ngày có thể mang lại tác động tích cực lớn đến môi trường.',
    content:
      'Lối sống xanh không có nghĩa là bạn phải thay đổi hoàn toàn cuộc sống của mình. Thực tế, những thói quen đơn giản...',
    fullContent: [
      'Lối sống xanh không có nghĩa là bạn phải thay đổi hoàn toàn cuộc sống của mình. Thực tế, những thói quen đơn giản hàng ngày có thể tạo nên sự khác biệt lớn cho môi trường.',
      'Bắt đầu từ việc giảm thiểu rác thải nhựa. Thay vì sử dụng túi nilon một lần, hãy mang theo túi vải khi đi mua sắm. Một chiếc túi vải có thể thay thế hàng nghìn túi nilon trong suốt thời gian sử dụng.',
      'Tiết kiệm năng lượng cũng là một phần quan trọng của lối sống xanh. Tắt các thiết bị điện khi không sử dụng, sử dụng bóng đèn LED, và tận dụng ánh sáng tự nhiên có thể giảm đến 30% hóa đơn điện hàng tháng.',
      'Trong ẩm thực, hãy ưu tiên các sản phẩm địa phương và hữu cơ. Điều này không chỉ giảm lượng khí thải carbon từ vận chuyển mà còn hỗ trợ nông dân địa phương. CODY cam kết sử dụng 100% nguyên liệu từ các trang trại trong nước.',
      'Phân loại rác tại nguồn là một thói quen đơn giản nhưng hiệu quả. Rác hữu cơ có thể làm phân compost, rác tái chế có thể được xử lý để tạo ra sản phẩm mới, giảm thiểu lượng rác thải chôn lấp.',
      'Cuối cùng, hãy chia sẻ những thói quen tốt với người thân và bạn bè. Mỗi người thay đổi sẽ tạo ra hiệu ứng domino, lan tỏa lối sống xanh đến cộng đồng. Cùng nhau, chúng ta có thể tạo nên một tương lai bền vững hơn.',
    ],
    category: 'lifestyle',
    author: 'Lan Hương',
    date: '2024-01-05',
    image:
      'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=600',
    readTime: '4 phút đọc',
  },
  {
    id: 4,
    title: 'Văn hóa ẩm thực Việt Nam qua những món ngọt truyền thống',
    excerpt:
      'Khám phá sự phong phú của văn hóa ẩm thực Việt Nam thông qua các món ngọt truyền thống từ Nam ra Bắc.',
    content:
      'Món ngọt trong văn hóa Việt Nam không chỉ là thức ăn mà còn chứa đựng những câu chuyện văn hóa sâu sắc...',
    fullContent: [
      'Món ngọt trong văn hóa Việt Nam không chỉ là thức ăn mà còn chứa đựng những câu chuyện văn hóa sâu sắc. Mỗi vùng miền có những đặc sản riêng, phản ánh khí hậu, địa lý và phong tục tập quán địa phương.',
      'Miền Bắc nổi tiếng với kẹo lạc, kẹo mè xửng - những món ăn gắn liền với Tết Trung thu và các dịp lễ quan trọng. Kẹo kéo Hà Nội với màu trắng trong veo, vị ngọt dịu và hương gừng đặc trưng đã trở thành biểu tượng của ẩm thực phố cổ.',
      'Miền Trung mang đến các món như mè xửng, kẹo dừa Quảng Nam với hương vị đậm đà, phản ánh tính cách mạnh mẽ của người dân vùng đất này. Kẹo dừa non được làm từ dừa tươi non, có vị béo ngậy và thơm nức mũi.',
      'Miền Nam với khí hậu nhiệt đới, đất đai màu mỡ đã sáng tạo ra kẹo dừa Bến Tre, mứt dừa, bánh dừa nướng. Những món này không chỉ ngọt mà còn mang hương vị đặc trưng của dừa tươi miền sông nước.',
      'CODY tự hào kế thừa và phát huy những giá trị văn hóa ẩm thực truyền thống. Chúng tôi không ngừng nghiên cứu, cải tiến để mang đến những sản phẩm vừa giữ được hương vị truyền thống vừa đáp ứng tiêu chuẩn hiện đại.',
      'Qua mỗi sản phẩm, chúng tôi muốn kể lại câu chuyện về văn hóa Việt Nam - một nền văn hóa đa dạng, phong phú và đầy tự hào. Hãy cùng CODY khám phá và bảo tồn những giá trị quý báu này.',
    ],
    category: 'culture',
    author: 'Mai Phương',
    date: '2024-01-01',
    image:
      'https://images.pexels.com/photos/8964887/pexels-photo-8964887.jpeg?auto=compress&cs=tinysrgb&w=600',
    readTime: '6 phút đọc',
  },
  {
    id: 5,
    title: 'Bảo vệ đa dạng sinh học: Vai trò của nông nghiệp bền vững',
    excerpt:
      'Tìm hiểu cách các phương pháp canh tác bền vững góp phần bảo vệ đa dạng sinh học và hệ sinh thái.',
    content:
      'Đa dạng sinh học đóng vai trò quan trọng trong việc duy trì sự cân bằng của hệ sinh thái...',
    fullContent: [
      'Đa dạng sinh học đóng vai trò quan trọng trong việc duy trì sự cân bằng của hệ sinh thái. Tuy nhiên, nông nghiệp thâm canh với việc sử dụng hóa chất và thuốc trừ sâu đang đe dọa nghiêm trọng đến sự đa dạng này.',
      'Nông nghiệp bền vững không chỉ tập trung vào năng suất mà còn chú trọng đến việc bảo vệ môi trường và đa dạng sinh học. Các phương pháp như luân canh cây trồng, sử dụng phân hữu cơ, và kiểm soát sinh học giúp duy trì sự cân bằng tự nhiên.',
      'Tại các vườn dừa hợp tác với CODY, chúng tôi khuyến khích nông dân áp dụng canh tác hữu cơ. Không sử dụng thuốc trừ sâu hóa học, thay vào đó là các biện pháp sinh học như nuôi thiên địch, sử dụng bẫy côn trùng tự nhiên.',
      'Việc duy trì đa dạng sinh học trong vườn cây cũng rất quan trọng. Trồng xen canh nhiều loại cây, tạo môi trường sống cho các loài động vật có ích như ong, bướm, chim... góp phần tạo nên một hệ sinh thái cân bằng và lành mạnh.',
      'Bảo vệ nguồn nước cũng là một phần quan trọng. Chúng tôi hỗ trợ nông dân xây dựng hệ thống tưới tiêu tiết kiệm, tránh lãng phí và ô nhiễm nguồn nước. Nước thải từ quá trình chế biến được xử lý đạt tiêu chuẩn trước khi thả ra môi trường.',
      'Nông nghiệp bền vững không chỉ là trách nhiệm của nông dân mà còn là trách nhiệm của toàn xã hội. CODY cam kết đồng hành cùng nông dân, cung cấp kiến thức, kỹ thuật và hỗ trợ tài chính để xây dựng một nền nông nghiệp thân thiện với môi trường.',
    ],
    category: 'environment',
    author: 'Hoàng Nam',
    date: '2023-12-28',
    image:
      'https://images.pexels.com/photos/2872418/pexels-photo-2872418.jpeg?auto=compress&cs=tinysrgb&w=600',
    readTime: '8 phút đọc',
  },
  {
    id: 6,
    title: 'Xu hướng tiêu dùng xanh và tác động đến ngành thực phẩm',
    excerpt:
      'Phân tích xu hướng tiêu dùng xanh hiện tại và những thay đổi tích cực trong ngành sản xuất thực phẩm.',
    content:
      'Tiêu dùng xanh đang trở thành xu hướng chủ đạo, đặc biệt là trong ngành thực phẩm...',
    fullContent: [
      'Tiêu dùng xanh đang trở thành xu hướng chủ đạo, đặc biệt là trong ngành thực phẩm. Người tiêu dùng ngày càng quan tâm đến nguồn gốc, quy trình sản xuất và tác động môi trường của các sản phẩm họ mua.',
      'Theo khảo sát của Nielsen, hơn 73% người tiêu dùng toàn cầu sẵn sàng trả giá cao hơn cho các sản phẩm thân thiện với môi trường. Con số này ở Việt Nam cũng tăng nhanh, đặc biệt trong nhóm khách hàng trẻ tuổi và có thu nhập cao.',
      'Xu hướng này đang thúc đẩy các doanh nghiệp thực phẩm thay đổi chiến lược sản xuất và kinh doanh. Từ việc chọn nguyên liệu hữu cơ, giảm thiểu bao bì nhựa, đến việc tối ưu hóa chuỗi cung ứng để giảm phát thải carbon.',
      'CODY đi đầu trong xu hướng này với cam kết "Xanh từ A đến Z". Từ khâu chọn nguyên liệu từ các trang trại hữu cơ, quy trình sản xuất tiết kiệm năng lượng, đến bao bì có thể tái chế 100%.',
      'Chúng tôi cũng áp dụng công nghệ blockchain để minh bạch hóa chuỗi cung ứng. Khách hàng có thể quét mã QR trên bao bì để biết nguồn gốc nguyên liệu, quy trình sản xuất và các chứng nhận chất lượng.',
      'Tiêu dùng xanh không chỉ là xu hướng mà đã trở thành lối sống. CODY tin rằng, bằng cách cung cấp những sản phẩm chất lượng, thân thiện với môi trường, chúng tôi đang đóng góp vào việc xây dựng một tương lai bền vững cho thế hệ sau.',
    ],
    category: 'lifestyle',
    author: 'Thu Hà',
    date: '2023-12-25',
    image:
      'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=600',
    readTime: '5 phút đọc',
  },
];

export const categories = [
  { id: 'all', name: 'Tất cả' },
  { id: 'environment', name: 'Môi trường' },
  { id: 'lifestyle', name: 'Lối sống xanh' },
  { id: 'cuisine', name: 'Ẩm thực' },
  { id: 'culture', name: 'Văn hóa' },
];

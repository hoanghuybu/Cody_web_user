import { Product } from '../types/product';

export const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Kẹo Dừa Truyền Thống',
    description: 'Kẹo dừa nguyên chất theo công thức truyền thống, vị ngọt thanh từ đường mía tự nhiên',
    price: 45000,
    originalPrice: 55000,
    image: 'https://images.pexels.com/photos/8964887/pexels-photo-8964887.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'traditional',
    badge: 'Bán chạy',
    inStock: true,
    ingredients: ['Dừa tươi Bến Tre', 'Đường mía tự nhiên', 'Muối biển'],
    weight: '200g'
  },
  {
    id: '2',
    name: 'Combo Kẹo Dừa Mix',
    description: 'Combo 3 vị: truyền thống, cà phê và sầu riêng. Phù hợp làm quà tặng',
    price: 125000,
    originalPrice: 150000,
    image: 'https://images.pexels.com/photos/11022492/pexels-photo-11022492.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'combo',
    badge: 'Khuyến mãi',
    inStock: true,
    ingredients: ['Dừa tươi', 'Cà phê Arabica', 'Sầu riêng Đồng Nai', 'Đường mía'],
    weight: '300g (3 x 100g)'
  },
  {
    id: '3',
    name: 'Hộp Quà Tết CODY',
    description: 'Hộp quà cao cấp gồm 6 loại kẹo dừa đặc biệt, thiết kế sang trọng',
    price: 280000,
    image: 'https://images.pexels.com/photos/6697264/pexels-photo-6697264.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'gift-box',
    badge: 'Mới',
    inStock: true,
    ingredients: ['6 vị kẹo dừa premium', 'Hộp quà sang trọng'],
    weight: '500g'
  },
  {
    id: '4',
    name: 'Kẹo Dừa Dâu Tây',
    description: 'Sự kết hợp hoàn hảo giữa vị ngọt của dừa và chua ngọt của dâu tây tự nhiên',
    price: 65000,
    image: 'https://images.pexels.com/photos/7525184/pexels-photo-7525184.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'premium',
    inStock: true,
    ingredients: ['Dừa tươi', 'Dâu tây sấy khô', 'Đường mía'],
    weight: '180g'
  }
];

export const allProducts: Product[] = [
  ...featuredProducts,
  {
    id: '5',
    name: 'Kẹo Dừa Cà Phê',
    description: 'Hương vị đậm đà của cà phê Arabica hòa quyện cùng vị ngọt của dừa',
    price: 55000,
    image: 'https://images.pexels.com/photos/8835098/pexels-photo-8835098.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'premium',
    inStock: true,
    ingredients: ['Dừa tươi', 'Cà phê Arabica rang mộc', 'Đường mía'],
    weight: '200g'
  },
  {
    id: '6',
    name: 'Giỏ Quà Bến Tre',
    description: 'Giỏ quà đặc sản Bến Tre với kẹo dừa và các sản phẩm từ dừa khác',
    price: 350000,
    image: 'https://images.pexels.com/photos/1028637/pexels-photo-1028637.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'gift-basket',
    inStock: true,
    ingredients: ['Kẹo dừa CODY', 'Nước cốt dừa', 'Bánh dừa nướng', 'Mứt dừa'],
    weight: '800g'
  }
];

export const categories = [
  { id: 'traditional', name: 'Truyền thống', slug: 'truyen-thong' },
  { id: 'premium', name: 'Cao cấp', slug: 'cao-cap' },
  { id: 'combo', name: 'Combo', slug: 'combo' },
  { id: 'gift-box', name: 'Hộp quà', slug: 'hop-qua' },
  { id: 'gift-basket', name: 'Giỏ quà', slug: 'gio-qua' }
];
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Chatbot Service - Rule-based Vietnamese Q&A System
export interface ChatbotQuery {
  question: string;
}

export interface ChatbotResponse {
  entity_type: 'product' | 'order' | 'unknown';
  product_name?: string;
  order_id?: string;
  info_type?: string;
  data?: any;
  message?: string;
  response_type: 'text' | 'image' | 'list';
}

// Stop words configuration
const STOP_WORDS = [
  'là',
  'của',
  'có',
  'được',
  'và',
  'với',
  'trong',
  'cho',
  'về',
  'từ',
  'đến',
  'bao',
  'nhiêu',
  'gì',
  'như',
  'thế',
  'nào',
  'khi',
  'nào',
  'ở',
  'đâu',
  'tôi',
  'bạn',
  'chúng',
  'ta',
  'họ',
  'nó',
  'này',
  'đó',
  'những',
  'các',
  'một',
  'hai',
  'ba',
  'bốn',
  'năm',
  'sáu',
  'bảy',
  'tám',
  'chín',
  'mười',
];

// Product whitelist
const PRODUCT_WHITELIST = [
  'kẹo dừa truyền thống',
  'kẹo dừa sầu riêng',
  'kẹo dừa cà phê',
  'kẹo dừa dâu tây',
  'combo kẹo dừa mix',
  'hộp quà tết cody',
  'giỏ quà bến tre',
  'kẹo dừa',
  'combo',
  'hộp quà',
  'giỏ quà',
];

// Info type keywords mapping
const INFO_TYPE_KEYWORDS = {
  price: ['giá', 'bao nhiêu', 'tiền', 'cost', 'price'],
  ingredients: ['thành phần', 'nguyên liệu', 'làm từ', 'chứa gì'],
  stock: ['còn hàng', 'có sẵn', 'tồn kho', 'hết hàng', 'available'],
  description: ['mô tả', 'thông tin', 'chi tiết', 'như thế nào'],
  weight: ['trọng lượng', 'nặng', 'gram', 'kg'],
  image: ['hình ảnh', 'ảnh', 'photo', 'picture'],
  status: ['trạng thái', 'tình trạng', 'status'],
  total: ['tổng tiền', 'tổng cộng', 'total'],
  delivery: ['giao hàng', 'vận chuyển', 'delivery', 'ship'],
  items: ['sản phẩm', 'món', 'items', 'danh sách'],
};

// Dummy product data
const DUMMY_PRODUCTS = {
  'kẹo dừa truyền thống': {
    id: '1',
    name: 'Kẹo Dừa Truyền Thống',
    price: 45000,
    ingredients: ['Dừa tươi Bến Tre', 'Đường mía tự nhiên', 'Muối biển'],
    weight: '200g',
    stock: true,
    description:
      'Kẹo dừa nguyên chất theo công thức truyền thống, vị ngọt thanh từ đường mía tự nhiên',
    image:
      'https://images.pexels.com/photos/8964887/pexels-photo-8964887.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  'kẹo dừa sầu riêng': {
    id: '2',
    name: 'Kẹo Dừa Sầu Riêng',
    price: 65000,
    ingredients: ['Dừa tươi', 'Sầu riêng Đồng Nai', 'Đường mía'],
    weight: '180g',
    stock: true,
    description:
      'Sự kết hợp hoàn hảo giữa vị ngọt của dừa và hương thơm đặc trưng của sầu riêng',
    image:
      'https://images.pexels.com/photos/7525184/pexels-photo-7525184.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  'kẹo dừa cà phê': {
    id: '3',
    name: 'Kẹo Dừa Cà Phê',
    price: 55000,
    ingredients: ['Dừa tươi', 'Cà phê Arabica rang mộc', 'Đường mía'],
    weight: '200g',
    stock: true,
    description:
      'Hương vị đậm đà của cà phê Arabica hòa quyện cùng vị ngọt của dừa',
    image:
      'https://images.pexels.com/photos/8835098/pexels-photo-8835098.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  'combo kẹo dừa mix': {
    id: '4',
    name: 'Combo Kẹo Dừa Mix',
    price: 125000,
    ingredients: [
      'Dừa tươi',
      'Cà phê Arabica',
      'Sầu riêng Đồng Nai',
      'Đường mía',
    ],
    weight: '300g (3 x 100g)',
    stock: true,
    description:
      'Combo 3 vị: truyền thống, cà phê và sầu riêng. Phù hợp làm quà tặng',
    image:
      'https://images.pexels.com/photos/11022492/pexels-photo-11022492.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
};

// Dummy order data
const DUMMY_ORDERS = {
  ORD12345: {
    id: 'ORD12345',
    status: 'Đang giao hàng',
    total: 170000,
    delivery_date: '2024-01-20',
    items: [
      { name: 'Kẹo Dừa Truyền Thống', quantity: 2, price: 45000 },
      { name: 'Kẹo Dừa Sầu Riêng', quantity: 1, price: 65000 },
    ],
  },
  ORD67890: {
    id: 'ORD67890',
    status: 'Đã giao hàng',
    total: 125000,
    delivery_date: '2024-01-15',
    items: [{ name: 'Combo Kẹo Dừa Mix', quantity: 1, price: 125000 }],
  },
  ORD11111: {
    id: 'ORD11111',
    status: 'Đang xử lý',
    total: 220000,
    delivery_date: '2024-01-25',
    items: [
      { name: 'Kẹo Dừa Cà Phê', quantity: 2, price: 55000 },
      { name: 'Kẹo Dừa Sầu Riêng', quantity: 2, price: 65000 },
    ],
  },
};

class ChatbotProcessor {
  // Remove stop words from question
  private removeStopWords(text: string): string {
    const words = text.toLowerCase().split(' ');
    return words.filter((word) => !STOP_WORDS.includes(word)).join(' ');
  }

  // Extract product name from question
  private extractProductName(text: string): string | null {
    const cleanText = text.toLowerCase();

    // Try exact matches first
    for (const product of PRODUCT_WHITELIST) {
      if (cleanText.includes(product.toLowerCase())) {
        return product;
      }
    }

    // Try partial matches
    if (cleanText.includes('kẹo dừa')) {
      if (cleanText.includes('sầu riêng')) return 'kẹo dừa sầu riêng';
      if (cleanText.includes('cà phê')) return 'kẹo dừa cà phê';
      if (cleanText.includes('dâu tây')) return 'kẹo dừa dâu tây';
      if (cleanText.includes('truyền thống')) return 'kẹo dừa truyền thống';
      return 'kẹo dừa truyền thống'; // default
    }

    if (cleanText.includes('combo')) return 'combo kẹo dừa mix';
    if (cleanText.includes('hộp quà')) return 'hộp quà tết cody';
    if (cleanText.includes('giỏ quà')) return 'giỏ quà bến tre';

    return null;
  }

  // Extract order ID from question
  private extractOrderId(text: string): string | null {
    const orderRegex = /ORD\d+/gi;
    const match = text.match(orderRegex);
    return match ? match[0].toUpperCase() : null;
  }

  // Extract info type from question
  private extractInfoType(text: string): string {
    const cleanText = text.toLowerCase();

    for (const [infoType, keywords] of Object.entries(INFO_TYPE_KEYWORDS)) {
      for (const keyword of keywords) {
        if (cleanText.includes(keyword)) {
          return infoType;
        }
      }
    }

    return 'description'; // default
  }

  // Parse user question into structured query
  public parseQuestion(question: string): {
    entity_type: 'product' | 'order' | 'unknown';
    product_name?: string;
    order_id?: string;
    info_type?: string;
  } {
    const cleanQuestion = this.removeStopWords(question);

    // Check for order ID first
    const orderId = this.extractOrderId(question);
    if (orderId) {
      return {
        entity_type: 'order',
        order_id: orderId,
        info_type: this.extractInfoType(question),
      };
    }

    // Check for product name
    const productName = this.extractProductName(question);
    if (productName) {
      return {
        entity_type: 'product',
        product_name: productName,
        info_type: this.extractInfoType(question),
      };
    }

    return { entity_type: 'unknown' };
  }

  // Query product data
  private queryProduct(productName: string, infoType: string): ChatbotResponse {
    const product = DUMMY_PRODUCTS[productName as keyof typeof DUMMY_PRODUCTS];

    if (!product) {
      return {
        entity_type: 'product',
        message: 'Xin lỗi, tôi không tìm thấy sản phẩm này trong hệ thống.',
        response_type: 'text',
      };
    }

    switch (infoType) {
      case 'price':
        return {
          entity_type: 'product',
          product_name: productName,
          info_type: 'price',
          data: { price: product.price },
          message: `Giá của ${product.name} là ${product.price.toLocaleString(
            'vi-VN'
          )}đ`,
          response_type: 'text',
        };

      case 'ingredients':
        return {
          entity_type: 'product',
          product_name: productName,
          info_type: 'ingredients',
          data: { ingredients: product.ingredients },
          message: `Thành phần của ${product.name}:`,
          response_type: 'list',
        };

      case 'stock':
        return {
          entity_type: 'product',
          product_name: productName,
          info_type: 'stock',
          data: { stock: product.stock },
          message: product.stock
            ? `${product.name} hiện đang có sẵn`
            : `${product.name} hiện đang hết hàng`,
          response_type: 'text',
        };

      case 'weight':
        return {
          entity_type: 'product',
          product_name: productName,
          info_type: 'weight',
          data: { weight: product.weight },
          message: `Trọng lượng của ${product.name} là ${product.weight}`,
          response_type: 'text',
        };

      case 'image':
        return {
          entity_type: 'product',
          product_name: productName,
          info_type: 'image',
          data: { image: product.image, name: product.name },
          message: `Hình ảnh của ${product.name}:`,
          response_type: 'image',
        };

      default:
        return {
          entity_type: 'product',
          product_name: productName,
          info_type: 'description',
          data: { description: product.description },
          message: product.description,
          response_type: 'text',
        };
    }
  }

  // Query order data
  private queryOrder(orderId: string, infoType: string): ChatbotResponse {
    const order = DUMMY_ORDERS[orderId as keyof typeof DUMMY_ORDERS];

    if (!order) {
      return {
        entity_type: 'order',
        message: 'Xin lỗi, tôi không tìm thấy đơn hàng này trong hệ thống.',
        response_type: 'text',
      };
    }

    switch (infoType) {
      case 'status':
        return {
          entity_type: 'order',
          order_id: orderId,
          info_type: 'status',
          data: { status: order.status },
          message: `Trạng thái đơn hàng ${orderId}: ${order.status}`,
          response_type: 'text',
        };

      case 'total':
        return {
          entity_type: 'order',
          order_id: orderId,
          info_type: 'total',
          data: { total: order.total },
          message: `Tổng tiền đơn hàng ${orderId}: ${order.total.toLocaleString(
            'vi-VN'
          )}đ`,
          response_type: 'text',
        };

      case 'delivery':
        return {
          entity_type: 'order',
          order_id: orderId,
          info_type: 'delivery',
          data: { delivery_date: order.delivery_date },
          message: `Ngày giao hàng dự kiến cho đơn hàng ${orderId}: ${order.delivery_date}`,
          response_type: 'text',
        };

      case 'items':
        return {
          entity_type: 'order',
          order_id: orderId,
          info_type: 'items',
          data: { items: order.items },
          message: `Sản phẩm trong đơn hàng ${orderId}:`,
          response_type: 'list',
        };

      default:
        return {
          entity_type: 'order',
          order_id: orderId,
          info_type: 'status',
          data: {
            status: order.status,
            total: order.total,
            delivery_date: order.delivery_date,
          },
          message: `Thông tin đơn hàng ${orderId}:\n- Trạng thái: ${
            order.status
          }\n- Tổng tiền: ${order.total.toLocaleString(
            'vi-VN'
          )}đ\n- Ngày giao hàng: ${order.delivery_date}`,
          response_type: 'text',
        };
    }
  }

  // Main processing method
  public processQuery(question: string): ChatbotResponse {
    const parsed = this.parseQuestion(question);

    if (
      parsed.entity_type === 'product' &&
      parsed.product_name &&
      parsed.info_type
    ) {
      return this.queryProduct(parsed.product_name, parsed.info_type);
    }

    if (parsed.entity_type === 'order' && parsed.order_id && parsed.info_type) {
      return this.queryOrder(parsed.order_id, parsed.info_type);
    }

    return {
      entity_type: 'unknown',
      message:
        'Xin lỗi, tôi chưa hiểu câu hỏi của bạn. Bạn có thể hỏi về sản phẩm (giá, thành phần, tồn kho) hoặc đơn hàng (trạng thái, tổng tiền, ngày giao hàng).',
      response_type: 'text',
    };
  }
}

// Singleton instance
const chatbotProcessor = new ChatbotProcessor();

// Mock API endpoint
export const chatbotQuery = async (
  query: ChatbotQuery
): Promise<ChatbotResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return chatbotProcessor.processQuery(query.question);
};

// Export for testing
export { ChatbotProcessor };

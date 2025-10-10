import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAddToCart } from '../hooks/useCart';
import { Product } from '../types/product';
import { CustomProduct } from '../types/customCombo';
import ProductCard from '../components/ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { QueryKeys } from '../lib/queryKeys';

interface CustomCombo {
  candies: Product[];
  basket: Product | null;
  stickers: Product[];
  totalPrice: number;
}

const CustomComboPage: React.FC = () => {
  const { t } = useLanguage();
  const { mutate: addToCart } = useAddToCart();
  
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: [QueryKeys.products.all],
    queryFn: async () => {
      const response = await fetch('/api/products');
      return response.json();
    }
  });

  const [customCombo, setCustomCombo] = useState<CustomCombo>({
    candies: [],
    basket: null,
    stickers: [],
    totalPrice: 0
  });

  const candies = products?.filter(p => p.category === 'candy') || [];
  const baskets = products?.filter(p => p.category === 'basket') || [];
  const stickers = products?.filter(p => p.category === 'sticker') || [];

  const calculateTotal = (combo: Partial<CustomCombo>) => {
    const candyTotal = combo.candies?.reduce((sum, candy) => sum + candy.price, 0) || 0;
    const basketPrice = combo.basket?.price || 0;
    const stickerTotal = combo.stickers?.reduce((sum, sticker) => sum + sticker.price, 0) || 0;
    return candyTotal + basketPrice + stickerTotal;
  };

  const handleAddCandy = (candy: Product) => {
    setCustomCombo(prev => {
      const newCombo = {
        ...prev,
        candies: [...prev.candies, candy]
      };
      return { ...newCombo, totalPrice: calculateTotal(newCombo) };
    });
  };

  const handleRemoveCandy = (candyId: number) => {
    setCustomCombo(prev => {
      const newCombo = {
        ...prev,
        candies: prev.candies.filter(c => c.id !== candyId.toString())
      };
      return { ...newCombo, totalPrice: calculateTotal(newCombo) };
    });
  };

  const handleSelectBasket = (basket: Product) => {
    setCustomCombo(prev => {
      const newCombo = { ...prev, basket };
      return { ...newCombo, totalPrice: calculateTotal(newCombo) };
    });
  };

  const handleToggleSticker = (sticker: Product) => {
    setCustomCombo(prev => {
      const stickerExists = prev.stickers.some(s => s.id === sticker.id);
      const newCombo = {
        ...prev,
        stickers: stickerExists
          ? prev.stickers.filter(s => s.id !== sticker.id)
          : [...prev.stickers, sticker]
      };
      return { ...newCombo, totalPrice: calculateTotal(newCombo) };
    });
  };

  const handleAddToCart = () => {
    if (!customCombo.basket) {
      alert(t('custom.selectBasketFirst'));
      return;
    }

    const customProduct: CustomProduct = {
        id: Date.now().toString(),
        name: t('custom.giftBasket'),
        description: `${customCombo.candies.length} candies, ${customCombo.stickers.length} stickers`,
        price: customCombo.totalPrice,
        image: customCombo.basket.image,
        category: 'custom',
        items: {
            candies: customCombo.candies,
            basket: customCombo.basket,
            stickers: customCombo.stickers
        },
        slug: '',
        stockQuantity: 0,
        categories: [],
        images: []
    };

    addToCart({ product: customProduct, quantity: customCombo.candies.length + customCombo.stickers.length + 1 });
    setCustomCombo({ candies: [], basket: null, stickers: [], totalPrice: 0 });
  };

  // ✅ RETURN JSX HERE
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-700 mb-8">{t('custom.createGiftBasket')}</h1>

      {/* Basket Selection */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{t('custom.selectBasket')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {baskets.map(basket => (
            <div
              key={basket.id}
              className={`cursor-pointer ${
                customCombo.basket?.id === basket.id ? 'ring-2 ring-green-500' : ''
              }`}
              onClick={() => handleSelectBasket(basket)}
            >
              <ProductCard product={basket} />
            </div>
          ))}
        </div>
      </section>

      {/* Candy Selection */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{t('custom.selectCandies')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {candies.map(candy => (
            <div key={candy.id}>
              <ProductCard product={candy} />
              <button
                onClick={() => handleAddCandy(candy)}
                className="mt-2 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
              >
                {t('custom.addToBasket')}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Candies */}
      {customCombo.candies.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('custom.selectedCandies')}</h2>
          <div className="flex flex-wrap gap-4">
            {customCombo.candies.map(candy => (
              <div key={candy.id} className="flex items-center gap-2 bg-gray-100 p-2 rounded">
                <span>{candy.name}</span>
                <button
                  onClick={() => handleRemoveCandy(Number(candy.id))}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sticker Selection */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{t('custom.selectStickers')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {stickers.map(sticker => (
            <div
              key={sticker.id}
              className={`cursor-pointer p-2 border rounded ${
                customCombo.stickers.some(s => s.id === sticker.id)
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200'
              }`}
              onClick={() => handleToggleSticker(sticker)}
            >
              <img src={sticker.image} alt={sticker.name} className="w-full h-auto" />
              <p className="text-sm text-center mt-2">{sticker.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Summary and Add to Cart */}
      <section className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">
              {t('custom.total')}: ${customCombo.totalPrice.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">
              {customCombo.candies.length} {t('custom.candies')}, {customCombo.stickers.length}{' '}
              {t('custom.stickers')}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!customCombo.basket || customCombo.candies.length === 0}
            className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {t('custom.addToCart')}
          </button>
        </div>
      </section>
    </div>
  );
};

export default CustomComboPage;

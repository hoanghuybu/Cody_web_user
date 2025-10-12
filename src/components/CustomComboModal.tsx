import { Search, ShoppingCart } from '@mui/icons-material';
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { AlertCircle, X } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useAllCategories } from '../hooks/useCategories';
import { useProductSearch } from '../hooks/useProducts';
import { Product } from '../types/product';

// Add animation styles
const styles = `
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
`;

// Add styles to document
if (
  typeof document !== 'undefined' &&
  !document.querySelector('#custom-combo-styles')
) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'custom-combo-styles';
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#10b981',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#10b981',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        },
      },
    },
  },
});

interface ComboLine {
  product: Product;
  quantity: 1; // Fixed quantity of 1 for each product
}

interface ComboForm {
  name: string;
  products: ComboLine[];
  tags: string[];
}

interface ComboErrors {
  name?: string;
  products?: string;
}

const CustomComboModal: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [form, setForm] = useState<ComboForm>({
    name: '',
    products: [],
    tags: [],
  });
  const [errors, setErrors] = useState<ComboErrors>({});
  const [touched, setTouched] = useState<Record<keyof ComboErrors, boolean>>({
    name: false,
    products: false,
  });
  const [tagInput, setTagInput] = useState('');
  const [showNamePrompt, setShowNamePrompt] = useState(false);

  // Reset states when modal opens
  useEffect(() => {
    if (open) {
      setShowNamePrompt(true);
      // Auto focus name input when modal opens
      const timer = setTimeout(() => {
        const nameInput = document.querySelector<HTMLInputElement>(
          'input[data-combo-name-input="true"]'
        );
        if (nameInput) {
          nameInput.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Get categories
  const { data: categoriesData } = useAllCategories();
  const categories = categoriesData?.data?.content || [];

  const getCategoryId = (categoryParam: string) => {
    if (categoryParam === 'all') return undefined;
    const categoryById = categories.find((cat) => cat.id === categoryParam);
    if (categoryById) return categoryParam;
    const categoryBySlug = categories.find((cat) => cat.slug === categoryParam);
    return categoryBySlug ? categoryBySlug.id : undefined;
  };

  const actualCategoryId = getCategoryId(selectedCategory);

  // Get products with filters
  const { data: productsData } = useProductSearch({
    page: 0,
    size: 50,
    search: query || undefined,
    categoryId: actualCategoryId,
    sortBy: sortBy === 'name' ? 'name' : 'price',
    sortDirection: sortBy === 'price-high' ? 'DESC' : 'ASC',
  });
  const products = productsData?.data?.content || [];

  const validateField = (
    name: keyof ComboErrors,
    value: any
  ): string | undefined => {
    switch (name) {
      case 'name':
        if (!value || !value.trim()) return t('customCombo.errorNameRequired');
        if (value.trim().length < 3) return t('customCombo.errorNameMin');
        if (value.trim().length > 50) return t('customCombo.errorNameMax');
        return;
      case 'products':
        if (!Array.isArray(value) || value.length < 2)
          return t('customCombo.errorProductsMin');
        if (value.length > 5) return t('customCombo.errorProductsMax');
        return;
      default:
        return;
    }
  };

  const validate = (): boolean => {
    const newErrors: ComboErrors = {};
    newErrors.name = validateField('name', form.name);
    newErrors.products = validateField('products', form.products);
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== undefined);
  };

  const addProductLine = (p: Product) => {
    setForm((prev) => {
      const exist = prev.products.find((l) => l.product.id === p.id);
      if (exist) return prev; // Already exists, don't add again
      if (prev.products.length >= 5) return prev; // Max limit reached

      const newProducts = [
        ...prev.products,
        { product: p, quantity: 1 as const },
      ];
      return { ...prev, products: newProducts };
    });
    setTouched((prev) => ({ ...prev, products: true }));
    const newProducts = [...form.products, { product: p, quantity: 1 }];
    const error = validateField('products', newProducts);
    setErrors((prev) => ({ ...prev, products: error }));
  };

  const updateQuantity = (productId: string, qty: number) => {
    setForm((prev) => ({
      ...prev,
      products: prev.products.map((l) =>
        l.product.id === productId ? { ...l, quantity: 1 as const } : l
      ),
    }));
  };

  const removeLine = (productId: string) => {
    setForm((prev) => ({
      ...prev,
      products: prev.products.filter((l) => l.product.id !== productId),
    }));
    setTouched((prev) => ({ ...prev, products: true }));
    const newProducts = form.products.filter((l) => l.product.id !== productId);
    const error = validateField('products', newProducts);
    setErrors((prev) => ({ ...prev, products: error }));
  };

  const handleNameChange = (value: string) => {
    setForm((prev) => ({ ...prev, name: value }));
    setTouched((prev) => ({ ...prev, name: true }));
    const error = validateField('name', value);
    setErrors((prev) => ({ ...prev, name: error }));
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput('');
    }
  };

  const subtotal = useMemo(
    () => form.products.reduce((s, l) => s + l.product.price * l.quantity, 0),
    [form.products]
  );

  const confirmCombo = () => {
    setTouched({ name: true, products: true });

    if (!validate()) {
      return;
    }

    const includedProducts = form.products
      .map((l) => l.product.name)
      .join(', ');
    const messagePart = form.tags.length
      ? `${t('customCombo.descriptionMessagePrefix')}${form.tags.join(', ')}`
      : '';
    const description = `${t(
      'customCombo.descriptionIntro'
    )}${includedProducts}${messagePart}`;

    // Create a synthetic product representing the combo
    const comboProduct: Product = {
      id: 'combo:' + Date.now(),
      name: form.name.trim(),
      description,
      slug: 'combo-' + Date.now(),
      price: subtotal,
      originalPrice: undefined,
      stockQuantity: 9999,
      categories: [],
      images: [],
    } as Product;

    // add combo product once
    addToCart(comboProduct);

    // Gọi api create combo sau đó trả về thông tin combo rồi add nó vào card

    // store details in localStorage
    try {
      const combos = JSON.parse(localStorage.getItem('custom_combos') || '[]');
      combos.push({
        id: comboProduct.id,
        lines: form.products.map((l) => ({
          id: l.product.id,
          name: l.product.name,
          qty: l.quantity,
          price: l.product.price,
        })),
        tags: form.tags,
      });
      localStorage.setItem('custom_combos', JSON.stringify(combos));
    } catch (e) {
      // ignore
    }

    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5 sm:p-8">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className="relative bg-white rounded-xl w-full max-w-5xl mx-auto shadow-xl 
               overflow-hidden flex flex-col max-h-[calc(100vh-40px)]"
      >
        {/* Header with gold accent */}
        <div className="bg-gradient-to-r from-primary-green via-green-600 to-primary-green relative p-10 text-white">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-20 h-20 bg-yellow-300 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/2 right-0 w-16 h-16 bg-yellow-300 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <div className="relative flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-playfair tracking-wide">
                {t('customCombo.title')}
                <span className="ml-2 text-yellow-300">✨</span>
              </h3>
              <p className="text-green-100 mt-1 flex items-center">
                <span className="w-8 h-px bg-yellow-300/50 mr-3"></span>
                {t('customCombo.subtitle')}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full border border-white/20 hover:bg-white/10 hover:border-yellow-300/50 transition-all duration-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Main content with steps */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[calc(100vh-200px)]">
            {/* Left side - Product Selection */}
            <div className="lg:col-span-2 space-y-6 pb-[10px]">
              {/* Step 1: Name */}
              <div className="bg-gradient-to-b from-yellow-50 to-yellow-100/50 rounded-lg p-4 border border-yellow-200 shadow-sm">
                <div className="flex items-center gap-2 text-warm-brown mb-3">
                  <div className="w-6 h-6 rounded-full bg-primary-green text-white flex items-center justify-center text-sm font-semibold shadow-md shadow-green-200">
                    1
                  </div>
                  <h4 className="font-semibold flex items-center">
                    <span>{t('customCombo.stepNameTitle')}</span>
                    <div className="h-px w-12 bg-gradient-to-r from-yellow-400/50 to-transparent ml-3 hidden sm:block"></div>
                  </h4>
                </div>
                <div className="relative">
                  <input
                    value={form.name}
                    onChange={(e) => {
                      handleNameChange(e.target.value);
                      if (showNamePrompt) setShowNamePrompt(false);
                    }}
                    className={`w-full rounded-md border px-4 py-2.5 text-sm ${
                      touched.name && errors.name
                        ? 'border-red-400'
                        : showNamePrompt
                        ? 'border-yellow-400 ring-2 ring-yellow-200'
                        : 'border-neutral-300'
                    } transition-all duration-300`}
                    placeholder={t('customCombo.namePlaceholder')}
                    data-combo-name-input="true"
                  />
                  {showNamePrompt && (
                    <div className="absolute -top-12 left-0 right-0 bg-yellow-50 text-yellow-800 px-4 py-2 rounded-lg border border-yellow-200 shadow-sm flex items-center gap-2 animate-fade-in">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm">
                        {t('customCombo.namePrompt')}
                      </span>
                    </div>
                  )}
                  {touched.name && errors.name && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Step 2: Add Products */}
              <div className="bg-gradient-to-b from-yellow-50 to-yellow-100/50 rounded-lg p-4 border border-yellow-200 shadow-sm">
                <div className="flex items-center gap-2 text-warm-brown mb-3">
                  <div className="w-6 h-6 rounded-full bg-primary-green text-white flex items-center justify-center text-sm font-semibold shadow-md shadow-green-200">
                    2
                  </div>
                  <h4 className="font-semibold flex items-center">
                    <span>{t('customCombo.stepProductsTitle')}</span>
                    <div className="h-px w-12 bg-gradient-to-r from-yellow-400/50 to-transparent ml-3 hidden sm:block"></div>
                  </h4>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-yellow-100/50 shadow-sm">
                  <ThemeProvider theme={theme}>
                    <div className="space-y-3">
                      {/* Search */}
                      <div className="relative">
                        <input
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          className="w-full rounded-md border border-neutral-300 pl-9 pr-4 py-2.5 text-sm"
                          placeholder={t('customCombo.searchPlaceholder')}
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>

                      {/* Filters */}
                      <div className="flex flex-wrap gap-3">
                        {/* Category Filter */}
                        <FormControl size="small" sx={{ minWidth: 200 }}>
                          <InputLabel>
                            {t('customCombo.categoryLabel')}
                          </InputLabel>
                          <Select
                            value={selectedCategory}
                            label={t('customCombo.categoryLabel')}
                            onChange={(e) =>
                              setSelectedCategory(e.target.value)
                            }
                          >
                            <MenuItem value="all">
                              {t('customCombo.allCategories')}
                            </MenuItem>
                            {categories.map((cat: any) => (
                              <MenuItem key={cat.id} value={cat.id}>
                                {cat.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        {/* Sort Filter */}
                        <FormControl size="small" sx={{ minWidth: 200 }}>
                          <InputLabel>{t('customCombo.sortLabel')}</InputLabel>
                          <Select
                            value={sortBy}
                            label={t('customCombo.sortLabel')}
                            onChange={(e) => setSortBy(e.target.value)}
                          >
                            <MenuItem value="name">
                              {t('customCombo.sortName')}
                            </MenuItem>
                            <MenuItem value="price-low">
                              {t('customCombo.sortPriceLow')}
                            </MenuItem>
                            <MenuItem value="price-high">
                              {t('customCombo.sortPriceHigh')}
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </div>

                      {/* Active Filters */}
                      {(query || selectedCategory !== 'all') && (
                        <Box
                          sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 1,
                            alignItems: 'center',
                          }}
                        >
                          {selectedCategory !== 'all' && (
                            <Chip
                              label={
                                categories.find(
                                  (c: any) => c.id === selectedCategory
                                )?.name || selectedCategory
                              }
                              onDelete={() => setSelectedCategory('all')}
                              color="primary"
                              variant="outlined"
                              size="small"
                            />
                          )}

                          {query && (
                            <Chip
                              label={`${t(
                                'customCombo.searchChipPrefix'
                              )}: "${query}"`}
                              onDelete={() => setQuery('')}
                              color="primary"
                              variant="outlined"
                              size="small"
                            />
                          )}
                        </Box>
                      )}
                    </div>
                  </ThemeProvider>

                  <div className="mx-4  divide-y divide-gray-100">
                    {products.map((p: Product) => (
                      <div
                        key={p.id}
                        className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors"
                      >
                        {p.images?.[0] && (
                          <img
                            src={p.images[0].imageUrl}
                            alt={p.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900 truncate">
                            {p.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {p.price?.toLocaleString()} VNĐ
                          </div>
                          {p.description && (
                            <div className="text-xs text-gray-500 truncate">
                              {p.description}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => addProductLine(p)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 
                            ${
                              form.products.length >= 5
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : form.products.find(
                                    (l) => l.product.id === p.id
                                  )
                                ? 'bg-green-100 text-primary-green cursor-default'
                                : 'bg-primary-green text-white hover:bg-primary-green/90'
                            }`}
                          disabled={
                            form.products.length >= 5 ||
                            !!form.products.find((l) => l.product.id === p.id)
                          }
                        >
                          {form.products.find((l) => l.product.id === p.id)
                            ? t('customCombo.buttonAdded')
                            : form.products.length >= 5
                            ? t('customCombo.buttonLimitReached')
                            : t('customCombo.buttonAddToBox')}
                        </button>
                      </div>
                    ))}
                    {products.length === 0 && (
                      <div className="p-8 text-center text-gray-500">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                          <Search className="h-6 w-6 text-gray-400" />
                        </div>
                        <p>{t('customCombo.noProducts')}</p>
                      </div>
                    )}
                  </div>
                </div>
                {touched.products && errors.products && (
                  <p className="mt-2 text-xs text-red-500">{errors.products}</p>
                )}
              </div>
            </div>

            {/* Right side - Preview */}
            <div className="space-y-6">
              <div className="bg-gradient-to-b from-yellow-50 to-yellow-100/50 rounded-lg p-4 sticky top-4 border border-yellow-200 shadow-sm">
                <h4 className="font-semibold text-warm-brown mb-4 flex items-center">
                  <span className="text-primary-green">
                    {t('customCombo.previewTitle')}
                  </span>
                  <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs border border-yellow-200">
                    {t('customCombo.previewRange')}
                  </span>
                </h4>

                {/* Selected products */}
                <div className="space-y-3 mb-6">
                  {form.products.map((line) => (
                    <div
                      key={line.product.id}
                      className="bg-white rounded-lg p-3 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        {line.product.images?.[0] && (
                          <img
                            src={line.product.images[0].imageUrl}
                            alt={line.product.name}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">
                            {line.product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {line.product.price?.toLocaleString()} VNĐ
                          </div>
                        </div>
                        <button
                          onClick={() => removeLine(line.product.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {form.products.length === 0 && (
                    <div className="text-center py-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center mx-auto mb-3 shadow-inner">
                        <ShoppingCart className="h-6 w-6 text-primary-green" />
                      </div>
                      <p className="text-primary-green font-medium">
                        {t('customCombo.emptyTitle')}
                      </p>
                      <p className="text-sm text-yellow-700">
                        {t('customCombo.emptySubtitle')}
                      </p>
                    </div>
                  )}
                </div>

                {/* Step 3: Add Message/Tags */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-warm-brown mb-3">
                    <div className="w-6 h-6 rounded-full bg-primary-green text-white flex items-center justify-center text-sm font-semibold shadow-md shadow-green-200">
                      3
                    </div>
                    <h4 className="font-semibold flex items-center">
                      <span>{t('customCombo.stepMessageTitle')}</span>
                      <div className="h-px w-12 bg-gradient-to-r from-yellow-400/50 to-transparent ml-3 hidden sm:block"></div>
                    </h4>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-yellow-100/50 shadow-sm">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {form.tags.map((tag) => (
                        <div
                          key={tag}
                          className="px-3 py-1 text-sm bg-green-50 text-primary-green rounded-full border border-primary-green/20"
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 w-full">
                      <input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        className="flex-1 min-w-0 rounded-full border border-neutral-300 px-4 py-2 text-sm"
                        placeholder={t('customCombo.messagePlaceholder')}
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      />
                      <button
                        onClick={addTag}
                        className="px-4 py-2 bg-primary-green text-white rounded-full text-sm font-medium hover:bg-primary-green/90 transition-colors whitespace-nowrap"
                      >
                        {t('customCombo.addTagButton')}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Total and Actions */}
                <div className="bg-gradient-to-b from-white to-yellow-50 rounded-lg p-4 border border-yellow-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-yellow-700 font-medium">
                      {t('customCombo.totalPrice')}
                    </div>
                    <div className="text-xl font-bold text-primary-green bg-green-50 px-4 py-1 rounded-full border border-green-100">
                      {subtotal.toLocaleString()} VNĐ
                    </div>
                  </div>
                  <div className="space-y-3">
                    <button
                      onClick={confirmCombo}
                      className="w-full bg-gradient-to-r from-primary-green to-green-600 text-white py-3 rounded-full font-semibold shadow-lg shadow-green-200/50
                        disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-green-200/80 transition-all duration-300
                        disabled:from-gray-400 disabled:to-gray-500"
                      disabled={!form.name.trim() || form.products.length === 0}
                    >
                      {t('customCombo.addToCart')}
                    </button>
                    <button
                      onClick={onClose}
                      className="w-full border border-yellow-200 py-3 rounded-full text-yellow-700 
                        hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-800 transition-colors
                        bg-gradient-to-r from-yellow-50 to-transparent"
                    >
                      {t('common.cancel')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomComboModal;

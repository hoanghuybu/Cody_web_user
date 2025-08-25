import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, Grid, List, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { allProducts, categories } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
  Box,
  Chip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';

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
    // Disable scroll lock globally for all MUI modals/menus/popovers
    MuiModal: {
      defaultProps: {
        disableScrollLock: true,
      },
    },
  },
});

const ProductsPage = () => {
  const { category } = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const muiTheme = useTheme();
  const isSmall = useMediaQuery(muiTheme.breakpoints.down('sm'));

  const { t } = useLanguage();

  const filteredProducts = allProducts
    .filter(product =>
      selectedCategory === 'all' || product.category === selectedCategory
    )
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen bg-cream py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-warm-brown font-playfair mb-4">{t('products.headerTitle')}</h1>
            <p className="text-lg text-gray-600">{t('products.headerSubtitle')}</p>
          </div>

          {/* Filters and Search - Using MUI */}
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-8">
            <div className="flex flex-col gap-4">
              {/* Search - Using MUI TextField */}
              <TextField
                fullWidth
                placeholder={t('products.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search className="h-4 w-4 text-gray-400" />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                size={isSmall ? 'medium' : 'small'}
              />

              {/* Filters - Using MUI Select */}
              <div className="flex flex-col sm:flex-row items-start sm:items-start gap-3">
                {/* Category Filter */}
                <FormControl size={isSmall ? 'medium' : 'small'} sx={{ minWidth: 200, width: { xs: '100%', sm: 'auto' } }}>
                  <InputLabel>{t('products.category')}</InputLabel>
                  <Select
                    value={selectedCategory}
                    label={t('products.category')}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                  >
                    <MenuItem value="all">{t('products.allCategories')}</MenuItem>
                    {categories.map(cat => (
                      <MenuItem key={cat.id} value={cat.id}>{t(`categories.${cat.id}`)}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Sort Filter */}
                <FormControl size={isSmall ? 'medium' : 'small'} sx={{ minWidth: 200, width: { xs: '100%', sm: 'auto' } }}>
                  <InputLabel>{t('products.sort')}</InputLabel>
                  <Select
                    value={sortBy}
                    label={t('products.sort')}
                    onChange={(e) => setSortBy(e.target.value)}
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                  >
                    <MenuItem value="name">{t('products.sortName')}</MenuItem>
                    <MenuItem value="price-low">{t('products.sortPriceLow')}</MenuItem>
                    <MenuItem value="price-high">{t('products.sortPriceHigh')}</MenuItem>
                  </Select>
                </FormControl>

                {/* View Mode - Giữ nguyên Tailwind buttons */}
                <div className="inline-flex self-start sm:self-start rounded-md shadow-sm isolate" role="group">
                  <button
                    onClick={() => setViewMode('grid')}
                    type="button"
                    className={`relative rounded-l-md px-3 py-2 text-sm font-semibold ring-1 ring-inset focus:z-10 ${viewMode === 'grid'
                        ? 'bg-primary-green text-white hover:bg-primary-green/90 ring-primary-green'
                        : 'bg-white text-gray-700 hover:bg-gray-50 ring-gray-300'
                      }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    type="button"
                    className={`relative -ml-px rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset focus:z-10 ${viewMode === 'list'
                        ? 'bg-primary-green text-white hover:bg-primary-green/90 ring-primary-green'
                        : 'bg-white text-gray-700 hover:bg-gray-50 ring-gray-300'
                      }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Active Filters - Using MUI Chips */}
              {(searchTerm || selectedCategory !== 'all') && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center', pt: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    {t('products.activeFilters')}:
                  </Typography>

                  {selectedCategory !== 'all' && (
                    <Chip
                      label={t(`categories.${selectedCategory}`)}
                      onDelete={() => setSelectedCategory('all')}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  )}

                  {searchTerm && (
                    <Chip
                      label={`${t('products.searchLabel')}: "${searchTerm}"`}
                      onDelete={() => setSearchTerm('')}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  )}
                </Box>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              {t('products.showing').replace('{count}', String(filteredProducts.length))}
              {selectedCategory !== 'all' && (
                <span> {t('products.inCategory').replace('{category}', t(`categories.${selectedCategory}`))}</span>
              )}
            </p>
          </div>

          {/* Products Grid */}
          <div className={`grid gap-6 ${viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
            }`}>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">{t('products.noResultsTitle')}</h3>
              <p className="text-gray-500">{t('products.noResultsSubtitle')}</p>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ProductsPage;
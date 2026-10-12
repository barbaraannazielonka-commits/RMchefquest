import heroImg from './images/hero_culinary_academy_1791789962868.jpg';
import norwegianImg from './images/norwegian_kitchen_station_1791789975363.jpg';
import internationalImg from './images/international_market_ingredients_1791789988146.jpg';
import banquetImg from './images/chef_final_banquet_1791789999572.jpg';

/**
 * Robust image references for both Vite bundler, local dev, GitHub repository, and Cloudflare Pages.
 * Direct imports ensure Vite bundles and hashes these into dist/assets/*.jpg,
 * while fallback public paths ensure /images/*.jpg works in static hosting.
 */
export const IMAGES = {
  hero: heroImg || '/images/hero_academy.jpg',
  norwegian: norwegianImg || '/images/norwegian_station.jpg',
  international: internationalImg || '/images/international_ingredients.jpg',
  banquet: banquetImg || '/images/chef_banquet.jpg',
};

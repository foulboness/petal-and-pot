import { GiftBundle } from '../types';

export const GIFT_BUNDLES_DATA: GiftBundle[] = [
  {
    id: 'bundle-cottage-trio',
    name: 'The Cottage Greenery Trio',
    price: 68,
    originalPrice: 84,
    image: 'https://i.pinimg.com/736x/2e/cd/e6/2ecde6de0e477c82131b7eaf007952f2.jpg',
    tag: 'Bestseller Bundle',
    description: 'Our three sweetest and most forgiving foliage companions: Chinese Money Plant, Golden Pothos, and a miniature Boston Fern in matching pastel ceramic pots.',
    includes: [
      'Pilea Peperomioides (4" Pot)',
      'Marble Golden Pothos (4" Pot)',
      'Cottage Boston Fern (4" Pot)',
      '3x Artisan Cream Speckle Ceramic Pots',
      'Illustrated botanical care cards',
      'Handwritten gift note & wax-sealed envelope'
    ]
  },
  {
    id: 'bundle-pet-safe-sanctuary',
    name: 'The 100% Pet-Safe Jungle',
    price: 74,
    originalPrice: 92,
    image: 'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=800&q=80',
    tag: 'Pet Parent Favorite ♡',
    description: 'Breathe easy knowing every single leaf in this bundle is non-toxic and ASPCA certified pet-safe for curious furry friends.',
    includes: [
      'Rattlesnake Calathea (6" Pot)',
      'Cottage Boston Fern (6" Pot)',
      'Variegated String of Hearts (4" Hanging Pot)',
      'Organic Cat Grass Seeds bonus pouch',
      'Petal & Pot cotton tote bag'
    ]
  },
  {
    id: 'kit-beginner-gardener',
    name: 'The Complete Plant Parent Starter Kit',
    price: 49,
    originalPrice: 62,
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
    tag: 'Beginner Essential',
    isKit: true,
    description: 'Everything a budding green thumb needs to thrive! Includes our signature heirloom brass mister, digital moisture probe, and organic plant food.',
    includes: [
      'Vintage Brass Foliage Mister (300ml)',
      'No-Battery Soil Moisture Meter',
      'Organic Kelp & Seaweed Liquid Foliage Feed (8oz)',
      'Japanese precision stainless pruning shears',
      'Petal & Pot "Little Green Book" care handbook'
    ]
  },
  {
    id: 'bundle-desktop-oasis',
    name: 'Mindful Desktop Zen Bundle',
    price: 44,
    originalPrice: 55,
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80',
    tag: 'Work From Home Gift',
    description: 'Compact, air-purifying, and ultra low-maintenance companions designed to bring calm focus to your desk or study nook.',
    includes: [
      'Sunset Jade Plant (4" Clay Pot)',
      'Bishop’s Cap Spineless Cactus (3" Sandstone)',
      'Natural Beech Wood Coaster Saucers (set of 2)',
      'Herbal lavender aromatherapy sachet'
    ]
  }
];

export const BOTANICAL_GREETING_CARDS = [
  {
    id: 'card-botanical-fern',
    name: 'Vintage Fern & Wildflower Card',
    price: 6,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
    theme: 'Warm congratulations, housewarming or birthday'
  },
  {
    id: 'card-you-grow-girl',
    name: '"You Grow, Girl" Botanical Greeting',
    price: 6,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    theme: 'Cheer up, friendship, celebration'
  },
  {
    id: 'card-cottage-greenhouse',
    name: 'Cottage Glasshouse Watercolor Card',
    price: 6,
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80',
    theme: 'Thank you & warm wishes'
  }
];

export type ProductCategory = 
  | 'all'
  | 'houseplants'
  | 'succulents'
  | 'cacti'
  | 'flowers'
  | 'terrariums'
  | 'pots-accessories';

export type DifficultyLevel = 'Easy-peasy' | 'Moderate' | 'Green thumb';
export type SunlightRequirement = 'Low light' | 'Bright indirect' | 'Direct sun';

export interface Plant {
  id: string;
  name: string;
  botanicalName: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  additionalImages?: string[];
  difficulty: DifficultyLevel;
  sunlight: SunlightRequirement;
  sunlightDetail: string;
  petFriendly: boolean;
  petFriendlyNotes: string;
  watering: string;
  wateringScheduleDays: number;
  humidity: string;
  temperature: string;
  size: string;
  availableSizes?: { name: string; priceMultiplier: number }[];
  description: string;
  careTips: string[];
  featured?: boolean;
  bestSeller?: boolean;
  seasonal?: boolean;
  inStock: boolean;
  potOptions?: string[];
}

export interface CartItem {
  id: string; // unique item instance id
  plant: Plant;
  quantity: number;
  selectedSize: string;
  potColor?: string;
  giftCardMessage?: string;
}

export interface CareGuide {
  id: string;
  title: string;
  category: 'watering' | 'sunlight' | 'repotting' | 'troubleshooting';
  readTime: string;
  iconName: string;
  excerpt: string;
  fullContent: string;
  steps?: { step: number; title: string; detail: string }[];
  symptoms?: { symptom: string; cause: string; cure: string }[];
}

export interface GiftBundle {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  tag: string;
  description: string;
  includes: string[];
  isKit?: boolean;
}

export interface QuizAnswerState {
  light?: string;
  experience?: string;
  space?: string;
  pet?: string;
  watering?: string;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  email: string;
  deliveryType: 'delivery' | 'pickup';
  deliveryDate: string;
  address?: string;
  giftNote?: string;
  total: number;
  items: CartItem[];
}

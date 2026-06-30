export interface Product {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  images: string[];
  processor: string;
  ram: string;
  storage: string;
  display: string;
  graphics?: string;
  os?: string;
  warranty: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  inStock: boolean;
  isNew: boolean;
  isFeatured: boolean;
  tags: string[];
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  order: number;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string[];
  published: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  avatar?: string;
  videoUrl?: string;
  productBought?: string;
  featured: boolean;
  createdAt: string;
}

export interface Enquiry {
  _id: string;
  name: string;
  phone: string;
  email: string;
  productName?: string;
  message: string;
  source: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
}

export interface GalleryImage {
  _id: string;
  title: string;
  url: string;
  category: string;
  order: number;
  createdAt: string;
}

export interface ProductFilters {
  brand?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  processor?: string;
  ram?: string;
  storage?: string;
  graphics?: string;
  search?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

/* ─── Cart ─────────────────────────────────────────────────────────── */
export interface CartItem {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  inStock: boolean;
}

/* ─── Order ─────────────────────────────────────────────────────────── */
export type OrderStatus =
  | 'confirmed'
  | 'processing'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentMethod =
  | 'cod'
  | 'upi'
  | 'razorpay'
  | 'emi'
  | 'bank_transfer';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface OrderAddress {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  orderId: string;
  items: OrderItem[];
  address: OrderAddress;
  subtotal: number;
  deliveryCharge: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  status: OrderStatus;
  estimatedDelivery: string;
  createdAt: string;
  updatedAt: string;
}

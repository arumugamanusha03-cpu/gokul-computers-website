import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
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
  specifications: Map<string, string>;
  inStock: boolean;
  isNew: boolean;
  isFeatured: boolean;
  tags: string[];
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    images: [{ type: String }],
    processor: { type: String, required: true },
    ram: { type: String, required: true },
    storage: { type: String, required: true },
    display: { type: String, required: true },
    graphics: { type: String },
    os: { type: String },
    warranty: { type: String, default: '1 Year' },
    description: { type: String, required: true },
    features: [{ type: String }],
    specifications: { type: Map, of: String },
    inStock: { type: Boolean, default: true } as any,
    isNew: { type: Boolean, default: false } as any,
    isFeatured: { type: Boolean, default: false } as any,
    tags: [{ type: String }],
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ProductSchema.index({ name: 'text', description: 'text', brand: 'text' });
ProductSchema.index({ slug: 1 });
ProductSchema.index({ brand: 1, category: 1 });
ProductSchema.index({ price: 1 });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

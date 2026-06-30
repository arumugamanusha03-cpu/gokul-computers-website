import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  title: string;
  url: string;
  publicId: string;
  category: string;
  order: number;
  createdAt: Date;
}

const GallerySchema = new Schema<IGallery>(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    category: { type: String, required: true, enum: ['showroom', 'products', 'customers', 'services'] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);

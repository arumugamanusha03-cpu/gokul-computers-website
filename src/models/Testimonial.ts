import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  location: string;
  rating: number;
  review: string;
  avatar?: string;
  videoUrl?: string;
  productBought?: string;
  featured: boolean;
  createdAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    location: { type: String, default: 'Trichy' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    avatar: { type: String },
    videoUrl: { type: String },
    productBought: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

import { Metadata } from 'next';
import AssistantPage from '@/components/assistant/AssistantPage';

export const metadata: Metadata = {
  title: 'AI Assistant - Gokul Computers',
  description: 'Chat with our AI assistant for laptop recommendations, service info, pricing, and more.',
};

export default function Assistant() {
  return <AssistantPage />;
}

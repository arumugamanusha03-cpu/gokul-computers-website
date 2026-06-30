import { NextRequest, NextResponse } from 'next/server';

const STORE_CONTEXT = `You are an AI assistant for Gokul Computers, a laptop store in Trichy, Tamil Nadu, India.

ABOUT THE STORE:
- Name: Gokul Computers
- Address: No B-7, Vignesh Plaza, Near Domino's Pizza, 1st Cross, Thillai Nagar, Trichy - 620018
- Phone: 07947130911
- Working Hours: 9:30 AM - 8:00 PM (All days open, including weekends)
- Founded: 1993 (31+ years of experience)
- Status: Lenovo Authorized Dealer for Trichy region
- Customers served: 5000+, Products sold: 10000+

BRANDS AVAILABLE: Lenovo, HP, Dell, Acer, ASUS, Apple, MSI

SERVICES:
1. Laptop Sales - New laptops from all major brands
2. Laptop Repair - All brands, all issues (24-48 hour turnaround)
3. Motherboard Repair - Chip-level repair (3-5 days)
4. RAM Upgrade - All DDR types, same day service
5. SSD Upgrade - M.2 NVMe and SATA (2-4 hours)
6. Printer Repair - All brands
7. Data Recovery - HDD, SSD, memory cards
8. Desktop Assembly - Custom builds
9. AMC Services - Annual Maintenance Contracts for businesses

PAYMENT & EMI:
- Accepted: Cash, UPI (GPay/PhonePe/Paytm), Debit/Credit Card, Bank Transfer
- EMI: Available on purchases above ₹10,000
- 0% EMI: 3 months and 6 months on select products
- Other EMI: 12 and 24 months available

WARRANTY:
- All products: Original manufacturer warranty
- Lenovo: 1-3 years onsite warranty
- HP/Dell/ASUS: 1-2 years warranty
- Repair work: 30-90 days warranty on labor and parts

PRICE RANGES (approximate):
- Budget laptops: ₹25,000 - ₹45,000
- Mid-range: ₹45,000 - ₹80,000
- Premium: ₹80,000 - ₹1,50,000
- Ultra-premium (Apple MacBook Pro, Dell XPS): ₹1,50,000+

LANGUAGES: Respond in English by default. If user writes in Tamil or Tanglish, respond in the same language.

Always be helpful, honest, and guide customers to the right product. Mention WhatsApp (07947130911) or store visit for purchases.`;

export async function POST(req: NextRequest) {
  try {
    const { message, history, context } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Fallback response without AI
      const fallback = generateFallbackResponse(message);
      return NextResponse.json({ response: fallback });
    }

    // Try OpenAI first
    if (process.env.OPENAI_API_KEY) {
      try {
        const messages = [
          { role: 'system', content: STORE_CONTEXT },
          ...(history || []).map((h: any) => ({
            role: h.role,
            content: h.content,
          })),
          { role: 'user', content: message },
        ];

        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages,
            max_tokens: 500,
            temperature: 0.7,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          return NextResponse.json({ response: data.choices[0].message.content });
        }
      } catch (err) {
        console.error('OpenAI error:', err);
      }
    }

    // Try Gemini
    if (process.env.GEMINI_API_KEY) {
      try {
        const contents = [
          ...(history || []).map((h: any) => ({
            role: h.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: h.content }],
          })),
          { role: 'user', parts: [{ text: message }] },
        ];

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents,
              systemInstruction: { parts: [{ text: STORE_CONTEXT }] },
              generationConfig: { maxOutputTokens: 500, temperature: 0.7 },
            }),
          }
        );

        if (res.ok) {
          const data = await res.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) return NextResponse.json({ response: text });
        }
      } catch (err) {
        console.error('Gemini error:', err);
      }
    }

    // All APIs failed, use fallback
    return NextResponse.json({ response: generateFallbackResponse(message) });
  } catch (error) {
    console.error('Assistant error:', error);
    return NextResponse.json(
      { response: "I'm having trouble right now. Please call **07947130911** or visit us at **Thillai Nagar, Trichy** (9:30 AM - 8:00 PM, All days)." },
      { status: 200 }
    );
  }
}

function generateFallbackResponse(message: string): string {
  const msg = message.toLowerCase();

  if (msg.includes('price') || msg.includes('cost') || msg.includes('rate')) {
    return "Our laptop prices start from **₹25,000** for budget models and go up to **₹2,00,000+** for premium models. We have laptops for every budget!\n\n📞 Call us at **07947130911** for the latest prices and availability.\n📍 Visit us at **Thillai Nagar, Trichy** (9:30 AM - 8:00 PM)";
  }

  if (msg.includes('gaming')) {
    return "We have excellent gaming laptops! Popular choices:\n\n🎮 **HP Pavilion Gaming** - ₹79,990 (RTX 4050)\n🎮 **ASUS ROG Strix** - ₹1,09,990 (RTX 4070)\n🎮 **MSI Katana** - ₹89,990 (RTX 3060)\n\nAll with 144Hz+ display, high RAM and SSD. Call **07947130911** for current stock!";
  }

  if (msg.includes('emi') || msg.includes('installment') || msg.includes('finance')) {
    return "Yes! We offer **EMI options** on purchases above ₹10,000:\n\n✅ **3 months - 0% interest**\n✅ **6 months - 0% interest**\n📊 12 months - 12% interest\n📊 24 months - 15% interest\n\nCall **07947130911** for EMI eligibility and documentation requirements.";
  }

  if (msg.includes('repair') || msg.includes('service') || msg.includes('fix')) {
    return "Our expert technicians handle all laptop repairs:\n\n🔧 Screen replacement\n🔧 Motherboard repair\n🔧 RAM & SSD upgrade\n🔧 Data recovery\n🔧 Software issues\n\n⏱️ Most repairs: **24-48 hours**\n📞 Call **07947130911** or visit our service center at **Thillai Nagar, Trichy**";
  }

  if (msg.includes('location') || msg.includes('address') || msg.includes('where')) {
    return "📍 **Gokul Computers**\nNo B-7, Vignesh Plaza,\nNear Domino's Pizza, 1st Cross,\nThillai Nagar, Trichy - 620018\n\n⏰ Open **9:30 AM - 8:00 PM** (All Days)\n📞 **07947130911**\n\nWe are easy to find - just near Domino's Pizza in Thillai Nagar!";
  }

  if (msg.includes('lenovo')) {
    return "Gokul Computers is a **Lenovo Authorized Dealer** for Trichy! We carry the complete Lenovo lineup:\n\n💻 IdeaPad series (student laptops)\n💻 ThinkPad series (business laptops)\n💻 Legion series (gaming laptops)\n💻 Yoga series (2-in-1 convertibles)\n\nAll with genuine Lenovo warranty. Call **07947130911** for availability!";
  }

  if (msg.includes('apple') || msg.includes('macbook')) {
    return "Yes, we have **Apple MacBooks** available!\n\n🍎 MacBook Air M2 - ₹1,14,900\n🍎 MacBook Air M3 - ₹1,24,900\n🍎 MacBook Pro M3 - ₹1,99,900+\n\nAll come with Apple warranty. Call **07947130911** or visit us for the latest stock.";
  }

  if (msg.includes('whatsapp') || msg.includes('contact')) {
    return "You can reach us through:\n\n📞 **Phone: 07947130911**\n💬 **WhatsApp: 07947130911**\n📍 **Store: Thillai Nagar, Trichy**\n⏰ **Timings: 9:30 AM - 8:00 PM (All Days)**\n\nFeel free to WhatsApp us for quick responses!";
  }

  return "Thank you for your question! For the most accurate and up-to-date information, please:\n\n📞 Call us: **07947130911**\n💬 WhatsApp: **07947130911**\n📍 Visit: **Gokul Computers, Thillai Nagar, Trichy**\n⏰ Timings: **9:30 AM - 8:00 PM (All Days)**\n\nOur team will be happy to assist you!";
}

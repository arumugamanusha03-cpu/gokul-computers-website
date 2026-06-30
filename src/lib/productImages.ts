// Central registry of real product images from Unsplash (no CDN blocking)
// Each product gets multiple angles for gallery view

export const PRODUCT_IMAGES: Record<string, string[]> = {
  // ── Lenovo ──────────────────────────────────────────────────────────
  'lenovo-ideapad-slim-5': [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=90&auto=format',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=90&auto=format',
    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=90&auto=format',
    'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=90&auto=format',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=90&auto=format',
  ],
  'lenovo-thinkpad-x1-carbon': [
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=90&auto=format',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=90&auto=format',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=90&auto=format',
    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=90&auto=format',
  ],
  // ── HP ──────────────────────────────────────────────────────────────
  'hp-pavilion-gaming-15': [
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=90&auto=format',
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=90&auto=format',
    'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=90&auto=format',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=90&auto=format',
  ],
  // ── Dell ────────────────────────────────────────────────────────────
  'dell-xps-15-9530': [
    'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=90&auto=format',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=90&auto=format',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=90&auto=format',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=90&auto=format',
    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=90&auto=format',
  ],
  // ── ASUS ────────────────────────────────────────────────────────────
  'asus-rog-strix-g16': [
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=90&auto=format',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=90&auto=format',
    'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=90&auto=format',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=90&auto=format',
  ],
  // ── Acer ────────────────────────────────────────────────────────────
  'acer-aspire-5': [
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=90&auto=format',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=90&auto=format',
    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=90&auto=format',
  ],
  // ── Apple ───────────────────────────────────────────────────────────
  'apple-macbook-air-m2': [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=90&auto=format',
    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=90&auto=format',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=90&auto=format',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=90&auto=format',
  ],
  // ── MSI ─────────────────────────────────────────────────────────────
  'msi-katana-gf66': [
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=90&auto=format',
    'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=90&auto=format',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=90&auto=format',
  ],
};

// Brand → representative image for cards when slug-specific not found
export const BRAND_IMAGES: Record<string, string> = {
  Lenovo: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=85&auto=format',
  HP:     'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&q=85&auto=format',
  Dell:   'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=85&auto=format',
  ASUS:   'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=85&auto=format',
  Acer:   'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=85&auto=format',
  Apple:  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=85&auto=format',
  MSI:    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=85&auto=format',
  default:'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&q=85&auto=format',
};

export function getProductImages(slug: string, brand: string): string[] {
  return (
    PRODUCT_IMAGES[slug] ||
    [BRAND_IMAGES[brand] || BRAND_IMAGES.default]
  );
}

export function getProductThumbnail(slug: string, brand: string): string {
  return getProductImages(slug, brand)[0];
}

// Accessories images — using direct Unsplash photo IDs for reliability
export const ACCESSORY_IMAGES: Record<string, string> = {
  // RAM stick — Kingston/Corsair DDR4/DDR5 sticks
  ram:        'https://images.unsplash.com/photo-1562976540-1502c2145851?w=600&q=90&auto=format&fit=crop',
  // NVMe SSD
  ssd:        'https://images.unsplash.com/photo-1597673030470-87f51f34b1c3?w=600&q=90&auto=format&fit=crop',
  // 2.5" HDD
  hdd:        'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=600&q=90&auto=format&fit=crop',
  // Keyboard
  keyboard:   'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=90&auto=format&fit=crop',
  // Mouse
  mouse:      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=90&auto=format&fit=crop',
  // USB-C charger / power adapter
  charger:    'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=90&auto=format&fit=crop',
  // Laptop backpack / bag
  bag:        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=90&auto=format&fit=crop',
  // Monitor
  monitor:    'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=90&auto=format&fit=crop',
  // Cooling pad — using a clean tech peripheral image
  coolpad:    'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=90&auto=format&fit=crop',
  // Printer
  printer:    'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&q=90&auto=format&fit=crop',
  // Headphones
  headphones: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=90&auto=format&fit=crop',
  // Webcam
  webcam:     'https://images.unsplash.com/photo-1587580760226-2f5d1c8b5ef3?w=600&q=90&auto=format&fit=crop',
  // Laptop battery pack
  battery:    'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=90&auto=format&fit=crop',
};

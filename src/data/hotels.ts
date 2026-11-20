export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  guests: number;
  features: string[];
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  rating: number;
  reviews: number;
  priceFrom: number;
  description: string;
  amenities: string[];
  image: string;
  rooms: Room[];
}

export const hotels: Hotel[] = [
  {
    id: 'grand-lviv',
    name: 'Grand Hotel Lviv',
    city: 'Львів, Україна',
    rating: 4.8,
    reviews: 428,
    priceFrom: 2400,
    description: 'Елегантний готель у центрі Львова поруч з історичним центром.',
    amenities: ['Wi-Fi', 'Сніданок', 'SPA', 'Паркінг'],
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    rooms: [
      {
        id: 'standard',
        name: 'Standard Room',
        description: 'Затишний номер для двох гостей.',
        price: 2400,
        guests: 2,
        features: ['1 двоспальне ліжко', 'Wi-Fi', 'Кондиціонер'],
      },
      {
        id: 'deluxe',
        name: 'Deluxe Room',
        description: 'Просторий номер із видом на місто.',
        price: 3400,
        guests: 3,
        features: ['King-size bed', 'Вид на місто', 'Сніданок', 'SPA'],
      },
    ],
  },
  {
    id: 'carpathian-resort',
    name: 'Carpathian Resort',
    city: 'Буковель, Україна',
    rating: 4.9,
    reviews: 612,
    priceFrom: 3100,
    description: 'Гірський курорт для активного відпочинку та релаксу.',
    amenities: ['Басейн', 'SPA', 'Wi-Fi', 'Сніданок'],
    image:
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
    rooms: [
      {
        id: 'mountain',
        name: 'Mountain Room',
        description: 'Номер із панорамним видом на Карпати.',
        price: 3100,
        guests: 2,
        features: ['King-size bed', 'Балкон', 'Вид на гори'],
      },
      {
        id: 'family',
        name: 'Family Suite',
        description: 'Великий номер для сімейного відпочинку.',
        price: 4600,
        guests: 4,
        features: ['2 кімнати', '4 гості', 'Балкон', 'Сніданок'],
      },
    ],
  },
  {
    id: 'odesa-sea',
    name: 'Sea View Odesa',
    city: 'Одеса, Україна',
    rating: 4.7,
    reviews: 351,
    priceFrom: 2800,
    description: 'Сучасний готель біля моря з видом на Чорне море.',
    amenities: ['Море поруч', 'Wi-Fi', 'Басейн', 'Сніданок'],
    image:
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80',
    rooms: [
      {
        id: 'sea-standard',
        name: 'Sea View Standard',
        description: 'Комфортний номер із видом на море.',
        price: 2800,
        guests: 2,
        features: ['1 ліжко', 'Балкон', 'Вид на море'],
      },
      {
        id: 'sea-suite',
        name: 'Sea View Suite',
        description: 'Преміальний номер для тривалого відпочинку.',
        price: 4200,
        guests: 3,
        features: ['King-size bed', 'Тераса', 'Вид на море', 'Сніданок'],
      },
    ],
  },
];

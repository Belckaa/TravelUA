import type { Hotel, Route, Tour, User, Weather } from '../types';

const tours: Tour[] = [
  {
    id: '1',
    title: 'Магічний Львів',
    description: 'Архітектура, культура та гастрономія старовинного Львова.',
    country: 'Україна',
    city: 'Львів',
    price: 420,
    duration: 3,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1567600476088-9c5a3d6f8f0d?auto=format&fit=crop&w=1200&q=80',
    category: 'Культурний',
  },
  {
    id: '2',
    title: 'Карпати Adventure',
    description: 'Гірські маршрути, водоспади та незабутні краєвиди.',
    country: 'Україна',
    city: 'Карпати',
    price: 680,
    duration: 5,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    category: 'Пригоди',
  },
  {
    id: '3',
    title: 'Париж Weekend',
    description: 'Ейфелева вежа, Лувр, Монмартр та французька кухня.',
    country: 'Франція',
    city: 'Париж',
    price: 950,
    duration: 4,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    category: 'Європа',
  },
  {
    id: '4',
    title: 'Італійський смак',
    description: 'Рим, Флоренція та Венеція в одній подорожі.',
    country: 'Італія',
    city: 'Рим',
    price: 1250,
    duration: 7,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1200&q=80',
    category: 'Європа',
  },
];

const hotels: Hotel[] = [
  {
    id: '1',
    name: 'Grand Lviv Hotel',
    city: 'Львів',
    country: 'Україна',
    pricePerNight: 95,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    description: 'Комфортний готель у центрі міста.',
  },
  {
    id: '2',
    name: 'Mountain Resort',
    city: 'Буковель',
    country: 'Україна',
    pricePerNight: 140,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80',
    description: 'Гірський курорт із видом на Карпати.',
  },
  {
    id: '3',
    name: 'Paris Central',
    city: 'Париж',
    country: 'Франція',
    pricePerNight: 180,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    description: 'Готель поруч із головними памʼятками.',
  },
];

const routes: Route[] = [
  {
    id: '1',
    title: 'Стежка Довбуша',
    distance: 8.5,
    duration: 3.5,
    difficulty: 'medium',
    description: 'Популярний гірський маршрут серед мальовничих скель.',
    points: ['Яремче', 'Скелі Довбуша', 'Карпатський ліс'],
  },
  {
    id: '2',
    title: 'Ворохта — Кукул',
    distance: 14,
    duration: 5,
    difficulty: 'hard',
    description: 'Панорамний маршрут для досвідчених мандрівників.',
    points: ['Ворохта', 'Полонина Кукул', 'Гірський хребет'],
  },
  {
    id: '3',
    title: 'Озеро Синевир',
    distance: 5,
    duration: 2,
    difficulty: 'easy',
    description: 'Легкий маршрут до одного з найвідоміших озер України.',
    points: ['Паркінг', 'Лісова стежка', 'Синевир'],
  },
];

export const tourService = {
  async getTours(): Promise<Tour[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return tours;
  },
  async getTour(id: string): Promise<Tour | undefined> {
    return tours.find((tour) => tour.id === id);
  },
};

export const hotelService = {
  async getHotels(): Promise<Hotel[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return hotels;
  },
};

export const routeService = {
  async getRoutes(): Promise<Route[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return routes;
  },
};

export const weatherService = {
  async getWeather(city: string): Promise<Weather> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    return {
      city,
      temperature: 18,
      condition: 'Мінлива хмарність',
      humidity: 62,
      wind: 4,
    };
  },
};

export const authService = {
  async login(email: string, password: string): Promise<User> {
    if (!email || password.length < 4) {
      throw new Error('Некоректні дані авторизації');
    }

    const user: User = {
      id: 'user-1',
      name: email.split('@')[0],
      email,
    };

    localStorage.setItem('access_token', 'demo-jwt-token');
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },

  getCurrentUser(): User | null {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  },
};

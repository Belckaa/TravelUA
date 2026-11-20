export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Tour {
  id: string;
  title: string;
  description: string;
  country: string;
  city: string;
  price: number;
  duration: number;
  rating: number;
  image: string;
  category: string;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  pricePerNight: number;
  rating: number;
  image: string;
  description: string;
}

export interface Route {
  id: string;
  title: string;
  distance: number;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  points: string[];
}

export interface Weather {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  wind: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

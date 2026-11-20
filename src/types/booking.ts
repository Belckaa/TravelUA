export type BookingItemType = 'hotel' | 'tour';

export interface BookingItem {
  id: string;
  type: BookingItemType;
  title: string;
  subtitle: string;
  price: number;
  quantity: number;
  dateFrom?: string;
  dateTo?: string;
  guests?: number;
  image?: string;
}

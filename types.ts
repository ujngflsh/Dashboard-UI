export interface Order {
  id: string;
  name: string;
  address: string;
  date: string;
  price: string;
  status: 'pending' | 'dispatch' | 'completed';
  avatar: string;
}

export type SortDirection = 'asc' | 'desc';
export type SortColumn = keyof Order;

export interface FilterState {
  status: string;
  search: string;
  startDate: string;
  endDate: string;
}

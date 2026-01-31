export type Ticket = {
  id: number;
  name: string;
  venue: string;
  date: string;
  capacity: number;
  slug: string;
  team_b: string;
  team_a: string;
  ticket_types: {
    id: number;
    name: string;
    price: string;
    remaining: number;
  }[];
};

export type NewsItem = {
  id: number;
  title: string;
  content: string;
  author: string;
  thumbnail: string;
  created_at: string;
  slug: string;
};

export interface Player {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  team: string;
  number: number;
  nationality: string;
  dob: string;
  height: number;
  weight: number;
  bio: string;
  thumbnails?: string | null;
  slug: string;
}
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  created_at: string;
  merchImage?: string;
}

export interface Match {
  id: number;
  teamA: string;
  teamB: string;
  teamA_score: number;
  teamB_score: number;
  current_minute: number;
  status: string;
  date: string;
}

export type NewsFormData = {
  id?: number;
  title?: string;
  content?: string;
  author?: string;
  thumbnail?: File | string;
  slug?: string;
};

export type PlayerFormData = {
  id?: number;
  first_name?: string;
  last_name?: string;
  position?: string;
  team?: string;
  number?: number;
  nationality?: string;
  dob?: string;
  height?: number;
  weight?: number;
  bio?: string;
  thumbnails?: File | string | null;
  slug?: string;
};

export type ProductFormData = {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  created_at?: string;
  merchImage?: File | string;
};
export type Order = {
  id: string;
  total_amount: string;
  created_at: string;
  created_by: string;
  item: {
    product: string;
    quantity: string;
    price: string;
  };
};

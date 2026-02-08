export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  featured?: boolean;
  finishes?: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  message: string;
  productId?: string;
  createdAt: string;
}

export interface NavItem {
  label: string;
  href: string;
}

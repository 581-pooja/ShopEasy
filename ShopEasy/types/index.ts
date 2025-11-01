export interface Address {
    _id: string;
    name: string;
    houseNo: string;
    landmark: string;
    street: string;
    postalCode: string;
    mobileNo: string;
  }
  
  export interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
    carouselImages?: string[];
    color?: string;
    size?: string;
    oldPrice?: number;
  }
  
  export interface CartItem extends Product {
    quantity: number;
  }
  
  export interface Order {
    _id: string;
    products: Product[];
    totalPrice: number;
    createdAt?: string;
  }
  
  export type PaymentMethod = "cash" | "card";
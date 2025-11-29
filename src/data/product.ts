// src/product.ts
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
//Viet them 22/11
export interface CartItem {
  product: Product;
  quantity: number;
  // Bạn có thể thêm các field logic khác từ Flutter nếu cần, ví dụ:
  // createdDate?: Date;
}

export const products: Product[] = [
  {
    id: 1,
    title: "Dragon Ender",
    price: 109.95,
    description: "COMING SOON !!",
    category: "TEDDY BEAR",
    image: "https://i.ibb.co/DBx4D49/image.png",
  },
  {
    id: 2,
    title: "Cow",
    price: 22.3,
    description: "COMING SOON !!",
    category: "TEDDY BEAR",
    image: "https://i.ibb.co/PsJQP5s4/image.png",
  },
  {
    id: 3,
    title: "Pig",
    price: 55.99,
    description: "COMING SOON !!",
    category: "TEDDY BEAR",
    image: "https://i.ibb.co/Rpg7xB1W/image.png",
  },
  {
    id: 4,
    title: "Creeper",
    price: 15.99,
    description: "COMING SOON !!",
    category: "TEDDY BEAR",
    image: "https://i.ibb.co/CpdDVZv4/image.png",
  },
  {
    id: 5,
    title: "Cat",
    price: 695,
    description: "COMING SOON !!",
    category: "TEDDY BEAR",
    image: "https://i.ibb.co/yBNKzzvP/image.png",
  },
  {
    id: 6,
    title: "Sheep",
    price: 168,
    description: "COMING SOON !!",
    category: "TEDDY BEAR",
    image: "https://i.ibb.co/DfQr2Bxv/image.png",
  },
  {
    id: 7,
    title: "Iron Golem",
    price: 9.99,
    description: "COMING SOON !!",
    category: "TEDDY BEAR",
    image: "https://i.ibb.co/Df8XZ64G/image.png",
  },
  {
    id: 8,
    title: "Dolphin",
    price: 10.99,
    description: "COMING SOON !!",
    category: "TEDDY BEAR",
    image: "https://i.ibb.co/bM3zVxJd/image.png",
  },
];

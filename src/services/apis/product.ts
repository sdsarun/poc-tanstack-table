import axios from "axios";

export type QueryFindAll = {
  offset?: number;
  limit?: number;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  categoryId: number;      // included when updating
  category: {
    id: number;
    name: string;
    image: string;
    creationAt: string;
    updatedAt: string;
  };
  images: string[];
  slug: string;
  creationAt: string;
  updatedAt: string;
};

const productService = {
  async findAll(query?: QueryFindAll) {
    const { data } = await axios.get<Product[]>("https://api.escuelajs.co/api/v1/products", {
      params: { ...query }
    });
    return data;
  }
};

export default productService;

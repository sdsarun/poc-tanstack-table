// apis/product.ts
import { faker } from "@faker-js/faker";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export type QueryFindAll = {
  page?: number;
  limit?: number;
};

const TOTAL_PRODUCTS = 123; // Simulate total records

function generateFakeProduct(): Product {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    description: faker.commerce.productDescription()
  };
}

function findAll(query?: QueryFindAll): Promise<{
  data: Product[];
  total: number;
  page: number;
  limit: number;
}> {
  const page = query?.page ?? 1;
  const limit = query?.limit ?? 10;

  const start = (page - 1) * limit;

  const data = Array.from({ length: Math.min(limit, TOTAL_PRODUCTS - start) }, generateFakeProduct);

  return new Promise(
    (resolve) =>
      setTimeout(() => {
        resolve({
          data,
          total: TOTAL_PRODUCTS,
          page,
          limit
        });
      }, 300) // simulate network latency
  );
}

export default {
  findAll
};

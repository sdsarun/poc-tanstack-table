import { keepPreviousData, useQuery } from "@tanstack/react-query";
import productService, { type QueryFindAll } from "../apis/product";

export function useProducts(query?: QueryFindAll) {
  return useQuery({
    queryKey: ["products", query],
    queryFn: () => productService.findAll(query),
    placeholderData: keepPreviousData
  });
}

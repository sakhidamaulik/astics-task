import { IProduct, OrderBy, PageLimit, SortColumnName } from "../models/Product.Model";
import axios from "axios";
import { IGetProductsResponse } from "../redux/ProductsDashboard.Actions";

const BASE_URL = "http://localhost:3004";

export const productsDashboardService = {
  createProduct: async (product: IProduct): Promise<IProduct> => {
    const url = `${BASE_URL}/products`;
    const response = await axios.post<IProduct>(url, product);

    return response.data;
  },

  deleteProduct: async (productId: string): Promise<void> => {
    const url = `${BASE_URL}/products/${productId}`;

    await axios.delete<string>(url);
  },

  getProducts: async (pageIndex: number, sortColumnName: SortColumnName, orderBy: OrderBy, searchText?: string): Promise<IGetProductsResponse> => {
    const sortQuery = sortColumnName ? `&_sort=${sortColumnName}&_order=${orderBy}` : '';

    const searchQuery = searchText ? `&q=${searchText}` : '';

    const url = `${BASE_URL}/products?_page=${pageIndex}&_limit=${PageLimit}${sortQuery}${searchQuery}`;

    const response = await axios.get<IProduct[]>(url);

    const productsResponse: IGetProductsResponse = {
      products: response.data,
      productsTotalCount: parseInt(response.headers['x-total-count'], 10) 
    }

    return productsResponse;
  }
};

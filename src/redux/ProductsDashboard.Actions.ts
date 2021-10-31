import { IProduct, OrderBy, SortColumnName } from "../models/Product.Model";

export interface Action<T extends string, U> {
  readonly type: T;
  readonly payload: U;
}

export function createAction<T extends string, U extends any>(
  type: T,
  payload: U
): Action<T, U> {
  return {
    type,
    payload,
  };
}

export interface IGetProductsRequest {
  pageIndex: number;
  sortColumnName: SortColumnName;
  orderBy: OrderBy;
  searchText: string | undefined;
}

export interface IGetProductsResponse {
  products: IProduct[];
  productsTotalCount: number;
}

export enum ProductsDashboardActionTypes {
  CREATE_PRODUCT = "Create Product",
  CREATE_PRODUCT_SUCCESS = "Create Product Success",
  CREATE_PRODUCT_FAILURE = "Create Product Failure",

  DELETE_PRODUCT = "Delete Product",
  DELETE_PRODUCT_SUCCESS = "Delete Product Success",
  DELETE_PRODUCT_FAILURE = "Delete Product Failure",

  GET_PRODUCTS = "Get Products",
  GET_PRODUCTS_SUCCESS = "Get Products Success",
  GET_PRODUCTS_FAILURE = "Get Products Failure",
}

export const ProductsDashboardActions = {
  CreateProduct: (
    product: IProduct
  ): Action<ProductsDashboardActionTypes.CREATE_PRODUCT, IProduct> => {
    return createAction(ProductsDashboardActionTypes.CREATE_PRODUCT, product);
  },
  CreateProductSuccess: (
    product: IProduct
  ): Action<ProductsDashboardActionTypes.CREATE_PRODUCT_SUCCESS, IProduct> =>
    createAction(ProductsDashboardActionTypes.CREATE_PRODUCT_SUCCESS, product),
  CreateProductFailure: (
    error: Error
  ): Action<ProductsDashboardActionTypes.CREATE_PRODUCT_FAILURE, Error> =>
    createAction(ProductsDashboardActionTypes.CREATE_PRODUCT_FAILURE, error),

  DeleteProduct: (
    productId: string
  ): Action<ProductsDashboardActionTypes.DELETE_PRODUCT, string> =>
    createAction(ProductsDashboardActionTypes.DELETE_PRODUCT, productId),
  DeleteProductSuccess: (): Action<
    ProductsDashboardActionTypes.DELETE_PRODUCT_SUCCESS,
    {}
  > => createAction(ProductsDashboardActionTypes.DELETE_PRODUCT_SUCCESS, {}),
  DeleteProductFailure: (
    error: Error
  ): Action<ProductsDashboardActionTypes.DELETE_PRODUCT_FAILURE, Error> =>
    createAction(ProductsDashboardActionTypes.DELETE_PRODUCT_FAILURE, error),

  GetProducts: (
    request: IGetProductsRequest
  ): Action<ProductsDashboardActionTypes.GET_PRODUCTS, IGetProductsRequest> =>
    createAction(ProductsDashboardActionTypes.GET_PRODUCTS, request),
  GetProductsSuccess: (
    response: IGetProductsResponse
  ): Action<ProductsDashboardActionTypes.GET_PRODUCTS_SUCCESS, IGetProductsResponse> =>
    createAction(ProductsDashboardActionTypes.GET_PRODUCTS_SUCCESS, response),
  GetProductsFailure: (
    error: Error
  ): Action<ProductsDashboardActionTypes.GET_PRODUCTS_FAILURE, Error> =>
    createAction(ProductsDashboardActionTypes.GET_PRODUCTS_FAILURE, error),
};

export type ProductActionsAllTypes =
  | ReturnType<typeof ProductsDashboardActions.CreateProduct>
  | ReturnType<typeof ProductsDashboardActions.CreateProductSuccess>
  | ReturnType<typeof ProductsDashboardActions.CreateProductFailure>
  | ReturnType<typeof ProductsDashboardActions.DeleteProduct>
  | ReturnType<typeof ProductsDashboardActions.DeleteProductSuccess>
  | ReturnType<typeof ProductsDashboardActions.DeleteProductFailure>
  | ReturnType<typeof ProductsDashboardActions.GetProducts>
  | ReturnType<typeof ProductsDashboardActions.GetProductsSuccess>
  | ReturnType<typeof ProductsDashboardActions.GetProductsFailure>;

import { IProduct, LoadState } from "../models/Product.Model";
import { ProductActionsAllTypes, ProductsDashboardActionTypes } from "./ProductsDashboard.Actions";

export interface IProductsDashboardState {
  productList: IProduct[];
  productListLoadState: LoadState;
  productsTotalCount: number;

  // To track new product creation
  productCreationLoadState: LoadState;

  productDeletionLoadState: LoadState;
}

const initialState: IProductsDashboardState = {
  productList: [],
  productListLoadState: LoadState.Initial,
  productsTotalCount: 0,
  productCreationLoadState: LoadState.Initial,
  productDeletionLoadState: LoadState.Initial
};

export function productsDashboardReducer(
  state: IProductsDashboardState = initialState,
  action: ProductActionsAllTypes
): IProductsDashboardState {
  switch (action.type) {
    case ProductsDashboardActionTypes.GET_PRODUCTS:
      return {
        ...state,
        productListLoadState: LoadState.Loading,
      };
    case ProductsDashboardActionTypes.GET_PRODUCTS_SUCCESS:
      const { products, productsTotalCount } = action.payload;

      return {
        ...state,
        productList: products,
        productsTotalCount,
        productListLoadState: LoadState.LoadSuccessful,
      };
    case ProductsDashboardActionTypes.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        productListLoadState: LoadState.LoadFailed,
      };

    case ProductsDashboardActionTypes.CREATE_PRODUCT:
      return {
        ...state,
        productCreationLoadState: LoadState.Loading,
      };
    case ProductsDashboardActionTypes.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        productCreationLoadState: LoadState.LoadSuccessful,
      };
    case ProductsDashboardActionTypes.CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        productCreationLoadState: LoadState.LoadFailed,
      };

    case ProductsDashboardActionTypes.DELETE_PRODUCT:
      return {
        ...state,
        productDeletionLoadState: LoadState.Loading,
      };
    case ProductsDashboardActionTypes.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        productDeletionLoadState: LoadState.LoadSuccessful,
      };
    case ProductsDashboardActionTypes.DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        productDeletionLoadState: LoadState.LoadFailed,
      };

    default:
      return state;
  }
}

export type ProductReducerState = ReturnType<typeof productsDashboardReducer>;

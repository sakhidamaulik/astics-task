import { createSelector } from "reselect";
import { IProduct, LoadState } from "../models/Product.Model";
import { IProductsDashboardState } from "./ProductsDashboard.Reducer";
import { RootReducerState } from "./RootReducer";

class ProductsDashboardSelectors {
  public static getProductList = createSelector<
    RootReducerState,
    IProductsDashboardState,
    IProduct[]
  >(
    (state) => state.productsDashboardState,
    (productsDashboardState) => productsDashboardState.productList
  );

  public static getProductsTotalCount = createSelector<
    RootReducerState,
    IProductsDashboardState,
    number
  >(
    (state) => state.productsDashboardState,
    (productsDashboardState) => productsDashboardState.productsTotalCount
  );

  public static getProductCreationLoadState = createSelector<
    RootReducerState,
    IProductsDashboardState,
    LoadState
  >(
    (state) => state.productsDashboardState,
    (productsDashboardState) => productsDashboardState.productCreationLoadState
  );

  public static getProductDeletionLoadState = createSelector<
    RootReducerState,
    IProductsDashboardState,
    LoadState
  >(
    (state) => state.productsDashboardState,
    (productsDashboardState) => productsDashboardState.productDeletionLoadState
  );
}

export default ProductsDashboardSelectors;

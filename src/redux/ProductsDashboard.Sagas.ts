import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import {
  ProductsDashboardActionTypes,
  Action,
  ProductsDashboardActions,
  IGetProductsRequest,
} from "./ProductsDashboard.Actions";
import { IProduct } from "../models/Product.Model";
import { productsDashboardService } from "../services/ProductsDashboard.Service";

function* GetProducts(action: Action<ProductsDashboardActionTypes.GET_PRODUCTS, IGetProductsRequest>): SagaIterator {
  try {
    const { pageIndex, sortColumnName, orderBy, searchText } = action.payload;
    const productsResponse = yield call(productsDashboardService.getProducts, pageIndex, sortColumnName, orderBy, searchText);
    yield put(ProductsDashboardActions.GetProductsSuccess(productsResponse));
  } catch (e: any) {
    yield put(ProductsDashboardActions.GetProductsFailure(e));
  }
}

function* CreateProduct(
  action: Action<ProductsDashboardActionTypes.CREATE_PRODUCT, IProduct>
): SagaIterator {
  try {
    const newProduct = yield call(
      productsDashboardService.createProduct,
      action.payload
    );

    yield put(ProductsDashboardActions.CreateProductSuccess(newProduct));
  } catch (e: any) {
    yield put(ProductsDashboardActions.CreateProductFailure(e));
  }
}

function* DeleteProduct(
  action: Action<ProductsDashboardActionTypes.DELETE_PRODUCT, string>
): SagaIterator {
  try {
    yield call(
      productsDashboardService.deleteProduct,
      action.payload
    );

    yield put(ProductsDashboardActions.DeleteProductSuccess());
  } catch (e: any) {
    yield put(ProductsDashboardActions.DeleteProductFailure(e));
  }
}

export function* WatchProductsDashboardSagas(): SagaIterator {
  yield takeLatest(ProductsDashboardActionTypes.GET_PRODUCTS, GetProducts);
  yield takeEvery(ProductsDashboardActionTypes.CREATE_PRODUCT, CreateProduct);
  yield takeLatest(ProductsDashboardActionTypes.DELETE_PRODUCT, DeleteProduct);
}

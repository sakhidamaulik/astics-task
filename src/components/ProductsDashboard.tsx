import React, { useCallback, useEffect, useState } from "react";
import {
  IProduct,
  LoadState,
  OrderBy,
  SortColumnName,
} from "../models/Product.Model";

import { v4 as uuid } from "uuid";
import { ProductsDashboardBase } from "./ProductsDashboardBase";

import { useDispatch, useSelector } from "react-redux";
import { ProductsDashboardActions } from "../redux/ProductsDashboard.Actions";
import ProductsDashboardSelectors from "../redux/ProductsDashboard.Selectors";

export interface IProductsDashboardProps { }

export const ProductsDashboard: React.FunctionComponent<IProductsDashboardProps> =
  (): JSX.Element => {
    const dispatch = useDispatch();

    const [pageIndex, setPageIndex] = useState<number>(1);
    const [sortColumnName, setSortColumnName] = useState<SortColumnName>(
      SortColumnName.createdAt
    );
    const [orderBy, setOrderBy] = useState<OrderBy>(OrderBy.desc);

    const [searchText, setSearchText] = useState<string>();

    const productList = useSelector(ProductsDashboardSelectors.getProductList);
    const productsTotalCount = useSelector(
      ProductsDashboardSelectors.getProductsTotalCount
    );

    const productCreationLoadState = useSelector(
      ProductsDashboardSelectors.getProductCreationLoadState
    );

    const productDeletionLoadState = useSelector(
      ProductsDashboardSelectors.getProductDeletionLoadState
    );

    useEffect(() => {
      dispatch(
        ProductsDashboardActions.GetProducts({
          pageIndex,
          sortColumnName,
          orderBy,
          searchText,
        })
      );
    }, [dispatch, orderBy, pageIndex, searchText, sortColumnName]);

    useEffect(() => {
      if (productCreationLoadState === LoadState.LoadSuccessful) {
        setPageIndex(1);
        setSortColumnName(SortColumnName.createdAt);
        setOrderBy(OrderBy.desc);
        setSearchText(undefined);

        dispatch(
          ProductsDashboardActions.GetProducts({
            pageIndex: 1,
            sortColumnName: SortColumnName.createdAt,
            orderBy: OrderBy.desc,
            searchText: undefined,
          })
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productCreationLoadState, dispatch]);

    useEffect(() => {
      if (productDeletionLoadState === LoadState.LoadSuccessful) {
        setPageIndex(1);
        
        dispatch(
          ProductsDashboardActions.GetProducts({
            pageIndex: 1,
            sortColumnName,
            orderBy,
            searchText,
          })
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productDeletionLoadState, dispatch]);

    const onAddProductClick = useCallback(
      (newName: string, newPrice: number) => {
        const newProduct: IProduct = {
          id: uuid(),
          name: newName,
          price: newPrice,
          createdAt: new Date().toISOString(),
        };
        dispatch(ProductsDashboardActions.CreateProduct(newProduct));
      },
      [dispatch]
    );

    const onPageNumberChange = useCallback(
      (_event: React.ChangeEvent<unknown>, newPageNumber: number) => {
        setPageIndex(newPageNumber);
      },
      [setPageIndex]
    );

    const onNameHeaderClick = useCallback(() => {
      setSortColumnName(SortColumnName.name);
      setPageIndex(1);

      if (orderBy === OrderBy.asc) {
        setOrderBy(OrderBy.desc);
      } else {
        setOrderBy(OrderBy.asc);
      }
    }, [orderBy]);

    const onPriceHeaderClick = useCallback(() => {
      setSortColumnName(SortColumnName.price);
      setPageIndex(1);

      if (orderBy === OrderBy.asc) {
        setOrderBy(OrderBy.desc);
      } else {
        setOrderBy(OrderBy.asc);
      }
    }, [orderBy]);

    const onSearchProductChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement> | undefined) => {
        setSearchText(event?.target.value);
      },
      []
    );

    const onDeleteProductClick = useCallback(
      (itemId: string) => {
        if (itemId) {
          dispatch(ProductsDashboardActions.DeleteProduct(itemId));
        }
      },
      [dispatch]
    );

    return (
      <ProductsDashboardBase
        items={productList}
        pageIndex={pageIndex}
        productsTotalCount={productsTotalCount}
        onAddProductClick={onAddProductClick}
        onPageNumberChange={onPageNumberChange}
        onNameHeaderClick={onNameHeaderClick}
        onPriceHeaderClick={onPriceHeaderClick}
        sortColumnName={sortColumnName}
        orderBy={orderBy}
        onSearchProductChange={onSearchProductChange}
        onDeleteProductClick={onDeleteProductClick}
      />
    );
  };

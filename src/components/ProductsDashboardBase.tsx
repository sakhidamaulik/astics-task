import React, { useCallback, useRef } from "react";
import {
  IProduct,
  OrderBy,
  PageLimit,
  SortColumnName,
} from "../models/Product.Model";

import Pagination from "@mui/material/Pagination";

import { CSVLink } from "react-csv";

export interface IProductListBaseProps {
  // List of items controlled by parent component
  // Parent component will perform logic of pagination, sort, search, get etc. and provide items here.
  items: IProduct[];

  // Callbacks for sorting
  onNameHeaderClick: () => void;
  onPriceHeaderClick: () => void;

  // Add and delete product
  onAddProductClick: (newName: string, newPrice: number) => void;
  onDeleteProductClick: (itemId: string) => void;

  // Pagination props
  pageIndex: number;
  productsTotalCount: number;
  onPageNumberChange: (
    _event: React.ChangeEvent<unknown>,
    newPageNumber: number
  ) => void;

  // Sorting props
  sortColumnName: SortColumnName;
  orderBy: OrderBy;

  // Search
  onSearchProductChange: (
    event: React.ChangeEvent<HTMLInputElement> | undefined
  ) => void;
}

export const ProductsDashboardBase: React.FunctionComponent<IProductListBaseProps> =
  ({
    items,
    onNameHeaderClick,
    onPriceHeaderClick,
    onAddProductClick,
    onDeleteProductClick,
    pageIndex,
    productsTotalCount,
    onPageNumberChange,
    sortColumnName,
    orderBy,
    onSearchProductChange,
  }: IProductListBaseProps): JSX.Element => {
    const newNameRef = useRef<string>();
    const newPriceRef = useRef<number>();

    const onNewNameChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement> | undefined) => {
        newNameRef.current = event?.target.value;
      },
      []
    );

    const onNewPriceChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement> | undefined) => {
        newPriceRef.current = parseFloat(event?.target.value || "0");
      },
      []
    );

    const _onAddProductClick = useCallback(() => {
      if (onAddProductClick) {
        onAddProductClick(newNameRef.current || "", newPriceRef.current ?? 0);
      }
    }, [onAddProductClick]);

    const sortedColumnButtonStyle = {
      background: "blue",
      color: "white",
    };

    const unSortedColumnButtonStyle = {
      background: "#D3D3D3",
      color: "black",
    };

    return (
      <div style={{ width: "450px" }}>
        <table>
          <thead>
            <tr>
              <th
                colSpan={3}
                key={`productHeaderRow-search`}
                style={{ paddingTop: "16px", paddingBottom: "16px" }}
              >
                <input
                  name="search"
                  type="text"
                  placeholder="Search product by name, price etc."
                  style={{ width: "420px" }}
                  onChange={onSearchProductChange}
                />
              </th>
            </tr>
            <tr key="productHeaderRow">
              <th style={{ padding: "4px" }} key={`productHeaderRow-name`}>
                <button
                  name="sortOnName"
                  style={
                    sortColumnName === SortColumnName.name
                      ? sortedColumnButtonStyle
                      : unSortedColumnButtonStyle
                  }
                  onClick={onNameHeaderClick}
                >
                  Name
                </button>
              </th>
              <th style={{ padding: "4px" }} key={`productHeaderRow-price`}>
                <button
                  name="sortOnPrice"
                  style={
                    sortColumnName === SortColumnName.price
                      ? sortedColumnButtonStyle
                      : unSortedColumnButtonStyle
                  }
                  onClick={onPriceHeaderClick}
                >
                  Price
                </button>
              </th>
              <th style={{ padding: "4px" }} key={`productHeaderRow-orderBy`}>
                {`OrderBy: ${orderBy}`}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr key="newProductRow" style={{ paddingBottom: "24px" }}>
              <td style={{ padding: "4px" }} key={`newProductRow-name`}>
                <input
                  name="name"
                  type="text"
                  placeholder="Product name"
                  onChange={onNewNameChange}
                />
              </td>
              <td style={{ padding: "4px" }} key={`newProductRow-price`}>
                <input
                  name="price"
                  type="text"
                  placeholder="Product price"
                  onChange={onNewPriceChange}
                />
              </td>
              <td
                style={{ padding: "4px" }}
                key={`newProductRow-addProductButton`}
              >
                <button name="addProduct" onClick={_onAddProductClick}>
                  Add product
                </button>
              </td>
            </tr>
            {!items || items.length === 0 ? (
              <tr key="noProductsRow" style={{ paddingTop: "8px" }}>
                <td style={{ padding: "4px" }} key={`noProductsRow-title`}>
                  No items found
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={`Product-${item.id}`}>
                  <td
                    style={{ padding: "4px" }}
                    key={`Product-${item.id}-name`}
                  >
                    {item.name}
                  </td>
                  <td
                    style={{ padding: "4px" }}
                    key={`Product-${item.id}-price`}
                  >
                    {item.price}
                  </td>
                  <td
                    style={{ padding: "4px" }}
                    key={`Product-${item.id}-deleteProduct`}
                  >
                    <button
                      name="deleteProduct"
                      onClick={() => onDeleteProductClick(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {items?.length > 0 && (
          <Pagination
            style={{ paddingTop: "16px" }}
            page={pageIndex}
            count={Math.ceil(productsTotalCount / PageLimit)}
            onChange={onPageNumberChange}
          />
        )}
        {items?.length > 0 && (
          <CSVLink
            style={{ textAlign: "left" }}
            data={items}
            filename={`Product-${new Date().toLocaleString()}.csv`}
            className="btn btn-primary"
            target="_blank"
          >
            Download products
          </CSVLink>
        )}
      </div>
    );
  };

import React from "react";
import {
  createUltimatePagination,
  ItemTypeToComponent,
  ITEM_TYPES,
  PaginationComponentProps,
} from "react-ultimate-pagination";
import { FlatButton } from "material-ui";
import NavigationFirstPage from "material-ui/svg-icons/navigation/first-page";
import NavigationLastPage from "material-ui/svg-icons/navigation/last-page";
import NavigationChevronLeft from "material-ui/svg-icons/navigation/chevron-left";
import NavigationChevronRight from "material-ui/svg-icons/navigation/chevron-right";

const flatButtonStyle = {
  minWidth: 36,
};

const Page: React.FunctionComponent<PaginationComponentProps> = ({
  isActive,
  isDisabled,
  value,
  onClick,
}: PaginationComponentProps): JSX.Element => (
  <FlatButton
    style={flatButtonStyle}
    label={value.toString()}
    primary={isActive}
    onClick={onClick}
    disabled={isDisabled}
  />
);

const Ellipsis: React.FunctionComponent<PaginationComponentProps> = ({
  isDisabled,
  onClick,
}: PaginationComponentProps): JSX.Element => (
  <FlatButton
    style={flatButtonStyle}
    label="..."
    onClick={onClick}
    disabled={isDisabled}
  />
);

const FirstPageLink: React.FunctionComponent<PaginationComponentProps> = ({
  onClick,
  isDisabled,
  isActive,
}: PaginationComponentProps): JSX.Element => (
  <FlatButton
    style={flatButtonStyle}
    icon={<NavigationFirstPage />}
    onClick={onClick}
    disabled={isDisabled}
  />
);

const PreviousPageLink: React.FunctionComponent<PaginationComponentProps> = ({
  onClick,
  isDisabled,
  isActive,
}: PaginationComponentProps): JSX.Element => (
  <FlatButton
    style={flatButtonStyle}
    icon={<NavigationChevronLeft />}
    onClick={onClick}
    disabled={isDisabled}
  />
);

const NextPageLink: React.FunctionComponent<PaginationComponentProps> = ({
  onClick,
  isDisabled,
  isActive,
}: PaginationComponentProps): JSX.Element => (
  <FlatButton
    style={flatButtonStyle}
    icon={<NavigationChevronRight />}
    onClick={onClick}
    disabled={isDisabled}
  />
);

const LastPageLink: React.FunctionComponent<PaginationComponentProps> = ({
  onClick,
  isDisabled,
  isActive,
}: PaginationComponentProps): JSX.Element => (
  <FlatButton
    style={flatButtonStyle}
    icon={<NavigationLastPage />}
    onClick={onClick}
    disabled={isDisabled}
  />
);

const itemTypeToComponent: ItemTypeToComponent = {
  [ITEM_TYPES.FIRST_PAGE_LINK]: FirstPageLink,
  [ITEM_TYPES.PREVIOUS_PAGE_LINK]: PreviousPageLink,
  [ITEM_TYPES.PAGE]: Page,
  [ITEM_TYPES.ELLIPSIS]: Ellipsis,
  [ITEM_TYPES.NEXT_PAGE_LINK]: NextPageLink,
  [ITEM_TYPES.LAST_PAGE_LINK]: LastPageLink,
};

const UltimatePaginationMaterialUi = createUltimatePagination({
  itemTypeToComponent,
});

export default UltimatePaginationMaterialUi;

import React from "react";

export interface INotFoundComponentProps {}

export const NotFoundComponent: React.FunctionComponent<INotFoundComponentProps> =
  () => {
    return (
      <div>
        <h1>404 Page Not Found</h1>
      </div>
    );
  };

export default NotFoundComponent;

import React, { Suspense } from "react";

import AppSpinner from "../pages/loading/AppSpinner";

const AppLayout = (props) => {
  return (
    <Suspense fallback={<AppSpinner absolute />}>{props.children}</Suspense>
  );
};

export default AppLayout;

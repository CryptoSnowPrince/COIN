import React from "react";

const Dashboard = React.lazy(() => import("../pages/Dashboard"));

const frontRoutes = [
  { path: "/", name: "Dashboard", component: Dashboard, exact: true },
];

const adminRoutes = [];

export { frontRoutes, adminRoutes };

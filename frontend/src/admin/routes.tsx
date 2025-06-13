import { Route } from "react-router-dom";
// import AdminLayout from "./AdminLayout";
// import AdminLogin from "./AdminLogin";
// import AdminDashboard from "./AdminDashboard";
import { lazy } from "react";

const AdminLayout = lazy(() => import('./AdminLayout'))
const AdminLogin = lazy(() => import('./AdminLogin'))
const AdminDashboard = lazy(() => import('./AdminDashboard'))

export const adminRoutes = (
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<AdminLogin />} />
    <Route path="dashboard" element={<AdminDashboard />} />
    
  </Route>
);
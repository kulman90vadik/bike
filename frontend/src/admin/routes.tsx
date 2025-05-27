import { Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import AdminProducts from "./AdminProducts";

export const adminRoutes = (
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<AdminLogin />} />
    <Route path="dashboard" element={<AdminDashboard />} />
    <Route path="products" element={<AdminProducts />} />
  </Route>
);
import { Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

export const adminRoutes = (
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<AdminLogin />} />
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    {/* <Route path="products" element={<Products />} /> */}
    {/* <Route path="users" element={<Users />} /> */}
  </Route>
);
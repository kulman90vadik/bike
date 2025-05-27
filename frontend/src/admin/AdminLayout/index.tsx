import { Outlet, useLocation } from "react-router-dom";
import AdminHeader from "../AdminHeader";

const AdminLayout = () => {
  const location = useLocation();
 
  return (
    <>
      {/* можно добавить свою админ-шапку */}
      
      {location.pathname !== "/admin" && <AdminHeader />}
      <Outlet />

    </>
  );
};

export default AdminLayout;
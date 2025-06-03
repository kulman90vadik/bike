import { Outlet, useLocation } from "react-router-dom"
import AdminHeader from "../AdminHeader"
import React from "react"
import { fetchAuthUsers } from "../../redux/slices/auth"
import { useAppDispatch } from "../../redux/store"

const AdminLayout = () => {
    const location = useLocation()
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        const loadData = async () => {
            await dispatch(fetchAuthUsers())
        }
        loadData()
    }, [])

    return (
        <>
            {location.pathname !== "/admin" && <AdminHeader />}
            <Outlet />
        </>
    )
}

export default AdminLayout

import { useLocation } from "react-router-dom"
import Header from "./component/Header"
import { ReactNode } from "react"

interface LayoutProps {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    let location = useLocation()
    const isAdminPage = location.pathname.startsWith("/admin")
    const isAbout = location.pathname === "/about" ? "about-hidden" : ""

    return (
        <>
            {!isAdminPage && <Header />}
            <main className={isAbout}>{children}</main>
        </>
    )
}

export default Layout

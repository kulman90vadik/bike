import { useLocation } from "react-router-dom"
import Header from "./component/Header"
import { ReactNode } from "react"
import Footer from "./component/Footer"

interface LayoutProps {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    let location = useLocation()
    const isAdminPage = location.pathname.startsWith("/admin")
    const isLoginPage = location.pathname.startsWith("/login")
    const isRegisterPage = location.pathname.startsWith("/registration")
    const isAbout = location.pathname === "/about" ? "about-hidden" : ""

    return (
        <>
            {!isAdminPage && <Header />}
            <main className={isAbout}>{children}</main>
            {(!isAdminPage && !isLoginPage && !isRegisterPage) && <Footer />}
        </>
    )
}

export default Layout

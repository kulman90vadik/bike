import store from "./redux/store"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import App from "./App.tsx"

import "./global.css"
import "./color.css"
import RippleEffect from "./component/RippleEffect"

import "./i18n.ts"
import Layout from "./Layout.tsx"
import { Suspense } from "react"
import LoadingPage from "./component/LoadingPage/index.tsx"

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        
        <BrowserRouter>
        
            <Suspense fallback={<LoadingPage />}>
                <Layout>
                    <App />
                </Layout>
            </Suspense>

            <RippleEffect />
        </BrowserRouter>

    </Provider>
)

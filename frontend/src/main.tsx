import store  from './redux/store'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'

import "./global.css";
import "./color.css";
import RippleEffect from './component/RippleEffect';


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <RippleEffect />
    </BrowserRouter>
  </Provider>
)

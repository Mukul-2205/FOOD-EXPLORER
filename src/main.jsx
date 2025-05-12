import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './components/Landing/Landing.jsx'
import Signup from './components/Signup/Signup.jsx'
import Login from './components/Login/Login.jsx'
import ProductList from './components/ProductList/ProductList.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import ProductDetails from './components/ProductDetails/ProductDetails.jsx'
import SearchProduct from './components/SearchProduct/SearchProduct.jsx'
import Protected from './components/Protected.jsx'


const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Landing/>
      },
      {
        path:"/signup",
        element:(
          <Protected authentication={false}>
            <Signup/>
          </Protected>
          
        )
      },
      {
        path:'/login',
        element:(
          <Protected authentication={false}>
            <Login/>
          </Protected>
        )
      },
      {
        path:'/productlist',
        element:(
          <Protected authentication={true}>
            <ProductList/>
          </Protected>
        )
      },
      {
        path:'/productlist/:code',
        element:(
          <Protected authentication={true}>
            <ProductDetails/>
          </Protected>
        )
      },
      {
        path:'/search/:query',
        element:(
          <Protected authentication={true}> 
            <SearchProduct/>
          </Protected>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)

import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
  } from "react-router-dom";
  import App from "../App";
  import {SignIn, SignUp, Main, Dashboard, Services, Order} from '@pages'
  const Index = () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<SignIn/>}/>
            <Route path="sign-up" element={<SignUp/>}/>
            <Route path="main/*" element={<Main/>}>
              <Route index element={<Dashboard/>}/>
              <Route path="order" element={<Order/>}/>
              <Route path="services" element={<Services/>}/>
            </Route>
        </Route>
      )
    );
    return <RouterProvider router={router}/>;
  };
  
  export default Index;
  
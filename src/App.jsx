import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignPage from "./pages/signPage";
import Dashboard from "./pages/dashboard";
import Productes from "./pages/productes";
import Orders from "./pages/orders";
import NewProduct from "./components/newproduct";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Home from "./pages/home";
import Customers from "./pages/customers";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="sign-in" />} />
          <Route path="/sign-in" element={<SignPage />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          >
            <Route path="" element={<Navigate to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="productes" element={<Productes />}>
              <Route path="newproduct" element={<NewProduct />} />
            </Route>
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

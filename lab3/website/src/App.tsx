import { Route, Routes } from "react-router";
import Account from "./pages/Account";
import Browse from "./pages/Browse";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductPage from "./pages/ProductPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/account" element={<Account />} />
      <Route path="/signin" element={<SignUp />} />
      <Route path="/signup" element={<SignIn />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

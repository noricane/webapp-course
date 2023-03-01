import { Route, Routes } from "react-router";
import Account from "./pages/Account";
import Browse from "./pages/Browse";

import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
}

export default App;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import Dashboard from './pages/Dashboard';

import Login from './pages/Login';
function App() {


  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/addproduct" element={<AddProduct />} />

    </Routes>
  )
  
  return (
    <div className="">
      {<Dashboard></Dashboard>}
      {/* {<Login></Login>} */}
    </div>
  );
}

export default App;

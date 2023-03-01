import React from 'react';
import { Route, Routes } from 'react-router';
import Nav from './components/Layout/Nav';
import Browse from './pages/Browse';

import Home from './pages/Home';


 
function App(props:any) {
  

  return (
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/browse" element={<Browse/>}/>
    </Routes>
);
}

export default App;



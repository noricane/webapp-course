import React from 'react';
import Nav from './components/Nav';
import Layout from './components/Layout';
import Grid from './components/structural/Grid';
import Home from './pages/Home';


 
function App(props:any) {
 

  return (
    <Layout><Home/></Layout>
);
}

export default App;

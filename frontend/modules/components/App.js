import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';

const App = () => {
  return (
    <Router>
      <Header />
      <AIAssistant />
      <Switch>
        <Route path="/" exact component={ProductList} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
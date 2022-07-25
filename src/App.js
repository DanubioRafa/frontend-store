import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import './app.css'
import InputSearch from "./components/InputSearch";
import Header from "./components/Header";
import login from "./pages/login";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/login" component={ login } />
        <Route path="/cart" component={ Cart } />
        <Route path="/product/:id" component={ ProductPage }/>
        <Route path="/" component={ Home }/>
      </Switch>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { Navbar, NavbarBrand } from "reactstrap";
import Menu from './components/MenuComponent';
import { DISHES } from "./shared/dishes";

//in this create-app-version, App is a function not a class...
function App() {
  return (
    <div>
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
        </div>
      </Navbar>

      <Menu dishes={DISHES}/>
    </div>
  );
}

export default App;

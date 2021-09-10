import { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Navbar, NavbarBrand } from "reactstrap";
import { DISHES } from "../shared/dishes";
import DishDetail from "./DishdetailComponent";
import Footer from "./FooterComponent";
import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";

class Main extends Component {

    constructor(props) {
        super(props)

        this.state = {
            dishes: DISHES
        }
    }

    render() {

        const HomePage = () => {
            return(
                <Home />
            )
        }


        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default Main
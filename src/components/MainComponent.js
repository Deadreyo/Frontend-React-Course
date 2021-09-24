import { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Navbar, NavbarBrand } from "reactstrap";
import { DISHES } from "../shared/dishes";
import { PROMOTIONS } from "../shared/promotions";
import { COMMENTS } from "../shared/comments";
import { LEADERS } from "../shared/leaders";
import Contact from "./ContactComponent";
import DishDetail from "./DishdetailComponent";
import Footer from "./FooterComponent";
import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import About from "./AboutComponent";

class Main extends Component {

    constructor(props) {
        super(props)

        this.state = {
            dishes: DISHES,
            promotions: PROMOTIONS,
            leaders: LEADERS,
            comments: COMMENTS
        }
    }

    render() {

        const HomePage = () => {
            return(
                <Home dish={this.state.dishes.filter((ob) => ob.featured)[0]}
                leader={this.state.leaders.filter((ob) => ob.featured)[0]}
                promotion={this.state.promotions.filter((ob) => ob.featured)[0]} />
            )
        }

        const DishWithId = ({match}) => {
            return(
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id == parseInt(match.params.dishId,10))[0]} 
                    comments={this.state.comments.filter((comment) => comment.dishId == match.params.dishId)}
                />
            )
        }


        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route path="/menu" exact component={() => <Menu dishes={this.state.dishes} />} />
                    <Route path="/contactus" component={Contact} />
                    <Route path="/aboutus" exact component={() => <About leaders={this.state.leaders} />} />
                    <Route path="/menu/:dishId" component={DishWithId} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default Main
import { Component } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { Navbar, NavbarBrand } from "reactstrap";
import Contact from "./ContactComponent";
import DishDetail from "./DishdetailComponent";
import Footer from "./FooterComponent";
import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import About from "./AboutComponent";
import { connect } from "react-redux";

const mapStatsToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

class Main extends Component {

    constructor(props) {
        super(props)

    }

    render() {

        const HomePage = () => {
            return(
                <Home dish={this.props.dishes.filter((ob) => ob.featured)[0]}
                leader={this.props.leaders.filter((ob) => ob.featured)[0]}
                promotion={this.props.promotions.filter((ob) => ob.featured)[0]} />
            )
        }

        const DishWithId = ({match}) => {
            return(
                <DishDetail dish={this.props.dishes.filter((dish) => dish.id == parseInt(match.params.dishId,10))[0]} 
                    comments={this.props.comments.filter((comment) => comment.dishId == match.params.dishId)}
                />
            )
        }


        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route path="/menu" exact component={() => <Menu dishes={this.props.dishes} />} />
                    <Route path="/contactus" component={Contact} />
                    <Route path="/aboutus" exact component={() => <About leaders={this.props.leaders} />} />
                    <Route path="/menu/:dishId" component={DishWithId} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default withRouter(connect(mapStatsToProps)(Main))
import { Component } from "react";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";


export class DishDetail extends Component {


    render() {
        if(!this.props.dish) return <div></div>
        
        else return(
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.dish.comments)}
                </div>
            </div>
        )
    }

    renderDish(dish) {
        return (
            <Card>
                <CardImg top src={dish.image} alt={this.props.dish.name} width="100%"/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
    }

    renderComments(comments) {
        if(!comments) return <div></div>

        const commentData = comments.map( (com) => {
            return(
                <ul className="list-unstyled">
                    <li>{com.comment}</li>
                    <li>-- {com.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(com.date)))}</li>   
                </ul>
            )
        })

        return(
            <div>
                <h4>Comments</h4>
                {commentData}
            </div>
        )
    }
}
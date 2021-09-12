import { Component } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";




const DishDetail = (props) => {
    if(!props.dish) return <div></div>
    
    else return(
        <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {RenderDish(props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {RenderComments(props.comments)}
                </div>
            </div>
        </div>
    )
}

function RenderDish(dish) {
    return (
        <Card>
            <CardImg top src={dish.image} alt={dish.name} width="100%"/>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    )
}

function RenderComments(comments) {
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

export default DishDetail;
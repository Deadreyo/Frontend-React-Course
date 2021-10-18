import { Component } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardImg, CardText, CardTitle, Button, Modal, ModalBody, ModalHeader, Row, FormGroup, Col, Label } from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";




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
                    {RenderDish(props)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {RenderComments(props.comments, props.addComment, props.dish.id)}
                </div>
            </div>
        </div>
    )
}

function RenderDish(props) {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {    
        return (
            <Card>
                <CardImg top src={baseUrl + props.dish.image} alt={props.dish.name} width="100%"/>
                <CardBody>
                    <CardTitle>{props.dish.name}</CardTitle>
                    <CardText>{props.dish.description}</CardText>
                </CardBody>
            </Card>
        )
    }
}

function RenderComments(comments, addComment, dishId) {
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
            <CommentForm dishId={dishId} addComment={addComment}/>
        </div>
    )
}

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
class CommentForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            modalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this)
        this.modalSubmit = this.modalSubmit.bind(this)
    }

    toggleModal() {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
        // this.state.modalOpen = !this.state.modalOpen
        console.log(this.state.modalOpen)
    }

    modalSubmit(val) {
        this.props.addComment(this.props.dishId, val.rating, val.author, val.comment);
        this.toggleModal()
    }


    render() {
            return(
                <>
                    <Button onClick={this.toggleModal}>
                        Submit Comment
                    </Button>
                    <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Write a Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm className="container" onSubmit={this.modalSubmit}>
                                <Row>
                                    <Label htmlFor="rating" className="col-12">Rating</Label>
                                    <Control.select className="col-12" model=".rating" id="rating">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                    <Label htmlFor="name" className="col-12 mt-3">Your Name</Label>

                                    <Control.text model=".name" className="col-12" id="name" placeholder="Your Name"
                                        validators={{
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors model=".name" className="text-danger"
                                        show="touched" messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                        />

                                    <Label htmlFor="name" className="col-12 mt-3">Comment</Label>
                                    <Control.textarea rows={6} model=".comment" className="col-12" id="comment" />

                                    <Button className="col-3" type="submit">Submit</Button>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </>
                
            )
    }
}

export default DishDetail;
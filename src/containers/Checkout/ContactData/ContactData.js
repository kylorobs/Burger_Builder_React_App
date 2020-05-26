import React from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as burgerBuilderActions from '../../../store/actions';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { updateObject, checkValidity } from '../../../shared/utility'; 



class ContactData extends React.Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '', 
                validation: {
                    required: true
                },
                valid: false, 
                touched: false
            },
            street:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Post Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{
                        value: 'fastest', displayValue: 'Fastest'
                    },
                    {
                        value: 'slowest', displayValue: 'Slowest'
                    }]
                },
                value: '',
                validation: {},
                valid: true,
                touched: false
            }
        },
        formIsValid: false
    }

    orderHandler =(event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ing,
            price: this.props.total,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.ON_SUBMIT_ORDER(order, this.props.token);
    }

    inputChangedHandler = (e, inputIdentifier) => {

        let updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value:e.target.value,
            valid: checkValidity(e.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        });

        const updatedForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        })

        let formIsValid = true;
        for (let inputIdentifier in updatedForm){
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid
        }
        this.setState({orderForm: updatedForm, formIsValid: formIsValid})
    }


    render(){


        const formElements = [];
        for (let key in this.state.orderForm){
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = this.props.loading? <Spinner /> : (
            <form onSubmit={this.orderHandler}>
            {formElements.map(el => (
                <Input 
                    key={el.id}
                    changed={(e) => this.inputChangedHandler(e, el.id)}
                    elementType={el.config.elementType} 
                    elementConfig={el.config.elementConfig}
                    invalid={!el.config.valid} 
                    shouldValidate={el.config.validation}
                    touched={el.config.touched}
                    value ={el.config.value} />
            ))}
            <Button disabled={!this.state.formIsValid} btntype="Success"> ORDER</Button>
        </form>
        );

        return (
            <div className={classes.ContactData}>
                <h4> Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ing: state.ing.ingredients,
        total: state.total.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ON_SUBMIT_ORDER: (order, token) => dispatch(burgerBuilderActions.trySubmitOrder(order, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));

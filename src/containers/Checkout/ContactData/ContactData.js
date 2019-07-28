import React from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
        formIsValid: false,
        loading: false
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength){
            isValid = value.length <= rules.minLength && isValid;
        }

        return isValid
    }

    orderHandler =(event) => {
        event.preventDefault();

        this.setState({loading: true});
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ing,
            price: this.props.total,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(res => {
                console.log("Order Success")
                console.log(res)
                this.setState({loading: false, purchasing: false});
                this.props.history.push('/');
            })
            .catch(er =>{ 
                console.log("error: " + er)
                this.setState({loading: false, purchasing: false})
            })
    }

    inputChangedHandler = (e, inputIdentifier) => {
        const updatedForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        }
        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedForm[inputIdentifier] = updatedFormElement;

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
        let form = (
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
        if (this.state.loading) form = <Spinner />
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
        total: state.total.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);

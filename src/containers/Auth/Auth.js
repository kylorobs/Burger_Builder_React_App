import React from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends React.Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '', 
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false, 
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '', 
                validation: {
                    required: true,
                    minLength: 7
                },
                valid: false, 
                touched: false
            },
        },
        isSignUp: false
    }

    componentDidMount(){
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.ON_CHANGE_REDIRECT_PATH();
        }

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

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                touched: true,
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation)
            }
        }
        this.setState({controls: updatedControls});
    }

    submitHandler = e => {
        e.preventDefault();
        this.props.ON_AUTH_INIT(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    toggleSignUp = () => {
        console.log("toggle")
        this.setState(prevState => {
            console.log('Previous State')
            console.log(prevState)
            return {
                isSignUp: !prevState.isSignUp
            };
        });
    }

    render(){
        const formElements = [];
        for (let key in this.state.controls){
            formElements.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        console.log(this.state.isSignUp)

        let form = formElements.map(el => (
            <Input 
                key={el.id}
                changed={(e) => this.inputChangedHandler(e, el.id)}
                elementType={el.config.elementType} 
                elementConfig={el.config.elementConfig}
                invalid={!el.config.valid} 
                shouldValidate={el.config.validation}
                touched={el.config.touched}
                value ={el.config.value}
            />
        ))

        const errorMessage = !this.props.error? null : (
            <p>{this.props.error.message}</p>
        );

        if (this.props.loading) form = <Spinner />

        return (
            <div className={classes.Auth}>
                {this.props.isAuth? <Redirect to={this.props.authRedirectPath}/> : null}
                {errorMessage}
                <form onSubmit={e => this.submitHandler(e)}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button clicked={this.toggleSignUp} btnType="Danger">Switch to {this.state.isSignUp? 'Sign In' : 'Sign Up'}</Button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ON_AUTH_INIT: (email, password, isSignUp) => dispatch(actions.authInit(email, password, isSignUp)),
        ON_CHANGE_REDIRECT_PATH: () => dispatch(actions.authChangeRedirectPath('/'))
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.ing.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
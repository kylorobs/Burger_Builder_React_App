import React from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

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


    inputChangedHandler = (event, controlName) => {
        const updatedControl = updateObject(this.state.controls[controlName], {
            touched: true,
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.controls[controlName].validation)
        })
        const updatedControls = updateObject(this.state.controls, {[controlName]: updatedControl})
        this.setState({controls: updatedControls});
    }

    submitHandler = e => {
        e.preventDefault();
        this.props.ON_AUTH_INIT(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    toggleSignUp = () => {
        this.setState(prevState => {
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
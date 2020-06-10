import React, {useState, useEffect} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = props => {

   const [controls, setControls] = useState({
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
            }
        });

    const [isSignUp, setIsSignUp] = useState(false)
 
    const {buildingBurger, authRedirectPath, ON_CHANGE_REDIRECT_PATH} = props

    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/'){

            ON_CHANGE_REDIRECT_PATH();
        }
    }, [authRedirectPath, buildingBurger, ON_CHANGE_REDIRECT_PATH]);



    const inputChangedHandler = (event, controlName) => {
        const updatedControl = updateObject(controls[controlName], {
            touched: true,
            value: event.target.value,
            valid: checkValidity(event.target.value, controls[controlName].validation)
        })
        const updatedControls = updateObject(controls, {[controlName]: updatedControl})
        setControls(updatedControls)
    }

    const submitHandler = e => {
        e.preventDefault();
        props.ON_AUTH_INIT(controls.email.value, controls.password.value, isSignUp);
    }

    const toggleSignUp = () => {
        setIsSignUp(prevState => {
            return !prevState
        })
    }

    const formElements = [];
    for (let key in controls){
        formElements.push({
            id: key,
            config: controls[key]
        })
    }


        let form = formElements.map(el => (
            <Input 
                key={el.id}
                changed={(e) => inputChangedHandler(e, el.id)}
                elementType={el.config.elementType} 
                elementConfig={el.config.elementConfig}
                invalid={!el.config.valid} 
                shouldValidate={el.config.validation}
                touched={el.config.touched}
                value ={el.config.value}
            />
        ))

        const errorMessage = !props.error? null : (
            <p>{props.error.message}</p>
        );

        if (props.loading) form = <Spinner />

        return (
            <div className={classes.Auth}>
                {props.isAuth? <Redirect to={props.authRedirectPath}/> : null}
                {errorMessage}
                <form onSubmit={e => submitHandler(e)}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button clicked={toggleSignUp} btnType="Danger">Switch to {isSignUp? 'Sign In' : 'Sign Up'}</Button>
            </div>
        )
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
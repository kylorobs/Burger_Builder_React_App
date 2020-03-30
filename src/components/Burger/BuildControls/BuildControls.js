import React from 'react'
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label: "Bacon", type:"bacon"},
    {label: "Salad", type:"salad"},
    {label: "Cheese", type:"cheese"},
    {label: "Meat", type:"meat"},
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map( ctr => <BuildControl key={ctr.label} label={ctr.label} added={ () => props.ingredientAdded(ctr.type)} removed={ () => props.ingredientRemoved(ctr.type)} disabled={props.disabled[ctr.type]} />)}
        <button 
            disabled={!props.purchaseable} 
            className={classes.OrderButton}
            onClick={props.ordered}>{props.isAuth? 'Order Now': 'Sign up to order'}</button>
    </div>

)
export default buildControls;
import React from 'react';
import classes from './Order.module.css'

const order = (props) => {

    // const ingredients = Object.keys(props.ingredients)
    //     .map(ingKey => {
    //         return [...Array(props.ingredients[ingKey])].map((_, i) => {
    //         return <BurgerIngredient key = {ingKey + i} type={ingKey}/>
    //         })
    //     } )
    //     .reduce((arr, el) => {
    //         return arr.concat(el)
    //     }, []);

    const ingredients = [];
    for ( let ingredientName in props.ingredients){
        ingredients.push(
            {
                name: ingredientName, 
                amount: props.ingredients[ingredientName]
            }
        )
    }

    const ingredientOutput = ingredients.map( ig => {
        return <span 
                    key={ig.name}
                    style={{textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'}}>
                        {ig.name} ({ig.amount})</span>
    })
    
    return (<div className={classes.Order}>
        <p>Ingredients: {ingredientOutput}</p>
        <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
    )
};

export default order;
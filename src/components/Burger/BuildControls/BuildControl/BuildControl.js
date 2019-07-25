import React from 'react';
import classes from './BuildControl.module.css'

const buildControl = (props) => (

    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button onClick={props.added} className={classes.More}>Add</button>
        <button onClick={props.removed} disabled={props.disabled} className={classes.Less}>Subtract</button>
    </div>
);

export default buildControl;
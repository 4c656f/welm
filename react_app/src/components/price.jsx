import React from 'react';

const Price = (props) => {







    return (
        <div className={`${props.classname[props.tick]} price_wrapper  ${props.percent[props.tick]? props.percent[props.tick]>0? `price_positive`:`price_negative`: "price_load"}`}>
            <div className={"price"}> {props.percent[props.tick]?props.percent[props.tick]>0?`+${props.percent[props.tick]}%`:`${props.percent[props.tick]}%`:""} </div>
        </div>
    );
};

export default React.memo(Price);
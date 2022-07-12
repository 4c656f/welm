import React from 'react';
import Charts from "./charts";
import Price from "./price";
import {Reorder, useDragControls} from "framer-motion";

const CardCur = (props) => {

    const remove_card = (e) => {
        const name = e.target.getAttribute("name")
        props.setCards(props.cards.filter(item => item.tick !== name));
    };


    const controls = useDragControls()






    return (
        <Reorder.Item  dragListener={false} dragControls={controls} className={"card"} as={"div"}
                      key={props.tick + "card_reorder"} value={props.value}>

            <div className={"propery_wrapper"}>
                <div className={"tick_exchange"}>
                    <div className={"cards_text_tick"}>{props.tick}</div>
                    <div className={"cards_text_exchange"}>{props.exchange}</div>


                </div>
                <div className={"cards_text_name"}>{props.name}</div>


            </div>

            <Charts char_data={props.char_data} tick={props.tick}></Charts>
            <div className={"price_wrapper_wrapper"}>
                <div className={"into_day"}>into day</div>
                <Price classname={props.classname} percent={props.percent} tick={props.tick}></Price>
            </div>
            <div className={props.toggels?"reorder-handle_active":"disabled_el"} onPointerDown={(e) => controls.start(e)}>
              <div className={props.toggels?"reorder-handle_sm":"disabled_el"}></div>
              <div className={props.toggels?"reorder-handle_sm":"disabled_el"}></div>
              <div className={props.toggels?"reorder-handle_sm":"disabled_el"}></div>
            </div>
            <div className={props.toggels?"delete_card_active":"disabled_el"} name={props.tick} onClick={remove_card}>
                <div className={props.toggels?"inside_delete_card":"disabled_el"}>

                </div>


            </div>




        </Reorder.Item>
    );
};

export default React.memo(CardCur);
import React from 'react';
import '../styles/search_items.css';

const SearchItems = (props) => {
    function set(tick, name, exchange){
        if(!props.cards.some((val) => val.tick === tick)){

            props.setSearch("")
            props.setCards([...props.cards, {tick: tick, name: name, exchange: exchange}])
            props.set_card_count((val)=> val+1)

            props.set_char_data((val) => {
                const newTodos = Object.assign({}, val);
                newTodos[tick] = [{"Date": '2022.01.01', "price": 100}, {"Date": '2022.01.01', "price": 100}];

                return newTodos


            })

            props.setPercent((val) => {
                const newTodos = Object.assign({}, val);
                newTodos[tick] = "";

                return newTodos


            })

        }


    }
    // function set_char_data(value){
    //
    //     if(!props.cards.some((val) => val.tick === value)){
    //
    //     }
    //
    // }
    //
    // function set_percent_data(value){
    //
    //     if(!props.cards.some((val) => val.tick === value)){
    //
    //     }
    //
    // }



    return (

                <div className={"search_items_conteiner"}>
                    {props.array.map(value =>
                        <div onClick={() => {set(value.tick, value.name, value.exchange) } } key={value.tick} className={"search_card"}>
                            <div className={"left_container"}>
                              <div className={"search_text search_text_tick"} >{value.tick}</div>
                            </div>
                            <div className={"right_container"}>
                                <div className={"search_text search_text_exchange"} >{value.exchange}</div>
                                <div className={"search_text search_text_name"} >{value.name}</div>
                            </div>
                        </div>


                    )}

                </div>





    );
};

export default SearchItems;
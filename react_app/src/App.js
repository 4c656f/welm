import React, {useEffect, useState} from "react";
import Search from "./components/search";
import "./styles/index.css";
import CardsActive from "./components/cardsActive";
import { ReactComponent as Logo_svg } from './icons/logo.svg';
import {ReactComponent as Search_svg} from "./icons/Search.svg";

const App = () => {




    function get_init (){

            try {

                if (JSON.parse(localStorage.getItem("names"))) {
                    let data = JSON.parse(localStorage.getItem("names"))
                    var return_object = {}
                    data.map(val =>{
                        return_object[val.tick] = [{"Date": '2022.01.01', "price": 50}, {"Date": '2022.01.01', "price": 50}]



                        }
                    )
                    return return_object

                }
                else{
                    return {}

                }
            }catch (e){
                console.error(e)
            }
        }



    const [cards, setCards] = useState([]);
    const [card_count, set_card_count] = useState(0);
    const [percent, setPercent] = useState({})
    const [char_data, set_char_data] = useState(get_init)





  return (
      <div className={"main_container"}>

          <Search  set_card_count={set_card_count}  set_char_data={set_char_data} cards={cards} setCards={setCards} setPercent={setPercent}></Search>
          <CardsActive set_card_count={set_card_count} card_count={card_count} char_data={char_data} set_char_data={set_char_data} cards={cards} setCards={setCards} percent={percent} setPercent={setPercent}></CardsActive>
      </div>
  );
};

export default App;

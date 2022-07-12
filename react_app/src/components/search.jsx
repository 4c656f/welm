import React, {useState} from 'react';

import SearchItems from "./search_items";
import { ReactComponent as Search_svg } from '../icons/Search.svg';
import useSearch from "../hooks/useSearch";
import {ReactComponent as Logo_svg} from "../icons/logo.svg";

const Search = (props) => {

    const [search_text, set_search_text] = useState("")
    const [notes, setNotes] = useState([]);

    useSearch(search_text, setNotes)

    function check_condition(){
        if (search_text && notes.length > 0){
            return true
        }
        else{
            return false
        }

    }
    function hide_content(){
        set_search_text("")

    }



    return (
        <div className={"search_container"}>
            <div className={"logo_container"}>
                <Logo_svg className={"logo_svg"}></Logo_svg>
            </div>
            <div className={"input_wrapper"}>
                <Search_svg className={"search_icon"}></Search_svg>
                <input type={"text"} className={"input_search"} placeholder={"Search"} value={search_text} onChange={e => {set_search_text(e.target.value)}}/>
            </div>
            {
                check_condition() ?
                    <div>
                        <SearchItems
                        array={notes}
                        input_text={search_text}
                        setSearch={set_search_text}
                        setCards={props.setCards}
                        cards={props.cards}
                        set_card_count={props.set_card_count}
                        setPercent={props.setPercent}
                        set_char_data={props.set_char_data}>

                        </SearchItems>
                        <div className={"hide_content"} onClick={hide_content}>

                        </div>
                    </div> : null
            }





        </div>
    );
};

export default React.memo(Search);
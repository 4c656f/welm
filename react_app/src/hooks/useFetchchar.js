import {useEffect} from "react";
import axios from "axios";

export default function useFetchchar (cards, set_char_data, card_count){
    useEffect(
        () => {
            if (cards.length <= 0) { return;}

            let request_line = ""

            cards.map((value) => {

                request_line += `&ticks=${value.tick}`

            })


            function get (){
                axios
                    .get(
                        `http://127.0.0.1:80/?type=year${encodeURIComponent(request_line)}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }

                        }
                    )
                    .then((response) => {

                        setTimeout(() => {set_char_data(response.data)}, 100)



                    })

                    .catch((err) => {
                        console.error(err);
                    });
            }
            get()
        }, [card_count])

}
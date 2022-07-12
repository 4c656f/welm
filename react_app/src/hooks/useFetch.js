import {useEffect} from "react";
import axios from "axios";

export default function useFetch (setclassname, cards, setPercent,card_count, delay){
    useEffect(
        () => {
            if (cards.length <= 0) { return;}

            let request_line = ""

            cards.map((value) => {

                request_line += `&ticks=${value.tick}`

            })
            function get_keys(object){
                let new_obj = {}

                for (const [key] of Object.entries(object)) {
                    if(object[key] >0){
                        new_obj[key] = "percent_light_positive"

                    }
                    else{
                        new_obj[key] = "percent_light_negative"
                    }

                }

                setclassname(new_obj)
                const interval2 = setTimeout(() => {
                    let new_obj_w = {}
                    for (const [key] of Object.entries(new_obj)) {
                        new_obj_w[key] = ""
                    }

                    setclassname(new_obj_w)

                }, 500)

                return new_obj

            }


            function get (){
                axios
                    .get(
                        `http://127.0.0.1:80/?type=get${encodeURIComponent(request_line)}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }

                        }
                    )
                    .then((response) => {
                        setPercent(response.data)

                        get_keys(response.data)
                    })

                    .catch((err) => {
                        console.error(err);
                    });
            }
            get()

            const interval = setInterval(() => {

                get()

            }, delay);
            return () => clearInterval(interval);



        }, [card_count])

}


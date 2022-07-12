import {useEffect} from "react";
import axios from "axios";

export default function useSearch (search_text, setNotes){
    useEffect(
        () => {
            if (search_text) {
                async function check() {
                    try {
                        const response = await axios.get(
                            `http://127.0.0.1:8000/?type=search&search=${encodeURIComponent(search_text)}`, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json'
                                }

                            }
                        );
                        const response_data = response.data
                        setNotes(response_data);

                    }catch (e) {
                        console.error(e)
                    }
                }
                check()






            }else {}
        }, [search_text]

    );

}


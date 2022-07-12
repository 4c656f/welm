import React, {useEffect} from 'react';
import {Tooltip, YAxis, XAxis, Line, LineChart, ResponsiveContainer} from "recharts";
import {format} from 'date-fns';




function Custom_tooltip({active, payload, label}){
    if(active){


        function date(){
            try {

                return format(new Date(label), "dd,MMM, yyyy")

            }
            catch (e){


            }


        }


        return (
            <div className={"custom_tooltip"}>
                <div className={"tooltip_date"}>{date()}</div>
                <div className={"tooltip_price"}>{`${payload[0].value} $`}</div>
            </div>

        )

    }
    else {
        return null
    }


}








const Charts = (props) => {



    const def_data = [{"Date": '2022.01.01', "price": 50}, {"Date": '2022.01.01', "price": 50}]

    try {
        function get_len(){
            return props.char_data[props.tick].length -2
        }
        return (
            <div className={"char_container"}>
                <ResponsiveContainer >
                    <LineChart width={730} height={250} data={props.char_data[props.tick]}>
                        <Tooltip isAnimationActive={false} allowEscapeViewBox={{x: true, y: true}} position={{y: -40 }} content={<Custom_tooltip/>} />
                        <Line position={ {y: 0} } dot={false} isAnimationActive={true} type="basis" dataKey="price" stroke="#fff" />

                        <XAxis tickLine={false} dataKey="date" interval={get_len()} className={"x_axis"} padding={{right: 50 , left: 50 }} axisLine={false}/>
                        <YAxis tickLine={false} dataKey="price" interval={0} className={"x_axis"} padding={{right: 50 , left: 50 }} axisLine={false}/>
                        {/*<YAxis dataKey="price" allowDataOverflow={true} axisLine={false}/>*/}


                    </LineChart>
                </ResponsiveContainer>
            </div>
        );

    }
    catch (e) {

        return (
            <div className={"char_container"}>
                <ResponsiveContainer >
                    <LineChart width={730} height={250} data={def_data}>
                        <Tooltip isAnimationActive={false} allowEscapeViewBox={{x: true, y: true}} position={{y: -40 }} content={<Custom_tooltip/>} />
                        <Line position={ {y: 0} } dot={false} isAnimationActive={true} type="basis" dataKey="price" stroke="#fff" />

                        <XAxis tickLine={false} dataKey="date" interval={0} className={"x_axis"} padding={{right: 50 , left: 50 }} axisLine={false}/>
                        <YAxis tickLine={false} dataKey="price" interval={0} className={"x_axis"} padding={{right: 50 , left: 50 }} axisLine={false}/>
                        {/*<YAxis dataKey="price" allowDataOverflow={true} axisLine={false}/>*/}


                    </LineChart>
                </ResponsiveContainer>
            </div>
        );


    }






};

export default React.memo(Charts);
import React, { useState } from 'react'

function useTime () {
    const [time,settime] = useState();
    setTimeout(()=>{
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes()+ ":" + today.getSeconds();
        var aa = (time +"/"+ date);
        settime(aa)
    },60000)
    return time;
}

export default useTime
import React from "react";
import {Route, Routes} from "react-router-dom";
import Inbox from "../Pages/Inbox/Inbox";
import Today from "../Pages/Today/Today";
import Upcoming from "../Pages/Upcoming/Upcoming";


function Router(){
    return(
        <Routes>
            <Route path="/" element={<Today/>}/>
            <Route path="/inbox" element={<Inbox/>}/>
            <Route path="/today" element={<Today/>}/>
            <Route path="/upcoming" element={<Upcoming/>}/>
        </Routes>
    )    
}
export default Router;
import React from "react";
import { Route, Routes } from "react-router-dom";
import Inbox from "../views/Inbox/Inbox";
import Today from "../views/Today/Today";
import Upcoming from "../views/Upcoming/Upcoming";
import Overdue from "../views/Overdue/Overdue";

function Router() {
  return (
    <Routes>
      <Route path="/#/" component={<Today />} />
      <Route path="/#/inbox" component={<Inbox />} />
      <Route path="/#/today" component={<Today />} />
      <Route path="/#/upcoming" component={<Upcoming />} />
      <Route path="/#/overdue" component={<Overdue />} />
    </Routes>
  );
}
export default Router;

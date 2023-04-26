import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Inbox from "../views/Inbox/Inbox";
import Today from "../views/Today/Today";
import Upcoming from "../views/Upcoming/Upcoming";
import Overdue from "../views/Overdue/Overdue";

function Router() {
  return (
    <HashRouter>
      <Route exact path="/" component={Today} />
      <Route exact path="/inbox" component={Inbox} />
      <Route exact path="/today" component={Today} />
      <Route exact path="/upcoming" component={Upcoming} />
      <Route exact path="/overdue" component={Overdue} />
    </HashRouter>
  );
}
export default Router;

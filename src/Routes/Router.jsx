import React from "react";
import { Route, Routes } from "react-router-dom";
import Inbox from "../views/Inbox/Inbox";
import Today from "../views/Today/Today";
import Upcoming from "../views/Upcoming/Upcoming";
import Overdue from "../views/Overdue/Overdue";

function Router() {
  return (
    <Routes>
      <Route path="/Metric/" element={<Today />} />
      <Route path="/Metric/inbox" element={<Inbox />} />
      <Route path="/Metric/today" element={<Today />} />
      <Route path="/Metric/upcoming" element={<Upcoming />} />
      <Route path="/Metric/overdue" element={<Overdue />} />
    </Routes>
  );
}
export default Router;

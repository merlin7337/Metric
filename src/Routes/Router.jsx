import React from "react";
import { Route, Routes } from "react-router-dom";
import Inbox from "../views/Inbox/Inbox";
import Today from "../views/Today/Today";
import Upcoming from "../views/Upcoming/Upcoming";
import Overdue from "../views/Overdue/Overdue";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Today />} />
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/today" element={<Today />} />
      <Route path="/upcoming" element={<Upcoming />} />
      <Route path="/overdue" element={<Overdue />} />
    </Routes>
  );
}
export default Router;

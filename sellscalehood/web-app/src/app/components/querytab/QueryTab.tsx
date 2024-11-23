import React from "react";
import QueryTabClient from "./QueryTabClient";

export default function QueryTab(initialTicker : {initialTicker: string}) {
  return <QueryTabClient initialTicker={initialTicker["initialTicker"]}/>;
}

'use client'
import React from "react"; 
import QueryTab from "../components/querytab/QueryTab";
import { useSearchParams } from 'next/navigation'

const Search = () => {
  const searchParams = useSearchParams()
  const initialTicker = searchParams.get('initialTicker') || ""
  

  return <QueryTab initialTicker={initialTicker} />;
};

export default Search;

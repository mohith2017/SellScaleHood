"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import CompanyDataDisplay from "./CompanyDataDisplay";

type StockData = {
  info: any;
  calendar: any;
  analyst_price_targets: any;
  quarterly_income_stmt: any;
  history: any;
};

export default function QueryTabClient() {
  const [ticker, setTicker] = useState("");
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!ticker) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/query?tickerName=${ticker}`);
      if (!response.ok) {
        throw new Error("Failed to fetch stock data");
      }
      const data = await response.json();
      setStockData(data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-black text-white">
      <Card className="mb-6 bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white">Stock Lookup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter stock ticker (e.g., AAPL)"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              className="flex-grow bg-gray-800 text-white border-gray-700"
            />
            <Button onClick={handleSearch} disabled={isLoading} className="bg-green-500 hover:bg-green-600">
              {isLoading ? "Searching..." : <Search className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {stockData && <CompanyDataDisplay stockData={stockData} />}
    </div>
  );
}

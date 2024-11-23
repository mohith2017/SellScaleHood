'use client';
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { useRouter } from 'next/navigation';

type StockData = {
  ticker: string;   
  quantity: number;       
  price_per_share: number;  
  total_cost: number;     
  status: string;           
};

const Portfolio = () => {
  const [stockData, setStockData] = useState<Array<StockData> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchStocks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/v1/stocks`);
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

    fetchStocks();
  }, []);

  const getQueryTicker = (ticker: any) => {
    router.push(`/search?initialTicker=${ticker}`);
  };

  const pieChartData = stockData ? stockData.map(stock => ({
    name: stock.ticker,
    value: stock.quantity,
    total_cost: stock.total_cost,
  })) : [];

  const grandTotal = stockData ? stockData.reduce((acc, stock) => acc + stock.total_cost, 0) : 0;
  const totalStocks = stockData ? stockData.reduce((acc, stock) => acc + stock.quantity, 0) : 0;
  const uniqueTickers = stockData ? stockData.length : 0;

  const COLORS = ['#4CAF50', '#F44336', '#9E9E9E', '#BDBDBD'];

  return (
    <>
      {isLoading ? (
        <><p>Loading...</p></>
      ) : (
        <Card className="w-full max-w-4xl mx-auto mt-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Your Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Flex Container for Statistics and Pie Chart */}
            <div className="flex items-center justify-between mb-4">
              {/* Grand Total Display */}
              <div className="text-center w-1/2">
                <h2 className="text-xl font-bold">Total Invested</h2>
                <p className="text-2xl text-green-500">${grandTotal.toFixed(2)}</p>
                <p className="text-sm text-gray-600">
                  {uniqueTickers} Companies | {totalStocks} Shares
                </p>
              </div>

              {/* Pie Chart */}
              <div className="flex justify-center w-1/2">
                <PieChart width={400} height={400}>
                  <Pie
                    data={pieChartData}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    label={({ name }) => name}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number, name: string) => [`${value.toFixed(2)}`, name]} 
                    labelFormatter={(name) => `Ticker: ${name}`} 
                  />
                </PieChart>
              </div>
            </div>

            {/* Stock Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticker</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price per Share</TableHead>
                  <TableHead>Total Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stockData && stockData.map((stock) => (
                  <TableRow key={stock.ticker} onClick={() => getQueryTicker(stock.ticker)}>
                    <TableCell className="font-medium">{stock.ticker}</TableCell>
                    <TableCell>{stock.quantity}</TableCell>
                    <TableCell>${stock.price_per_share.toFixed(2)}</TableCell>
                    <TableCell>${stock.total_cost.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Portfolio;

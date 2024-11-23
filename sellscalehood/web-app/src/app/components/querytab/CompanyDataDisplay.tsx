import React from "react";
import { Card, CardContent } from "../ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

type StockData = {
  info: any;
  calendar: any;
  analyst_price_targets: any;
  quarterly_income_stmt: any;
  history: any;
};

type CompanyDataDisplayProps = {
  stockData: StockData;
};

export default function CompanyDataDisplay({ stockData }: CompanyDataDisplayProps) {
  const formatHistoryData = (history: any) => {
    return history.map((entry: any) => ({
      date: new Date(entry.Date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), 
      close: entry.Close 
    }));
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 border border-gray-700 rounded">
          <p className="text-white">{`Date: ${label}`}</p>
          <p className="text-green-500">{`Close: $${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };


  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <h2 className="text-3xl font-bold mb-2 text-white">{stockData.info.longName} ({stockData.info.symbol})</h2>
          <p className="text-4xl font-bold text-green-500">${stockData.info.currentPrice.toFixed(2)}</p>
          <p className="text-gray-400">Market Cap: ${(stockData.info.marketCap / 1e9).toFixed(2)}B</p>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4 text-white">Stock Performance (1 Month)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={formatHistoryData(stockData.history)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis 
                dataKey="date" 
                stroke="#888" 
                tick={{ fill: '#888' }}
                tickLine={{ stroke: '#888' }}
              />
              <YAxis 
                stroke="#888" 
                tick={{ fill: '#888' }}
                tickLine={{ stroke: '#888' }}
                tickFormatter={(value) => `$${value.toFixed(0)}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="close" 
                stroke="#22c55e" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8, fill: '#22c55e', stroke: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 text-white">Company Overview</h3>
            <p className="text-gray-400">{stockData.info.longBusinessSummary}</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 text-white">Key Statistics</h3>
            <ul className="space-y-2 text-gray-400">
              <li>P/E Ratio: {stockData.info.trailingPE?.toFixed(2) || 'N/A'}</li>
              <li>Dividend Yield: {(stockData.info.dividendYield * 100).toFixed(2)}%</li>
              <li>52 Week High: ${stockData.info.fiftyTwoWeekHigh?.toFixed(2)}</li>
              <li>52 Week Low: ${stockData.info.fiftyTwoWeekLow?.toFixed(2)}</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4 text-white">Key Executives</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-2 px-4 text-left text-gray-300">Name</th>
                  <th className="py-2 px-4 text-left text-gray-300">Title</th>
                  <th className="py-2 px-4 text-left text-gray-300">Total Pay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600">
                {stockData.info.companyOfficers?.slice(0, 5).map((officer: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-700">
                    <td className="py-2 px-4 text-gray-300">{officer.name}</td>
                    <td className="py-2 px-4 text-gray-300">{officer.title}</td>
                    <td className="py-2 px-4 text-gray-300">${officer.totalPay ? parseInt(officer.totalPay).toLocaleString() : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/platform-api/api";
import { Input } from "@/components/ui/input"


type officer = {
  name: string,
  title: string,
  totalPay: string,
}

type companyData = {
    longName: string,
    longBusinessSummary: string,
    industry: string,
    sector: string,
    city: string,
    state: string,
    country: string,
    fullTimeEmployees: string,
    website: string,
    companyOfficers: officer[]
}

export default async function QueryTab({ticker}: {ticker: string}) {
  // const [companyData, setCompanyData] = useState<Record<string, any>>({});
  
  const companyData = await api.getQueryTicker(ticker);
  console.log(companyData);
  // setCompanyData(data);

  
  
  return (
    <>
    {/* <Input/> */}
    <div className="company-profile bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
  <h2 className="text-3xl font-bold mb-6 text-gray-800">{companyData?.longName}</h2>
  
  <div className="company-overview mb-8">
    <h3 className="text-2xl font-semibold mb-3 text-gray-700">Overview</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{companyData?.longBusinessSummary}</p>
  </div>
  
  <div className="company-details mb-8">
    <h3 className="text-2xl font-semibold mb-3 text-gray-700">Key Details</h3>
    <ul className="grid grid-cols-2 gap-4">
      <li className="flex items-center"><span className="font-medium mr-2 text-gray-700">Industry:</span> {companyData?.industry}</li>
      <li className="flex items-center"><span className="font-medium mr-2 text-gray-700">Sector:</span> {companyData?.sector}</li>
      <li className="flex items-center"><span className="font-medium mr-2 text-gray-700">Headquarters:</span> {companyData?.city}, {companyData?.state}, {companyData?.country}</li>
      <li className="flex items-center"><span className="font-medium mr-2 text-gray-700">Employees:</span> {companyData?.fullTimeEmployees?.toLocaleString()}</li>
      <li className="col-span-2 flex items-center">
        <span className="font-medium mr-2 text-gray-700">Website:</span>
        <a href={companyData?.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{companyData?.website}</a>
      </li>
    </ul>
  </div>
  
  <div className="key-executives">
    <h3 className="text-2xl font-semibold mb-3 text-gray-700">Key Executives</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left text-gray-700">Name</th>
            <th className="py-2 px-4 text-left text-gray-700">Title</th>
            <th className="py-2 px-4 text-left text-gray-700">Total Pay</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {companyData?.companyOfficers.slice(0, 5).map((officer:any, index:any) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-2 px-4">{officer.name}</td>
              <td className="py-2 px-4">{officer.title}</td>
              <td className="py-2 px-4">${officer.totalPay ? officer.totalPay.toLocaleString() : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
</>
  );
};

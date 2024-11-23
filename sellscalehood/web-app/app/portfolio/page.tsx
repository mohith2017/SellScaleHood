// 'use client'
// import React, { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { db } from "@/lib/firebase";
// import { collection, getDocs } from "firebase/firestore";

// const Portfolio = () => {
//   const [stocks, setStocks] = useState([]);

//   useEffect(() => {
//     const fetchStocks = async () => {
//       const stocksCollection = collection(db, "Stocks");
//       const stocksSnapshot = await getDocs(stocksCollection);
//       const stocksList = stocksSnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setStocks(stocksList);
//     // };

//     fetchStocks();
//   }, []);

//   return (
//     <Card className="w-full max-w-4xl mx-auto mt-8">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-center">View Portfolio</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Ticker</TableHead>
//               <TableHead>Quantity</TableHead>
//               <TableHead>Price per Share</TableHead>
//               <TableHead>Total Cost</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {stocks.map((stock) => (
//               <TableRow key={stock.id}>
//                 <TableCell className="font-medium">{stock.id}</TableCell>
//                 <TableCell>{stock.quantity}</TableCell>
//                 <TableCell>${stock.price_per_share.toFixed(2)}</TableCell>
//                 <TableCell>${stock.total_cost.toFixed(2)}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// };

// export default Portfolio;

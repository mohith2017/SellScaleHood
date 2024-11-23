'use client'
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';

const Buyorsell = () => {
  const [ticker, setTicker] = useState('');
  const [quantity, setQuantity] = useState('');
  const [action, setAction] = useState('buy');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const endpoint = action === 'buy' ? '/api/buyStock' : '/api/sellStock';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tickerName: ticker,
          quantity: parseInt(quantity)
        })
      });
  
      if (!response.ok) {
        throw new Error(`Failed to ${action} stock`);
      }
      const data = await response.json();
      console.log(data);
      setIsSuccess(true);
      const actionString = action === "buy" ? "bought" : "sold";
  
      toast({
        title: "Success!",
        description: `Successfully ${actionString} ${quantity} shares of ${ticker}`,
        duration: 5000,
      });
    } catch (error) {
      console.error(`Error ${action}ing the stock:`, error);
      toast({
        title: "Error",
        description: `Failed to ${action} stock. Please check the quantity/stock name again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setTicker('');
    setQuantity('');
    setIsSuccess(false);
    router.push('/buyorsell');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {action === 'buy' ? 'Buy' : 'Sell'} Stocks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ticker">Stock Ticker</Label>
            <Input
              id="ticker"
              placeholder="Enter stock ticker (e.g., AAPL)"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              required
              disabled={isSuccess}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              min="1"
              disabled={isSuccess}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="action">Action</Label>
            <Select onValueChange={setAction} defaultValue={action} disabled={isSuccess}>
              <SelectTrigger>
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">Buy</SelectItem>
                <SelectItem value="sell">Sell</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {isLoading ? (
            <Button disabled className="w-full">Performing action...</Button>
          ) : isSuccess ? (
            <Button className="w-full bg-green-500 hover:bg-green-600" disabled>Success!</Button>
          ) : (
            <Button type="submit" className="w-full">
              {action === 'buy' ? 'Buy' : 'Sell'} Stock
            </Button>
          )}
        </form>
        
        {isSuccess && (
          <Button onClick={handleReset} className="w-full mt-4">
            Buy or Sell again?
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default Buyorsell;

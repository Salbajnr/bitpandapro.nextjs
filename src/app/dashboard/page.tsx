"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Holding = {
  id: string;
  symbol: string;
  quantity: string;
  averageCost: string;
};

type Trade = {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  quantity: string;
  price: string;
  executedAt: string;
};

type Portfolio = {
  id: string;
  name: string;
  holdings: Holding[];
  trades: Trade[];
  createdAt: string;
};

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const response = await fetch('/api/portfolios');
        const data = await response.json();
        
        if (response.ok) {
          setPortfolios(data.portfolios);
        } else {
          setError(data.error || 'Failed to fetch portfolios');
        }
      } catch (err) {
        setError('An error occurred while fetching portfolios');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPortfolios();
    }
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <Button 
            className="mt-4" 
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name || user?.email}</p>
      </div>

      {portfolios.length === 0 ? (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>No Portfolios Found</CardTitle>
            <CardDescription>You don't have any portfolios yet.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Create Your First Portfolio</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Portfolios</h2>
            <Button>Create New Portfolio</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((portfolio) => (
              <Card key={portfolio.id}>
                <CardHeader>
                  <CardTitle>{portfolio.name}</CardTitle>
                  <CardDescription>
                    Created {new Date(portfolio.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Holdings:</span>
                      <span>{portfolio.holdings.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Trades:</span>
                      <span>{portfolio.trades.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
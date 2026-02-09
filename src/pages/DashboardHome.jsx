import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, PlusCircle, HeartHandshake, ArrowRight } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { formatRelativeTime } from '../lib/utils';
import { items } from '../data/items';

export function DashboardHome() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const recentItems = items.slice(0, 5);

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-5 w-72" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-80 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back. Here’s what’s happening in your community.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Items shared" value="24" icon={Package} trend="+3 this week" />
        <StatCard title="Active listings" value="10" icon={PlusCircle} />
        <StatCard title="Requests fulfilled" value="14" icon={HeartHandshake} trend="+2 this week" />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent activity</CardTitle>
          <Link to="/dashboard/browse">
            <Button variant="outline" size="sm">
              Browse all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-border">
            {recentItems.map((item) => (
              <li key={item.id} className="py-4 first:pt-0 last:pb-0">
                <Link
                  to={`/dashboard/items/${item.id}`}
                  className="flex items-center justify-between gap-4 hover:bg-muted/50 -mx-2 px-2 py-2 rounded-xl transition-smooth"
                >
                  <div className="flex gap-4 min-w-0">
                    <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center shrink-0 text-2xl">
                      📦
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.category} · {item.location}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground shrink-0">
                    {formatRelativeTime(item.postedAt)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

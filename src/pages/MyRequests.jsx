import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartHandshake, Clock } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/EmptyState';
import { myRequests } from '../data/requests';
import { formatDate } from '../lib/utils';

export function MyRequests() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const statusVariant = (status) => {
    if (status === 'accepted') return 'success';
    if (status === 'declined') return 'destructive';
    return 'warning';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-36 mb-2" />
          <Skeleton className="h-5 w-52" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Requests</h1>
        <p className="text-muted-foreground mt-1">Items you've requested from the community</p>
      </div>

      {myRequests.length === 0 ? (
        <Card>
          <EmptyState
            title="No requests yet"
            description="When you request an item from Browse, it will show up here. You can track status: pending, accepted, or declined."
            actionLabel="Browse items"
            onAction={() => navigate('/dashboard/browse')}
            icon={HeartHandshake}
          />
        </Card>
      ) : (
        <div className="space-y-4">
          {myRequests.map((req) => (
            <Card key={req.id} className="hover:shadow-soft transition-smooth">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{req.itemTitle}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      Requested {formatDate(req.requestedAt)}
                    </div>
                  </div>
                  <Badge variant={statusVariant(req.status)} className="shrink-0 capitalize">
                    {req.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

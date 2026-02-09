import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, MapPin, MoreVertical } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/EmptyState';
import { myListings } from '../data/requests';

export function MyListings() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-40 mb-2" />
          <Skeleton className="h-5 w-56" />
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Listings</h1>
          <p className="text-muted-foreground mt-1">Items you've shared with the community</p>
        </div>
        <Link to="/dashboard/post">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Post item
          </Button>
        </Link>
      </div>

      {myListings.length === 0 ? (
        <Card>
          <EmptyState
            title="No listings yet"
            description="Post an item to share with your community. Groceries, clothes, books, or essentials—every bit helps."
            actionLabel="Post your first item"
            onAction={() => navigate('/dashboard/post')}
            icon={PlusCircle}
          />
        </Card>
      ) : (
        <div className="space-y-4">
          {myListings.map((listing) => (
            <Card key={listing.id} className="hover:shadow-soft transition-smooth">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex gap-4 min-w-0">
                    <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center shrink-0 text-2xl">
                      📦
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold truncate">{listing.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <Badge variant="secondary">{listing.category}</Badge>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {listing.location}
                        </span>
                      </div>
                      {listing.requestsCount > 0 && (
                        <p className="text-sm text-primary mt-1">{listing.requestsCount} request(s)</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={listing.status === 'available' ? 'success' : 'secondary'}>
                      {listing.status}
                    </Badge>
                    <Link to={`/dashboard/items/${listing.id}`}>
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
                    <Button variant="ghost" size="icon" aria-label="More options">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

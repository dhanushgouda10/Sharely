import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, User, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';
import { useToast } from '../components/Toast';
import { getItemById } from '../data/items';
import { formatRelativeTime } from '../lib/utils';

export function ItemDetails() {
  const { id } = useParams();
  const { addToast } = useToast();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setItem(getItemById(id));
      setLoading(false);
    }, 500);
    return () => clearTimeout(t);
  }, [id]);

  const handleRequest = () => {
    addToast('Request sent! The owner will get in touch.');
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="max-w-3xl mx-auto text-center py-16">
        <p className="text-muted-foreground">Item not found.</p>
        <Link to="/dashboard/browse">
          <Button variant="outline" className="mt-4">Back to Browse</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <Link
        to="/dashboard/browse"
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Browse
      </Link>

      <Card className="overflow-hidden">
        <div className="aspect-[16/10] bg-muted flex items-center justify-center">
          <span className="text-6xl">📦</span>
        </div>
        <CardContent className="p-6 lg:p-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="secondary">{item.category}</Badge>
            <Badge variant="outline">{item.condition}</Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{item.title}</h1>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {item.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formatRelativeTime(item.postedAt)}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {item.postedByName}
            </span>
          </div>
          <p className="mt-6 text-muted-foreground leading-relaxed">{item.description}</p>
          <div className="mt-8 flex gap-4">
            <Button onClick={handleRequest}>
              Request this item
            </Button>
            <Link to="/dashboard/browse">
              <Button variant="outline">Browse more</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

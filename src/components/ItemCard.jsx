import { Link } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardFooter } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { formatRelativeTime } from '../lib/utils';

export function ItemCard({ item }) {
  return (
    <Card className="overflow-hidden hover:shadow-soft-lg transition-smooth group">
      <div className="aspect-[4/3] bg-muted flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 group-hover:from-primary/10 group-hover:to-primary/20 transition-smooth" />
        <span className="text-4xl text-muted-foreground/50">📦</span>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground line-clamp-2 flex-1">{item.title}</h3>
          <Badge variant="secondary" className="shrink-0">{item.category}</Badge>
        </div>
        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {item.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {formatRelativeTime(item.postedAt)}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Link to={`/dashboard/items/${item.id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full">View Details</Button>
        </Link>
        <Link to={`/dashboard/items/${item.id}?request=1`} className="flex-1">
          <Button size="sm" className="w-full">Request Item</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

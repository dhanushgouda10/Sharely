import { Card, CardContent } from './ui/Card';
import { cn } from '../lib/utils';

export function StatCard({ title, value, icon: Icon, trend, className }) {
  return (
    <Card className={cn('hover:shadow-soft-lg transition-smooth', className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {trend && (
              <p className={cn(
                'text-xs mt-2',
                trend.startsWith('+') ? 'text-emerald-600' : 'text-muted-foreground'
              )}>
                {trend} from last week
              </p>
            )}
          </div>
          {Icon && (
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

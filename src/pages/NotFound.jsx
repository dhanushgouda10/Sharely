import { Link } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 px-4">
      <div className="h-24 w-24 rounded-2xl bg-muted flex items-center justify-center mb-8">
        <FileQuestion className="h-12 w-12 text-muted-foreground" />
      </div>
      <h1 className="text-4xl font-bold text-foreground">404</h1>
      <p className="text-muted-foreground mt-2 text-center max-w-sm">
        This page doesn’t exist or has been moved.
      </p>
      <div className="flex gap-4 mt-8">
        <Link to="/">
          <Button>Go home</Button>
        </Link>
        <Link to="/dashboard">
          <Button variant="outline">Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}

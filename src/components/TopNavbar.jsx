import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Menu, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { cn } from '../lib/utils';

export function TopNavbar({ onMenuClick, searchPlaceholder = 'Search items...' }) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-4 lg:px-8">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div
        className={cn(
          'flex-1 max-w-xl flex items-center rounded-xl border border-border bg-muted/30 transition-smooth',
          searchFocused && 'ring-2 ring-ring ring-offset-2 border-primary/20'
        )}
      >
        <Search className="h-4 w-4 text-muted-foreground ml-3 shrink-0" />
        <Input
          type="search"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
        </Button>

        <div className="relative" ref={dropdownRef}>
          <Button
            variant="ghost"
            className="flex items-center gap-2 pl-2 pr-2"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
          </Button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-card shadow-soft-lg py-2 animate-fade-in">
              <div className="px-4 py-2 border-b border-border">
                <p className="text-sm font-medium">Priya S.</p>
                <p className="text-xs text-muted-foreground">priya@example.com</p>
              </div>
              <Link
                to="/dashboard/profile"
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-smooth"
                onClick={() => setDropdownOpen(false)}
              >
                <Settings className="h-4 w-4" />
                Profile Settings
              </Link>
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-smooth"
                onClick={() => setDropdownOpen(false)}
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

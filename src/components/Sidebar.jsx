import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ListChecks,
  User,
  LogOut,
  HeartHandshake,
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/dashboard/browse', icon: Package, label: 'Browse Items' },
  { to: '/dashboard/post', icon: PlusCircle, label: 'Post Item' },
  { to: '/dashboard/listings', icon: ListChecks, label: 'My Listings' },
  { to: '/dashboard/requests', icon: HeartHandshake, label: 'My Requests' },
  { to: '/dashboard/profile', icon: User, label: 'Profile' },
];

export function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-full w-64 border-r border-border bg-card shadow-soft transition-transform duration-300 ease-out lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <HeartHandshake className="h-8 w-8 text-primary" />
          <span className="font-semibold text-lg">Share-Nearby</span>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => onClose?.()}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-smooth',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              {label}
            </NavLink>
          ))}
          <div className="mt-4 border-t border-border pt-4">
            <NavLink
              to="/"
              onClick={() => onClose?.()}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-smooth"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              Back to Home
            </NavLink>
          </div>
        </nav>
      </aside>
    </>
  );
}

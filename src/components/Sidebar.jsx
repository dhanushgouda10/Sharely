import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ListChecks,
  User,
  LogOut,
  HeartHandshake,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/dashboard/browse', icon: Package, label: 'Browse Items' },
  { to: '/dashboard/post', icon: PlusCircle, label: 'Post Item' },
  { to: '/dashboard/listings', icon: ListChecks, label: 'My Listings' },
  { to: '/dashboard/requests', icon: HeartHandshake, label: 'My Requests' },
  { to: '/dashboard/profile', icon: User, label: 'Profile' },
];

export function Sidebar({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      <>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
        )}

        <motion.aside
          initial={false}
          animate={{ x: isOpen ? 0 : '-100%' }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={cn(
            'fixed left-0 top-0 z-50 h-full w-64 border-r border-border bg-card shadow-2xl lg:shadow-none lg:translate-x-0 lg:static lg:h-screen lg:inset-auto',
            'transform' // Ensure transform is applied for mobile animation
          )}
          style={{
            // Reset transform on desktop to ensure it's always visible
            // This corresponds to lg:translate-x-0 but enforced via style for safety with framer-motion
            // We'll use a media query check or just rely on CSS overrides if possible,
            // but mixing Framer Motion and CSS media queries can be tricky.
            // A cleaner way is to conditionally render motion props or use a hook.
            // For simplicity here, we'll rely on the class `lg:translate-x-0` and `lg:!transform-none` if needed.
          }}
        >
          {/* Mobile Close Button */}
          <div className="absolute top-4 right-4 lg:hidden">
            <button onClick={onClose} className="p-2 rounded-full hover:bg-muted text-muted-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex h-20 items-center gap-3 px-6 border-b border-border/50">
            <div className="p-2 bg-primary/10 rounded-xl">
              <HeartHandshake className="h-6 w-6 text-primary" />
            </div>
            <span className="font-bold text-lg tracking-tight">Share-Nearby</span>
          </div>

          <nav className="flex flex-col gap-1 p-4 h-[calc(100vh-5rem)] overflow-y-auto custom-scrollbar">
            <div className="space-y-1">
              {navItems.map(({ to, icon: Icon, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={() => onClose?.()}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group relative overflow-hidden',
                      isActive
                        ? 'bg-primary/5 text-primary shadow-sm'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                          initial={false}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <Icon className={cn("h-5 w-5 shrink-0 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                      <span>{label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            <div className="mt-auto border-t border-border pt-4">
              <NavLink
                to="/"
                onClick={() => onClose?.()}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-destructive/5 hover:text-destructive transition-all duration-200"
              >
                <LogOut className="h-5 w-5 shrink-0" />
                Back to Home
              </NavLink>
            </div>
          </nav>
        </motion.aside>
      </>
    </AnimatePresence>
  );
}

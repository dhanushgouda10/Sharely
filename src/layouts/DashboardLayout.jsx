import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { TopNavbar } from '../components/TopNavbar';
import { Menu } from 'lucide-react';

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/20">
      {/* 
        We pass a key to force re-render if needed, but primarily 
        we rely on the internal motion logic and CSS overrides for desktop.
      */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-card">
        <Sidebar isOpen={true} onClose={() => { }} />
      </div>

      {/* Mobile Sidebar (controlled) */}
      <div className="lg:hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="lg:pl-64">
        {/* Top Navbar for Mobile mainly, but can hold user profile on desktop too if not in sidebar */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-white/50 backdrop-blur-md border-b border-border/50 lg:hidden">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 rounded-lg hover:bg-muted">
              <Menu className="h-6 w-6 text-foreground" />
            </button>
            <span className="font-semibold text-lg">Share-Nearby</span>
          </div>
        </header>

        <main className="p-4 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

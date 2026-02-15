import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { useToast } from '../components/Toast';
import { HeartHandshake, Package, Menu, X, Home, Users, Package as PackageIcon, Settings, HelpCircle, LogOut } from 'lucide-react';
import { Button } from '../components/ui/Button';

const featureCards = [
  {
    title: 'A secure environment where neighbors verify their address to join.',
    bold: 'verify',
  },
  {
    title: 'Stay informed with alerts and local requests from trusted neighbors.',
    bold: 'alerts and local requests',
  },
  {
    title: 'Discover local favorites—groceries, clothes, books—recommended by neighbors.',
    bold: 'local favorites',
  },
];

export default function Landing() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { addToast } = useToast();

  // Check for login success flag and show toast
  useEffect(() => {
    const loginSuccess = localStorage.getItem('loginSuccess');
    if (loginSuccess === 'true') {
      addToast('Successfully logged in', 'success');
      localStorage.removeItem('loginSuccess');
    }
  }, [addToast]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Users, label: 'Neighbors', href: '/neighbors' },
    { icon: PackageIcon, label: 'Browse Items', href: '/browse' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: HelpCircle, label: 'Help', href: '/help' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <HeartHandshake className="h-8 w-8 text-primary" />
            <span className="font-semibold text-xl text-primary">Share-Nearby</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    onClick={toggleSidebar}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${index === 0
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link
              to="/login"
              onClick={toggleSidebar}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span>Log in</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Navbar - white, menu button left, logo center, Log in (outline) + Sign up (green) right */}
      <Navbar onMenuClick={toggleSidebar} />

      {/* Hero strip - dark green band */}
      <div className="h-2 bg-primary" />

      {/* Feature cards - 3 columns, rounded-2xl, soft shadow, image top + text */}
      <section className="max-w-6xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid md:grid-cols-3 gap-8">
          {featureCards.map(({ title, bold }) => {
            const parts = title.split(bold);
            return (
              <div
                key={title}
                className="rounded-2xl overflow-hidden bg-card border border-border/50 shadow-soft hover:shadow-soft-lg transition-smooth"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Package className="h-16 w-16 text-primary/40" />
                </div>
                <div className="p-6">
                  <p className="text-foreground text-sm leading-relaxed">
                    {parts[0]}
                    <span className="font-semibold">{bold}</span>
                    {parts[1]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main CTA */}
      <section className="max-w-6xl mx-auto px-4 lg:px-8 text-center pb-16">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          Connect with your neighbors
        </h1>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
          Share what you don’t need. Help someone nearby. A community pantry for Whitefield, HSR Layout, Koramangala & more.
        </p>
        <Link to="/signup" className="inline-block mt-8">
          <Button size="lg" className="rounded-2xl px-10 shadow-button hover:shadow-soft transition-smooth">
            Join Share-Nearby
          </Button>
        </Link>
      </section>

      {/* Light grey section - secondary CTA */}
      <section className="bg-section py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <h2 className="text-2xl font-bold text-foreground">
            List your first item to share with local neighbors
          </h2>
          <div className="flex gap-2 flex-1 lg:max-w-md">
            <input
              type="text"
              placeholder="Your area (e.g. Whitefield)"
              className="flex h-11 flex-1 rounded-xl border border-input bg-white px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
            <Button className="rounded-xl shrink-0 px-6 shadow-button">
              Get started
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-section border-t border-border/60">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Share-Nearby</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/signup" className="hover:text-foreground transition-smooth">Sign up</Link></li>
                <li><Link to="/login" className="hover:text-foreground transition-smooth">Log in</Link></li>
                <li><a href="#how" className="hover:text-foreground transition-smooth">How it works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Neighbors</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#browse" className="hover:text-foreground transition-smooth">Browse items</a></li>
                <li><a href="#post" className="hover:text-foreground transition-smooth">Post an item</a></li>
                <li><a href="#areas" className="hover:text-foreground transition-smooth">Areas we serve</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#guidelines" className="hover:text-foreground transition-smooth">Guidelines</a></li>
                <li><a href="#safety" className="hover:text-foreground transition-smooth">Safety</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#privacy" className="hover:text-foreground transition-smooth">Privacy</a></li>
                <li><a href="#terms" className="hover:text-foreground transition-smooth">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/60">
            <p className="text-sm text-muted-foreground">© Share-Nearby 2026 · Community Pantry · Bangalore</p>
            <Button variant="outline" size="sm" className="rounded-xl">
              Get the app
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

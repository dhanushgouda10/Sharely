import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, PlusCircle, HeartHandshake, ArrowRight, MapPin, Clock, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { formatRelativeTime } from '../lib/utils';
import { items } from '../data/items';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemAnim = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export function DashboardHome() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const recentItems = items.slice(0, 5);

  if (loading) {
    return (
      <div className="space-y-8 p-1">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-5 w-72" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 rounded-3xl" />
          ))}
        </div>
        <Skeleton className="h-96 rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-2rem)] pb-20">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Overview</h1>
            <p className="text-muted-foreground mt-1 text-lg">Good morning, Neighbor. Here’s what’s needed nearby.</p>
          </div>
          <div className="hidden md:block">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              Active Community
            </span>
          </div>
        </div>

        {/* Bento Grid Stats */}
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {/* Primary Stat - Spans 2 cols on large */}
          <motion.div variants={itemAnim} className="md:col-span-2 bg-gradient-to-br from-primary to-indigo-600 rounded-3xl p-6 text-white shadow-soft relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Package className="w-32 h-32 rotate-12" />
            </div>
            <div className="relative z-10">
              <p className="text-indigo-100 font-medium mb-1">Total Impact</p>
              <h3 className="text-4xl font-bold mb-4">24 Items Shared</h3>
              <div className="flex items-center gap-2 text-sm bg-white/10 w-fit px-3 py-1.5 rounded-full backdrop-blur-sm">
                <span className="bg-emerald-400/20 text-emerald-300 font-semibold px-1.5 rounded">+3</span>
                <span className="text-indigo-100">this week</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemAnim} className="bg-card rounded-3xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-emerald-100 rounded-2xl">
                <PlusCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full">Active</span>
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-1">10</h3>
            <p className="text-muted-foreground font-medium">Active Listings</p>
          </motion.div>

          <motion.div variants={itemAnim} className="bg-card rounded-3xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-2xl">
                <HeartHandshake className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-xs font-semibold bg-orange-50 text-orange-700 px-2 py-1 rounded-full">Fulfilled</span>
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-1">14</h3>
            <p className="text-muted-foreground font-medium">Requests Met</p>
          </motion.div>
        </div>

        {/* Recent Activity Section */}
        <motion.div variants={itemAnim} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="rounded-3xl border-border shadow-sm overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between px-6 py-5 border-b border-border/50 bg-muted/20">
                <CardTitle className="text-xl">Recent Activity</CardTitle>
                <Link to="/dashboard/browse">
                  <Button variant="ghost" size="sm" className="hover:bg-background rounded-xl">
                    View All <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="divide-y divide-border/50">
                  {recentItems.map((item) => (
                    <li key={item.id} className="group hover:bg-muted/30 transition-colors duration-200">
                      <Link
                        to={`/dashboard/items/${item.id}`}
                        className="flex items-center gap-4 p-4 lg:p-6"
                      >
                        <div className="h-14 w-14 rounded-2xl bg-muted/50 flex items-center justify-center shrink-0 text-3xl shadow-sm group-hover:scale-105 transition-transform">
                          📦
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-foreground truncate">{item.title}</h4>
                            <span className="text-xs text-muted-foreground whitespace-nowrap bg-muted px-2 py-1 rounded-full">
                              {formatRelativeTime(item.postedAt)}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                            <span className="bg-primary/5 text-primary px-2 py-0.5 rounded text-xs font-medium">{item.category}</span>
                            <span className="flex items-center gap-1 text-xs"><MapPin className="h-3 w-3" /> {item.location}</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Side widget (e.g. Tips or Community News) */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-lg">
              <h3 className="font-bold text-xl mb-2">Community Tip</h3>
              <p className="text-emerald-50 mb-4 text-sm leading-relaxed">
                Neighbors who verify their profile are 3x more likely to have their requests fulfilled!
              </p>
              <Button variant="secondary" size="sm" className="w-full rounded-xl bg-white/20 hover:bg-white/30 text-white border-0">
                Verify Profile
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="fixed bottom-8 right-8 z-50 pointer-events-auto"
      >
        <Link to="/dashboard/post">
          <button className="h-16 w-16 bg-primary text-primary-foreground rounded-full shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group">
            <Plus className="h-8 w-8 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </Link>
      </motion.div>
    </div>
  );
}

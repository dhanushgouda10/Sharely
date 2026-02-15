import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { useToast } from '../components/Toast';
import { HeartHandshake, Package, Menu, X, Home, Users, Package as PackageIcon, Settings, HelpCircle, LogOut, ArrowRight, ShieldCheck, Zap, Globe, Search, ChevronDown, Star, Eye, Heart, MapPin, User } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      ease: "easeInOut"
    }
  }
};

const slideInFromBottom = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// Categories for navigation
const categories = [
  { name: 'Groceries', icon: Package, color: 'bg-emerald-100 text-emerald-600' },
  { name: 'Books', icon: Package, color: 'bg-blue-100 text-blue-600' },
  { name: 'Clothes', icon: Package, color: 'bg-purple-100 text-purple-600' },
  { name: 'Home Decor', icon: Package, color: 'bg-orange-100 text-orange-600' },
  { name: 'Tools', icon: Package, color: 'bg-gray-100 text-gray-600' },
];

// Sample listings for the grid
const sampleListings = [
  {
    id: 1,
    name: 'Fresh Organic Vegetables',
    location: '2.5 km away',
    category: 'Groceries',
    image: '🥬',
    isFavorite: false
  },
  {
    id: 2,
    name: 'Vintage Book Collection',
    location: 'Whitefield',
    category: 'Books',
    image: '📚',
    isFavorite: true
  },
  {
    id: 3,
    name: 'Designer Clothing Set',
    location: 'HSR Layout',
    category: 'Clothes',
    image: '👗',
    isFavorite: false
  },
  {
    id: 4,
    name: 'Handmade Home Decor',
    location: 'Koramangala',
    category: 'Home Decor',
    image: '🏺',
    isFavorite: false
  },
  {
    id: 5,
    name: 'Garden Tools Set',
    location: '1.8 km away',
    category: 'Tools',
    image: '🔧',
    isFavorite: true
  },
  {
    id: 6,
    name: 'Organic Fruits Basket',
    location: 'Indiranagar',
    category: 'Groceries',
    image: '🍎',
    isFavorite: false
  },
];

export default function Landing() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [listings, setListings] = useState(sampleListings);
  const { addToast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Check for login success flag and show toast
    const loginSuccess = localStorage.getItem('loginSuccess');
    if (loginSuccess === 'true') {
      addToast('Welcome back! You have successfully logged in.', 'success');
      localStorage.removeItem('loginSuccess');
    }
  }, [addToast]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    addToast('You have been logged out successfully.', 'info');
  };

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

  const toggleFavorite = (id) => {
    setListings(prev => 
      prev.map(item => 
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <HeartHandshake className="h-8 w-8 text-emerald-600" />
            <span className="font-semibold text-xl text-emerald-600">Share-Nearby</span>
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
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                      index === 0 
                        ? 'bg-emerald-50 text-emerald-600 font-medium' 
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

      {/* Navbar */}
      <nav className="sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 py-5 bg-white border-b border-slate-200">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
          >
            <Menu className="h-6 w-6 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" />
          </button>
          
          <Link to="/" className="flex items-center gap-2">
            <HeartHandshake className="h-8 w-8 text-emerald-600" />
            <span className="font-semibold text-xl text-emerald-600">Share-Nearby</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              <button type="button" className="hidden sm:flex items-center gap-1 text-slate-600 text-sm font-medium hover:text-slate-900 transition-smooth">
                How it works
                <ChevronDown className="h-4 w-4" />
              </button>
              <button type="button" className="hidden sm:flex items-center gap-1 text-slate-600 text-sm font-medium hover:text-slate-900 transition-smooth">
                Areas
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-emerald-600" />
                </div>
                <span className="text-sm font-medium text-slate-900">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-xs text-slate-500 hover:text-slate-700 transition-smooth"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <button type="button" className="hidden sm:flex items-center gap-1 text-slate-600 text-sm font-medium hover:text-slate-900 transition-smooth">
                How it works
                <ChevronDown className="h-4 w-4" />
              </button>
              <button type="button" className="hidden sm:flex items-center gap-1 text-slate-600 text-sm font-medium hover:text-slate-900 transition-smooth">
                Areas
                <ChevronDown className="h-4 w-4" />
              </button>
              <Link to="/login">
                <Button variant="outline" className="rounded-xl px-5 border-slate-300 text-slate-700 hover:bg-slate-50">
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="rounded-xl px-5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow-md transition-smooth">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section - Split Layout */}
      <section className="px-4 lg:px-8 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Typography */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
              className="space-y-8"
            >
              <motion.div 
                variants={staggerContainer}
                className="space-y-6"
              >
                <motion.h1 variants={fadeInUp} className="text-5xl lg:text-6xl font-serif text-slate-900 leading-tight">
                  Share the Surplus,
                  <br />
                  <motion.span 
                    variants={fadeInUp}
                    className="text-emerald-600 inline-block"
                  >
                    Strengthen the Neighborhood
                  </motion.span>
                </motion.h1>
                <motion.p variants={fadeInUp} className="text-xl text-slate-600 font-light leading-relaxed max-w-lg">
                  Connect with your community, share what you don't need, and discover treasures from your neighbors. Building stronger communities, one share at a time.
                </motion.p>
              </motion.div>
              
              <motion.div 
                variants={staggerContainer}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.div variants={scaleIn}>
                  <Button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 text-lg font-medium group">
                    Start Sharing
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </motion.div>
                <motion.div variants={scaleIn}>
                  <Button variant="outline" className="px-8 py-4 border-slate-300 text-slate-700 hover:bg-slate-50 rounded-2xl transition-all duration-300 text-lg font-medium">
                    Browse Items
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div 
                variants={slideInFromBottom}
                className="flex items-center gap-8 text-sm text-slate-500"
              >
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-emerald-500 fill-current" />
                  <span>4.8/5 Community Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-emerald-500" />
                  <span>10,000+ Active Users</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Hero Image with Floating Animation */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
              className="relative"
            >
              <motion.div 
                variants={floatingAnimation}
                animate="animate"
                className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-3xl overflow-hidden shadow-xl"
              >
                {/* Placeholder for hero image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    variants={scaleIn}
                    className="text-center space-y-4"
                  >
                    <motion.div 
                      variants={staggerContainer}
                      className="text-6xl"
                    >
                      🥬📚👗
                    </motion.div>
                    <motion.p 
                      variants={fadeInUp}
                      className="text-emerald-700 font-medium"
                    >
                      Community Sharing Hub
                    </motion.p>
                  </motion.div>
                </div>
                
                {/* 30% Less Waste Badge */}
                <motion.div 
                  variants={scaleIn}
                  className="absolute top-6 right-6 bg-emerald-600 text-white rounded-full px-4 py-2 shadow-lg"
                >
                  <span className="text-sm font-bold">30% Less Waste</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Navigation Bar */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideInFromBottom}
        className="px-4 lg:px-8 py-8 bg-white border-y border-slate-200"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={staggerContainer}
            className="flex items-center gap-2 overflow-x-auto pb-2"
          >
            <motion.button
              variants={scaleIn}
              onClick={() => setSelectedCategory('All')}
              className={`flex flex-col items-center gap-2 min-w-[80px] p-3 rounded-xl transition-all duration-300 ${
                selectedCategory === 'All' 
                  ? 'bg-emerald-100 border-2 border-emerald-500 scale-105' 
                  : 'hover:bg-slate-50 border-2 border-transparent hover:border-slate-200'
              }`}
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center"
              >
                <Package className="h-6 w-6 text-slate-600" />
              </motion.div>
              <span className="text-xs font-medium text-slate-700">All</span>
            </motion.button>
            
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.name}
                  variants={scaleIn}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex flex-col items-center gap-2 min-w-[80px] p-3 rounded-xl transition-all duration-300 ${
                    selectedCategory === category.name 
                      ? 'bg-emerald-100 border-2 border-emerald-500 scale-105' 
                      : 'hover:bg-slate-50 border-2 border-transparent hover:border-slate-200'
                  }`}
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center`}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <span className="text-xs font-medium text-slate-700">{category.name}</span>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Trendy Collection Grid */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideInFromBottom}
        className="px-4 lg:px-8 py-20 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div 
              variants={fadeInUp}
              className="text-center space-y-4"
            >
              <motion.h2 variants={fadeInUp} className="text-4xl font-serif text-slate-900">
                Trending in Your Area
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-slate-600 max-w-2xl mx-auto">
                Discover what your neighbors are sharing right now
              </motion.p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {listings.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={scaleIn}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center overflow-hidden">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="text-5xl"
                    >
                      {item.image}
                    </motion.div>
                    
                    {/* Action buttons on hover */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-3 right-3 flex gap-2"
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleFavorite(item.id)}
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <motion.div
                          animate={{ scale: item.isFavorite ? [1, 1.2, 1] : 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Heart className={`h-4 w-4 ${item.isFavorite ? 'text-red-500 fill-current' : 'text-slate-400'}`} />
                        </motion.div>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <Eye className="h-4 w-4 text-slate-400" />
                      </motion.button>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 space-y-3"
                  >
                    <div>
                      <motion.h3 
                        whileHover={{ color: '#10b981' }}
                        className="font-semibold text-slate-900 text-lg transition-colors duration-300"
                      >
                        {item.name}
                      </motion.h3>
                      <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                        <MapPin className="h-3 w-3" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                    
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center justify-between"
                    >
                      <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium cursor-pointer"
                      >
                        {item.category}
                      </motion.span>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button size="sm" className="text-xs px-3 py-1 bg-emerald-600 hover:bg-emerald-700 transition-colors duration-300">
                          Request
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 px-4 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Share-Nearby</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link to="/signup" className="hover:text-emerald-600 transition-colors">Sign up</Link></li>
                <li><Link to="/login" className="hover:text-emerald-600 transition-colors">Log in</Link></li>
                <li><a href="#how" className="hover:text-emerald-600 transition-colors">How it works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Neighbors</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#browse" className="hover:text-emerald-600 transition-colors">Browse items</a></li>
                <li><a href="#post" className="hover:text-emerald-600 transition-colors">Post an item</a></li>
                <li><a href="#areas" className="hover:text-emerald-600 transition-colors">Areas we serve</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#guidelines" className="hover:text-emerald-600 transition-colors">Guidelines</a></li>
                <li><a href="#safety" className="hover:text-emerald-600 transition-colors">Safety</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#privacy" className="hover:text-emerald-600 transition-colors">Privacy</a></li>
                <li><a href="#terms" className="hover:text-emerald-600 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-600">© Share-Nearby 2026 · Community Pantry · Bangalore</p>
            <Button variant="outline" size="sm" className="rounded-xl border-slate-300">
              Get the app
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
          
            

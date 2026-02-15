import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { useToast } from '../components/Toast';
import { HeartHandshake, Package, Menu, X, Home, Users, Package as PackageIcon, Settings, HelpCircle, LogOut, ArrowRight, ShieldCheck, Zap, Globe, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const featureCards = [
  {
    title: 'Connect with your Community',
    description: 'Find and join groups in the Sharely app or on Facebook.',
    icon: Users,
    color: 'text-primary',
  },
  {
    title: 'Share Gives, Asks, & Gratitude',
    description: 'Give what you have, ask for what you need, and celebrate generosity together.',
    icon: Package,
    color: 'text-primary',
  },
  {
    title: 'Your Neighborhood & Beyond',
    description: 'Explore posts nearby, or search for special items around the world.',
    icon: Globe,
    color: 'text-primary',
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
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-secondary selection:text-secondary-foreground">
      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Keeping basic structure but updating styles */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isSidebarOpen ? 0 : '-100%' }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-full w-72 bg-card shadow-2xl z-50 border-r border-border"
      >
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <HeartHandshake className="h-8 w-8 text-primary" />
            <span className="font-serif font-bold text-xl tracking-tight">Sharely</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={toggleSidebar}
                className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-200 ${index === 0
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border/50 bg-muted/30">
          <Link
            to="/login"
            onClick={toggleSidebar}
            className="flex items-center gap-3 px-4 py-3 rounded-full text-muted-foreground hover:bg-destructive/5 hover:text-destructive transition-all duration-200"
          >
            <LogOut className="h-5 w-5" />
            <span>Log in</span>
          </Link>
        </div>
      </motion.div>

      <Navbar onMenuClick={toggleSidebar} />

      {/* Main Content Area */}
      <main className="overflow-x-hidden">

        {/* Split Hero Section */}
        <section className="relative pt-12 pb-24 lg:pt-24 lg:pb-32 px-4 lg:px-8 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center lg:text-left space-y-8"
            >
              <h1 className="font-serif text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                Welcome to the <br />
                Sharely Project
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                Join our global community for giving and getting stuff, completely for free. Connect with your neighbors and build a better world.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full h-14 rounded-full bg-primary hover:bg-primary/90 text-xl font-semibold px-10 shadow-lg hover:-translate-y-1 transition-transform">
                    Sign up
                  </Button>
                </Link>
                <Link to="/app" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full h-14 rounded-full border-primary text-primary hover:bg-primary/5 text-lg font-medium px-8">
                    Download the app
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Content - Organic Blob & Images */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-secondary rounded-[60%_40%_30%_70%/60%_30%_70%_40%] opacity-20 blur-3xl animate-pulse-slow pointer-events-none" />

              {/* Main Organic Shape Container */}
              <div className="bg-secondary rounded-[60%_40%_30%_70%/60%_30%_70%_40%] p-8 aspect-square flex items-center justify-center relative shadow-inner overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />

                {/* Floating Cards simulating the reference image */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="absolute top-[15%] right-[10%] bg-white p-4 rounded-2xl shadow-xl max-w-[180px] rotate-3"
                >
                  <div className="h-24 bg-slate-200 rounded-xl mb-3 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=300" alt="Bicycle" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">M</div>
                    <span className="text-xs font-bold text-slate-800">Matt Martin</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute bottom-[20%] left-[10%] bg-white p-4 rounded-2xl shadow-xl max-w-[200px] -rotate-2 z-10"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 flex items-center gap-1">Priya Shah <ShieldCheck className="h-3 w-3 text-emerald-500 fill-emerald-500" /></p>
                      <p className="text-xs text-slate-500">London, UK</p>
                    </div>
                  </div>
                  <div className="h-20 bg-slate-100 rounded-lg overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1594026212509-50779a8e91b4?auto=format&fit=crop&q=80&w=300" alt="Chair" className="w-full h-full object-cover" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section - Off-white background with large rounded cards */}
        <section className="py-24 bg-[#F9F8F6]">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl lg:text-5xl text-foreground mb-6">Discover what your neighbors<br />are giving away</h2>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {featureCards.map(({ title, description, icon: Icon, color }) => (
                <motion.div
                  key={title}
                  variants={fadeInUp}
                  className="bg-white rounded-[2.5rem] p-10 text-center shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center"
                >
                  <div className="mb-6 h-20 w-20 rounded-full bg-primary/5 flex items-center justify-center">
                    <Icon className={`h-10 w-10 ${color}`} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-xl mb-4 text-foreground">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {description}
                  </p>
                  <Link to="/about" className="mt-auto border-b border-primary text-primary font-semibold hover:text-primary/80 transition-colors pb-0.5">
                    Learn more
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Search / Map CTA */}
        <section className="bg-primary text-primary-foreground overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-24 text-center relative z-10">
            <h2 className="font-serif text-3xl lg:text-5xl font-bold mb-6">Update 3.0.6: Better Browsing!</h2>
            <p className="text-primary-foreground/90 max-w-2xl mx-auto text-lg mb-10 font-light">
              Behind the scenes, our team has been working around the clock to bring back your favorite features. Giving, asking, and gratitude can flow freely!
            </p>
          </div>
          {/* Abstract decorative wave */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#F9F8F6] rounded-t-[50%] scale-x-150 translate-y-8" />
        </section>

      </main>

      {/* Footer - Warm Beige */}
      <footer className="bg-[#F9F8F6] pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-16">
            {/* Left Column */}
            <div className="lg:w-1/4">
              <h4 className="font-bold text-lg mb-6">Home</h4>
              <div className="space-y-4 font-bold text-lg text-foreground/80">
                <p className="cursor-pointer hover:text-primary transition-colors">About</p>
                <p className="cursor-pointer hover:text-primary transition-colors">Media</p>
                <p className="cursor-pointer hover:text-primary transition-colors">Sharely 101</p>
              </div>
            </div>

            {/* Divider for desktop */}
            <div className="hidden lg:block w-px bg-border/50 self-stretch my-2"></div>

            {/* Right Columns Grid */}
            <div className="lg:w-3/4 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h6 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-6">Follow Us</h6>
                <ul className="space-y-3 font-medium text-foreground underline decoration-border hover:decoration-primary underline-offset-4 decoration-2">
                  <li><a href="#">Facebook</a></li>
                  <li><a href="#">Instagram</a></li>
                  <li><a href="#">Linkedin</a></li>
                </ul>
              </div>
              <div>
                <h6 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-6">Features</h6>
                <ul className="space-y-3 font-medium text-foreground underline decoration-border hover:decoration-primary underline-offset-4 decoration-2">
                  <li><a href="#">Shipping</a></li>
                  <li><a href="#">Subscriptions</a></li>
                  <li><a href="#">Private Communities</a></li>
                </ul>
              </div>
              <div>
                <h6 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-6">Support</h6>
                <ul className="space-y-3 font-medium text-foreground underline decoration-border hover:decoration-primary underline-offset-4 decoration-2">
                  <li><a href="#">Help Center</a></li>
                  <li><a href="#">Give App Feedback</a></li>
                  <li><a href="#">Get Involved</a></li>
                  <li><a href="#">Contact Us</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground pt-8 border-t border-border/10">
            <p>© 2026 The Sharely Project</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground underline">Privacy Policy</a>
              <a href="#" className="hover:text-foreground underline">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

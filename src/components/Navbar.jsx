import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartHandshake, Menu, ChevronDown, User, LogOut, LayoutDashboard, Bell } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar({ onMenuClick }) {
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Check for user in localStorage on mount
    useEffect(() => {
        const checkUser = () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                } catch (e) {
                    console.error('Failed to parse user from localStorage', e);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        };

        checkUser();
        window.addEventListener('storage', checkUser);
        window.addEventListener('auth-change', checkUser);

        return () => {
            window.removeEventListener('storage', checkUser);
            window.removeEventListener('auth-change', checkUser);
        };
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setDropdownOpen(false);
        navigate('/');
        window.dispatchEvent(new Event('auth-change'));
    };

    return (
        <nav
            className={cn(
                "sticky top-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-background/95 backdrop-blur-md border-b border-border/40 py-3 shadow-sm"
                    : "bg-transparent py-5"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 text-foreground hover:bg-secondary/20 rounded-full transition-colors"
                        aria-label="Open menu"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    {/* Logo - Serif and Simple */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <HeartHandshake className="h-8 w-8 text-primary" />
                        <span className="font-serif font-bold text-2xl tracking-tight text-foreground">
                            Sharely
                        </span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden lg:flex items-center gap-6">
                        <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About</Link>
                        <Link to="/guidelines" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Guidelines</Link>
                        <Link to="/donate" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Donate</Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <button className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/20 transition-colors relative">
                                <Bell className="h-6 w-6" />
                                <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-background"></span>
                            </button>

                            {/* User Profile with Dropdown */}
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 p-1 pr-3 rounded-full border border-border hover:border-primary/50 hover:bg-secondary/10 transition-all duration-200"
                                >
                                    {user.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.name || 'User'}
                                            className="h-8 w-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-8 w-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-xs ring-2 ring-background">
                                            {user.name ? user.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                                        </div>
                                    )}
                                    <span className="hidden sm:block text-sm font-medium text-foreground max-w-[100px] truncate">
                                        {user.name || 'User'}
                                    </span>
                                    <ChevronDown
                                        className={cn(
                                            "h-4 w-4 text-muted-foreground transition-transform duration-200",
                                            dropdownOpen && "rotate-180"
                                        )}
                                    />
                                </button>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {dropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.15, ease: "easeOut" }}
                                            className="absolute right-0 mt-2 w-60 origin-top-right bg-card rounded-2xl shadow-soft border border-border p-2 focus:outline-none z-50"
                                        >
                                            <div className="px-3 py-2 mb-2 bg-secondary/10 rounded-xl">
                                                <p className="text-sm font-serif font-bold text-foreground truncate">{user.name || 'User'}</p>
                                                <p className="text-xs text-muted-foreground truncate">{user.email || ''}</p>
                                            </div>

                                            <div className="space-y-1">
                                                <Link
                                                    to="/dashboard"
                                                    className="flex items-center gap-3 w-full px-3 py-2 text-sm text-foreground rounded-xl hover:bg-secondary/20 transition-colors"
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                                                    Dashboard
                                                </Link>
                                                <div className="h-px bg-border/50 my-1" />
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center gap-3 w-full px-3 py-2 text-sm text-destructive rounded-xl hover:bg-destructive/5 transition-colors"
                                                >
                                                    <LogOut className="h-4 w-4" />
                                                    Logout
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </>
                    ) : (
                        // Login / Signup Buttons
                        <div className="flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="ghost" className="hidden sm:flex text-foreground font-medium hover:bg-secondary/20 rounded-full px-6">
                                    Log in
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-5 shadow-none hover:shadow-lg transition-all text-base font-semibold">
                                    Sign up
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

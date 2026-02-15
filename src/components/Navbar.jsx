import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartHandshake, Menu, ChevronDown, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '../lib/utils';

export function Navbar({ onMenuClick }) {
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

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

        // Listen for storage events to sync across tabs or after login
        window.addEventListener('storage', checkUser);

        // Custom event for same-tab updates (optional but good for SPA)
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
        // Dispatch event to update other components if needed
        window.dispatchEvent(new Event('auth-change'));
    };

    return (
        <nav className="sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 py-4 bg-white/80 backdrop-blur-md border-b border-border/60 max-w-7xl mx-auto transition-all duration-300">
            <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
                    aria-label="Open menu"
                >
                    <Menu className="h-6 w-6 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" />
                </button>

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <HeartHandshake className="h-8 w-8 text-primary transition-transform group-hover:scale-110 duration-300" />
                    <span className="font-semibold text-xl text-primary tracking-tight">Share-Nearby</span>
                </Link>
            </div>

            <div className="flex items-center gap-6">
                {/* Desktop Links (Optional - usually on Landing these are anchor links or hidden) */}
                <div className="hidden md:flex items-center gap-6">
                    {/* Add any specific landing page links here if needed, keeping it clean for now */}
                </div>

                {user ? (
                    // User Profile with Dropdown
                    <div className="relative" ref={dropdownRef}>
                        <div className="flex items-center gap-2 p-1 pr-3 rounded-full border border-border/50 hover:bg-gray-50 transition-all duration-200 group">
                            {/* Avatar - navigates to dashboard */}
                            <Link
                                to="/dashboard"
                                title="Go to Dashboard"
                                className="flex items-center justify-center"
                            >
                                {user.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt={user.name || 'User'}
                                        className="h-9 w-9 rounded-full object-cover border border-gray-100"
                                    />
                                ) : (
                                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <User className="h-5 w-5" />
                                    </div>
                                )}
                            </Link>
                            {/* Dropdown trigger button - name and chevron */}
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <span className="hidden sm:block text-sm font-medium text-gray-700 group-hover:text-gray-900 max-w-[100px] truncate">
                                    {user.name || 'User'}
                                </span>
                                <ChevronDown className={cn("h-4 w-4 text-gray-400 transition-transform duration-200", dropdownOpen && "rotate-180")} />
                            </button>
                        </div>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                                <div className="py-2 px-1">
                                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                                        <p className="text-sm font-medium text-gray-900 truncate">{user.name || 'User'}</p>
                                        <p className="text-xs text-gray-500 truncate">{user.email || ''}</p>
                                    </div>

                                    <Link
                        to="/dashboard"
                        className="group flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                        onClick={() => setDropdownOpen(false)}
                    >
                        <LayoutDashboard className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                        Dashboard
                    </Link>

                                    <div className="my-1 border-t border-gray-100" />

                                    <button
                                        onClick={handleLogout}
                                        className="group flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut className="h-4 w-4 text-red-400 group-hover:text-red-600 transition-colors" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    // Login / Signup Buttons
                    <div className="flex items-center gap-3 animate-in fade-in duration-500">
                        <Link to="/login">
                            <Button variant="ghost" className="hidden sm:flex rounded-xl font-medium hover:bg-gray-100 text-gray-600">
                                Log in
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button className="rounded-xl px-5 shadow-sm hover:shadow-md transition-all duration-300 bg-primary hover:bg-primary/90 text-white font-medium">
                                Sign up
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

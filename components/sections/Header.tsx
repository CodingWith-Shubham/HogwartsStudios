'use client';
import logowhite from '@/public/Media/logowhite.webp'
import logoblack from '@/public/Media/logoblack.webp'
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun} from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = () => {
    setIsToggling(true);
    setTheme(theme === 'dark' ? 'light' : 'dark');
    setTimeout(() => {
      setIsToggling(false);
    }, 600);
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  // Animation variants for dropdown
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.6, ease: "easeInOut" as const },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.6, ease: "easeInOut" as const },
    },
  };

  // Animation variants for dropdown items
  const dropdownItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
      },
    }),
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-20 h-[60px] relative flex items-center justify-center">
              {mounted && (
                <Image
                  src={resolvedTheme === 'dark' ? logowhite : logoblack}
                  alt="Hogwarts Studios Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              )}
            </div>
            <span className="text-[20px] font-bold font-magical text-black dark:text-white">
              Hogwarts
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-body-alt"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleThemeToggle}
                className={`theme-toggle ${
                  isToggling 
                    ? theme === 'dark' 
                      ? 'switching-to-light' 
                      : 'switching-to-dark'
                    : ''
                }`}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}
            <Button className="hidden md:flex btn-glow bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transition-all duration-300 font-body-alt">
              Book Session
            </Button>
            
            {/* Mobile menu button with animated hamburger */}
            <button
              className="md:hidden flex items-center text-foreground hover:text-foreground/80 transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <motion.span
                  initial={false}
                  animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-0.5 bg-current block"
                  aria-hidden="true"
                />
                <motion.span
                  initial={false}
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-0.5 bg-current block"
                  aria-hidden="true"
                />
                <motion.span
                  initial={false}
                  animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-0.5 bg-current block"
                  aria-hidden="true"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu with smooth animations */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={dropdownVariants}
              className="md:hidden backdrop-blur-md bg-background/95 border-t border-border shadow-xl"
              role="menu"
              aria-label="Mobile menu"
            >
              <div className="flex flex-col px-4 py-6 space-y-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    custom={i}
                    variants={dropdownItemVariants}
                    initial="hidden"
                    animate="visible"
                    role="none"
                    className="relative"
                  >
                    <a
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="font-body-alt font-medium text-base py-3 px-3 block transition-all duration-300 relative group rounded-xl touch-manipulation text-foreground/80 hover:text-foreground hover:bg-foreground/5 active:bg-foreground/10 active:scale-95"
                      role="menuitem"
                      style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="relative z-10 font-semibold">
                          {item.name}
                        </span>
                      </div>

                      {/* Hover/Active background effect */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-foreground/5 to-foreground/10 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300" />

                      {/* Touch ripple effect */}
                      <div className="absolute inset-0 rounded-xl bg-foreground/20 opacity-0 group-active:opacity-100 transition-opacity duration-150" />
                    </a>
                  </motion.div>
                ))}

                <div className="border-t border-border my-4" />

                <motion.div
                  custom={navItems.length}
                  variants={dropdownItemVariants}
                  className="relative"
                  role="none"
                >
                  <Button 
                    className="w-full text-left font-body-alt font-semibold text-base py-3 px-3 block btn-glow bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transition-all duration-300 relative group rounded-xl touch-manipulation active:scale-95"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="relative z-10">Book Session</span>
                      <motion.div
                        className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center"
                        whileHover={{ rotate: 90 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      </motion.div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-300 opacity-0 group-hover:opacity-20 group-active:opacity-30 transition-all duration-300 rounded-xl" />
                    <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-active:opacity-100 transition-opacity duration-150" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
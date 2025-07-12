'use client';
import logowhite from '@/public/Media/logowhite.png'
import logoblack from '@/public/Media/logoblack.png'
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

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
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

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
            <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent font-magical">
              Hogwarts Studios
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
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-body-alt"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button className="mt-4 btn-glow bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transition-all duration-300 font-body-alt">
                Book Session
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
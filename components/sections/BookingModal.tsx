'use client';
import { useState, useEffect } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    fullName?: string;
    email?: string;
    phone?: string;
    facilityType?: string;
    message?: string;
  };
}

export function BookingModal({ isOpen, onClose, initialData = {} }: BookingModalProps) {
  const [formData, setFormData] = useState({
    fullName: initialData.fullName || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    address: '',
    facilityType: initialData.facilityType || '',
    message: initialData.message || '',
    honeypot: '', // Spam protection
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        facilityType: '',
        message: '',
        honeypot: '',
      });
      setErrors({});
      setIsSuccess(false);
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.facilityType) {
      newErrors.facilityType = 'Please select a facility type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check honeypot
    if (formData.honeypot) {
      return; // Likely spam
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '28c7a933-3db8-41dc-b1d7-48b34057802c',
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          facility_type: formData.facilityType,
          message: formData.message,
          subject: `New Booking Request from ${formData.fullName}`,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        // Auto-close modal after 3 seconds
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal - More square-like proportions with responsive sizing */}
      <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg bg-background border border-border rounded-2xl shadow-2xl transform transition-all duration-300 scale-100 animate-in fade-in-0 zoom-in-95 max-h-[90vh] overflow-hidden">
        {/* Header - More compact */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">Book Session</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-foreground/10 transition-colors duration-200"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-foreground/70" />
          </button>
        </div>

        {/* Success Message */}
        {isSuccess && (
          <div className="p-6 text-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground mb-1">Thank You!</h3>
                <p className="text-foreground/70 text-xs">
                  Your booking request has been sent. We'll get back to you soon!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form - More compact with better spacing */}
        {!isSuccess && (
          <div className="max-h-[calc(90vh-80px)] overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-3">
              {/* Honeypot field - hidden from users */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleInputChange}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Two-column layout for larger screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className="block text-xs font-medium text-foreground mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 text-sm border rounded-lg bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                      errors.fullName ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-foreground mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 text-sm border rounded-lg bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                      errors.email ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-foreground mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 text-sm border rounded-lg bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                      errors.phone ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="Phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-xs font-medium text-foreground mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    placeholder="Address (optional)"
                  />
                </div>

                {/* Facility Type */}
                <div className="sm:col-span-2">
                  <label htmlFor="facilityType" className="block text-xs font-medium text-foreground mb-1">
                    Facility Type *
                  </label>
                  <select
                    id="facilityType"
                    name="facilityType"
                    value={formData.facilityType}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 text-sm border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                      errors.facilityType ? 'border-red-500' : 'border-border'
                    }`}
                  >
                    <option value="">Select facility type</option>
                    <option value="Ad Shoot">Ad Shoot</option>
                    <option value="Podcast">Podcast</option>
                    <option value="Product Shoot">Product Shoot</option>
                    <option value="Reel Shoot">Reel Shoot</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.facilityType && (
                    <p className="text-red-500 text-xs mt-1">{errors.facilityType}</p>
                  )}
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-xs font-medium text-foreground mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Additional details..."
                  />
                </div>
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <p className="text-red-500 text-xs">{errors.submit}</p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-2 text-sm rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3 h-3" />
                    <span>Send Message</span>
                  </>
                )}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
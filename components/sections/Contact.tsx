'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Mail, Clock, Camera } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Studio Location',
      content: '123 Creative District, Arts Quarter, NYC 10001'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (555) 123-4567'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'hello@hogwartsstudios.com'
    },
    {
      icon: Clock,
      title: 'Studio Hours',
      content: 'Mon-Fri: 9AM-7PM, Sat: 10AM-5PM'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Reduced density background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 left-12 w-3 h-3 bg-red-300 rounded-full floating-particle glow-pulse" />
        <div className="absolute top-1/3 right-16 w-2 h-2 bg-yellow-300 rounded-full floating-particle-delayed glow-pulse" />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-orange-300 rounded-full floating-particle glow-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent font-magical">
            Let's Create Together
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto font-body-alt">
            Ready to bring your creative vision to life? Get in touch with us to discuss your project and book a session
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-0 bg-white dark:bg-gray-800/50 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold font-magical-alt">Book a Session</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="font-body-alt">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                      className="mt-2 font-body-alt"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="font-body-alt">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                      className="mt-2 font-body-alt"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="font-body-alt">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      required
                      className="mt-2 font-body-alt"
                    />
                  </div>
                  <div>
                    <Label htmlFor="service" className="font-body-alt">Select Service</Label>
                    <Select value={formData.service} onValueChange={(value) => handleChange('service', value)}>
                      <SelectTrigger className="mt-2 font-body-alt">
                        <SelectValue placeholder="Choose a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="podcast">Podcast Shoot & Edit</SelectItem>
                        <SelectItem value="product">Product Photography</SelectItem>
                        <SelectItem value="fashion">Fashion & Makeup Shoot</SelectItem>
                        <SelectItem value="brand">Ad & Personal Brand Shoot</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="message" className="font-body-alt">Project Details</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows={4}
                    placeholder="Tell us about your project, timeline, and any specific requirements..."
                    className="mt-2 font-body-alt"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full btn-glow bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-6 text-lg font-semibold transition-all duration-300 font-body-alt"
                >
                  Send Message & Book Session
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="border-0 bg-white dark:bg-gray-800/50 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold font-magical-alt">Get In Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 font-body-alt">{info.title}</h3>
                      <p className="text-foreground/70 font-body-alt">{info.content}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Studio Preview */}
            <Card className="border-0 bg-white dark:bg-gray-800/50 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <div className="aspect-video bg-gradient-to-br from-red-100 to-yellow-100 dark:from-red-900/20 dark:to-yellow-900/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 font-magical-alt">Studio Preview</h3>
                    <p className="text-foreground/70 text-sm font-body-alt">Virtual tour coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
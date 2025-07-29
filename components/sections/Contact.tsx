'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  MapPin, Phone, Mail, Clock, Camera, Map, ExternalLink,
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [showMap, setShowMap] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const studioAddress = 'D-301, near shalom presidency school, Shushant Lok 2, Sector 56, Gurugram, Ghata, Haryana 122011';
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(studioAddress)}`;

  const contactInfo = [
    { icon: MapPin, title: 'Studio Location', content: studioAddress },
    { icon: Phone, title: 'Phone', content: '083680 65462' },
    { icon: Mail, title: 'Email', content: 'hogwartsstudios1@gmail.com' },
    { icon: Clock, title: 'Studio Hours', content: 'Open 24 hours' }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Create Together</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to bring your creative vision to life? Get in touch with us to discuss your project and book a session
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Contact Form */}
          <Card className="border-0 bg-white dark:bg-gray-800/50 backdrop-blur-sm shadow-lg flex flex-col h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Book a Session</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between flex-grow">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} required className="mt-2" placeholder="Enter your full name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} required className="mt-2" placeholder="Enter your email" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} required className="mt-2" placeholder="Enter your phone number" />
                  </div>
                  <div>
                    <Label htmlFor="service">Select Service</Label>
                    <Select value={formData.service} onValueChange={(value) => handleChange('service', value)}>
                      <SelectTrigger className="mt-2">
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
                  <Label htmlFor="message">Project Details</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Tell us about your project, timeline, and any specific requirements..."
                    className="mt-2 lg:min-h-[350px] lg:max-h-[400px] min-h-[160px] max-h-[180px] resize-none"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-6 text-lg font-semibold transition-all duration-300 mt-4"
                  >
                    Send Message & Book Session
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Right Column */}
          <div className="space-y-8 h-full flex flex-col">
            <Card className="border-0 bg-white dark:bg-gray-800/50 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Get In Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{info.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{info.content}</p>

                      {info.title === 'Studio Location' && (
                        <div className="mt-3 space-y-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowMap(!showMap)}
                            className="flex items-center gap-2 border-gray-300 text-gray-800 dark:text-gray-200 hover:bg-red-600 hover:text-white dark:hover:text-white hover:border-red-600 transition-colors"
                          >
                            <Map className="h-4 w-4" />
                            {showMap ? 'Hide Map' : 'View Location in Map'}
                          </Button>

                          {showMap && (
                            <div className="mt-4">
                              <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-inner">
                                <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20 flex items-center justify-center relative group cursor-pointer hover:from-blue-200 hover:to-green-200 dark:hover:from-blue-800/30 dark:hover:to-green-800/30 transition-all duration-300"
                                  onClick={() => window.open(googleMapsUrl, '_blank')}>
                                  <div className="text-center z-10">
                                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                      <MapPin className="h-6 w-6 text-white" />
                                    </div>
                                    <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Hogwarts Studios</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Sector 56, Gurugram</p>
                                    <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors">
                                      <ExternalLink className="h-4 w-4" />
                                      <span className="text-sm font-medium">Open in Google Maps</span>
                                    </div>
                                  </div>
                                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                              </div>
                              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                Click on the map to open in Google Maps
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 bg-white dark:bg-gray-800/50 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <div className="aspect-video bg-gradient-to-br from-red-100 to-yellow-100 dark:from-red-900/20 dark:to-yellow-900/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Studio Preview</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Virtual tour coming soon</p>
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
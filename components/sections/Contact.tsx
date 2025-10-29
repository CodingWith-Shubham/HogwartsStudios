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
  MapPin, Phone, Mail, Clock, Camera, Map, ExternalLink, Send, CheckCircle, AlertCircle, Play, X,
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
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showVideo, setShowVideo] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setSubmitStatus('error');
      return false;
    }
    if (!formData.phone.trim()) {
      setSubmitStatus('error');
      return false;
    }
    if (!formData.service) {
      setSubmitStatus('error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    let whatsappMessage = `*New Contact Form Inquiry*\n\n`;
    whatsappMessage += `*Name:* ${formData.name}\n`;
    whatsappMessage += `*Phone:* ${formData.phone}\n`;
    whatsappMessage += `*Service:* ${formData.service}\n`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappNumber = '918368065462';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');

    setSubmitStatus('success');
    
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
      setSubmitStatus('idle');
    }, 2000);
  };

  const handleVideoClick = () => {
    setVideoLoading(true);
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
    setVideoLoading(false);
  };

  const studioAddress = 'D-301, near shalom presidency school, Shushant Lok 2, Sector 56, Gurugram, Ghata, Haryana 122011';
  const studioLatitude = '28.418703';
  const studioLongitude = '77.100174';
  const googleMapsUrl = `https://www.google.com/maps?q=${studioLatitude},${studioLongitude}`;

  const contactInfo = [
    { icon: MapPin, title: 'Studio Location', content: studioAddress },
    { icon: Phone, title: 'Phone', content: '083680 65462' },
    { icon: Mail, title: 'Email', content: 'info@hogwartsstudios.com' },
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-0 bg-white dark:bg-gray-800/50 backdrop-blur-sm shadow-lg h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl md:text-2xl font-bold">Contact Us</CardTitle>
            </CardHeader>

            {/* Make CardContent a column flex so we can anchor the button to the bottom and remove extra bottom padding */}
            <CardContent className="lg:pt-10 pb-3 flex flex-col gap-6">
              <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-6">
                <div>
                  <Label htmlFor="name" className="text-base md:text-lg">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    className="mt-2 lg:h-20 h-12 text-base md:text-lg"
                    placeholder="Enter your full name"
                  />
                </div>

                
                <div className='lg:mt-7'>
                    <Label htmlFor="phone" className="text-base md:text-lg">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      required
                      className="mt-2 lg:h-20 h-12 text-base md:text-lg"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className='lg:mt-7'>
                    <Label htmlFor="service" className="text-base md:text-lg">Select Service</Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => handleChange('service', value)}
                    >
                      <SelectTrigger className="mt-2 h-14 text-base md:text-lg">
                        <SelectValue placeholder="Choose a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Podcast Shoot & Edit">Podcast Shoot & Edit</SelectItem>
                        <SelectItem value="Product Photography">Product Photography</SelectItem>
                        <SelectItem value="Fashion & Makeup Shoot">Fashion & Makeup Shoot</SelectItem>
                        <SelectItem value="Ad & Personal Brand Shoot">Ad & Personal Brand Shoot</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                

                {/* Status messages stay in the flow; the form will use remaining space */}
                {submitStatus === 'success' && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <p className="text-green-700 dark:text-green-300 text-sm md:text-base font-medium">
                      Opening WhatsApp... Please send the message to complete your inquiry.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                    <p className="text-red-700 dark:text-red-300 text-sm md:text-base font-medium">
                      Please fill in all required fields correctly.
                    </p>
                  </div>
                )}

                {/* Anchor button at bottom by using mt-auto so it sits at the end of the form area */}
                <div className="lg:mt-12">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full lg:p-7 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white h-12 text-base md:text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send className="h-5 w-5" />
                    Send via WhatsApp
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

            {/* Studio Preview with Lazy Video */}
            <Card className="border-0 bg-white dark:bg-gray-800/50 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <div className="aspect-video bg-gradient-to-br from-red-100 to-yellow-100 dark:from-red-900/20 dark:to-yellow-900/20 rounded-lg flex items-center justify-center relative overflow-hidden group cursor-pointer hover:from-red-200 hover:to-yellow-200 dark:hover:from-red-800/30 dark:hover:to-yellow-800/30 transition-all duration-300"
                  onClick={handleVideoClick}>
                  <div className="text-center z-10">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-red-700 transition-all duration-300 shadow-lg">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Studio Preview</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Click to watch our podcast setup</p>
                  </div>
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-6xl">
            <button
              onClick={handleCloseVideo}
              className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Close video"
            >
              <X className="h-8 w-8" />
            </button>
            
            <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
              {videoLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-sm">Loading video...</p>
                  </div>
                </div>
              )}
              
              <video
                className="w-full h-auto"
                controls
                autoPlay
                playsInline
                onLoadedData={() => setVideoLoading(false)}
                preload="none"
              >
                <source src="/Media/videos/studiotour.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            
            <p className="text-white text-center mt-4 text-sm">
              Hogwarts Studios - Professional Podcast Setup
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
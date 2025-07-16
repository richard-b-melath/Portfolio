'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  MessageSquare,
  Globe
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner'; // Ensure 'sonner' is installed

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'richardbiju318@gmail.com',
    href: 'mailto:richardbiju318@gmail.com'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 9544211720',
    href: 'tel:+919544211720'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Angamaly, Kerala, India',
    href: '#'
  }
];

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/richard-b-melath',
    color: 'hover:text-primary'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/richardbmelath/',
    color: 'hover:text-primary'
  },
  {
    icon: Twitter,
    label: 'Twitter',
    href: 'https://x.com/RicharBMelath',
    color: 'hover:text-primary'
  },
  {
    icon: Globe,
    label: 'Portfolio',
    href: 'https://richard-b-melath.github.io/Portfolio/',
    color: 'hover:text-primary'
  }
];

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;
    if (!name || !email || !subject || !message) {
      toast.error('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);

    const form = document.createElement('form');
    form.action =
      'https://docs.google.com/forms/d/e/1FAIpQLScMPWtn-nu7UfGdIu6Vx1_GYO-Loqj760R8x9vheNScdjdQKA/formResponse';
    form.method = 'POST';
    form.target = 'hidden_iframe';

    const entries = {
      'entry.1146036371': name,
      'entry.1086438456': email,
      'entry.1442822591': subject,
      'entry.1452443315': message
    };

    Object.entries(entries).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      toast.success('Message sent successfully!');
    }, 1000);
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Get In <span className="bg-gradient-primary bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Ready to collaborate on your next project? I'd love to hear from you. 
            Let's discuss how we can bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <Card className="holographic p-8">
              <h3 className="text-2xl font-bold mb-6 text-primary">Let's Connect</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I'm always interested in hearing about new opportunities, 
                creative projects, and innovative ideas. Whether you're a 
                startup or an enterprise — let’s talk.
              </p>

              <div className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-center p-4 bg-card/30 rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary/20">
                      <contact.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{contact.label}</p>
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                        {contact.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-primary/20">
                <p className="text-sm text-muted-foreground mb-4">Follow me on social media</p>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.6 }}
                      viewport={{ once: true }}
                      className={`w-10 h-10 bg-card/50 rounded-lg flex items-center justify-center border border-primary/20 hover:border-primary/40 transition-all duration-300 ${social.color} hover:scale-110`}
                    >
                      <social.icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <Card className="holographic p-8">
              <h3 className="text-2xl font-bold mb-6 text-primary/50">Send Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="holographic border-primary/30 focus:border-primary bg-card/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className="holographic border-primary/30 focus:border-primary bg-card/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                    className="holographic border-primary/30 focus:border-primary bg-card/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project..."
                    rows={6}
                    className="holographic border-primary/30 focus:border-primary bg-card/50 resize-none"
                  />
                </div>

                <div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="data-chip w-full py-3 text-lg font-semibold"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="mr-2"
                      >
                        <Send size={20} />
                      </motion.div>
                    ) : (
                      <Send size={20} className="mr-2" />
                    )}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Hidden iframe for silent form submission */}
      <iframe name="hidden_iframe" style={{ display: 'none' }}></iframe>
    </section>
  );
};

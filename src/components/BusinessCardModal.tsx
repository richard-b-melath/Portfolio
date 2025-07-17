'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  X,
  Download,
  Share2,
  Mail,
  Phone,
  MapPin,
  Globe,
  QrCode,
  LinkedinIcon,
  Github
} from 'lucide-react';

import { QRCodeCanvas } from 'qrcode.react';

interface BusinessCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ✅ Replace with your actual public URL to the .txt file
const fileURL = 'https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME/main/Richard_B_Melath_Contact.txt';

export const BusinessCardModal = ({ isOpen, onClose }: BusinessCardModalProps) => {
  const contactInfo = `RICHARD B MELATH
AI & Software Developer

📧 Email: richardbiju318@gmail.com
📱 Phone: +91 9544211720
📍 Location: Angamaly, Kerala, India
🌐 Portfolio: https://richardbmelath.vercel.app/

💼 Specialization:
- AI Development
- Software Engineering
- Web Development
- Innovation

🚀 Available for Projects

---
Digital Business Card
Generated: ${new Date().toLocaleDateString()}`;

  const downloadContact = () => {
    const element = document.createElement('a');
    const file = new Blob([contactInfo], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Richard_B_Melath_Contact.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const shareContact = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Richard B Melath - Contact Information',
          text: contactInfo,
        });
      } catch (error) {
        downloadContact();
      }
    } else {
      downloadContact();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-6xl w-[95vw] max-h-[95vh] p-4 sm:p-6 bg-transparent border-none overflow-hidden [&>button]:hidden"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, type: 'spring', stiffness: 400, damping: 40 }}
          className="relative w-full h-full"
        >
          {/* Custom Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 bg-background/90 backdrop-blur-sm border border-primary/30 shadow-lg hover:bg-background hover:border-primary/50 rounded-full w-8 h-8 sm:w-10 sm:h-10 transition-all duration-200"
          >
            <X size={14} className="text-primary sm:w-4 sm:h-4" />
          </Button>

          <Card className="relative overflow-hidden bg-gradient-to-br from-background via-card to-background/80 border-2 border-primary/20 shadow-2xl max-h-[95vh] overflow-y-auto">
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23007fff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>

            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

            <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-12">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 items-start">
                {/* Left Section - Info */}
                <div className="xl:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6"
                  >
                    <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg ring-2 ring-primary/20 flex-shrink-0">
                      <span className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-foreground">RM</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-wide bg-gradient-primary bg-clip-text text-transparent break-words">
                        Richard B Melath
                      </h1>
                      <div className="h-px bg-gradient-to-r from-primary to-transparent w-24 sm:w-32 mt-2 lg:mt-3" />
                      <p className="text-primary/50 font-medium text-base sm:text-lg tracking-wide mt-1 lg:mt-2">
                        AI & Software Developer
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="sm:ml-20 lg:ml-26"
                  >
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Specializing in artificial intelligence solutions and modern software development. Passionate about creating innovative technology that drives business success.
                    </p>
                  </motion.div>

                  {/* Contact Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6"
                  >
                    {/* Email */}
                    <div className="flex items-center space-x-2 sm:space-x-3 p-2.5 sm:p-3 md:p-4 rounded-lg bg-card/50 border border-primary/10">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail size={14} className="text-primary sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Email</p>
                        <p className="text-foreground text-xs sm:text-sm font-medium truncate">richardbiju318@gmail.com</p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center space-x-2 sm:space-x-3 p-2.5 sm:p-3 md:p-4 rounded-lg bg-card/50 border border-primary/10">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone size={14} className="text-primary sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Phone</p>
                        <p className="text-foreground text-xs sm:text-sm font-medium">+91 9544211720</p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center space-x-2 sm:space-x-3 p-2.5 sm:p-3 md:p-4 rounded-lg bg-card/50 border border-primary/10">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin size={14} className="text-primary sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Location</p>
                        <p className="text-foreground text-xs sm:text-sm font-medium">Angamaly, Kerala, India</p>
                      </div>
                    </div>

                    {/* Portfolio */}
                    <div className="flex items-center space-x-2 sm:space-x-3 p-2.5 sm:p-3 md:p-4 rounded-lg bg-card/50 border border-primary/10">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Globe size={14} className="text-primary sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Portfolio</p>
                        <a
                          href="https://richardbmelath.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary text-xs sm:text-sm font-medium hover:text-primary/80 truncate block"
                        >
                          https://richardbmelath.vercel.app/
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  {/* Skills */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap gap-2"
                  >
                    {['AI Development', 'Software Engineering', 'Web Development', 'Innovation'].map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 sm:px-3 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </motion.div>
                </div>

                {/* Right - QR Code & Actions */}
                <div className="flex flex-col items-center space-y-4 sm:space-y-6 lg:space-y-8 order-first xl:order-last">
                  {/* ✅ QR Code Section */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center"
                  >
                    <div className="relative">
                      <div className="w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 bg-card rounded-xl lg:rounded-2xl shadow-xl p-3 lg:p-4 flex items-center justify-center border-2 border-primary/10">
                        <QRCodeCanvas
                        value="https://richardbmelath.vercel.app/Richard_B_Melath_Contact.txt"
                        size={120}
                        bgColor="transparent"
                        fgColor="#000000"
                        includeMargin
                        className="rounded-lg lg:rounded-xl w-full h-full dark:invert"
                      />
                      </div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        className="absolute -top-2 -right-2 lg:-top-3 lg:-right-3 w-5 h-5 lg:w-6 lg:h-6 bg-secondary rounded-full shadow-lg border-2 border-background"
                      />
                    </div>
                    <p className="text-muted-foreground text-xs sm:text-sm mt-3 lg:mt-4 font-medium">
                      Scan to download contact file
                    </p>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col space-y-2 sm:space-y-3 w-full max-w-xs"
                  >
                    <Button onClick={downloadContact} className="bg-gradient-primary text-primary-foreground text-sm sm:text-base">
                      <Download size={16} className="mr-2 sm:w-[18px] sm:h-[18px]" />
                      Save Contact
                    </Button>
                    <Button onClick={shareContact} variant="outline" className="border-primary/40 text-primary text-sm sm:text-base">
                      <Share2 size={16} className="mr-2 sm:w-[18px] sm:h-[18px]" />
                      Share Card
                    </Button>
                  </motion.div>

                  {/* Socials */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex space-x-3"
                  >
                    <a
                      href="https://www.linkedin.com/in/richardbmelath/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-card rounded-lg flex items-center justify-center border border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-200 group"
                    >
                      <LinkedinIcon size={18} className="text-primary sm:w-[20px] sm:h-[20px] group-hover:scale-110 transition-transform duration-200" />
                    </a>
                    <a
                      href="https://github.com/richard-b-melath"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-card rounded-lg flex items-center justify-center border border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-200 group"
                    >
                      <Github size={18} className="text-primary sm:w-[20px] sm:h-[20px] group-hover:scale-110 transition-transform duration-200" />
                    </a>
                  </motion.div>

                  {/* Status */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-center"
                  >
                  </motion.div>
                </div>
              </div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 sm:mt-8 lg:mt-12 pt-4 sm:pt-6 lg:pt-8 border-t border-primary/10 text-center"
              >
                <p className="text-muted-foreground text-xs">Digital Business Card</p>
              </motion.div>
            </div>

            {/* Light sweep effect */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 6,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -skew-x-12 pointer-events-none"
            />
          </Card>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

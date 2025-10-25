import { motion } from 'framer-motion';
import { Mail, Send, MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import IndustrialBackground from './IndustrialBackground';

const ContactSection = () => {
  const handleEmailClick = () => {
    window.location.href = 'mailto:amalkottooran01@gmail.com';
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      detail: 'amalkottooran01@gmail.com',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Clock,
      title: 'Response Time',
      detail: 'Within 24 hours',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Phone,
      title: 'Consultation',
      detail: 'Free initial assessment',
      color: 'from-green-500 to-teal-500'
    }
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden border-t border-b border-x border-border/30">
      <IndustrialBackground variant="contact" intensity="medium" />
      
      {/* Decorative accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent"></div>
      
      {/* Corner accent elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-accent/10 rounded-tl-2xl"></div>
      <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-primary/10 rounded-tr-2xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l border-b border-primary/10 rounded-bl-2xl"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-accent/10 rounded-br-2xl"></div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <div className="w-16 h-16 mx-auto bg-card border border-border rounded-2xl flex items-center justify-center shadow-sm">
              <Send size={28} className="text-primary" />
            </div>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-light mb-6 text-foreground tracking-tight">
            Let's Transform Your Operations
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
            Ready to optimize your industrial processes with cutting-edge automation solutions? 
            Get in touch with our team of experts today.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              className="bg-card backdrop-blur-xl rounded-3xl p-8 border border-border text-center hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary/10 relative overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
            >
              {/* Card Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className={`inline-block p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20 mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                <info.icon size={22} className="text-primary" />
              </div>
              <h3 className="text-foreground font-medium mb-2">{info.title}</h3>
              <p className="text-muted-foreground text-sm font-light">{info.detail}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main CTA */}
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.button
            onClick={handleEmailClick}
            className="group relative inline-flex items-center space-x-3 px-10 py-5 bg-primary text-primary-foreground rounded-full font-medium text-lg shadow-lg hover:bg-primary/90 transition-all"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail size={22} />
            <span>Contact Us Now</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.p
            className="mt-6 text-muted-foreground text-sm font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            Click to send us an email at{' '}
            <span className="text-primary font-medium">amalkottooran01@gmail.com</span>
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="mt-24 pt-20 border-t border-border"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h3 className="text-3xl font-light text-foreground mb-12 text-center tracking-tight">
            Why Choose Caelus Technologies?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Expert Team',
                description: 'Industry-certified automation specialists',
                icon: '👥'
              },
              {
                title: 'Proven Track Record',
                description: 'Successful projects across industries',
                icon: '🏆'
              },
              {
                title: 'End-to-End Solutions',
                description: 'From design to deployment and support',
                icon: '🔄'
              },
              {
                title: 'Cutting-Edge Tech',
                description: 'Latest automation and AI/ML technologies',
                icon: '🚀'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-8 bg-card/50 rounded-3xl border border-border"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-foreground font-medium mb-2">{feature.title}</h4>
                <p className="text-muted-foreground text-sm font-light">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

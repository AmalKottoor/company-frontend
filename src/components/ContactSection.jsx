import { motion } from 'framer-motion';
import { Mail, Send, MapPin, Phone, Clock, ArrowRight } from 'lucide-react';

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
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 dark:from-slate-800 dark:via-blue-900 dark:to-purple-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Send size={32} className="text-white" />
            </div>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Let's Transform Your Operations
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Ready to optimize your industrial processes with cutting-edge automation solutions? 
            Get in touch with our team of experts today.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className={`inline-block p-3 rounded-full bg-gradient-to-r ${info.color} mb-4`}>
                <info.icon size={24} className="text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">{info.title}</h3>
              <p className="text-slate-400 text-sm">{info.detail}</p>
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
            className="group relative inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
              initial={{ x: '100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.5 }}
            />
            
            <span className="relative z-10 flex items-center space-x-3">
              <Mail size={24} />
              <span>Contact Us Now</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>

          <motion.p
            className="mt-6 text-slate-400 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            Click to send us an email at{' '}
            <span className="text-blue-400 font-medium">amalkottooran01@gmail.com</span>
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="mt-20 pt-16 border-t border-slate-700/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Why Choose OptiAutomata?
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
                className="text-center p-6 bg-slate-800/30 rounded-xl border border-slate-700/30"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

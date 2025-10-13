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
    <section id="contact" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Minimal Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

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
            <div className="w-16 h-16 mx-auto bg-zinc-900/80 border border-zinc-800/50 rounded-2xl flex items-center justify-center">
              <Send size={28} className="text-neon-cyan" />
            </div>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-light mb-6 text-white tracking-tight">
            Let's Transform Your Operations
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light">
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
              className="bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-8 border border-zinc-800/50 text-center hover:border-zinc-700/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
            >
              <div className={`inline-block p-3 rounded-2xl bg-zinc-800/80 border border-zinc-700/50 mb-4`}>
                <info.icon size={22} className={`text-${info.color.split('-')[1]}`} />
              </div>
              <h3 className="text-white font-medium mb-2">{info.title}</h3>
              <p className="text-zinc-400 text-sm font-light">{info.detail}</p>
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
            className="group relative inline-flex items-center space-x-3 px-10 py-5 bg-white text-black rounded-full font-medium text-lg shadow-lg hover:bg-zinc-100 transition-all"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail size={22} />
            <span>Contact Us Now</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.p
            className="mt-6 text-zinc-500 text-sm font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            Click to send us an email at{' '}
            <span className="text-neon-cyan font-medium">amalkottooran01@gmail.com</span>
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="mt-24 pt-20 border-t border-zinc-800/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h3 className="text-3xl font-light text-white mb-12 text-center tracking-tight">
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
                className="text-center p-8 bg-zinc-900/30 rounded-3xl border border-zinc-800/30"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-white font-medium mb-2">{feature.title}</h4>
                <p className="text-zinc-400 text-sm font-light">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Check, X, Star, Crown, FileText } from 'lucide-react';

function Pricing() {
  const plans = [
    {
      name: 'Basic',
      price: '$15',
      period: '/ month',
      icon: <FileText className="w-6 h-6" />,
      features: [
        { text: '5 mind maps monthly', included: true },
        { text: 'Template library', included: true },
        { text: 'Collaborate with others', included: false }
      ],
      buttonText: 'Select Basic',
      buttonStyle: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
      popular: false
    },
    {
      name: 'Standard',
      price: '$15',
      period: '/ month',
      icon: <Star className="w-6 h-6" />,
      features: [
        { text: '10 mind maps monthly', included: true },
        { text: 'Template library', included: true },
        { text: 'Collaborate with others', included: false }
      ],
      buttonText: 'Select Standard',
      buttonStyle: 'bg-indigo-600 text-white hover:bg-indigo-700',
      popular: true
    },
    {
      name: 'Advanced',
      price: '$30',
      period: '/ month',
      icon: <Crown className="w-6 h-6" />,
      features: [
        { text: 'Unlimited mind maps', included: true },
        { text: 'Template library', included: true },
        { text: 'Collaborate with others', included: true }
      ],
      buttonText: 'Select Advanced',
      buttonStyle: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Choose your plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan for your mind mapping needs. Start free and upgrade anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                plan.popular ? 'ring-2 ring-indigo-500 ring-offset-4' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                    {plan.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-800">{plan.price}</span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                    )}
                    <span className={`text-gray-700 ${!feature.included ? 'line-through opacity-60' : ''}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Everything you need to create amazing mind maps
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides all the tools and features you need to organize your thoughts, 
              plan projects, and visualize ideas effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Collaborate Easily</h3>
              <p className="text-gray-600">Work together on mind maps seamlessly with real-time collaboration features.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Track Progress</h3>
              <p className="text-gray-600">Analyze your mind map usage effectively with detailed analytics and insights.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Boost Productivity</h3>
              <p className="text-gray-600">Transform your ideas into actionable plans with our intuitive mind mapping tools.</p>
            </div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Join the MindMapMaster community and connect with thousands of users
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                text: "This tool revolutionized my brainstorming.",
                author: "Jordan P.",
                title: "Productivity Coach"
              },
              {
                text: "Mind mapping changed my workflow.",
                author: "Emily R.",
                title: "Teacher"
              },
              {
                text: "I love how easy it is to use.",
                author: "Chris T.",
                title: "Freelancer"
              },
              {
                text: "My ideas are clearer and more organized.",
                author: "Sam W.",
                title: "Entrepreneur"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="text-4xl text-gray-300 mb-4">"</div>
                <p className="text-gray-700 mb-4">{testimonial.text}</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.title}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to get started?</h2>
            <p className="text-gray-600 mb-6">
              Choose your plan and start creating amazing mind maps today. No credit card required for the free trial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/create"
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Start Free Trial
              </Link>
              <Link
                to="/templates"
                className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
              >
                Browse Templates
              </Link>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}

export default Pricing;



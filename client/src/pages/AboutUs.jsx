import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Brain, Users, Target, Award } from 'lucide-react'

const AboutUs = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Innovation",
      description: "We're constantly pushing the boundaries of mind mapping technology."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community",
      description: "Join thousands of users who trust MindMapMaster for their creative needs."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Focus",
      description: "We're dedicated to making mind mapping accessible and powerful for everyone."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence",
      description: "Our commitment to quality drives everything we do."
    }
  ]

  const team = [
    {
      name: "Bryan Alexis Delgado López",
      role: "Co-Founder & Lead Developer",
      image: "/api/placeholder/150/150",
      description: "Passionate about creating innovative solutions and user-centered design."
    },
    {
      name: "Javier Alonso Domínguez Corral",
      role: "Co-Founder & Technical Lead",
      image: "/api/placeholder/150/150",
      description: "Expert in full-stack development and cutting-edge technology implementation."
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About <span className="text-primary-600">MindMapMaster</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're on a mission to revolutionize how people think, plan, and create through the power of mind mapping.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  MindMapMaster was born from a simple observation: traditional note-taking and planning methods 
                  often limit our creative potential. We believe that the human mind works in networks, not linear 
                  lists, and our tools should reflect that reality.
                </p>
                <p className="text-gray-600 mb-4">
                  Founded in 2023, we've been on a journey to create the most intuitive, powerful, and beautiful 
                  mind mapping experience possible. Our platform combines cutting-edge technology with deep 
                  understanding of how people actually think and work.
                </p>
                <p className="text-gray-600">
                  Today, thousands of users worldwide trust MindMapMaster to organize their thoughts, plan projects, 
                  and unlock their creative potential.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8 h-96 flex items-center justify-center"
              >
                <div className="text-8xl">🚀</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                These core principles guide everything we do at MindMapMaster
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-primary-600 mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The passionate people behind MindMapMaster
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="text-4xl">👤</div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600">
                    {member.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Join thousands of users who are already creating amazing mind maps
              </p>
              <button className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                Start Creating Now
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default AboutUs


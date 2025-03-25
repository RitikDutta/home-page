import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faCode, faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Hi, I'm Ritik
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Full Stack Developer & Problem Solver
          </motion.p>
          <motion.div 
            className="social-links"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        className="about-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a passionate developer with expertise in building modern web applications.
              I love creating elegant solutions to complex problems and am constantly
              learning new technologies to stay at the forefront of web development.
            </p>
            <div className="contact-info">
              <a href="mailto:your.email@example.com">
                <FontAwesomeIcon icon={faEnvelope} /> Contact Me
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        className="skills-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>Skills & Expertise</h2>
        <div className="skills-grid">
          <motion.div 
            className="skill-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FontAwesomeIcon icon={faCode} className="skill-icon" />
            <h3>Frontend Development</h3>
            <ul>
              <li>React</li>
              <li>TypeScript</li>
              <li>HTML/CSS</li>
              <li>JavaScript</li>
            </ul>
          </motion.div>
          <motion.div 
            className="skill-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FontAwesomeIcon icon={faLaptopCode} className="skill-icon" />
            <h3>Projects</h3>
            <ul>
              <li>Portfolio Website</li>
              <li>React Applications</li>
              <li>Web Development</li>
              <li>UI/UX Design</li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        className="projects-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>Featured Projects</h2>
        <div className="projects-grid">
          <motion.div 
            className="project-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="project-image">
              <img src="https://via.placeholder.com/300x200" alt="Project 1" />
            </div>
            <div className="project-info">
              <h3>Project Name</h3>
              <p>Description of the project and its key features.</p>
              <div className="project-links">
                <a href="#" className="project-link">View Demo</a>
                <a href="#" className="project-link">GitHub</a>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="project-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="project-image">
              <img src="https://via.placeholder.com/300x200" alt="Project 2" />
            </div>
            <div className="project-info">
              <h3>Project Name</h3>
              <p>Description of the project and its key features.</p>
              <div className="project-links">
                <a href="#" className="project-link">View Demo</a>
                <a href="#" className="project-link">GitHub</a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

export default App;
// In src/App.jsx
import React from "react";
import "./App.css"; // if you have global CSS, or rename as you like

function Hero() {
  const titles = ["I'm a Developer", "I'm a Data Scientist", "I'm a Research Scientist"];
  const randomIndex = Math.floor(Math.random() * titles.length);

  return (
    <section
      className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-indigo-600 via-pink-500 to-rose-500 text-white relative overflow-visible font-medium"
    >
      <div className="absolute w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse -z-10"></div>
      <div className="absolute w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse -z-10 top-10 right-10"></div>

      <img
        src="https://placehold.co/220?text=Profile"
        alt="Ritik Dutta"
        className="w-52 h-52 rounded-full object-cover border-4 border-white shadow-xl transition transform hover:scale-105"
      />

      <h1 className="mt-6 text-5xl md:text-6xl font-extrabold drop-shadow-lg animate-fadeInDown tracking-tight">
        Ritik Dutta
      </h1>
      <h2 className="text-2xl md:text-3xl mt-2 font-semibold drop-shadow-lg animate-pulse tracking-tight">
        {titles[randomIndex]}
      </h2>

      <p className="max-w-xl mt-4 px-4 text-base md:text-lg font-normal animate-fadeInUp leading-relaxed">
        Hello! I’m Ritik Dutta, a passionate technologist who thrives on solving real-world
        problems through code and data. My experience spans end-to-end data pipelines, web
        development, machine learning research, and cloud deployments. Driven by curiosity
        and creativity, I love blending innovation with practicality to deliver impactful
        solutions.
      </p>

      <div className="flex space-x-4 mt-6 animate-fadeInUp delay-150">
        <a
          href="#"
          className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur-md hover:bg-white/30 transition text-sm font-semibold"
        >
          Slides
        </a>
        <a
          href="#"
          className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur-md hover:bg-white/30 transition text-sm font-semibold"
        >
          Docs
        </a>
        <a
          href="#"
          className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur-md hover:bg-white/30 transition text-sm font-semibold"
        >
          Notebooks
        </a>
      </div>

      <div className="flex space-x-6 mt-6 animate-fadeInUp delay-300">
        <a href="https://github.com/" target="_blank" rel="noreferrer">
          <img
            src="https://placehold.co/40?text=GitHub"
            alt="GitHub"
            className="w-10 h-10 hover:opacity-80 transition"
          />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noreferrer">
          <img
            src="https://placehold.co/40?text=TW"
            alt="Twitter"
            className="w-10 h-10 hover:opacity-80 transition"
          />
        </a>
        <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
          <img
            src="https://placehold.co/40?text=IN"
            alt="LinkedIn"
            className="w-10 h-10 hover:opacity-80 transition"
          />
        </a>
      </div>
    </section>
  );
}

function Skills() {
  const skillsData = [
    {
      category: "Machine Learning",
      list: ["ML Algorithms", "Data Analysis", "ML Pipelines", "Sklearn", "XGBoost"],
    },
    {
      category: "Deep Learning",
      list: ["TensorFlow", "Detection", "CNN Architectures"],
    },
    {
      category: "DevOps",
      list: [
        "Deployment",
        "Automation",
        "Docker",
        "Jenkins",
        "Git",
        "AWS",
        "MLflow",
        "Circle CI",
        "CICD",
        "Cloud",
        "GCP",
      ],
    },
    {
      category: "Backend",
      list: [
        "Architecture",
        "Flask",
        "Databases",
        "NoSQL",
        "Cassandra",
        "Firebase Realtime DB",
        "Firebase Firestore",
        "Security",
        "OAuth",
        "Deployment",
        "GCP/AWS",
        "Nginx",
        "API",
        "Postman",
      ],
    },
    {
      category: "Computer Vision",
      list: [
        "Detection",
        "Recognition",
        "Tracking",
        "Classification",
        "OpenCV",
        "Yolo",
        "FaceNet",
        "MediaPipe",
      ],
    },
    {
      category: "Natural Language Processing",
      list: [
        "Langchain",
        "Classification",
        "eCommerce",
        "Translation",
        "Sentiment",
        "GPT",
        "BERT",
        "Hugging Face's Transformers",
      ],
    },
    {
      category: "Web Development",
      list: ["Bootstrap", "HTML/CSS/JS"],
    },
    {
      category: "IOT/Robotics",
      list: ["Arduino IDE", "RaspberryPie", "Zapier", "IFTTT", "MQTT", "Node-RED"],
    },
    {
      category: "Game Development",
      list: ["Blender", "Unity"],
    },
    {
      category: "Cybersecurity/Network Engineering",
      list: [
        "Penetration",
        "Anonymity",
        "Script Injection",
        "SQL Injection",
        "Hardware Hijacking",
      ],
      blurred: true,
    },
  ];

  return (
    <section className="py-12 bg-slate-100">
      <h2 className="text-4xl font-extrabold text-center mb-10 animate-fadeInDown text-slate-800 tracking-tight">
        Skills
      </h2>
      <div className="flex flex-wrap justify-center gap-8 px-4 md:px-8 animate-fadeInUp">
        {skillsData.map((skillCat, index) => (
          <div
            key={index}
            className="relative bg-white border border-slate-200 rounded-xl p-6 w-72 shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 hover:scale-105"
          >
            <h3 className="font-bold mb-2 text-lg text-slate-800 tracking-tight">
              {skillCat.category}
            </h3>
            <ul
              className={`text-sm list-disc pl-5 text-slate-700 space-y-1 transition-all ${
                skillCat.blurred ? "blur-sm cursor-not-allowed" : ""
              }`}
            >
              {skillCat.list.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
            {skillCat.blurred && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center font-bold text-slate-500">
                (Confidential)
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const projectsData = [
    {
      title: "Company Work Environment Management System",
      img: "https://placehold.co/800x500?text=Project+1",
      description:
        "This project aims to use facial recognition technology to monitor employee productivity and track activities.",
      liveLink: "#",
      detailsLink: "#",
    },
    {
      title: "Datamigrato",
      img: "https://placehold.co/800x500?text=Project+2",
      description:
        "Datamigrato: Simplifying complex data migrations. Versatile Python package for seamless transfer.",
      liveLink: "#",
      detailsLink: "#",
    },
    {
      title: "Interview Ready",
      img: "https://placehold.co/800x500?text=Project+3",
      description:
        "Generative AI-based Interview Coach: Realistic interview simulations tailored to a wide range of fields.",
      liveLink: "#",
      detailsLink: "#",
    },
    {
      title: "Inventory Management Chatbot",
      img: "https://placehold.co/800x500?text=Project+4",
      description:
        "This advanced chatbot streamlines inventory management and sales tracking with real-time insights.",
      liveLink: "#",
      detailsLink: "#",
    },
    {
      title: "Raaga Rhythms",
      img: "https://placehold.co/800x500?text=Project+5",
      description:
        "Immerse in the melodious realms of Indian classical music, exploring each raga's unique story.",
      liveLink: "#",
      detailsLink: "#",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <h2 className="text-4xl font-extrabold mb-8 text-center animate-fadeInDown text-slate-800 tracking-tight">
        Done Projects
      </h2>
      <div className="max-w-3xl mx-auto px-4 flex flex-col space-y-12 animate-fadeInUp">
        {projectsData.map((project, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center"
          >
            <img
              src={project.img}
              alt={project.title}
              className="w-full h-64 object-cover rounded-md shadow-md transition-transform transform hover:scale-105"
            />
            <h3 className="font-semibold text-xl mt-4 text-slate-800">
              {project.title}
            </h3>
            <p className="text-slate-600 text-sm mt-2 max-w-md">
              {project.description}
            </p>
            <div className="mt-4 flex space-x-4 justify-center">
              <a href={project.detailsLink} className="text-indigo-600 hover:underline">
                View Details
              </a>
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Community() {
  const communityImages = [
    {
      img: "https://placehold.co/600x400?text=Community+1",
      heading: "Nurturing Young Minds and Souls",
      description: "Each meal I serve as a Food Assistance Volunteer brings hope and nourishment.",
      date: "15, August 2023",
    },
    {
      img: "https://placehold.co/600x400?text=Community+2",
      heading: "Food Drive",
      description: "Collected staples like rice, daals, aata, distributing them to needy families.",
      date: "15, August 2023",
    },
    {
      img: "https://placehold.co/600x400?text=Community+3",
      heading: "Plantations",
      description: "Planting Tomorrow: Each sapling signifies hope, a step towards ecological restoration.",
      date: "20, August 2023",
    },
    {
      img: "https://placehold.co/600x400?text=Community+4",
      heading: "Food Drive",
      description: "Sharing Meals, Spreading Hope: Experienced the joy of serving meals to children in need.",
      date: "20, August 2023",
    },
  ];

  const marqueeImages = [...communityImages, ...communityImages];

  return (
    <section className="py-12 text-center bg-slate-100">
      <h2 className="text-4xl font-extrabold mb-6 animate-fadeInDown text-slate-800 tracking-tight">
        Community Involvement and Social Impact
      </h2>
      <p className="max-w-xl mx-auto text-slate-700 px-4 animate-fadeInUp leading-relaxed">
        In addition to my passion for technology and innovation, I am deeply committed
        to making a positive impact in the community. I dedicate part of my time to
        volunteering with organizations focused on feeding and educating underprivileged
        children. This work is not just a duty, but a heartfelt commitment to nurturing
        the potential of every child and ensuring they have access to the basic necessities
        of life and the joys of learning. Through these efforts, I aim to contribute to
        a brighter, more equitable future for all.
      </p>

      <div className="relative overflow-visible w-full mt-8">
        <div className="flex animate-marquee whitespace-nowrap">
          {marqueeImages.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-80 mx-4 bg-white border-4 border-indigo-200 rounded-xl shadow-xl p-4 whitespace-normal break-words"
            >
              <img
                src={item.img}
                alt={item.heading}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="mt-3 text-xl font-bold text-slate-800 break-words">
                {item.heading}
              </h3>
              <p className="mt-1 text-slate-600 text-sm break-words">
                {item.description}
              </p>
              <p className="mt-1 text-slate-400 text-xs italic break-words">
                {item.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Blogs() {
  const blogData = [
    {
      title: "AlexNet in a Nutshell",
      date: "29, May 2020",
      img: "https://placehold.co/300x200?text=Blog+1",
      snippet:
        "AlexNet was trained on ImageNet dataset of 1.2 million images containing 1000 classes...",
      link: "#",
    },
    {
      title: "LeNet in a nutshell",
      date: "20, May 2020",
      img: "https://placehold.co/300x200?text=Blog+2",
      snippet:
        "How LeNet works, architecture, how to train a model using the LeNet architecture in Keras...",
      link: "#",
    },
    {
      title: "Principal Component Analysis(PCA) in a Nutshell",
      date: "12, Nov 2022",
      img: "https://placehold.co/300x200?text=Blog+3",
      snippet:
        "With increase in dimensions leads to time complexity and difficulty to generalize relations...",
      link: "#",
    },
    {
      title: "K-means in a Nutshell",
      date: "14, Nov 2022",
      img: "https://placehold.co/300x200?text=Blog+4",
      snippet:
        "The K-means clustering algorithm computes centroids and repeats until the optimal centroid...",
      link: "#",
    },
    {
      title: "Project Management",
      date: "7, Dec 2022",
      img: "https://placehold.co/300x200?text=Blog+5",
      snippet:
        "A data science project is the most important aspect of a data scientist’s work...",
      link: "#",
    },
  ];

  return (
    <section className="py-12 bg-slate-50">
      <h2 className="text-4xl font-extrabold text-center mb-8 animate-fadeInDown text-slate-800 tracking-tight">
        Blogs
      </h2>
      <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 px-4 animate-fadeInUp">
        {blogData.map((blog, index) => (
          <div
            key={index}
            className="w-72 bg-white border border-slate-200 rounded-xl overflow-visible flex flex-col shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 hover:scale-105"
          >
            <img
              src={blog.img}
              alt={blog.title}
              className="w-full h-40 object-cover rounded-t-xl"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-bold text-lg mb-1 text-slate-800 tracking-tight">
                {blog.title}
              </h3>
              <p className="text-xs text-slate-500 mb-2">{blog.date}</p>
              <p className="text-sm text-slate-700 flex-grow leading-relaxed">
                {blog.snippet}
              </p>
              <a
                href={blog.link}
                className="text-indigo-600 mt-2 hover:underline self-start text-sm font-semibold"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-6 mt-8 animate-fadeInUp">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm font-light">
          © {new Date().getFullYear()} Ritik Dutta. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function BottomBanner() {
  return (
    <>
      <style>{`
        body {
          overflow-x: hidden;
          background-color: #f9fafb; /* a light slate background for entire site */
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .cdContainer {
          position: absolute;
          left: 10px;
          top: -40px;
          width: 80px;
          height: 80px;
        }
        .theCD {
          position: absolute;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          animation: spin 5s linear infinite;
          transform-origin: center;
          z-index: 3;
        }
        .coverHalf {
          position: absolute;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: #0f172a; /* same as slate-900 or so */
          clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%);
          z-index: 2;
        }
        .marquee {
          flex-grow: 1;
          white-space: nowrap;
          overflow: hidden;
          box-sizing: border-box;
          position: relative;
          z-index: 1;
          margin-left: 50px;
        }
        .marquee p {
          display: inline-block;
          padding-left: 150%;
          animation: marquee 7s cubic-bezier(0.15, 0.77, 0.75, 0.1) infinite;
          margin: 0;
          color: #a5b4fc; /* an indigo-200 text color */
          font-weight: 500;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

      <div className="fixed bottom-0 left-0 w-full h-14 bg-slate-900 text-white z-[9999] overflow-visible">
        <div className="w-full h-full relative flex items-center">
          <div className="cdContainer">
            <img
              src="https://placehold.co/80x80?text=CD"
              alt="CD"
              className="theCD"
            />
            <div className="coverHalf"></div>
          </div>
          <div className="marquee h-full flex items-center">
            <p>ritik is listening to song from movie by artist</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Portfolio() {
  return (
    <div className="font-sans text-gray-800">
      <Hero />
      <Skills />
      <Projects />
      <Community />
      <Blogs />
      <Footer />
      <BottomBanner />
    </div>
  );
}


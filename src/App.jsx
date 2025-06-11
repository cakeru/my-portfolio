import React, { useState, useEffect, useRef } from 'react';

// Main App component for the portfolio website
const App = () => {
  // State to keep track of the currently active section for navigation highlighting
  const [activeSection, setActiveSection] = useState('home');

  // Refs for each section to observe their visibility
  const homeRef = useRef(null);
  const roadmapRef = useRef(null); // Ref for the roadmap section
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // Array of section refs and their corresponding IDs for easy iteration
  const sections = [
    { id: 'home', ref: homeRef },
    { id: 'roadmap-section', ref: roadmapRef },
    { id: 'about', ref: aboutRef },
    { id: 'projects', ref: projectsRef },
    { id: 'contact', ref: contactRef },
  ];

  // Function to handle smooth scrolling to a section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // scrollIntoView with smooth behavior
      element.scrollIntoView({ behavior: 'smooth' });
      // Manually set active section to ensure immediate feedback on click
      setActiveSection(id);
    }
  };

  // useEffect to set up IntersectionObserver for each section
  useEffect(() => {
    const observerOptions = {
      root: null, // viewport as the root
      rootMargin: '-50% 0px -50% 0px', // When 50% of the section is in view
      threshold: 0, // No threshold, callback fires as soon as any part intersects
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // If a section is intersecting (i.e., visible in the middle of the viewport)
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe each section
    sections.forEach(section => {
      if (section.ref.current) {
        observer.observe(section.ref.current);
      }
    });

    // Clean up observer on component unmount
    return () => {
      sections.forEach(section => {
        if (section.ref.current) {
          observer.unobserve(section.ref.current);
        }
      });
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    // Main container with a modern professional background and font
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 font-inter text-gray-100 p-4 md:p-8 flex flex-col items-center">

      {/* Navigation bar - Sticky at the top */}
      <nav className="w-full max-w-4xl mx-auto mb-12 flex justify-center space-x-2 md:space-x-4 p-3 bg-gray-700 bg-opacity-80 rounded-full shadow-xl border border-gray-600 backdrop-blur-sm sticky top-4 z-20">
        {/* Navigation buttons */}
        <button
          onClick={() => scrollToSection('home')}
          // Conditional styling based on activeSection state
          className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300
            ${activeSection === 'home' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-600 text-gray-300 hover:bg-gray-500 hover:text-white'}
          `}
        >
          Home
        </button>
        {/* Button for Roadmap */}
        <button
          onClick={() => scrollToSection('roadmap-section')}
          className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300
            ${activeSection === 'roadmap-section' ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-600 text-gray-300 hover:bg-gray-500 hover:text-white'}
          `}
        >
          Roadmap
        </button>
        <button
          onClick={() => scrollToSection('about')}
          className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300
            ${activeSection === 'about' ? 'bg-teal-600 text-white shadow-md' : 'bg-gray-600 text-gray-300 hover:bg-gray-500 hover:text-white'}
          `}
        >
          About
        </button>
        <button
          onClick={() => scrollToSection('projects')}
          className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300
            ${activeSection === 'projects' ? 'bg-green-600 text-white shadow-md' : 'bg-gray-600 text-gray-300 hover:bg-gray-500 hover:text-white'}
          `}
        >
          Projects
        </button>
        <button
          onClick={() => scrollToSection('contact')}
          className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300
            ${activeSection === 'contact' ? 'bg-yellow-600 text-white shadow-md' : 'bg-gray-600 text-gray-300 hover:bg-gray-500 hover:text-white'}
          `}
        >
          Contact
        </button>
      </nav>

      {/* Content area */}
      <main className="w-full max-w-4xl mx-auto">
        {/* Home Section */}
        <section
          id="home"
          ref={homeRef} // Assign ref
          className="text-center py-20 px-4 md:px-8 lg:px-12 bg-gray-800 bg-opacity-90 rounded-xl shadow-lg border border-gray-700 animate-fade-in-up mb-12 scroll-mt-[96px]"
        >
          {/* Profile Picture */}
          <div className="mb-8 relative z-10 flex justify-center">
            <img
              src="./assets/image.jpg" // Your uploaded image
              alt="Your Profile"
              className="max-w-xs h-auto border-4 border-blue-500 shadow-xl object-contain rounded-md"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/200x200/4a5568/ffffff?text=Load+Fail"; }} // Fallback image on error
            />
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-wide drop-shadow-md relative z-10">
            <span className="text-blue-400">CHHOUSOUR LEOK'S</span> PORTFOLIO
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-200 mb-8 leading-relaxed relative z-10">
            Software Engineer crafting scalable and resilient distributed systems.
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed relative z-10">
            Welcome to my professional space. This portfolio showcases my journey in software engineering, focusing on building robust, scalable, and efficient digital solutions.
          </p>

          <div className="flex justify-center items-center gap-4 mb-8 relative z-10">
            {/* Using a generic lightbulb icon for ideas/innovation */}
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400 drop-shadow-lg">
              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"></path>
              <path d="M9 18h6"></path>
              <path d="M10 22v-4h4v4"></path>
            </svg>
            <p className="text-gray-400 text-sm italic">
              "Innovation thrives at the intersection of logic and creativity."
            </p>
          </div>
          <button
            onClick={() => scrollToSection('projects')}
            className="px-8 py-4 bg-purple-600 text-white text-xl font-bold rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 relative z-10"
          >
            View My Work
          </button>
        </section>

        {/* --- Integrated Roadmap Section (moved back here) --- */}
        <div
          id="roadmap-section"
          ref={roadmapRef} // Assign ref
          className="py-16 px-4 md:px-8 lg:px-12 bg-gray-800 bg-opacity-90 rounded-xl shadow-lg border border-gray-700 mb-12 scroll-mt-[96px]" // Consistent background
        >
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-12 text-center drop-shadow-lg">
            MY <span className="text-purple-400">ROADMAP</span>
          </h2>

          <div className="relative border-l-4 border-gray-600 ml-4 md:ml-12 text-left">
            {/* Education */}
            <div className="mb-10 ml-6 p-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="absolute w-5 h-5 bg-purple-500 rounded-full mt-1 -left-2.5 border-2 border-gray-800"></div>
              <h3 className="text-2xl font-semibold text-purple-400 mb-2">Education</h3>
              <p className="text-lg text-gray-200">Beltei International University</p>
              <p className="text-md text-gray-400">Bachelor of Information Technology - Software Engineering</p>
              <p className="text-sm text-gray-500">Phnom Penh, Cambodia | 2022-2025</p>
              <ul className="list-disc list-inside text-gray-300 text-sm mt-2 space-y-1">
                <li>Advanced Data Structures and Algorithms</li>
                <li>Operating System Design and Implementation</li>
                <li>Database Management Systems (Relational and NoSQL)</li>
                <li>Computer Networks and Communication Protocols</li>
                <li>Software Engineering Methodologies (Agile, Scrum)</li>
                <li>Distributed Computing Principles</li>
                <li>Web Application Security</li>
              </ul>
            </div>

            {/* Work Experience */}
            <div className="mb-10 ml-6 p-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="absolute w-5 h-5 bg-green-500 rounded-full mt-1 -left-2.5 border-2 border-gray-800"></div>
              <h3 className="text-2xl font-semibold text-green-400 mb-2">Work Experience</h3>

              {/* Tekhub - Backend Developer */}
              <div className="mb-6">
                <p className="text-lg text-gray-200">Tekhub | Backend Developer</p>
                <p className="text-md text-gray-400">Phnom Penh, Cambodia | October 2024 - Present</p>
                <ul className="list-disc list-inside text-gray-300 text-sm mt-2 space-y-1">
                  <li>Developed and maintained core backend services (Elixir, Phoenix) for Buy Now, Pay Later (BNPL) application, implementing robust GraphQL API endpoints for payment scheduling, tracking, and user transaction history.</li>
                  <li>Collaborated on database schema design (Ecto) for financial transactions, ensuring data integrity and auditability, supporting over 10,000 daily transactions.</li>
                  <li>Integrated with third-party payment gateways, adhering to security best practices.</li>
                  <li>Contributed significantly to the backend development of Freelance Translator Platform (C# ASP.NET), designing modules for user authentication (JWT), service listing, order management, and real-time communication (SignalR).</li>
                  <li>Implemented a robust role-based access control (RBAC) system for different user types.</li>
                  <li>Led and designed key backend functionalities for a Loan Management Application (Elixir, Phoenix), managing the full lifecycle from origination to repayment.</li>
                  <li>Designed and implemented complex GraphQL resolvers and schemas for dynamic loan application forms, interest calculation engines, and detailed repayment tracking.</li>
                </ul>
                <p className="text-sm text-gray-500 mt-2">Technologies: Elixir, Phoenix, GraphQL, Ecto, PostgreSQL, RabbitMQ, Docker, C#, ASP.NET Core, Entity Framework Core, SQL Server, SignalR, Azure DevOps, Git.</p>
              </div>
            </div>

            {/* Volunteer Work and Leadership Experience */}
            <div className="mb-10 ml-6 p-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="absolute w-5 h-5 bg-yellow-500 rounded-full mt-1 -left-2.5 border-2 border-gray-800"></div>
              <h3 className="text-2xl font-semibold text-yellow-400 mb-2">Volunteer Work & Leadership</h3>

              {/* Student Council Head Administrator */}
              <div className="mb-4">
                <p className="text-lg text-gray-200">Student Council Head Administrator</p>
                <p className="text-md text-gray-400">2020-2021</p>
                <ul className="list-disc list-inside text-gray-300 text-sm mt-2 space-y-1">
                  <li>Led and implemented technical solutions for administrating Student Council and other organizations.</li>
                </ul>
              </div>

              {/* Technology Advisor and Team Lead for Student Council */}
              <div className="mb-4">
                <p className="text-lg text-gray-200">Technology Advisor and Team Lead for Student Council</p>
                <p className="text-md text-gray-400">2022-Present</p>
                <ul className="list-disc list-inside text-gray-300 text-sm mt-2 space-y-1">
                  <li>Helped advise and implement technology to the Student Council for improvement to the organization's operation.</li>
                </ul>
              </div>

              {/* Lighting Technician and Controller */}
              <div>
                <p className="text-lg text-gray-200">Lighting Technician and Controller</p>
                <p className="text-md text-gray-400">2019-Present</p>
                <ul className="list-disc list-inside text-gray-300 text-sm mt-2 space-y-1">
                  <li>Designed and operated lighting control for church and maintained the church's network and computers.</li>
                </ul>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm italic mt-10">
            "A journey of continuous learning and growth."
          </p>
        </div>
        {/* --- End Integrated Roadmap Section --- */}

        {/* About Section */}
        <section
          id="about"
          ref={aboutRef} // Assign ref
          className="py-16 px-4 md:px-8 lg:px-12 bg-gray-800 bg-opacity-90 rounded-xl shadow-lg border border-gray-700 animate-fade-in-up mb-12 scroll-mt-[96px]"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center drop-shadow-md">
            ABOUT <span className="text-teal-400">ME</span>
          </h2>
          <div className="text-gray-300 text-lg md:text-xl leading-relaxed space-y-6 max-w-3xl mx-auto">
            <p>
              Hello! I'm Chhousour Leok, a passionate Software Engineer driven by the exciting challenge of building robust, scalable, and resilient distributed systems. My journey in development has been fueled by a deep curiosity for how things work behind the scenes, and a strong inclination towards the elegance of functional programming in backend environments.
            </p>
            <p>
              My professional experience at Tekhub has given me hands-on opportunities to dive deep into various critical applications. I've had the privilege of developing and maintaining core backend services for diverse platforms, including a Buy Now, Pay Later (BNPL) application where I implemented robust GraphQL API endpoints for payment scheduling and transaction history. I also significantly contributed to a Freelance Translator Platform, focusing on secure user authentication and real-time communication, and led key backend functionalities for a Loan Management Application.
            </p>
            <p>
              Technically, I thrive across a diverse stack. My toolkit includes strong proficiency in languages like <strong>Elixir, Python, JavaScript (Node.js, TypeScript), C#, Go, and PHP</strong>. I'm comfortable with backend frameworks such as <strong>Phoenix, ASP.NET Core, Express.js, Flask, Django, Spring Boot, and Laravel</strong>. When it comes to data, I have solid experience with <strong>PostgreSQL, MySQL, MongoDB, Redis, and SQL Server</strong>.
            </p>
            <p>
              Beyond coding, I have practical experience with <strong>Containerization & Orchestration (Docker, Docker Compose, Portainer)</strong>, ensuring applications are deployed efficiently. I'm also well-versed in <strong>Version Control (Git, GitHub, GitLab)</strong>, facilitating collaborative development. My foundational understanding of <strong>Networking</strong> and <strong>System Administration</strong> further complements my ability to build comprehensive and maintainable solutions. I'm constantly eager to learn new technologies and refine my skills, always with the goal of creating innovative and reliable software that makes a real impact.
            </p>
            <p className="text-center text-sm italic text-gray-400 mt-8">
              "Committed to building innovative and reliable software."
            </p>
            <div className="flex justify-center mt-6">
              {/* User icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 drop-shadow-lg">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          ref={projectsRef} // Assign ref
          className="py-16 px-4 md:px-8 lg:px-12 bg-gray-800 bg-opacity-90 rounded-xl shadow-lg border border-gray-700 animate-fade-in-up mb-12 scroll-mt-[96px]"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 text-center drop-shadow-md">
            MY <span className="text-green-400">PROJECTS</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Card 1: Realtime Chat App using React and Firebase */}
            <div className="bg-gray-700 rounded-lg p-6 border border-gray-600 shadow-md transform hover:scale-105 transition-transform duration-300">
              {/* Chat icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 mb-4">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V3a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <h3 className="text-2xl font-semibold text-white mb-3">Realtime Chat App</h3>
              <p className="text-gray-300 text-base leading-relaxed">
                Developed a fully functional real-time chat application leveraging React for the frontend and Firebase for backend services including authentication and data storage.
              </p>
              <p className="text-sm text-gray-400 mt-2">Technologies: React, Firebase (Auth, Firestore)</p>
            </div>

            {/* Project Card 2: Todo/Note Taking Web App with React */}
            <div className="bg-gray-700 rounded-lg p-6 border border-gray-600 shadow-md transform hover:scale-105 transition-transform duration-300">
              {/* List/Clipboard icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400 mb-4">
                <rect width="16" height="16" x="4" y="4" rx="2" ry="2"></rect>
                <path d="M12 8h-4"></path>
                <path d="M16 12h-8"></path>
                <path d="M16 16h-8"></path>
              </svg>
              <h3 className="text-2xl font-semibold text-white mb-3">Todo/Note Taking Web App</h3>
              <p className="text-gray-300 text-base leading-relaxed">
                A responsive web application built with React for managing daily tasks and notes, featuring intuitive CRUD operations and a clean user interface.
              </p>
              <p className="text-sm text-gray-400 mt-2">Technologies: React, Local Storage (or optional Firebase for persistence)</p>
            </div>

            {/* Project Card 3: E-commerce Backend API */}
            <div className="bg-gray-700 rounded-lg p-6 border border-gray-600 shadow-md transform hover:scale-105 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400 mb-4">
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"></path>
                <path d="M9 18h6"></path>
                <path d="M10 22v-4h4v4"></path>
              </svg>
              <h3 className="text-2xl font-semibold text-white mb-3">E-commerce Backend API</h3>
              <p className="text-gray-300 text-base leading-relaxed">
                Designed and developed a comprehensive RESTful API for an e-commerce platform, serving as the central hub for user, product, and order management. Used Passport.js and JWT for authentication.
              </p>
              <p className="text-sm text-gray-400 mt-2">Technologies: Node.js, Express.js, MongoDB/PostgreSQL</p>
            </div>

            {/* Project Card 4: Freelance Translator Platform Backend */}
            <div className="bg-gray-700 rounded-lg p-6 border border-gray-600 shadow-md transform hover:scale-105 transition-transform duration-300">
              {/* Code icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400 mb-4">
                <path d="M16 18l-6 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3z"></path>
                <path d="M15 9h-6"></path>
                <path d="M15 13h-6"></path>
              </svg>
              <h3 className="text-2xl font-semibold text-white mb-3">Freelance Translator Platform Backend</h3>
              <p className="text-gray-300 text-base leading-relaxed">
                Contributed significantly to the backend development of a platform, designing modules for user authentication (JWT), service listing, order management, and real-time communication (SignalR).
              </p>
              <p className="text-sm text-gray-400 mt-2">Technologies: C#, ASP.NET Core, SignalR, JWT, SQL Server</p>
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm italic mt-10">
            "Every line of code tells a story."
          </p>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          ref={contactRef} // Assign ref
          className="py-16 px-4 md:px-8 lg:px-12 bg-gray-800 bg-opacity-90 rounded-xl shadow-lg border border-gray-700 animate-fade-in-up mb-12 scroll-mt-[96px]"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center drop-shadow-md">
            REACH <span className="text-yellow-400">OUT</span>
          </h2>
          <div className="flex flex-col items-center justify-center space-y-6 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            <p className="text-center">
              I'm always open to new opportunities and collaborations. Feel free to connect with me!
            </p>
            <a
              href="mailto:chousourleok@gmail.com"
              className="flex items-center gap-3 text-cyan-400 hover:text-cyan-300 transition-colors duration-200 text-xl md:text-2xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              chousourleok@gmail.com
            </a>
            <a
              href="https://github.com/cakeru"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-400 hover:text-gray-300 transition-colors duration-200 text-xl md:text-2xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c-1.3-.9-2.7-1.6-4-1.9 0 0-1.4-.4-1.4-1.4 0-.6.4-1.2 1-1.4 1.4-.4 2.8-.7 4.2-.7H12c1.4 0 2.8.3 4.2.7.6.2 1 .8 1 1.4 0 1-1.4 1.4-1.4 1.4-1.3.3-2.7 1-4 1.9a4.8 4.8 0 0 0-1 3.2v4"></path>
                <path d="M9 18h6"></path>
                <path d="M12 22v-4h4v4"></path>
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
              GitHub/cakeru
            </a>
            <a
              href="https://linkedin.com/in/chousour"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-blue-400 hover:text-blue-300 transition-colors duration-200 text-xl md:text-2xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              LinkedIn/chousour
            </a>
          </div>
          <p className="text-center text-gray-400 text-sm italic mt-10">
            "Let's build something great together."
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm py-4">
        &copy; {new Date().getFullYear()} Chhousour Leok. All rights reserved.
      </footer>
    </div>
  );
};

export default App;

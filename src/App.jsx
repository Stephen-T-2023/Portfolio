import React, { useEffect, useState } from 'react';
import client from './contentful/client';
import ProjectCard from './components/ProjectCard';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [featuredProject, setFeaturedProject] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    client.getEntries({
      content_type: 'portfolioProjects',
      order: '-sys.createdAt', // Corrected to use sys.createdAt
    })
      .then(response => {
        const fetchedProjects = response.items;
        setProjects(fetchedProjects);
        
        // Set the most recent project as featured
        if (fetchedProjects.length > 0) {
          setFeaturedProject(fetchedProjects[0]);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'} transition-all`}>

      {/* Dark Mode / Light Mode Toggle */}
      <div className="fixed top-4 left-4 flex items-center border-black border-2 rounded-4xl bg-gray-500">
        <span className="mr-2">🌞</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
            className="hidden"
          />
          <span className="slider round"></span>
        </label>
        <span className="ml-2">🌙</span>
      </div>

      {/* Menu Button */}
      <div className="fixed top-4 right-4">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-3 bg-blue-500 text-white rounded-full shadow-lg focus:outline-none hover:bg-blue-600 transition-colors"
        >
          ☰
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 bg-gray-800 text-white rounded-md shadow-lg">
            <ul className="p-4">
              <li><a href="https://github.com/Stephen-T-2023" target="_blank" className="block p-2 hover:bg-gray-700">Github</a></li>
              <li><a href="https://www.linkedin.com/in/stephen-t-131039286/" target="_blank" className="block p-2 hover:bg-gray-700">LinkedIn</a></li>
            </ul>
          </div>
        )}
      </div>

      {/* Featured Project */}
      {featuredProject && (
        <section className="featured-project p-8 bg-gray-800 text-white">
          <img
            src={featuredProject.fields.image.fields.file.url}
            alt={featuredProject.fields.title}
            className="w-full h-64 object-cover"
          />
          <h2 className="text-4xl mt-4">{featuredProject.fields.title}</h2>
          <p>{featuredProject.fields.description}</p>
          <div className="mt-4">
            <a
              href={featuredProject.fields.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              GitHub
            </a>
            <a
              href={featuredProject.fields.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Live Site
            </a>
          </div>
        </section>
      )}

      {/* About Me Section */}
      <section className="about p-8">
        <h2 className="text-3xl mb-4">About Me</h2>
        <p>
          I’m a software developer who loves building games, websites, and creative projects.
        </p>
      </section>

      {/* Other Projects */}
      <section className="other-projects grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
        {projects.slice(1).map(({ fields, sys }) => (
          <ProjectCard key={sys.id} fields={fields} />
        ))}
      </section>
    </div>
  );
};

export default App;
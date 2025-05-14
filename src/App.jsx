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
      order: '-sys.createdAt', // Most recent first
    })
      .then(response => {
        const fetchedProjects = response.items;
        setProjects(fetchedProjects);

        // Feature the most recent project
        if (fetchedProjects.length > 0) {
          setFeaturedProject(fetchedProjects[0]);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className={`${darkMode ? 'bg-zinc-900 text-white' : 'bg-zinc-300 text-zinc-900'} transition-colors duration-300 min-h-screen`}>

      {/* Fixed top bar background */}
      <div className={`fixed top-0 left-0 w-full h-16 z-40 ${darkMode ? 'bg-zinc-800' : 'bg-zinc-200'} shadow-md transition-colors duration-300`}></div>

      {/* Dark mode toggle (top left) */}
      <div className="fixed top-4 left-4 z-50 flex items-center px-3 py-1 bg-zinc-300 dark:bg-zinc-700 rounded-full shadow-lg">
        <span className="mr-2">🌞</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
          <span className="slider"></span>
        </label>
        <span className="ml-2">🌙</span>
      </div>

      {/* Dropdown menu (top right) */}
      <div className="fixed top-2 right-4 z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition"
        >
          ☰
        </button>
        {menuOpen && (
          <div className={`absolute right-0 mt-2 w-44 rounded-lg shadow-xl z-50 transition-colors duration-300 ${darkMode ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900 border border-zinc-300'}`}>
            <ul className="p-2">
              <li>
                <a
                  href="https://github.com/Stephen-T-2023"
                  target="_blank"
                  className="block px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-zinc-700"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/stephen-t-131039286/"
                  target="_blank"
                  className="block px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-zinc-700"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Main layout */}
      <main className="pt-20 pb-10 px-4">
        <div className="max-w-screen-xl mx-auto space-y-16">

          {/* Featured project section */}
          {featuredProject && (
            <section className={`${darkMode ? 'bg-mist-grey text-midnight-black' : 'bg-zinc-900 text-white'} p-8 rounded-xl shadow-lg`}>
              <img
                src={featuredProject.fields.image.fields.file.url}
                alt={featuredProject.fields.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <h2 className="text-4xl font-semibold mt-6">{featuredProject.fields.title}</h2>
              <p className="mt-2 text-lg">{featuredProject.fields.description}</p>
              <div className="mt-6 flex gap-4">
                <a
                  href={featuredProject.fields.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  GitHub
                </a>
                {featuredProject.fields.liveLink?.trim().length > 0 && (
                  <a
                    href={featuredProject.fields.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Live Site
                  </a>
                )}
              </div>
            </section>
          )}

          {/* About me section */}
          <section className={`${darkMode ? 'bg-mist-grey text-midnight-black' : 'bg-zinc-900 text-white'} p-8 rounded-xl shadow-lg`}>
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <p className="text-lg">
              I’m a software developer who loves building games, websites, and creative projects.
            </p>
          </section>

          {/* Grid of additional projects */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Other Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(1).map(({ fields, sys }) => (
                <ProjectCard key={sys.id} fields={fields} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;

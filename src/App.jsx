import { useEffect, useState } from 'react';
import client from './contentful/client';
import ProjectCard from './components/ProjectCard';

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    client.getEntries({ content_type: 'portfolioProjects' })
      .then(response => setProjects(response.items))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Projects</h2>
      {projects.length === 0 ? (
        <p>No projects loaded yet.</p>
      ) : (
        projects.map(({ fields, sys }) => (
          <ProjectCard key={sys.id} fields={fields} />
        ))
      )}
    </div>
  );
};

export default Home;
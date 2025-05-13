const ProjectCard = ({ fields }) => {
    const { title, description, githubLink, liveLink, image } = fields;
  
    return (
      <div className="rounded-lg border shadow p-4">
        <img
          src={image.fields.file.url}
          alt={title}
          className="w-full h-48 object-cover mb-2 rounded"
        />
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm">{description}</p>
        <div className="mt-2">
          <a href={githubLink} target="_blank" rel="noopener noreferrer" className="mr-2 text-blue-500 underline">GitHub</a>
          <a href={liveLink} target="_blank" rel="noopener noreferrer" className="text-green-500 underline">Live</a>
        </div>
      </div>
    );
  };
  
  export default ProjectCard;
  
const ProjectCard = ({ fields }) => {
    const { title, description, githubLink, liveLink, image } = fields;
  
    return (
      <div className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all">
        {/* Image with hover effect */}
        <img
          src={image.fields.file.url}
          alt={title}
          className="w-full h-64 object-cover group-hover:opacity-50 transition-all"
        />
        
        {/* Overlay with title and description on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-75 transition-all text-white p-4">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-sm mt-2">{description}</p>
        </div>
  
        {/* Buttons (GitHub & Live) */}
        <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            GitHub
          </a>
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
          >
            Live Site
          </a>
        </div>
      </div>
    );
  };
  
  export default ProjectCard;
  
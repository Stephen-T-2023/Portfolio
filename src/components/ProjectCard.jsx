const ProjectCard = ({ fields }) => {
    const { title, description, githubLink, liveLink, image } = fields;
  
    // Ensure the image URL is valid and prefixed with 'https:' if needed
    const imageUrl = image?.fields?.file?.url?.startsWith('//')
      ? 'https:' + image.fields.file.url
      : image?.fields?.file?.url || '';
  
    return (
      <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-muted border border-border">
        
        {/* Project image (scales up slightly on hover) */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
  
        {/* Dark overlay that fades in on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
  
        {/* Project title and description (fade in on hover) */}
        <div className="absolute top-4 left-4 p-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white max-h-[80%] overflow-y-auto">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm mt-1">{description}</p>
        </div>
  
        {/* Action buttons for GitHub and live site (fade + activate on hover) */}
        <div className="absolute bottom-4 right-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              GitHub
            </a>
          )}
          {liveLink && liveLink.trim().length > 0 && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              Live Site
            </a>
          )}
        </div>
      </div>
    );
  };
  
  export default ProjectCard; // Export the component for use elsewhere
  
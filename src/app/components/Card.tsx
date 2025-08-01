// Filename: src/components/Card.tsx
import { Star, Eye } from 'lucide-react';
import { Project } from '@/app/data/portfolioData'; // Import the Project type

interface CardProps {
  project: Project;
  onViewDetails: () => void;
}

const Card = ({ project, onViewDetails }: CardProps) => {
  const { title, date, achievements, tech, details } = project;

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 shadow-lg mb-8 transition-all duration-300 hover:border-blue-400 hover:bg-gray-800/80 group">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-xl font-bold text-blue-300">{title}</h3>
        </div>
        <span className="text-sm text-gray-400 flex-shrink-0 ml-4">{date}</span>
      </div>
      <ul className="list-none space-y-2 mb-4">
        {achievements.map((item, index) => (
          <li key={index} className="flex items-start">
            <Star className="h-4 w-4 text-blue-400 mr-3 mt-1 flex-shrink-0" />
            <span className="text-gray-300 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-end">
        <div className="flex flex-wrap gap-2 mt-4">
          {tech.map((t) => (
            <span key={t} className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>
        {/* Only show the button if there are details to view */}
        {details && (
          <button 
            onClick={onViewDetails}
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-blue-400 transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <Eye size={16} /> View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;


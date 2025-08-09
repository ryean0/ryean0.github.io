/* Filename: src/app/components/TechIcon.tsx */
'use client';

import { 
    SiReact, SiNextdotjs, SiDocker, SiKubernetes, SiAmazon, 
    SiTypescript, SiJavascript, SiPython, SiMongodb, SiRedis, 
    SiGraphql, SiTerraform, SiFirebase, SiDigitalocean, SiGit,
    SiJira, SiAmazoneks, SiAmazondynamodb, SiAmazons3, SiApachespark,
} from 'react-icons/si';
import { VscJson } from 'react-icons/vsc';
import { FaJava } from 'react-icons/fa';

interface TechIconProps {
  tech: string;
  className?: string;
}

const TechIcon = ({ tech, className = "h-3 w-3" }: TechIconProps) => {
  const normalizedTech = tech.toLowerCase();

  const iconMap: { [key: string]: React.ReactNode } = {
    'react.js': <SiReact className={className} />,
    'next.js': <SiNextdotjs className={className} />,
    'docker': <SiDocker className={className} />,
    'kubernetes': <SiKubernetes className={className} />,
    'aws': <SiAmazon className={className} />,
    'aws amplify': <SiAmazon className={className} />,
    'aws s3': <SiAmazons3 className={className} />,
    'aws (eks, vpc, ec2)': <SiAmazoneks className={className} />,
    'appsync': <SiGraphql className={className} />, // Using GraphQL for AppSync
    'apache spark': <SiApachespark className={className} />,
    'javascript': <SiJavascript className={className} />,
    'dynamodb': <SiAmazondynamodb className={className} />,
    'typescript': <SiTypescript className={className} />,
    'python': <SiPython className={className} />,
    'mongodb atlas': <SiMongodb className={className} />,
    'redis': <SiRedis className={className} />,
    'graphql': <SiGraphql className={className} />,
    'terraform': <SiTerraform className={className} />,
    'firebase': <SiFirebase className={className} />,
    'digitalocean': <SiDigitalocean className={className} />,
    'git': <SiGit className={className} />,
    'jira': <SiJira className={className} />,
    'java spring': <FaJava className={className} />,
    'json': <VscJson className={className} />,
    // Add other icons as needed
  };

  // Find a key in the map that the normalized tech string includes
  const matchedKey = Object.keys(iconMap).find(key => normalizedTech.includes(key));

  return matchedKey ? iconMap[matchedKey] : null;
};

export default TechIcon;
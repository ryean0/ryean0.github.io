/* Filename: src/app/components/TechIcon.tsx */
'use client';

import { 
    SiReact, SiNextdotjs, SiDocker, SiKubernetes, SiAmazon, 
    SiTypescript, SiJavascript, SiPython, SiMongodb, SiRedis, 
    SiGraphql, SiTerraform, SiFirebase, SiDigitalocean, SiGit,
    SiJira, SiAmazoneks, SiAmazondynamodb, SiAmazons3, SiApachespark,
    // --- NEW: Added many new icons ---
    SiRedux, SiElasticsearch, SiGitlab, SiGo, SiJsonwebtokens,
    SiNextra, SiInstagram, SiGithubactions, SiTensorflow,
    SiAngular, SiCoder // NEW: Added Angular and a Fallback (SiCode)
} from 'react-icons/si';
import { VscJson } from 'react-icons/vsc';
import { FaJava, FaNetworkWired } from 'react-icons/fa';
import { Cpu } from 'lucide-react';

interface TechIconProps {
  tech: string;
  className?: string;
}

// Define the icon map outside the component for performance optimization
const getIconMap = (className: string): { [key: string]: React.ReactNode } => ({
    'react.js': <SiReact className={className} />,
    'next.js': <SiNextdotjs className={className} />,
    'docker': <SiDocker className={className} />,
    'kubernetes': <SiKubernetes className={className} />,
    'aws': <SiAmazon className={className} />,
    'aws amplify': <SiAmazon className={className} />,
    'aws s3': <SiAmazons3 className={className} />,
    'aws (eks, vpc, ec2)': <SiAmazoneks className={className} />,
    'aws cloudwatch': <SiAmazon className={className} />,
    'aws personalize': <SiAmazon className={className} />,
    'aws cloudformation': <SiAmazon className={className} />,
    'appsync': <SiGraphql className={className} />,
    'apache spark': <SiApachespark className={className} />,
    'javascript': <SiJavascript className={className} />,
    'dynamodb': <SiAmazondynamodb className={className} />,
    'typescript': <SiTypescript className={className} />,
    'angular': <SiAngular className={className} />, // NEW
    'python': <SiPython className={className} />,
    'mongodb atlas': <SiMongodb className={className} />,
    'mongodb': <SiMongodb className={className} />,
    'redis': <SiRedis className={className} />,
    'graphql': <SiGraphql className={className} />,
    'terraform': <SiTerraform className={className} />,
    'firebase': <SiFirebase className={className} />,
    'digitalocean': <SiDigitalocean className={className} />,
    'git': <SiGit className={className} />,
    'gitlab': <SiGitlab className={className} />,
    'jira': <SiJira className={className} />,
    'java spring': <FaJava className={className} />,
    'json': <VscJson className={className} />,
    'redux': <SiRedux className={className} />,
    'elasticsearch': <SiElasticsearch className={className} />,
    'instagram api': <SiInstagram className={className} />,
    'ci/cd': <SiGithubactions className={className} />,
    'github actions': <SiGithubactions className={className} />,
    'go': <SiGo className={className} />,
    'jwt': <SiJsonwebtokens className={className} />,
    'nextauth': <SiNextra className={className} />,
    'tensorflow': <SiTensorflow className={className} />,
    'minikube': <SiKubernetes className={className} />,
    'distributed systems': <FaNetworkWired className={className} />,
    'paxos': <Cpu className={className} />,
    'iac': <SiTerraform className={className} />
});

const TechIcon = ({ tech, className = "h-3 w-3" }: TechIconProps) => {
  const normalizedTech = tech.toLowerCase();
  const iconMap = getIconMap(className);
  const mapKeys = Object.keys(iconMap);

  // --- MODIFIED: Robust matching logic ---
  
  // 1. Check for an exact match
  if (iconMap[normalizedTech]) {
    return iconMap[normalizedTech];
  }

  // 2. Handle complex strings like "Typescript | Angular"
  // Split by common delimiters and check each part
  const parts = normalizedTech.split(/[|/]/).map(part => part.trim());
  for (const part of parts) {
    if (iconMap[part]) {
        return iconMap[part];
    }
  }

  // 3. Fallback to the previous partial match logic
  const matchedKey = mapKeys.find(key => normalizedTech.includes(key));
  
  // 4. Final fallback to a generic code icon
  return matchedKey ? iconMap[matchedKey] : <SiCoder className={className} />;
};

export default TechIcon;
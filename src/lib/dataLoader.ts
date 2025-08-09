// Filename: src/lib/dataLoader.ts
// This utility reads the content/ directory at build time.
import fs from 'fs';
import path from 'path';
import { ExperienceData, ProjectData } from '@/types';

// Define the base directory for content relative to the project root
const CONTENT_DIR = path.join(process.cwd(), 'content');

// Generic function to load and parse JSON files
function loadContent<T extends { startDate: string }>(subdirectory: string): (T & { id: string })[] {
  const directoryPath = path.join(CONTENT_DIR, subdirectory);

  // Ensure the directory exists
  if (!fs.existsSync(directoryPath)) {
    console.warn(`Content directory not found: ${directoryPath}`);
    fs.mkdirSync(directoryPath, { recursive: true });
    return [];
  }

  const fileNames = fs.readdirSync(directoryPath);

  const content = fileNames
    .filter(fileName => path.extname(fileName) === '.json')
    .map(fileName => {
      const filePath = path.join(directoryPath, fileName);
      try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContents) as T;
        
        // Assign the filename (without extension) as the ID
        const id = path.basename(fileName, '.json');
        return { ...data, id };

      } catch (error) {
        console.error(`Error reading or parsing file ${fileName}:`, error);
        return null;
      }
    })
    .filter((item): item is T & { id: string } => item !== null);

    // Sort the content by startDate descending (most recent first)
    return content.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
}

// Specific functions to load Projects and Experiences
export const getProjects = (): ProjectData[] => loadContent<ProjectData>('projects');
export const getExperiences = (): ExperienceData[] => loadContent<ExperienceData>('experience');

/**
 * Education Data: Degree, school, coursework, honors, and activities
 * To be consumed by: siteConfig.tsx → Education.tsx | page.tsx (content in hero badge)
 * Note: The Education interface is defined in siteConfig.tsx & re-exported for downstream consumers (this file provides the data only)
 */

import type { Education, CampusActivity } from "../siteConfig";

const campusActivities: CampusActivity[] = [
  // list of school activities (e.g. clubs, research, internships, etc.) → list of EducationActivity objects
  {
    name: "The Daily Bruin",
    orgDesc: "UCLA's Official Campus Newsletter",
    roleDesc: "Full-Stack Web Software Developer",
    timeCommit: 220,
    dateStart: "Sep 2023",
    dateEnd: "May 2024",
  },
  {
    name: "Campus Events Commission (CEC)",
    orgDesc: "Official organising committee & external liaison for UCLA campus events, funded by the UC Undergraduate Student Affairs Commission (USAC)",
    roleDesc: "Lead Backend Developer (Main Site)",
    timeCommit: 200,
    dateStart: "May 2024",
    dateEnd: "May 2025",
  },
  
];

export const educationData: Education = {
  degree: "Bachelor of Science (B.S) in Computer Science",
  school: "University of California, Los Angeles",
  schoolSub: "Henry Samueli School of Engineering & Applied Science (HSSEAS)",
  location: "Los Angeles, CA",
  graduationDate: "Dec 2025",
  gpa: "3.4/4.0",

  relevantCourses: [
    "Distributed Systems",
    "Algorithms &amp; Data Structures",
    "Database Systems",
    "Software Engineering",
    "Operating Systems",
    "Computer Networks",
    "Web Development",
    "Machine Learning",
  ],

  honors: [
   "Upsilon Pi Epsilon (UPE) UCLA Samueli Computer Science Honor Society (2024–2025 | Member)",
  ],
  activities: [ ...campusActivities ]
};
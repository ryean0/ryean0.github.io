/**
 * FILE: src/data/profile/educationData.tsx  — FULL REPLACEMENT
 *
 * Changes from previous version:
 *  - Kept existing campusActivities[] and educationData: Education exactly as-is
 *  - Added new educationMilestones: EducationMilestone[] export
 *    The UCLA milestone reuses the data from educationData for consistency.
 */

import type { Education, CampusActivity, EducationMilestone } from "../siteConfig";

// ─── Campus Activities (unchanged) ──────────────────────────────────────────

const campusActivities: CampusActivity[] = [
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
    orgDesc:
      "Official organising committee & external liaison for UCLA campus events, funded by the UC Undergraduate Student Affairs Commission (USAC)",
    roleDesc: "Lead Backend Developer (Main Site)",
    timeCommit: 200,
    dateStart: "May 2024",
    dateEnd: "May 2025",
  },
];

// ─── Education Data (unchanged — still used by hero badge & siteConfig) ─────

export const educationData: Education = {
  degree: "Bachelor of Science (B.S) in Computer Science",
  school: "University of California, Los Angeles",
  schoolSub: "Henry Samueli School of Engineering & Applied Science (HSSEAS)",
  location: "Los Angeles, CA",
  graduationDate: "Dec 2025",
  gpa: "3.4/4.0",
  relevantCourses: [
    "Distributed Systems",
    "Algorithms & Data Structures",
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
  activities: [...campusActivities],
};

// ─── Education Milestones (NEW) ──────────────────────────────────────────────

export const educationMilestones: EducationMilestone[] = [
  {
    id: "raffles",
    period: "2014 – 2018",
    yearStart: 2014,
    yearEnd: 2018,
    type: "high-school",
    typeLabel: "High School",
    institution: "Raffles Institution",
    location: "Singapore",
    description:
      "Completed secondary and pre-university education at one of Singapore's top independent schools, with a focus on sciences and mathematics.",
    achievements: [
      "Completed the Singapore-Cambridge GCE A-Level curriculum",
      "Studied Physics, Chemistry, Mathematics, and Further Mathematics",
    ],
    backgroundImage: "/images/education/raffles.jpg",
    icon: "🏫",
  },
  {
    id: "ns",
    period: "2018 – 2020",
    yearStart: 2018,
    yearEnd: 2020,
    type: "military",
    typeLabel: "National Service",
    institution: "Singapore Armed Forces — 48th Armored Regiment (48SAR)",
    location: "Singapore",
    description:
      "Served mandatory National Service as a Main Battle Tank Commander, attaining the rank of 3rd Sergeant. Led a 4-man crew through 18 months of armoured operations and live-fire exercises.",
    achievements: [
      "Attained rank of 3rd Sergeant (3SG), Singapore Army",
      "Qualified as Main Battle Tank (MBT) Commander",
      "Led 4-man crew in armoured operations and live-fire training",
      "Completed Basic Military Training (BMT) and Armour Officer Cadet Course",
    ],
    backgroundImage: "/images/education/ns.jpg",
    icon: "🎖️",
  },
  {
    id: "ucla",
    period: "2021 – 2025",
    yearStart: 2021,
    yearEnd: 2025,
    type: "university",
    typeLabel: "University",
    institution: "University of California, Los Angeles (UCLA)",
    location: "Los Angeles, CA",
    description:
      "Pursued a rigorous computer science curriculum at UCLA's Henry Samueli School of Engineering & Applied Science, with coursework spanning distributed systems, algorithms, ML, and software engineering. Active contributor to the Daily Bruin engineering team and Campus Events Commission.",
    degree: "Bachelor of Science (B.S.) in Computer Science",
    gpa: "3.4 / 4.0",
    honors: [
      "Upsilon Pi Epsilon (UPE) UCLA Samueli CS Honor Society (2024–2025 | Member)",
    ],
    courses: [
      "Distributed Systems",
      "Algorithms & Data Structures",
      "Database Systems",
      "Software Engineering",
      "Operating Systems",
      "Computer Networks",
      "Web Development",
      "Machine Learning",
    ],
    activities: [...campusActivities],
    backgroundImage: "/images/education/ucla.jpg",
    icon: "🎓",
  },
  {
    id: "glasgow",
    period: "Summer 2022",
    yearStart: 2022,
    yearEnd: 2022,
    type: "study-abroad",
    typeLabel: "Study Abroad",
    institution: "University of Glasgow",
    location: "Scotland, UK",
    description:
      "Completed a summer study abroad programme at the University of Glasgow, broadening perspectives in international computing research and collaborative methodologies.",
    achievements: [
      "Completed coursework in Computing Science at a Russell Group university",
      "Gained international research and academic exposure",
    ],
    backgroundImage: "/images/education/glasgow.jpg",
    icon: "🌍",
  },
  {
    id: "graduation",
    period: "December 2025",
    yearStart: 2025,
    yearEnd: 2026,
    type: "graduation",
    typeLabel: "Graduation",
    institution: "Henry Samueli School of Engineering & Applied Sciences, UCLA",
    location: "Los Angeles, CA",
    description:
      "Graduated with a 3.4 GPA from UCLA's Henry Samueli School of Engineering & Applied Sciences with a Bachelor of Science in Computer Science.",
    degree: "B.S. Computer Science",
    gpa: "3.4 / 4.0",
    honors: [
      "Upsilon Pi Epsilon (UPE) UCLA Samueli CS Honor Society",
    ],
    backgroundImage: "/images/education/graduation.jpg",
    icon: "🎉",
  },
];
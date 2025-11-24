// ============================================
// 🎓 EDUCATION DATA
// ============================================
// Add your educational qualifications here
//
// 📝 HOW TO UPDATE EDUCATION:
// 1. Find the education entry you want to update
// 2. Update degree name
// 3. Update institution name
// 4. Update duration (MM/YYYY - MM/YYYY)
// 5. Update location
// 6. Update cgpa/grade
// 7. Set status: "Pursuing", "Completed", "Expected"
// 8. Update description
// 9. Update relevantCoursework array (for degrees)
// 10. Update achievements array
//
// ➕ TO ADD NEW EDUCATION:
// Copy this template:
// {
//   id: 4,  // Increment from last id
//   degree: "Degree Name",
//   institution: "Institution Name",
//   fullName: "Full Institution Name (optional)",
//   duration: "MM/YYYY - MM/YYYY",
//   location: "City, State/Country",
//   cgpa: "X.XX" or grade: "XX%",
//   status: "Pursuing" or "Completed",
//   description: "Brief description",
//   relevantCoursework: ["Course 1", "Course 2"],
//   achievements: ["Achievement 1", "Achievement 2"]
// }
//
// 📚 RELEVANT COURSEWORK:
// - List important courses related to your field
// - Focus on technical and specialized subjects
// - Keep it relevant to your career goals
//
// 🏆 ACHIEVEMENTS:
// - Academic honors and awards
// - GPA/CGPA milestones
// - Leadership roles
// - Competition wins
// - Research projects
// ============================================
export const educationData = [
  {
    id: 1,
    degree: "B.E. in Computer Science Engineering",
    institution: "CIT CHENNAI",
    fullName: "Chennai Institute of Technology",
    duration: "07/2024 - 06/2028",
    location: "Chennai, Tamil Nadu",
    cgpa: "8.62",
    status: "Pursuing",
    description: "Comprehensive computer science program covering software engineering, data structures, algorithms, database systems, and web technologies.",
    relevantCoursework: [
      "Data Structures and Algorithms",
      "Database Management Systems",
      "Software Engineering",
      "Web Technologies",
      "Computer Networks",
      "Operating Systems"
    ],
    achievements: [
      "Maintained CGPA of 8.62",
      "Active participation in coding competitions",
      "Member of technical clubs and societies"
    ]
  },
  {
    id: 2,
    degree: "Higher Secondary (HSLC)",
    institution: "SSHN Hr Sec School",
    duration: "06/2023 - 03/2024",
    location: "Rajapalayam, Tamil Nadu",
    grade: "94.5%",
    status: "Completed",
    description: "Higher secondary education with focus on Mathematics, Physics, Chemistry.",
    stream: "Science (Mathematics, Physics, Chemistry)",
    achievements: [
      "Achieved 94.5% overall grade",
      "Excellence in Mathematics and Physics",
      "School topper in Physics"
    ]
  },
  {
    id: 3,
    degree: "Secondary School (SSLC)",
    institution: "SSHN Hr Sec School",
    duration: "06/2022 - 03/2023",
    location: "Rajapalayam, Tamil Nadu",
    grade: "95.2%",
    status: "Completed",
    description: "Secondary education with strong foundation in core subjects including Mathematics, Science, and English.",
    achievements: [
      "Achieved 95.2% overall grade",
      "Consistent academic excellence",
      "Active participation in school activities"
    ]
  }
];

export default educationData;
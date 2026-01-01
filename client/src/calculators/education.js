export const getGradePoint = (marks) => {
  const m = Number(marks);
  if (m >= 80) return 5.00;
  if (m >= 70) return 4.00;
  if (m >= 60) return 3.50;
  if (m >= 50) return 3.00;
  if (m >= 40) return 2.00;
  if (m >= 33) return 1.00;
  return 0.00;
};

/**
 * Calculates GPA by only considering subjects that have values entered.
 * This provides a "Live" result that adjusts as the user fills the form.
 */
export const calculateGPA = (subjects) => {
  const filledSubjects = subjects.filter(sub => sub.marks !== '' && !isNaN(sub.marks));
  if (!filledSubjects.length) return "0.00";
  
  const totalPoints = filledSubjects.reduce((acc, sub) => acc + getGradePoint(sub.marks), 0);
  return (totalPoints / filledSubjects.length).toFixed(2);
};

/**
 * Calculates CGPA by only considering courses where both Grade and Credit are entered.
 */
export const calculateCGPA = (courses) => {
  const filledCourses = courses.filter(c => c.grade !== '' && c.credit !== '' && !isNaN(c.grade) && !isNaN(c.credit));
  if (!filledCourses.length) return "0.00";
  
  let totalPoints = 0;
  let totalCredits = 0;
  
  filledCourses.forEach(course => {
    totalPoints += Number(course.grade) * Number(course.credit);
    totalCredits += Number(course.credit);
  });

  return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
};

export const percentageToGPA = (percentage) => {
  if (percentage === '' || isNaN(percentage)) return "0.00";
  const p = Math.max(0, Number(percentage));
  const gpa = p / 20;
  return Math.min(5.00, gpa).toFixed(2);
};

export const gpaToPercentage = (gpa) => {
  if (gpa === '' || isNaN(gpa)) return "0.00";
  const g = Math.max(0, Number(gpa));
  return Math.min(100, g * 20).toFixed(2);
};

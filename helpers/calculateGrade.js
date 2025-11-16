export const calculateGrade = (obtainedScore, totalScore) => {
  const percentage = ((obtainedScore / totalScore) * 100).toFixed(2);
  let grade = null;
  let remarks = null;
  if (percentage >= 97) {
    grade = "A+";
  } else if (percentage >= 93 && percentage <= 96) {
    grade = "A";
  } else if (percentage >= 90 && percentage <= 92) {
    grade = "A-";
  } else if (percentage >= 87 && percentage <= 89) {
    grade = "B+";
  } else if (percentage >= 83 && percentage <= 86) {
    grade = "B";
  } else if (percentage >= 80 && percentage <= 82) {
    grade = "B-";
  } else if (percentage >= 77 && percentage <= 79) {
    grade = "C+";
  } else if (percentage >= 73 && percentage <= 76) {
    grade = "C";
  } else if (percentage >= 70 && percentage <= 72) {
    grade = "C-";
  } else if (percentage >= 67 && percentage <= 69) {
    grade = "D+";
  } else if (percentage >= 63 && percentage <= 66) {
    grade = "D";
  } else if (percentage >= 50 && percentage <= 62) {
    grade = "D-";
  } else if (percentage < 50) {
    grade = "F";
  }

  if (percentage >= 90) {
    remarks = "Outstanding! You've mastered this quiz. Well done!";
  } else if (percentage >= 80 && percentage <= 89) {
    remarks = "Great job! You've excelled in this quiz.";
  } else if (percentage >= 70 && percentage <= 79) {
    remarks = "Good effort! You've passed the quiz.";
  } else if (percentage >= 50 && percentage <= 69) {
    remarks = "You've passed, but there's potential for improvement.";
  } else if (percentage < 50) {
    remarks = "Learning is a journey. Keep going, and you'll get there.";
  }
  return {
    grade,
    remarks,
  };
};

// console.log(calculateGrade(105, 203));

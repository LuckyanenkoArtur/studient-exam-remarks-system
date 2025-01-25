const calculateScholarship = (student, defaultScholarship) => {
  // Determine the number of '3' marks and if the student is active
  const marks = student?.subjects.map((subject) => subject.mark);
  const isActive = student?.activeLive === "1";

  // Scholarship calculation rules
  let scholarshipAmount = 0;
  let hasIncreasedScholarship = false;

  if (marks.every((mark) => mark === "5") && isActive) {
    // All '5' marks and active student gets an increased scholarship (50% more)
    scholarshipAmount = defaultScholarship * 1.5;
    hasIncreasedScholarship = true;
  } else if (
    marks.some((mark) => mark === "5") ||
    marks.some((mark) => mark === "4")
  ) {
    // '4' and '5' marks, or one '3' and active gives the regular scholarship
    scholarshipAmount = defaultScholarship;
  }

  return { scholarshipAmount, hasIncreasedScholarship };
};

export default calculateScholarship;

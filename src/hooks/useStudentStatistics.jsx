import { useEffect, useState } from "react";

const useStudentStatistics = () => {
  const [statistics, setStatistics] = useState({
    totalStudents: 0,
    studentsByGroup: {},
    activeStudents: 0,
    scholarshipsStats: {
      regular: 0,
      increased: 0,
      none: 0,
    },
  });

  useEffect(() => {
    const studentsData = JSON.parse(localStorage.getItem("studients")) || [];
    const scholarshipsData =
      JSON.parse(localStorage.getItem("scholarships")) || [];

    const totalStudents = studentsData.length;

    const studentsByGroup = studentsData.reduce((acc, student) => {
      acc[student.group] = (acc[student.group] || 0) + 1;
      return acc;
    }, {});

    const activeStudents = studentsData.filter(
      (student) => student.activeLive === "1"
    ).length;

    const scholarshipsStats = scholarshipsData.reduce(
      (acc, student) => {
        if (student.scholarshipAmount > 0) {
          if (student.hasIncreasedScholarship) {
            acc.increased += 1;
          } else {
            acc.regular += 1;
          }
        } else {
          acc.none += 1;
        }
        return acc;
      },
      { regular: 0, increased: 0, none: 0 }
    );

    setStatistics({
      totalStudents,
      studentsByGroup,
      activeStudents,
      scholarshipsStats,
    });
  }, []);

  return statistics;
};

export default useStudentStatistics;

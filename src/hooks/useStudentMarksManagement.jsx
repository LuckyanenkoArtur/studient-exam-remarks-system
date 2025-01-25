import { useState, useEffect } from "react";

export const useStudentMarksManagement = () => {
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const studentsData = JSON.parse(localStorage.getItem("studients")) || [];
    const uniqueGroups = [
      ...new Set(studentsData.map((student) => student.group)),
    ];
    setGroups(uniqueGroups);
  }, []);

  const handleGroupClick = (group) => {
    const studentsData = JSON.parse(localStorage.getItem("studients")) || [];
    const groupStudents = studentsData.filter(
      (student) => student.group === group
    );
    setSelectedGroup(group);
    setStudents(groupStudents);
  };

  const handleRemarkChange = (e, studentIndex, subjectIndex) => {
    const updatedStudents = [...students];
    updatedStudents[studentIndex].subjects[subjectIndex].mark = e.target.value;
    setStudents(updatedStudents);

    const allStudents = JSON.parse(localStorage.getItem("studients")) || [];
    const studentToUpdate = updatedStudents[studentIndex];

    const updatedAllStudents = allStudents.map((student) =>
      student?.lastname === studentToUpdate?.lastname &&
      student?.firstname === studentToUpdate?.firstname &&
      student?.surename === studentToUpdate?.surename
        ? studentToUpdate
        : student
    );

    localStorage.setItem("studients", JSON.stringify(updatedAllStudents));
  };

  return {
    students,
    groups,
    selectedGroup,
    handleGroupClick,
    handleRemarkChange,
  };
};

import { useState, useEffect, useRef } from "react";
import calculateScholarship from "../utils/scholarship";

const useStudentScholarship = () => {
  const [students, setStudents] = useState([]);
  const [defaultScholarship, setDefaultScholarship] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newScholarshipAmount, setNewScholarshipAmount] = useState(0);
  const toast = useRef(null);

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("studients")) || [];
    const storedScholarships =
      JSON.parse(localStorage.getItem("scholarships")) || [];

    const updatedStudents = storedStudents.map((student) => {
      const scholarshipData = storedScholarships.find(
        (s) =>
          s.fullname ===
          `${student.lastname} ${student.firstname} ${student.surename}`
      );
      if (scholarshipData) {
        return { ...student, ...scholarshipData };
      }

      const { scholarshipAmount, hasIncreasedScholarship } =
        calculateScholarship(student, defaultScholarship);
      return {
        ...student,
        fullname: `${student.lastname} ${student.firstname} ${student.surename}`,
        scholarshipAmount,
        hasIncreasedScholarship,
      };
    });

    setStudents(updatedStudents);
  }, [defaultScholarship]);

  const handleScholarshipCalculation = () => {
    if (defaultScholarship <= 0) {
      toast.current.show({
        severity: "error",
        summary: "Invalid Scholarship Amount",
        detail: "Please enter a valid default scholarship amount.",
      });
      return;
    }

    const updatedStudents = students.map((student) => {
      const { scholarshipAmount, hasIncreasedScholarship } =
        calculateScholarship(student, defaultScholarship);
      return { ...student, scholarshipAmount, hasIncreasedScholarship };
    });

    setStudents(updatedStudents);

    const updatedScholarships = updatedStudents.map((student) => ({
      fullname: student.fullname,
      scholarshipAmount: student.scholarshipAmount,
      hasIncreasedScholarship: student.hasIncreasedScholarship,
    }));
    localStorage.setItem("scholarships", JSON.stringify(updatedScholarships));

    toast.current.show({
      severity: "success",
      summary: "Calculation Complete",
      detail: "Scholarships calculated for all students.",
    });
  };

  const saveScholarshipAmount = () => {
    const updatedStudents = students.map((student) =>
      student.fullname === selectedStudent.fullname
        ? { ...student, scholarshipAmount: newScholarshipAmount }
        : student
    );

    setStudents(updatedStudents);

    const updatedScholarships = updatedStudents.map((student) => ({
      fullname: student.fullname,
      scholarshipAmount: student.scholarshipAmount,
      hasIncreasedScholarship: student.hasIncreasedScholarship,
    }));
    localStorage.setItem("scholarships", JSON.stringify(updatedScholarships));

    toast.current.show({
      severity: "success",
      summary: "Scholarship Updated",
      detail: `Scholarship updated for ${selectedStudent.fullname}`,
    });

    setSelectedStudent(null);
  };

  return {
    students,
    defaultScholarship,
    setDefaultScholarship,
    selectedStudent,
    setSelectedStudent,
    newScholarshipAmount,
    setNewScholarshipAmount,
    toast,
    handleScholarshipCalculation,
    saveScholarshipAmount,
  };
};

export default useStudentScholarship;

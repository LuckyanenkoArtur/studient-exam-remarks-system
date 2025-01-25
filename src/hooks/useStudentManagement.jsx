import { useState, useEffect, useRef } from "react";
import { StudentManager } from "../models/StudentManager";
import { Student } from "../models/Student";

const useStudentManagement = () => {
  const [studients, setStudients] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [currentStudient, setCurrentStudient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    lastname: "",
    firstname: "",
    surename: "",
    age: "",
    group: "",
    course: "",
    activeLive: false,
    subjects: Student.defaultSubjects(),
  });

  const toast = useRef(null);
  const manager = new StudentManager();

  useEffect(() => {
    setStudients(manager.loadStudients());
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddStudient = () => {
    const newStudient = new Student(
      form.lastname,
      form.firstname,
      form.surename,
      parseInt(form.age, 10),
      form.group,
      form.course,
      form.subjects
    );
    manager.addStudient(newStudient);
    setStudients(manager.loadStudients());
    setDialogVisible(false);
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Студент добавлен",
    });
  };

  const handleEditStudient = () => {
    manager.updateStudient(currentStudient, form);
    setStudients(manager.loadStudients());
    setDialogVisible(false);
    toast.current.show({
      severity: "success",
      summary: "Успех",
      detail: "Данные студента обновлены",
    });
  };

  const handleDeleteStudient = (index) => {
    manager.deleteStudient(index);
    setStudients(manager.loadStudients());
    toast.current.show({
      severity: "success",
      summary: "Успех",
      detail: "Студент удален!",
    });
  };

  const openNew = () => {
    setForm({
      lastname: "",
      firstname: "",
      surename: "",
      age: "",
      group: "",
      course: "",
      subjects: Student.defaultSubjects(),
    });
    setIsEditing(false);
    setDialogVisible(true);
  };

  const openEdit = (studient, index) => {
    setCurrentStudient(index);
    setForm(studient);
    setIsEditing(true);
    setDialogVisible(true);
  };

  return {
    studients,
    dialogVisible,
    setDialogVisible,
    isEditing,
    form,
    handleInputChange,
    handleAddStudient,
    handleEditStudient,
    handleDeleteStudient,
    openNew,
    openEdit,
    toast,
  };
};

export default useStudentManagement;

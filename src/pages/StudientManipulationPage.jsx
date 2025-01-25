import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import StudentManagementDialog from "../components/StudentManagementDialog";
import useStudentManagement from "../hooks/useStudentManagement";

const StudientManipulationPage = () => {
  const {
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
  } = useStudentManagement();

  return (
    <div>
      <Toast ref={toast} />
      <div style={{ padding: "2rem" }}>
        <Button
          label="Добавить студента"
          icon="pi pi-plus"
          onClick={openNew}
          style={{ marginBottom: "2rem" }}
        />

        <DataTable value={studients} paginator rows={5}>
          <Column field="lastname" header="Фамилия" sortable />
          <Column field="firstname" header="Имя" sortable />
          <Column field="surename" header="Отчество" sortable />
          <Column field="age" header="Возраст" sortable />
          <Column field="group" header="Группа" sortable />
          <Column field="course" header="Курс" sortable />
          <Column
            field="activeLive"
            header="Участник в общественной работе"
            sortable
          />
          <Column
            body={(rowData, columnProps) => (
              <>
                <Button
                  icon="pi pi-pencil"
                  className="p-button-rounded p-button-success p-mr-2"
                  onClick={() => openEdit(rowData, columnProps.rowIndex)}
                  style={{ marginRight: "1rem" }}
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-rounded p-button-danger"
                  onClick={() => handleDeleteStudient(columnProps.rowIndex)}
                />
              </>
            )}
            header="Actions"
          />
        </DataTable>
      </div>

      <StudentManagementDialog
        dialogVisible={dialogVisible}
        setDialogVisible={setDialogVisible}
        isEditing={isEditing}
        form={form}
        handleInputChange={handleInputChange}
        handleAddStudient={handleAddStudient}
        handleEditStudient={handleEditStudient}
      />
    </div>
  );
};

export default StudientManipulationPage;

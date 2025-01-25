import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import useStudentScholarship from "../hooks/useStudentScholarship";

const StudentScholarshipPage = () => {
  const {
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
  } = useStudentScholarship();

  return (
    <div className="p-4">
      <Toast ref={toast} />

      <div style={{ padding: "2rem" }}>
        <h4>Размера обычной стипендии</h4>
        <InputNumber
          value={defaultScholarship}
          onValueChange={(e) => setDefaultScholarship(e.value)}
          mode="currency"
          currency="RUB"
          locale="ru-ru"
        />

        <Button
          label="Рассчитать стипендии"
          icon="pi pi-calculator"
          className="p-button-success mb-4"
          onClick={handleScholarshipCalculation}
          style={{ marginLeft: "2rem" }}
        />
      </div>

      <div style={{ padding: "2rem" }}>
        <DataTable value={students} paginator rows={5} className="w-full">
          <Column field="fullname" header="ФИО" sortable />
          <Column field="group" header="Группа" sortable />
          <Column field="course" header="Курс" sortable />
          <Column
            field="hasIncreasedScholarship"
            header="Повышеная стипендия"
            body={(rowData) => (rowData.hasIncreasedScholarship ? "Yes" : "No")}
          />
          <Column
            header="Сумма стипендии"
            body={(rowData) => (
              <InputNumber
                value={rowData.scholarshipAmount}
                mode="currency"
                currency="RUB"
                locale="ru-ru"
                readOnly
              />
            )}
          />
          <Column
            header="Действие"
            body={(rowData) => (
              <Button
                icon="pi pi-pencil"
                className="p-button-warning"
                onClick={() => {
                  setSelectedStudent(rowData);
                  setNewScholarshipAmount(rowData.scholarshipAmount);
                }}
              />
            )}
          />
        </DataTable>
      </div>

      <Dialog
        visible={selectedStudent !== null}
        onHide={() => setSelectedStudent(null)}
        header="Измение суммы стипендии"
        footer={
          <div>
            <Button
              label="Применить"
              icon="pi pi-save"
              onClick={saveScholarshipAmount}
              className="p-button-success"
            />
            <Button
              label="Отмена"
              icon="pi pi-times"
              onClick={() => setSelectedStudent(null)}
              className="p-button-text"
            />
          </div>
        }
      >
        <div className="p-field">
          <h3>Сумма стипендии</h3>
          <InputNumber
            id="newScholarshipAmount"
            value={newScholarshipAmount}
            onValueChange={(e) => setNewScholarshipAmount(e.value)}
            mode="currency"
            currency="RUB"
            locale="ru-ru"
            className="w-full"
          />
        </div>
      </Dialog>
    </div>
  );
};

export default StudentScholarshipPage;

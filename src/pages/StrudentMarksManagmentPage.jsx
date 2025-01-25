import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useStudentMarksManagement } from "../hooks/useStudentMarksManagement";

const StrudentMarksManagmentPage = () => {
  const {
    students,
    groups,
    selectedGroup,
    handleGroupClick,
    handleRemarkChange,
  } = useStudentMarksManagement();

  const renderAction = (rowData, { rowIndex }) => {
    return (
      <div>
        {rowData?.subjects.map((subject, subjectIndex) => (
          <div key={subjectIndex} style={{ marginBottom: "10px" }}>
            <span>{subject?.title}</span>
            <InputText
              value={subject?.mark}
              onChange={(e) => handleRemarkChange(e, rowIndex, subjectIndex)}
              style={{ width: "60px", marginLeft: "10px" }}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div style={{ padding: "2rem" }}>
        {groups.map((group) => (
          <Button
            key={group}
            label={group}
            onClick={() => handleGroupClick(group)}
            style={{ marginRight: "10px" }}
          />
        ))}
      </div>

      {selectedGroup && (
        <div style={{ padding: "0 2rem 2rem 2rem" }}>
          <h2>Cтуденты группы: {selectedGroup}</h2>
          <DataTable value={students} paginator rows={1}>
            <Column
              field="fullname"
              header="ФИО"
              body={(rowData) =>
                `${rowData.lastname} ${rowData.firstname} ${rowData.surename}`
              }
            />
            <Column field="course" header="Курс" />
            <Column header="Предметы" body={renderAction} />
          </DataTable>
        </div>
      )}
    </div>
  );
};

export default StrudentMarksManagmentPage;

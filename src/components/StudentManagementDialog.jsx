import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const StudentManagementDialog = ({
  dialogVisible,
  setDialogVisible,
  isEditing,
  form,
  handleInputChange,
  handleAddStudient,
  handleEditStudient,
}) => {
  return (
    <Dialog
      header={isEditing ? "Редактировать студента" : "Добавить студента"}
      visible={dialogVisible}
      onHide={() => setDialogVisible(false)}
      style={{ width: "50vw" }}
      footer={
        <div>
          <Button
            label="Сохранить"
            icon="pi pi-check"
            onClick={isEditing ? handleEditStudient : handleAddStudient}
          />
          <Button
            label="Отмена"
            icon="pi pi-times"
            onClick={() => setDialogVisible(false)}
            className="p-button-text"
          />
        </div>
      }
    >
      <div className="p-grid p-fluid">
        <div className="p-field">
          <h4>Фамилия</h4>
          <InputText
            id="lastname"
            name="lastname"
            value={form?.lastname}
            onChange={handleInputChange}
          />
        </div>
        <div className="p-field">
          <h4>Имя</h4>
          <InputText
            id="firstname"
            name="firstname"
            value={form?.firstname}
            onChange={handleInputChange}
          />
        </div>
        <div className="p-field">
          <h4>Отчество</h4>
          <InputText
            id="surename"
            name="surename"
            value={form?.surename}
            onChange={handleInputChange}
          />
        </div>
        <div className="p-field">
          <h4>Возраст</h4>
          <InputText
            id="age"
            name="age"
            value={form?.age}
            onChange={handleInputChange}
          />
        </div>
        <div className="p-field">
          <h4 htmlFor="group">Группа</h4>
          <InputText
            id="group"
            name="group"
            value={form?.group}
            onChange={handleInputChange}
          />
        </div>
        <div className="p-field">
          <h4>Курс</h4>
          <InputText
            id="course"
            name="course"
            value={form?.course}
            onChange={handleInputChange}
          />
        </div>
        <div className="p-field">
          <h4>Участник в общественной работе</h4>
          <InputText
            id="activeLive"
            name="activeLive"
            value={form?.activeLive}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default StudentManagementDialog;

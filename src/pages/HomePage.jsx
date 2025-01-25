import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useStudentStatistics from "../hooks/useStudentStatistics";

const HomePage = () => {
  const statistics = useStudentStatistics();

  const groupData = Object.entries(statistics?.studentsByGroup).map(
    ([group, count]) => ({ group, count })
  );

  return (
    <div style={{ padding: "2rem" }}>
      <div>
        <h2>Общая статистика по студентам</h2>
        <p>Всего студентов: {statistics?.totalStudents}</p>
        <p>Активные студенты: {statistics?.activeStudents}</p>
      </div>

      <div title="">
        <h2>Статистика cтудентов по группам</h2>
        <DataTable value={groupData}>
          <Column field="group" header="Группа"></Column>
          <Column field="count" header="Количество"></Column>
        </DataTable>
      </div>

      <div>
        <h2>Статистика по стипендиям</h2>
        <p>Повышенная стипендия: {statistics?.scholarshipsStats?.increased}</p>
        <p>Обычная стипендия: {statistics?.scholarshipsStats?.regular}</p>
        <p>Без стипендии: {statistics?.scholarshipsStats?.none}</p>
      </div>
    </div>
  );
};

export default HomePage;

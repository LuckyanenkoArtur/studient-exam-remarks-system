import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../api/redux/features/authentication/authApiSlice";
import { logOut } from "../api/redux/features/authentication/authSlice";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const items = [
    {
      label: "Главная панель",
      icon: "pi pi-home",
      command: () => navigate("/"),
    },
    {
      label: "Оценочная ведомость",
      icon: "pi pi-truck",
      command: () => navigate("/remarks-management"),
    },
    {
      label: "Cтудентчиская степендия",
      icon: "pi pi-truck",
      command: () => navigate("/scholarship-management"),
    },
    {
      label: "Управление студентами",
      icon: "pi pi-truck",
      command: () => navigate("/studient-management"),
    },
    {
      label: "Управления пользователями",
      icon: "pi pi-users",
      command: () => navigate("/user-management"),
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logOut());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <Menubar
      model={items}
      start={<div style={{ fontSize: "3rem" }}>👨‍🎓</div>}
      end={<Button label="Выход" onClick={handleLogout} className="mr-auto" />}
    />
  );
};

export default Navigation;

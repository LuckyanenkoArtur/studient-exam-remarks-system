import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../api/redux/features/authentication/authSlice";
import { useLoginMutation } from "../api/redux/features/authentication/authApiSlice";
import { useDispatch } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import "./LoginPage.scss";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toastError = useRef(null);

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [login] = useLoginMutation();

  const handleLogin = async () => {
    try {
      const result = await login({
        username,
        password,
      }).unwrap();

      dispatch(setCredentials({ user: result.user }));
      navigate("/");
    } catch (err) {
      toastError.current.show({
        severity: "error",
        summary: "Ошибка при входе",
        detail: err.data?.message || "Произошла ошибка при входе",
      });
    }
  };

  return (
    <div className="login-main-container">
      <Toast ref={toastError} />
      <div className="login-main-info-part">
        <div className="logo">👨‍🎓 StudentExamPro 👨‍🎓</div>
        <div className="login-form">
          <div className="login-form-entry">
            <div className="test">Логин:</div>
            <InputText
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="test">Пароль:</div>
            <Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              toggleMask
              feedback={false}
            />
          </div>
        </div>
        <Button
          label="Войти"
          onClick={handleLogin}
          style={{ background: "#fdd75e", color: "black", border: "none" }}
        />
      </div>
    </div>
  );
};

export default LoginPage;

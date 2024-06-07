import { useCallback, useEffect, useState } from "react";
import Button from "../../components/button";
import Input from "../../components/input";
import { isEmail, isPassword } from "../../utils/validators";
import UserService from "../../services/UserService";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Form, SubContainerSign } from "./styles";
import Alert, { AlertProps } from "../../components/alert";
import Loading from "../../components/loading";

const userService = new UserService();

interface FormProps {
  email: string;
  password: string;
}

function Login() {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormProps>({} as FormProps);
  const [alert, setAlert] = useState<AlertProps>({ text: "", show: false });
  const navigate = useNavigate();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (!validatorInput()) {
        throw new Error("The fields are invalid. Please check and try again.");
      }
      await userService.login(form);
      navigate("/");
    } catch (error) {
      console.log(`ERROR: `, error);
      setAlert({ ...alert, show: true, text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: { target: { name: string; value: string } }) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const validatorInput = useCallback(() => {
    return isEmail(form.email) && isPassword(form.password);
  }, [form.email, form.password]);

  const init = useCallback(async () => {
    try {
      const status = await userService.userAuthenticated();
      if (status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log("ERROR: ", error);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    init();
  }, [init]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Form>
        <h1>Faça o seu Login</h1>
        <Input
          name="email"
          placeholder="Digite o seu e-mail"
          value={form.email}
          onChange={handleChange}
          type="email"
        />
        <Input
          name="password"
          placeholder="Digite a sua senha"
          value={form.password}
          onChange={handleChange}
          type="password"
        />
        <Button
          type="submit"
          text="Entrar!"
          onClick={handleSubmit}
          disabled={loading || !validatorInput()}
        />
        <Alert
          handleCloseAlert={() => setAlert({ ...alert, show: false })}
          show={alert.show}
          text={alert.text}
        />
        <SubContainerSign>
          <p>Não possui conta?</p>
          <NavLink to="/register">Cadastrar</NavLink>
        </SubContainerSign>
      </Form>
    </Container>
  );
}

export default Login;

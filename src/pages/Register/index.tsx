import { useCallback, useEffect, useState } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { NavLink, useNavigate } from "react-router-dom";
import Alert, { AlertProps } from "../../components/alert";
import {
  isConfirmPassword,
  isDate,
  isEmail,
  isName,
  isPassword,
} from "../../utils/validators";
import UserService from "../../services/UserService";

import { Container, Form, SubContainerSign } from "./styles";
import Loading from "../../components/loading";

const userService = new UserService();

interface FormProps {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  date_birth: string;
}

const Register = () => {
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
      await userService.create(form);
      navigate("/login");
    } catch (error: any) {
      console.log(`ERROR: `, error);
      setAlert({
        ...alert,
        show: true,
        text: error.response.data.message || error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: { target: { name: string; value: string } }) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const validatorInput = useCallback(() => {
    return (
      isName(form.name) &&
      isEmail(form.email) &&
      isPassword(form.password) &&
      isConfirmPassword({
        password: form.password,
        confirm_password: form.confirm_password,
      }) &&
      isDate(form.date_birth)
    );
  }, [
    form.name,
    form.email,
    form.password,
    form.confirm_password,
    form.date_birth,
  ]);

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
        <h1>Faça o seu Cadastro</h1>
        <Input
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
          type="text"
        />
        <Input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          type="email"
        />
        <Input
          name="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          type="password"
        />
        <Input
          name="confirm_password"
          placeholder="Confirme a senha"
          value={form.confirm_password}
          onChange={handleChange}
          type="password"
        />
        <Input
          name="date_birth"
          placeholder="Data de nascimento"
          value={form.date_birth}
          onChange={handleChange}
          type="text"
          info={{ message: "dd/mm/yyyy" }}
        />
        <Button
          type="submit"
          text="Efetuar Cadastro!"
          onClick={handleSubmit}
          disabled={loading || !validatorInput()}
        />
        <Alert
          handleCloseAlert={() => setAlert({ ...alert, show: false })}
          show={alert.show}
          text={alert.text}
        />
        <SubContainerSign>
          <p>Já possui conta?</p>
          <NavLink to="/login">Login</NavLink>
        </SubContainerSign>
      </Form>
    </Container>
  );
};

export default Register;

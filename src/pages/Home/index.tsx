import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const userService = new UserService();
import UserService from "../../services/UserService";

import {
  Container,
  TitleContainer,
  Title,
  LogoutContainer,
  Logout,
} from "./styles";

function Home() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  const init = useCallback(async () => {
    try {
      const status = await userService.userAuthenticated();
      if (status === 200) {
        return setLoading(false);
      }
      await handleLogout();
    } catch (error) {
      console.log("ERROR: ", error);
      await handleLogout();
    }
  }, [handleLogout]);

  useEffect(() => {
    init();
  }, [init]);

  if (loading) {
    return (
      <Container>
        <h1>Carregando...</h1>
      </Container>
    );
  }

  return (
    <Container>
      <TitleContainer>
        <Title>Welcome do home page.</Title>
      </TitleContainer>
      <LogoutContainer>
        <Logout onClick={handleLogout}>Sair</Logout>
      </LogoutContainer>
    </Container>
  );
}

export default Home;

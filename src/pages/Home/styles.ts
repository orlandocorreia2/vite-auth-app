import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  min-width: 100vw;
  background-color: #383838;
`;

export const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  color: #f0f2f5;
`;

export const LogoutContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`;

export const Logout = styled.a`
  color: #d6d6d6;
  font-size: 1.5rem;
  font-weight: bolder;
  text-decoration: underline;
  cursor: pointer;
`;

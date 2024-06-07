import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Content = styled.input`
  color: #fff;
  font-size: 20px;
  background-color: transparent;
  border: 2px solid #6a6a6a;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 16px 20px;
  width: 100%;

  input::placeholder {
    color: #fff;
    font-size: 12px;
    opacity: 0.7;
  }
`;

export const Info = styled.div`
  display: flex;
  width: 100%;
  align-items: end;
  justify-content: flex-end;
  color: #f0f2f5;
`;

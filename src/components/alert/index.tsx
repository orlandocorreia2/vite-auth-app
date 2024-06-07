import { Container, ContainerClose } from "./styles";

export interface AlertProps {
  show: boolean;
  text: string;
  handleCloseAlert?: VoidFunction;
}

const Alert = ({ handleCloseAlert, show, text }: AlertProps) => {
  if (!show) {
    return <></>;
  }

  return (
    <Container>
      {text}
      <ContainerClose onClick={handleCloseAlert}>X</ContainerClose>
    </Container>
  );
};

export default Alert;

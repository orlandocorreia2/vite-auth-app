import { Container } from "./styles";

interface ButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  text: string;
  onClick: (event: { preventDefault: () => void }) => void;
  disabled: boolean;
}

const Button = ({ type, text, onClick, disabled }: ButtonProps) => {
  return (
    <Container type={type} onClick={onClick} disabled={disabled}>
      {text}
    </Container>
  );
};

export default Button;

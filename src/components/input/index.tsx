import { Container, Content, Info } from "./styles";

interface InputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: {
    target: {
      name: string;
      value: string;
    };
  }) => void;
  type: React.HTMLInputTypeAttribute | undefined;
  info?: { message: string };
}

const Input = ({
  name,
  placeholder,
  value = "",
  onChange,
  type,
  info = { message: "" },
}: InputProps) => {
  return (
    <Container>
      <Content
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
      ></Content>
      {info && info.message && <Info>{info.message}</Info>}
    </Container>
  );
};

export default Input;

import {
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";

const PasswordInput = ({ name, placeholder, onChange }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handlePassword = (event) => {
    onChange && onChange(event.target.value);
    console.log(event.target.value);
  };

  return (
    <InputGroup>
      <Input
        type={show ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        focusBorderColor="maroon"
        borderRadius="lg"
        borderColor="gray.400"
        onChange={handlePassword}
      />
      <InputRightElement width="4.5rem">
        <IconButton
          variant="unstyled"
          size="lg"
          onClick={handleClick}
          ml={3}
          pl={3.5}
          h="1.75rem"
        >
          {show ? <FiEyeOff /> : <FiEye />}
        </IconButton>
      </InputRightElement>
    </InputGroup>
  );
};

export default PasswordInput;

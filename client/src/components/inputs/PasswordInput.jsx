import {
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  InputLeftElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiEyeOff, FiEye, FiLock } from "react-icons/fi";

const PasswordInput = ({ name, placeholder, onChange }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handlePassword = (event) => {
    onChange && onChange(event.target.value);
  };

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" color="gray.400">
        <FiLock />
      </InputLeftElement>
      <Input
        type={show ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        focusBorderColor="maroon"
        borderRadius="lg"
        borderColor="gray.400"
        onChange={handlePassword}
      />
      <InputRightElement width="4.5rem" color="gray.500">
        <IconButton
          variant="unstyled"
          size="md"
          onClick={handleClick}
          ml={8}
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

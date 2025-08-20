import {
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";

export const PasswordInput = ({
  name,
  value,
  placeholder,
  onChange,
  focusBorderColor,
  borderColor,
}) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handlePassword = (event) => {
    onChange && onChange(event.target.value);
  };

  return (
    <InputGroup>
      <Input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        placeholder={placeholder}
        focusBorderColor={focusBorderColor}
        borderColor={borderColor}
        onChange={handlePassword}
      />
      <InputRightElement width="4.5rem" color="gray.500">
        <IconButton
          variant="unstyled"
          size="md"
          onClick={handleClick}
          ml={6}
          pl={3}
          h="1.75rem"
        >
          {show ? <FiEyeOff /> : <FiEye />}
        </IconButton>
      </InputRightElement>
    </InputGroup>
  );
};

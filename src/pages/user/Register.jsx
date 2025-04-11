import React, { useState } from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  Link,
  Container,
  VStack,
  FormControl,
  FormLabel,
  Checkbox,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const toast = useToast();

  const handleRegister = (e) => {
    e.preventDefault();
    // Registration logic would go here
    if (!name || !email || !phone || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!agreeToTerms) {
      toast({
        title: "Error",
        description: "You must agree to the terms and conditions",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    toast({
      title: "Registration Successful",
      description: "Welcome to Bright & Lustre!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box minH="100vh" bg="#FDF9F3">
      {/* Header */}
      <Flex 
        as="header" 
        width="100%" 
        py={4} 
        px={6} 
        align="center" 
        justify="space-between"
        borderBottom="1px solid" 
        borderColor="gray.100"
        bg="white"
      >
        <Box>
          <Text color="#6E741E" fontWeight="900"> Bright & Lustre </Text>
        </Box>
        <Text fontSize="sm" color="gray.600">
          Already have an account? <Link color="#6E741E" fontWeight="medium" href="/login">Log In</Link>
        </Text>
      </Flex>

      {/* Main Content */}
      <Container maxW="container.xl" py={8}>
        <Flex 
          direction={{ base: "column", lg: "row" }} 
          gap={8} 
          justify="center" 
          align="stretch"
        >
          {/* Registration Form */}
          <Box 
            flex="1" 
            p={8} 
            bg="white" 
            borderRadius="md" 
            boxShadow="sm"
            maxW={{ base: "100%", lg: "500px" }}
            mx="auto"
          >
            <VStack spacing={6} align="stretch">
              <Text fontSize="2xl" fontWeight="bold" color="#6E741E" textAlign="center">
                Create Your Account
              </Text>
              
              <form onSubmit={handleRegister}>
                <VStack spacing={4}>
                  <FormControl id="name" isRequired>
                    <FormLabel fontSize="sm" color="gray.700">Full Name</FormLabel>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      size="lg"
                      focusBorderColor="#6E741E"
                    />
                  </FormControl>

                  <FormControl id="email" isRequired>
                    <FormLabel fontSize="sm" color="gray.700">Email Address</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      size="lg"
                      focusBorderColor="#6E741E"
                    />
                  </FormControl>

                  <FormControl id="phone" isRequired>
                    <FormLabel fontSize="sm" color="gray.700">Phone Number</FormLabel>
                    <Input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      size="lg"
                      focusBorderColor="#6E741E"
                    />
                  </FormControl>
                  
                  <FormControl id="password" isRequired>
                    <FormLabel fontSize="sm" color="gray.700">Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        size="lg"
                        focusBorderColor="#6E741E"
                      />
                      <InputRightElement>
                        <Button
                          variant="ghost"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          color="gray.500"
                          size="md"
                        >
                          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  <FormControl id="confirmPassword" isRequired>
                    <FormLabel fontSize="sm" color="gray.700">Confirm Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        size="lg"
                        focusBorderColor="#6E741E"
                      />
                      <InputRightElement>
                        <Button
                          variant="ghost"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                          color="gray.500"
                          size="md"
                        >
                          {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  
                  <Flex width="100%" justify="flex-start" align="center">
                    <Checkbox 
                      colorScheme="orange" 
                      isChecked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                    >
                      <Text fontSize="sm">I agree to the <Link color="#6E741E" href="#">Terms of Service</Link> and <Link color="#6E741E" href="#">Privacy Policy</Link></Text>
                    </Checkbox>
                  </Flex>
                  
                  <Button
                    width="100%"
                    type="submit"
                    bg="#6E741E"
                    _hover={{ bg: "#e88e0d" }}
                    color="white"
                    size="md"
                    mt={2}
                  >
                    Create Account
                  </Button>
                </VStack>
              </form>
            </VStack>
          </Box>
        </Flex>
      </Container>
      
      {/* Footer */}
      <Box as="footer" p={4} textAlign="center" color="gray.500" fontSize="sm">
        <Text>© 2025 Bright & Lustre. All rights reserved.</Text>
      </Box>
    </Box>
  );
};

export default Register;
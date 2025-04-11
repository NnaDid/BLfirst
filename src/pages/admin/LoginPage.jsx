import React, { useState } from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  Image,
  Container,
  VStack,
  FormControl,
  FormLabel,
  Divider,
  useToast,
  InputLeftElement,
  Checkbox,
  Link,
  HStack
} from "@chakra-ui/react";
import { AiOutlineSearch, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [domainSearch, setDomainSearch] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const toast = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    // Login logic would go here
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    toast({
      title: "Login Successful",
      description: "Welcome back!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDomainSearch = () => {
    if (!domainSearch) {
      toast({
        title: "Error",
        description: "Please enter a domain name",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    // Domain search logic would go here
    toast({
      title: "Searching domain",
      description: `Checking availability for ${domainSearch}`,
      status: "info",
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
          {/* New here?  */}
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
          {/* Left Side - Login Form */}
          <Box 
            flex="1" 
            p={8} 
            bg="white" 
            borderRadius="md" 
            boxShadow="sm"
            maxW={{ base: "100%", lg: "500px" }}
            height="450px"
            mx="auto"
          >
            <VStack spacing={6} align="stretch">
              <Text fontSize="2xl" fontWeight="bold" color="#6E741E" textAlign="center">
                Welcome Back!
              </Text>
              
              <form onSubmit={handleLogin}>
                <VStack spacing={4}>
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
                  
                  <Flex width="100%" justify="space-between" align="center">
                    <Checkbox 
                      colorScheme="orange" 
                      isChecked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    >
                      <Text fontSize="sm">Remember me</Text>
                    </Checkbox>
                    <Link fontSize="sm" color="gray.600" href="#">
                      Forgot Password?
                    </Link>
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
                    Log In
                  </Button>
                </VStack>
              </form>
            </VStack>
          </Box>
          
          {/* Right Side - Domain Search */}
         
        </Flex>
      </Container>
      
      {/* Footer */}
      <Box as="footer" p={4} textAlign="center" color="gray.500" fontSize="sm">
        <Text>© 2025 Bright & Lustre. All rights reserved.</Text>
      </Box>
    </Box>
  );
};

export default LoginPage;
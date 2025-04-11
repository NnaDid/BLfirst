import React, { useState, useEffect } from "react";
import { 
  Box, 
  Flex, 
  Input, 
  InputGroup, 
  InputLeftElement, 
  Button, 
  Table, 
  Thead, 
  Tr, 
  Th, 
  Tbody, 
  Td, 
  Text, 
  IconButton, 
  TableContainer, 
  useBreakpointValue, 
  Stat, 
  StatLabel, 
  StatNumber, 
  SimpleGrid, 
  Skeleton, 
  useToast, 
  HStack, 
  Badge, 
  Avatar,
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem, 
  Tooltip,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels
} from "@chakra-ui/react";
import { 
  AiOutlineSearch,  
  AiOutlinePlus,
  AiOutlineLeft  , 
  AiOutlineRight
} from "react-icons/ai";
import { 
  FiMoreVertical, 
  FiUser, 
  FiFilter, 
  FiTrendingUp,
  FiDollarSign,
  FiGlobe,
  FiMail,
  FiServer,
  FiShoppingBag,
  FiPlusCircle,
} from "react-icons/fi";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [domainData, setDomainData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const toast = useToast();
  
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  // Simulated data load
  useEffect(() => {
    const timer = setTimeout(() => {
      setDomainData([
        { id: 1, name: "example.com", status: "Active", type: "Website", expiryDate: "2025-06-15" },
        { id: 2, name: "mybusiness.org", status: "Active", type: "E-commerce", expiryDate: "2025-08-22" },
        { id: 3, name: "digitalstore.net", status: "Pending", type: "Blog", expiryDate: "2025-05-30" },
        { id: 4, name: "techblog.io", status: "Active", type: "Portfolio", expiryDate: "2026-01-10" },
      ]);
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSearch = () => {
    // Simulated search functionality
    toast({
      title: "Searching domains",
      description: `Looking for: ${searchQuery}`,
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };
  
  const handleAddFunds = () => {
    toast({
      title: "Redirecting to payment page",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };
  
  const handleCreateAccount = () => {
    toast({
      title: "Creating virtual account",
      status: "loading",
      duration: 2000,
      isClosable: true,
    });
  };
  
  const filteredData = domainData.filter(domain => 
    domain.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Box bg="gray.50" minH="100vh">
      <Flex direction="column">
        {/* Header */}
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px={8}
          py={4}
          bg="white"
          boxShadow="sm"
        >
          <Flex align="center">
            <Box mr={8} fontSize="2xl" fontWeight="bold" color="orange.500">
              GO54
            </Box>
            <Text fontSize="lg" fontWeight="medium">Dashboard</Text>
          </Flex>
          
          <Flex align="center">
            <Button size="sm" mr={4} leftIcon={<FiShoppingBag />} variant="ghost">
              More Products
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                size="sm"
                variant="ghost"
                rightIcon={<FiMoreVertical />}
              >
                <Flex align="center">
                  <Avatar size="xs" mr={2} name="Nnaemeka Didigwu" />
                  <Text>Nnaemeka</Text>
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem>My Profile</MenuItem>
                <MenuItem>Account Settings</MenuItem>
                <MenuItem>Billing</MenuItem>
                <MenuItem>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        
        {/* Main Content */}
        <Flex direction={{ base: "column", lg: "row" }} p={6} gap={6}>
          <Box flex="3" order={{ base: 2, lg: 1 }}>
            <Box mb={6}>
              <Text fontSize="2xl" fontWeight="bold" mb={4}>Hello Nnaemeka 👋</Text>
              
              {/* Domain Search */}
              <Box bg="white" p={6} borderRadius="md" boxShadow="sm" mb={6}>
                <Text fontSize="lg" fontWeight="medium" mb={4}>Search up a domain</Text>
                <Flex>
                  <InputGroup size="md">
                    <InputLeftElement pointerEvents="none">
                      <AiOutlineSearch color="gray.300" />
                    </InputLeftElement>
                    <Input 
                      placeholder="Find your perfect domain name" 
                      borderRadius="md" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </InputGroup>
                  <Button 
                    colorScheme="orange" 
                    ml={2}
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </Flex>
              </Box>
              
              {/* Tabs */}
              <Box bg="white" borderRadius="md" boxShadow="sm">
                <Tabs colorScheme="orange">
                  <TabList px={4}>
                    <Tab>Domains</Tab>
                    <Tab>Hostings</Tab>
                    <Tab>Emails</Tab>
                    <Tab>Marketplace</Tab>
                  </TabList>
                  
                  <TabPanels>
                    <TabPanel p={0}>
                      <TableContainer>
                        <Table variant="simple" size="md">
                          <Thead bg="gray.50">
                            <Tr>
                              <Th>Domain Name</Th>
                              <Th>Status</Th>
                              <Th display={{ base: "none", md: "table-cell" }}>Type</Th>
                              <Th display={{ base: "none", md: "table-cell" }}>Expiry Date</Th>
                              <Th width="50px"></Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {isLoading ? (
                              Array(4).fill(0).map((_, i) => (
                                <Tr key={i}>
                                  <Td><Skeleton height="20px" /></Td>
                                  <Td><Skeleton height="20px" /></Td>
                                  <Td display={{ base: "none", md: "table-cell" }}><Skeleton height="20px" /></Td>
                                  <Td display={{ base: "none", md: "table-cell" }}><Skeleton height="20px" /></Td>
                                  <Td><Skeleton height="20px" width="20px" /></Td>
                                </Tr>
                              ))
                            ) : filteredData.length > 0 ? (
                              filteredData.map((domain) => (
                                <Tr key={domain.id}>
                                  <Td fontWeight="medium">{domain.name}</Td>
                                  <Td>
                                    <Badge 
                                      colorScheme={domain.status === "Active" ? "green" : "yellow"}
                                      borderRadius="full"
                                      px={2}
                                    >
                                      {domain.status}
                                    </Badge>
                                  </Td>
                                  <Td display={{ base: "none", md: "table-cell" }}>{domain.type}</Td>
                                  <Td display={{ base: "none", md: "table-cell" }}>{domain.expiryDate}</Td>
                                  <Td>
                                    <Menu>
                                      <MenuButton
                                        as={IconButton}
                                        aria-label="Options"
                                        icon={<FiMoreVertical />}
                                        variant="ghost"
                                        size="sm"
                                      />
                                      <MenuList>
                                        <MenuItem>Manage Domain</MenuItem>
                                        <MenuItem>Renew Domain</MenuItem>
                                        <MenuItem>Transfer Domain</MenuItem>
                                      </MenuList>
                                    </Menu>
                                  </Td>
                                </Tr>
                              ))
                            ) : (
                              <Tr>
                                <Td colSpan={5} textAlign="center" py={4}>
                                  No domains found. Try a different search.
                                </Td>
                              </Tr>
                            )}
                          </Tbody>
                        </Table>
                      </TableContainer>
                      
                      {/* Pagination */}
                      {!isLoading && filteredData.length > 0 && (
                        <Flex justify="space-between" align="center" p={4}>
                          <Text color="gray.600">
                            Showing {filteredData.length} of {domainData.length} domains
                          </Text>
                          <HStack>
                            <IconButton
                              icon={<ChevronLeftIcon />}
                              aria-label="Previous page"
                              size="sm"
                              isDisabled={currentPage === 1}
                              onClick={() => setCurrentPage(currentPage - 1)}
                            />
                            <Text>{currentPage}</Text>
                            <IconButton
                              icon={<AiOutlineRight/>}
                              aria-label="Next page"
                              size="sm"
                              isDisabled={true}
                              onClick={() => setCurrentPage(currentPage + 1)}
                            />
                          </HStack>
                        </Flex>
                      )}
                    </TabPanel>
                    
                    <TabPanel>
                      <Box p={4} textAlign="center">
                        <Text color="gray.500">No hosting plans found</Text>
                        <Button leftIcon={<AiOutlinePlus />} colorScheme="orange" mt={4} size="sm">
                          Add Hosting Plan
                        </Button>
                      </Box>
                    </TabPanel>
                    
                    <TabPanel>
                      <Box p={4} textAlign="center">
                        <Text color="gray.500">No email accounts found</Text>
                        <Button leftIcon={<AiOutlinePlus />} colorScheme="orange" mt={4} size="sm">
                          Create Email Account
                        </Button>
                      </Box>
                    </TabPanel>
                    
                    <TabPanel>
                      <Box p={4} textAlign="center">
                        <Text color="gray.500">Marketplace coming soon</Text>
                      </Box>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
              
              {/* Quick Actions */}
              <Box mt={6}>
                <Text fontSize="lg" fontWeight="medium" mb={4}>Quick Actions</Text>
                <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                  <Button leftIcon={<FiGlobe />} variant="outline" size="md" justifyContent="flex-start">
                    Register Domain
                  </Button>
                  <Button leftIcon={<FiServer />} variant="outline" size="md" justifyContent="flex-start">
                    Order Hosting
                  </Button>
                  <Button leftIcon={<FiMail />} variant="outline" size="md" justifyContent="flex-start">
                    Setup Email
                  </Button>
                  <Button leftIcon={<FiTrendingUp />} variant="outline" size="md" justifyContent="flex-start">
                    View Analytics
                  </Button>
                </SimpleGrid>
              </Box>
            </Box>
          </Box>
          
          {/* Sidebar */}
          <Flex 
            direction="column" 
            flex="1" 
            order={{ base: 1, lg: 2 }}
            spacing={4}
          >
            {/* Wallet */}
            <Box bg="white" p={6} borderRadius="md" boxShadow="sm" mb={6}>
              <Text fontSize="lg" fontWeight="medium" mb={4}>Wallet</Text>
              <Stat mb={6}>
                <StatLabel color="gray.600">Available Balance</StatLabel>
                <StatNumber>₦0.00</StatNumber>
              </Stat>
              <Button 
                colorScheme="orange" 
                width="full" 
                onClick={handleAddFunds}
              >
                Top Up Balance
              </Button>
            </Box>
            
            {/* Virtual Account Details */}
            <Box bg="white" p={6} borderRadius="md" boxShadow="sm" mb={6}>
              <Text fontSize="lg" fontWeight="medium" mb={4}>Virtual Account Details</Text>
              <Button 
                colorScheme="orange" 
                variant="outline" 
                width="full" 
                mb={4}
                onClick={handleCreateAccount}
              >
                Create Virtual Account
              </Button>
              <Button 
                variant="link" 
                colorScheme="orange" 
                size="sm"
                leftIcon={<FiPlusCircle />}
              >
                Add your BVN
              </Button>
            </Box>
            
            {/* Promo Banner */}
            <Box 
              bg="orange.500" 
              p={6} 
              borderRadius="md" 
              boxShadow="sm" 
              color="white"
              position="relative"
              overflow="hidden"
            >
              <Box mb={4}>
                <Text fontSize="xl" fontWeight="bold">Zoho Business Suite</Text>
                <Text fontSize="sm">Stay professional with the tool built for modern teams.</Text>
              </Box>
              
              <Box position="absolute" bottom={-10} right={-10}>
                <Box 
                  width="120px" 
                  height="120px" 
                  borderRadius="full" 
                  bg="orange.400" 
                  opacity={0.6} 
                />
              </Box>
              
              <Box position="absolute" top={-5} right={-5}>
                <Box 
                  width="80px" 
                  height="80px" 
                  borderRadius="full" 
                  bg="orange.400" 
                  opacity={0.4} 
                />
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
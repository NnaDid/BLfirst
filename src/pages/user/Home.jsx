import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Container,
  SimpleGrid,
  Badge,
  HStack,
  VStack,
  Center,
  Tag,
  Divider,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useToast
} from "@chakra-ui/react";


import {
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiStar,
  FiChevronRight,
  FiPlus,
  FiArrowRight,
  FiShoppingBag,
  FiTrash2,
  FiMinus,
  FiMenu,
} from "react-icons/fi";

// Sample product data 
const productCategories = [
  {
    id: 1,
    name: "Skincare",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=320&q=80",
    featured: true
  },
  {
    id: 2,
    name: "Makeup",
    image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=320&q=80",
    featured: true
  },
  {
    id: 3,
    name: "Hair Care",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=320&q=80",
    featured: false
  },
  {
    id: 4,
    name: "Body Care",
    image: "https://images.unsplash.com/photo-1570194065650-821cfb9b44a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=320&q=80",
    featured: true
  },
  {
    id: 5,
    name: "Fragrances",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=320&q=80",
    featured: false
  },
  {
    id: 6,
    name: "Tools & Accessories",
    image: "https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=320&q=80",
    featured: false
  }
];

const products = [
  {
    id: 101,
    name: "Hydrating Facial Serum",
    price: 39.99,
    discountPrice: 29.99,
    rating: 4.8,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=320&q=80",
    categoryId: 1,
    isNew: true,
    isBestseller: true,
    description: "Advanced hydrating serum with hyaluronic acid and vitamin C for a radiant complexion.",
    tags: ["Hydrating", "Anti-aging"]
  },
  {
    id: 102,
    name: "Matte Foundation",
    price: 45.00,
    discountPrice: null,
    rating: 4.6,
    reviewCount: 98,
    image: "https://images.unsplash.com/photo-1599733589046-833caccee609?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=320&q=80",
    categoryId: 2,
    isNew: false,
    isBestseller: true,
    description: "Long-lasting matte foundation for all-day flawless coverage.",
    tags: ["Oil-free", "Long-lasting"]
  },
  {
    id: 103,
    name: "Repairing Hair Mask",
    price: 28.50,
    discountPrice: 22.99,
    rating: 4.7,
    reviewCount: 85,
    image: "https://images.unsplash.com/photo-1615396900237-b94b657a17e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=320&q=80",
    categoryId: 3,
    isNew: false,
    isBestseller: false,
    description: "Deep conditioning treatment that repairs damaged hair and adds shine.",
    tags: ["Repair", "Deep conditioning"]
  },
  {
    id: 104,
    name: "Exfoliating Body Scrub",
    price: 32.00,
    discountPrice: null,
    rating: 4.5,
    reviewCount: 67,
    image: "https://images.unsplash.com/photo-1611073561609-cdc5a2391185?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=320&q=80",
    categoryId: 4,
    isNew: true,
    isBestseller: false,
    description: "Gentle exfoliating scrub for smooth, soft skin.",
    tags: ["Exfoliating", "Moisturizing"]
  },
  {
    id: 105,
    name: "Floral Eau de Parfum",
    price: 75.00,
    discountPrice: 59.99,
    rating: 4.9,
    reviewCount: 153,
    image: "https://images.unsplash.com/photo-1594035905464-f9526e202b8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=320&q=80",
    categoryId: 5,
    isNew: false,
    isBestseller: true,
    description: "Elegant floral fragrance with notes of jasmine and rose.",
    tags: ["Floral", "Long-lasting"]
  },
  {
    id: 106,
    name: "Makeup Brush Set",
    price: 49.99,
    discountPrice: null,
    rating: 4.7,
    reviewCount: 112,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=320&q=80",
    categoryId: 6,
    isNew: false,
    isBestseller: false,
    description: "Professional makeup brush set with 12 essential brushes.",
    tags: ["Professional", "Cruelty-free"]
  },
  {
    id: 107,
    name: "Retinol Night Cream",
    price: 58.00,
    discountPrice: 49.99,
    rating: 4.8,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160beba3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=320&q=80",
    categoryId: 1,
    isNew: true,
    isBestseller: false,
    description: "Anti-aging night cream with retinol to reduce fine lines and wrinkles.",
    tags: ["Anti-aging", "Regenerating"]
  },
  {
    id: 108,
    name: "Volumizing Mascara",
    price: 24.99,
    discountPrice: null,
    rating: 4.5,
    reviewCount: 76,
    image: "https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=320&q=80",
    categoryId: 2,
    isNew: false,
    isBestseller: true,
    description: "Volumizing mascara for dramatic lashes.",
    tags: ["Volumizing", "Waterproof"]
  }
];
export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen: isCartOpen, onOpen: onCartOpen, onClose: onCartClose } = useDisclosure();
  const { isOpen: isWishlistOpen, onOpen: onWishlistOpen, onClose: onWishlistClose } = useDisclosure();
  const { isOpen: isMobileMenuOpen, onOpen: onMobileMenuOpen, onClose: onMobileMenuClose } = useDisclosure();
  const toast = useToast();

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(product => {
        const matchesCategory = selectedCategory === "all" || product.categoryId.toString() === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && (searchQuery === "" || matchesSearch);
      });

  const getFeaturedCategories = () => {
    return productCategories.filter(category => category.featured);
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(cartItems.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const addToWishlist = (product) => {
    if (!wishlistItems.some(item => item.id === product.id)) {
      setWishlistItems([...wishlistItems, product]);
      
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== productId));
    
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const moveFromWishlistToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
    
    toast({
      title: "Moved to cart",
      description: `${product.name} has been moved from wishlist to cart`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.discountPrice || item.price;
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box>
      {/* Header */}
      <Box as="header" bg="white" boxShadow="sm" position="sticky" top="0" zIndex="sticky">
        <Container maxW="container.xl" py={3}>
          <Flex justify="space-between" align="center">
            <Flex align="center">
              <IconButton
                display={{ base: "flex", md: "none" }}
                icon={<FiMenu />}
                variant="ghost"
                onClick={onMobileMenuOpen}
                aria-label="Open menu"
                mr={2}
              />
              <Heading size="lg" color="pink.500" letterSpacing="tight">
                GlowEssence
              </Heading>
            </Flex>

            <InputGroup maxW={{ base: "60%", md: "md" }} mx={{ base: 2, md: 4 }} display={{ base: "none", md: "block" }}>
              <Input 
                placeholder="Search for products..." 
                borderRadius="full"
                value={searchQuery}
                onChange={handleSearch}
              />
              <InputRightElement>
                <FiChevronRight color="gray.400" />
              </InputRightElement>
            </InputGroup>

            <HStack spacing={4}>
              <IconButton
                aria-label="Search"
                icon={<FiChevronRight />}
                variant="ghost"
                display={{ base: "flex", md: "none" }}
              />
              <Box position="relative" display={{ base: "none", sm: "block" }}>
                <IconButton
                  aria-label="Wishlist"
                  icon={<FiHeart />}
                  variant="ghost"
                  onClick={onWishlistOpen}
                />
                {wishlistItems.length > 0 && (
                  <Badge
                    position="absolute"
                    top="-6px"
                    right="-6px"
                    borderRadius="full"
                    bg="pink.400"
                    color="white"
                    fontSize="xs"
                    w="18px"
                    h="18px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {wishlistItems.length}
                  </Badge>
                )}
              </Box>
              <Box position="relative">
                <IconButton
                  aria-label="Shopping cart"
                  icon={<FiShoppingCart />}
                  variant="ghost"
                  onClick={onCartOpen}
                />
                {cartItemCount > 0 && (
                  <Badge
                    position="absolute"
                    top="-6px"
                    right="-6px"
                    borderRadius="full"
                    bg="pink.400"
                    color="white"
                    fontSize="xs"
                    w="18px"
                    h="18px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Box>
              <IconButton
                aria-label="User account"
                icon={<FiUser />}
                variant="ghost"
                display={{ base: "none", sm: "flex" }}
              />
            </HStack>
          </Flex>
        </Container>

        {/* Navigation */}
        <Box bg="#6E741E" py={2} display={{ base: "none", md: "block" }}>
          <Container maxW="container.xl">
            <Flex justify="center">
              {productCategories.map((category) => (
                <Button
                  key={category.id}
                  variant="ghost"
                  colorScheme="white"
                  color="whiteAlpha.900"
                  mx={1}
                  fontWeight={selectedCategory === category.id.toString() ? "bold" : "normal"}
                  onClick={() => setSelectedCategory(category.id.toString())}
                >
                  {category.name}
                </Button>
              ))}
              <Button
                variant="ghost"
                mx={1}
                fontWeight={selectedCategory === "all" ? "bold" : "normal"}
                onClick={() => setSelectedCategory("all")}
              >
                All Products
              </Button>
            </Flex>
          </Container>
        </Box>
      </Box>

      {/* Mobile Menu Drawer */}
      <Drawer isOpen={isMobileMenuOpen} placement="left" onClose={onMobileMenuClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader color="pink.500">GlowEssence</DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing={3}>
              <InputGroup>
                <Input 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <InputRightElement>
                  <FiChevronRight color="gray.400" />
                </InputRightElement>
              </InputGroup>
              
              <Divider />
              <Text fontWeight="bold" mb={2}>Categories</Text>
              
              {productCategories.map((category) => (
                <Button
                  key={category.id}
                  variant="ghost"
                  justifyContent="flex-start"
                  onClick={() => {
                    setSelectedCategory(category.id.toString());
                    onMobileMenuClose();
                  }}
                >
                  {category.name}
                </Button>
              ))}
              
              <Button
                variant="ghost"
                justifyContent="flex-start"
                onClick={() => {
                  setSelectedCategory("all");
                  onMobileMenuClose();
                }}
              >
                All Products
              </Button>
              
              <Divider />
              
              <Button leftIcon={<FiHeart />} variant="ghost" justifyContent="flex-start" onClick={() => {
                onWishlistOpen();
                onMobileMenuClose();
              }}>
                Wishlist ({wishlistItems.length})
              </Button>
              
              <Button leftIcon={<FiUser />} variant="ghost" justifyContent="flex-start">
                My Account
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Hero Section */}
      <Box 
        bgGradient="linear(to-r, pink.100, #6E741E)"  
        mb={10}
      >
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8} alignItems="center">
            <GridItem>
              <Heading 
                as="h1" 
                size="2xl" 
                lineHeight="shorter" 
                mb={4}
                bgGradient="linear(to-r, pink.400, purple.500)"
                bgClip="text"
              >
                Discover Your Natural Beauty
              </Heading>
              <Text fontSize="xl" color="gray.600" mb={8}>
                Premium skincare and beauty products crafted with natural ingredients for a radiant you.
              </Text>
              <HStack spacing={4}>
                <Button colorScheme="pink" size="lg" rightIcon={<FiArrowRight />}>
                  Shop Now
                </Button>
                <Button variant="outline" colorScheme="purple" size="lg">
                  Learn More
                </Button>
              </HStack>
            </GridItem>
            <GridItem display={{ base: "none", md: "block" }}>
            <Image
              src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=320&q=80"
              alt="Beauty Products"
              borderRadius="md"
              boxShadow="xl"
              height="100%"
              width="100%"
              objectFit="cover"
              objectPosition="left center"
            />
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Featured Categories */}
      <Container maxW="container.xl" mb={16}>
        <Heading size="lg" mb={6}>Shop by Category</Heading>
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={6}>
          {getFeaturedCategories().map((category) => (
            <Box 
              key={category.id} 
              bg="white" 
              borderRadius="lg" 
              overflow="hidden" 
              boxShadow="md"
              transition="transform 0.3s"
              _hover={{ transform: "translateY(-5px)" }}
              cursor="pointer"
              onClick={() => setSelectedCategory(category.id.toString())}
            >
              <Image src={category.image} alt={category.name} h="200px" w="100%" objectFit="cover" />
              <Center py={4}>
                <Text fontWeight="bold" fontSize="lg">{category.name}</Text>
              </Center>
            </Box>
          ))}
        </SimpleGrid>
      </Container>

      {/* Products Section */}
      <Container maxW="container.xl" mb={16}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="lg">
            {selectedCategory === "all" 
              ? "All Products" 
              : productCategories.find(cat => cat.id.toString() === selectedCategory)?.name || "Products"}
          </Heading>
          <HStack>
            <Button size="sm" variant="ghost" color="pink.500">
              Latest
            </Button>
            <Button size="sm" variant="ghost">
              Best Sellers
            </Button>
            <Button size="sm" variant="ghost">
              Price
            </Button>
          </HStack>
        </Flex>

        {filteredProducts.length > 0 ? (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
            {filteredProducts.map((product) => (
              <Box 
                key={product.id} 
                bg="white" 
                borderRadius="lg" 
                overflow="hidden" 
                boxShadow="sm"
                transition="all 0.3s"
                _hover={{ boxShadow: "md" }}
                position="relative"
              >
                {product.isNew && (
                  <Badge 
                    position="absolute" 
                    top={3} 
                    left={3} 
                    colorScheme="pink" 
                    variant="solid" 
                    borderRadius="full"
                    px={2}
                  >
                    New
                  </Badge>
                )}
                {product.isBestseller && (
                  <Badge 
                    position="absolute" 
                    top={3} 
                    right={3} 
                    colorScheme="purple" 
                    variant="solid" 
                    borderRadius="full"
                    px={2}
                  >
                    Best Seller
                  </Badge>
                )}
                <Box position="relative">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    h="200px" 
                    w="100%" 
                    objectFit="cover" 
                  />
                  <IconButton 
                    aria-label="Add to wishlist"
                    icon={wishlistItems.some(item => item.id === product.id) ? <FiHeart fill="red" /> : <FiHeart />}
                    position="absolute"
                    bottom={3}
                    right={3}
                    colorScheme="white"
                    bg="white"
                    color="gray.600"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (wishlistItems.some(item => item.id === product.id)) {
                        removeFromWishlist(product.id);
                      } else {
                        addToWishlist(product);
                      }
                    }}
                  />
                </Box>
                <Box p={4}>
                  <Text color="gray.500" fontSize="sm" mb={1}>
                    {productCategories.find(cat => cat.id === product.categoryId)?.name}
                  </Text>
                  <Text fontWeight="semibold" fontSize="md" mb={2}>
                    {product.name}
                  </Text>
                  <HStack spacing={1} mb={2}>
                    <Flex align="center">
                      <FiStar fill="gold" stroke="gold" />
                      <Text ml={1} fontSize="sm">{product.rating}</Text>
                    </Flex>
                    <Text fontSize="sm" color="gray.500">({product.reviewCount} reviews)</Text>
                  </HStack>
                  <Flex align="center" justify="space-between" mt={2}>
                    <Box>
                      {product.discountPrice ? (
                        <Flex align="center">
                          <Text fontWeight="bold" fontSize="md" color="pink.600">
                            ${product.discountPrice.toFixed(2)}
                          </Text>
                          <Text ml={2} fontSize="sm" textDecoration="line-through" color="gray.500">
                            ${product.price.toFixed(2)}
                          </Text>
                        </Flex>
                      ) : (
                        <Text fontWeight="bold" fontSize="md" color="gray.800">
                          ${product.price.toFixed(2)}
                        </Text>
                      )}
                    </Box>
                    <Button 
                      size="sm" 
                      colorScheme="pink" 
                      leftIcon={<FiShoppingBag size={14} />}
                      onClick={() => addToCart(product)}
                    >
                      Add
                    </Button>
                  </Flex>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Center p={10} bg="gray.50" borderRadius="lg">
            <VStack>
              <Text>No products found matching your criteria.</Text>
              <Button colorScheme="pink" variant="outline" onClick={() => setSelectedCategory("all")}>
                View All Products
              </Button>
            </VStack>
          </Center>
        )}
      </Container>

      {/* Cart Drawer */}
      <Drawer isOpen={isCartOpen} placement="right" onClose={onCartClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Your Shopping Cart ({cartItemCount} items)
          </DrawerHeader>
          <DrawerBody>
            {cartItems.length === 0 ? (
              <Center h="200px" flexDirection="column">
                <FiShoppingCart size={50} color="#CBD5E0" />
                <Text mt={4} color="gray.500">Your cart is empty</Text>
                <Button mt={4} colorScheme="pink" variant="outline" onClick={onCartClose}>
                  Continue Shopping
                </Button>
              </Center>
            ) : (
              <VStack spacing={4} align="stretch" divider={<Divider />}>
                {cartItems.map((item) => (
                  <Flex key={item.id} align="center">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      boxSize="80px" 
                      objectFit="cover" 
                      borderRadius="md" 
                      mr={4}
                    />
                    <Box flex="1">
                      <Text fontWeight="medium">{item.name}</Text>
                      <Text color="gray.600" fontSize="sm">
                        {productCategories.find(cat => cat.id === item.categoryId)?.name}
                      </Text>
                      <Text fontWeight="bold" color="pink.600" mt={1}>
                        ${(item.discountPrice || item.price).toFixed(2)}
                      </Text>
                    </Box>
                    <Flex direction="column" align="center">
                      <HStack>
                        <IconButton 
                          icon={<FiMinus size={12} />} 
                          size="xs" 
                          variant="outline"
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        />
                        <Text fontWeight="medium" w="30px" textAlign="center">{item.quantity}</Text>
                        <IconButton 
                          icon={<FiPlus size={12} />} 
                          size="xs" 
                          variant="outline"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        />
                      </HStack>
                      <IconButton
                        icon={<FiTrash2 size={14} />}
                        aria-label="Remove item"
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        mt={2}
                        onClick={() => removeFromCart(item.id)}
                      />
                    </Flex>
                  </Flex>
                ))}
              </VStack>
            )}
          </DrawerBody>

          {cartItems.length > 0 && (
            <Box borderTopWidth="1px" p={4}>
              <Flex justify="space-between" mb={2}>
                <Text fontWeight="medium">Subtotal</Text>
                <Text fontWeight="bold">${calculateCartTotal()}</Text>
              </Flex>
              <Text fontSize="sm" color="gray.500" mb={4}>
                Shipping and taxes calculated at checkout
              </Text>
              <Button colorScheme="pink" w="100%" size="lg">
                Checkout
              </Button>
              <Button variant="ghost" w="100%" mt={2} onClick={onCartClose}>
                Continue Shopping
              </Button>
            </Box>
          )}
        </DrawerContent>
      </Drawer>

      {/* Wishlist Drawer */}
      <Drawer isOpen={isWishlistOpen} placement="right" onClose={onWishlistClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Your Wishlist ({wishlistItems.length} items)
          </DrawerHeader>
          <DrawerBody>
            {wishlistItems.length === 0 ? (
              <Center h="200px" flexDirection="column">
                <FiHeart size={50} color="#CBD5E0" />
                <Text mt={4} color="gray.500">Your wishlist is empty</Text>
                <Button mt={4} colorScheme="pink" variant="outline" onClick={onWishlistClose}>
                  Continue Shopping
                </Button>
              </Center>
            ) : (
              <VStack spacing={4} align="stretch" divider={<Divider />}>
                {wishlistItems.map((item) => (
                  <Flex key={item.id} align="center">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      boxSize="80px" 
                      objectFit="cover" 
                      borderRadius="md" 
                      mr={4}
                    />
                    <Box flex="1">
                      <Text fontWeight="medium">{item.name}</Text>
                      <Text color="gray.600" fontSize="sm">
                        {productCategories.find(cat => cat.id === item.categoryId)?.name}
                      </Text>
                      <Text fontWeight="bold" color="pink.600" mt={1}>
                        ${(item.discountPrice || item.price).toFixed(2)}
                      </Text>
                    </Box>
                    <Flex>
                      <Button
                        size="sm"
                        colorScheme="pink"
                        mr={2}
                        onClick={() => moveFromWishlistToCart(item)}
                      >
                        Add to Cart
                      </Button>
                      <IconButton
                        icon={<FiTrash2 />}
                        aria-label="Remove from wishlist"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromWishlist(item.id)}
                      />
                    </Flex>
                  </Flex>
                ))}
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Features Section */}
      <Box  bgGradient="linear(to-r, #6E741E, gray.100)"   py={16}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10}>
            <Center flexDirection="column" textAlign="center">
              <Box fontSize="3xl" color="pink.500" mb={3}>🌱</Box>
              <Text fontWeight="bold" mb={2}>Natural Ingredients</Text>
              <Text color="gray.600" fontSize="sm">
                Premium quality products made with certified organic ingredients
              </Text>
            </Center>
            <Center flexDirection="column" textAlign="center">
              <Box fontSize="3xl" color="pink.500" mb={3}>🔬</Box>
              <Text fontWeight="bold" mb={2}>Science-Backed Formulas</Text>
              <Text color="gray.600" fontSize="sm">
                Clinically tested formulations for proven results
              </Text>
            </Center>
            <Center flexDirection="column" textAlign="center">
              <Box fontSize="3xl" color="pink.500" mb={3}>🐰</Box>
              <Text fontWeight="bold" mb={2}>Cruelty-Free</Text>
              <Text color="gray.600" fontSize="sm">
                Never tested on animals, always vegan-friendly
              </Text>
            </Center>
            <Center flexDirection="column" textAlign="center">
              <Box fontSize="3xl" color="pink.500" mb={3}>🚚</Box>
              <Text fontWeight="bold" mb={2}>Free Shipping</Text>
              <Text color="gray.600" fontSize="sm">
                On all orders over $50 within the US
              </Text>
            </Center>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Newsletter Section */}
      <Box py={16} bg="white">
        <Container maxW="container.md" textAlign="center">
          <Heading size="lg" mb={4}>Join Our Beauty Community</Heading>
          <Text color="gray.600" mb={8}>
            Subscribe to our newsletter for exclusive offers, beauty tips, and new product announcements
          </Text>
          <Flex justify="center">
            <InputGroup maxW="md">
              <Input 
                placeholder="Your email address" 
                borderRadius="full" 
                bg="gray.50"
                borderRightRadius={0}
              />
              <InputRightElement width="auto">
                <Button 
                  colorScheme="pink" 
                  borderRadius="full" 
                  borderLeftRadius={0}
                  px={6}
                >
                  Subscribe
                </Button>
              </InputRightElement>
            </InputGroup>
          </Flex>
        </Container>
      </Box>

      {/* Footer */}
      <Box bg="gray.800" color="white" py={12}>
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={8}>
            <GridItem>
              <Heading size="md" mb={4} color="pink.400">GlowEssence</Heading>
              <Text color="gray.400" mb={4}>
                Premium beauty products for your natural glow. Cruelty-free, vegan, and made with love.
              </Text>
              <HStack spacing={4}>
                <IconButton aria-label="Facebook" icon={<Box>f</Box>} variant="ghost" color="gray.400" />
                <IconButton aria-label="Instagram" icon={<Box>ig</Box>} variant="ghost" color="gray.400" />
                <IconButton aria-label="Twitter" icon={<Box>t</Box>} variant="ghost" color="gray.400" />
              </HStack>
            </GridItem>
            <GridItem>
              <Heading size="sm" mb={4}>Shop</Heading>
              <VStack align="start" spacing={2}>
                {productCategories.slice(0, 4).map(category => (
                  <Button 
                    key={category.id} 
                    variant="link" 
                    color="gray.400" 
                    fontWeight="normal"
                    onClick={() => setSelectedCategory(category.id.toString())}
                  >
                    {category.name}
                  </Button>
                ))}
              </VStack>
            </GridItem>
            <GridItem>
              <Heading size="sm" mb={4}>Help</Heading>
              <VStack align="start" spacing={2}>
                <Button variant="link" color="gray.400" fontWeight="normal">Contact Us</Button>
                <Button variant="link" color="gray.400" fontWeight="normal">FAQs</Button>
                <Button variant="link" color="gray.400" fontWeight="normal">Shipping & Returns</Button>
                <Button variant="link" color="gray.400" fontWeight="normal">Privacy Policy</Button>
              </VStack>
            </GridItem>
            <GridItem>
              <Heading size="sm" mb={4}>Contact</Heading>
              <VStack align="start" spacing={2}>
                <Text color="gray.400">123 Beauty Street</Text>
                <Text color="gray.400">New York, NY 10001</Text>
                <Text color="gray.400">hello@glowessence.com</Text>
                <Text color="gray.400">(555) 123-4567</Text>
              </VStack>
            </GridItem>
          </Grid>
          <Divider my={8} borderColor="gray.700" />
          <Flex justify="space-between" align="center">
            <Text color="gray.400" fontSize="sm">
              © 2023 GlowEssence. All rights reserved.
            </Text>
            <HStack spacing={4}>
              <Image src="/api/placeholder/400/320" boxSize={8} />
              <Image src="/api/placeholder/400/320" boxSize={8} />
              <Image src="/api/placeholder/400/320" boxSize={8} />
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}
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
  FiChevronLeft,
  FiChevronDown
} from "react-icons/fi";

// Sample product data with real image URLs
const productCategories = [
  {
    id: 1,
    name: "Skincare",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
    featured: true
  },
  {
    id: 2,
    name: "Makeup",
    image: "https://images.unsplash.com/photo-1526758097130-bab247274f58?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
    featured: true
  },
  {
    id: 3,
    name: "Hair Care",
    image: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
    featured: false
  },
  {
    id: 4,
    name: "Body Care",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
    featured: true
  },
  {
    id: 5,
    name: "Fragrances",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
    featured: false
  },
  {
    id: 6,
    name: "Tools & Accessories",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
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
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
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
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
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
    image: "https://images.unsplash.com/photo-1608248543803-ba9f8a322e3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
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
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
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
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
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
    image: "https://images.unsplash.com/photo-1610998342124-c4fcba4cf4bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
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
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
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
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80",
    categoryId: 2,
    isNew: false,
    isBestseller: true,
    description: "Volumizing mascara for dramatic lashes.",
    tags: ["Volumizing", "Waterproof"]
  }
];

// Hero slider images with real URLs
const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400&q=80",
    alt: "Natural Beauty Products",
    heading: "Discover Your Natural Beauty",
    subtext: "Premium skincare and beauty products crafted with natural ingredients for a radiant you."
  },
  {
    src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400&q=80",
    alt: "Organic Skincare Collection",
    heading: "Pure & Organic Skincare",
    subtext: "Experience the power of nature with our organic skincare collection."
  },
  {
    src: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400&q=80",
    alt: "Seasonal Beauty Essentials",
    heading: "Spring Beauty Essentials",
    subtext: "Revitalize your routine with our new season collection of essential beauty products."
  }
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const { isOpen: isCartOpen, onOpen: onCartOpen, onClose: onCartClose } = useDisclosure();
  const { isOpen: isWishlistOpen, onOpen: onWishlistOpen, onClose: onWishlistClose } = useDisclosure();
  const { isOpen: isMobileMenuOpen, onOpen: onMobileMenuOpen, onClose: onMobileMenuClose } = useDisclosure();
  const toast = useToast();

  // Hero slider auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentHeroSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentHeroSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

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
              <Heading size="lg" color="#6E741E" letterSpacing="tight">
                Bright & Lustre
              </Heading>
            </Flex>

            <InputGroup maxW={{ base: "60%", md: "md" }} mx={{ base: 2, md: 4 }} display={{ base: "none", md: "block" }}>
              <Input 
                placeholder="Search for products..." 
                borderRadius="full"
                value={searchQuery}
                onChange={handleSearch}
                borderColor="#6E741E"
                _focus={{ borderColor: "#6E741E", boxShadow: "0 0 0 1px #6E741E" }}
              />
              <InputRightElement>
                <FiChevronRight color="#6E741E" />
              </InputRightElement>
            </InputGroup>

            <HStack spacing={4}>
              <IconButton
                aria-label="Search"
                icon={<FiChevronRight />}
                variant="ghost"
                display={{ base: "flex", md: "none" }}
                color="#6E741E"
              />
              <Box position="relative" display={{ base: "none", sm: "block" }}>
                <IconButton
                  aria-label="Wishlist"
                  icon={<FiHeart />}
                  variant="ghost"
                  onClick={onWishlistOpen}
                  color="#6E741E"
                />
                {wishlistItems.length > 0 && (
                  <Badge
                    position="absolute"
                    top="-6px"
                    right="-6px"
                    borderRadius="full"
                    bg="#6E741E"
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
                  color="#6E741E"
                />
                {cartItemCount > 0 && (
                  <Badge
                    position="absolute"
                    top="-6px"
                    right="-6px"
                    borderRadius="full"
                    bg="#6E741E"
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
                color="#6E741E"
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
                  colorScheme="whiteAlpha"
                  color="white"
                  mx={1}
                  fontWeight={selectedCategory === category.id.toString() ? "bold" : "normal"}
                  onClick={() => setSelectedCategory(category.id.toString())}
                  _hover={{ bg: "rgba(255,255,255,0.2)" }}
                >
                  {category.name}
                </Button>
              ))}
              <Button
                variant="ghost"
                colorScheme="whiteAlpha"
                color="white"
                mx={1}
                fontWeight={selectedCategory === "all" ? "bold" : "normal"}
                onClick={() => setSelectedCategory("all")}
                _hover={{ bg: "rgba(255,255,255,0.2)" }}
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
          <DrawerHeader color="#6E741E">Bright & Lustre</DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing={3}>
              <InputGroup>
                <Input 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={handleSearch}
                  borderColor="#6E741E"
                  _focus={{ borderColor: "#6E741E", boxShadow: "0 0 0 1px #6E741E" }}
                />
                <InputRightElement>
                  <FiChevronRight color="#6E741E" />
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
                  color="#6E741E"
                  _hover={{ bg: "rgba(110,116,30,0.1)" }}
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
                color="#6E741E"
                _hover={{ bg: "rgba(110,116,30,0.1)" }}
              >
                All Products
              </Button>
              
              <Divider />
              
              <Button 
                leftIcon={<FiHeart />} 
                variant="ghost" 
                justifyContent="flex-start" 
                onClick={() => {
                  onWishlistOpen();
                  onMobileMenuClose();
                }}
                color="#6E741E"
                _hover={{ bg: "rgba(110,116,30,0.1)" }}
              >
                Wishlist ({wishlistItems.length})
              </Button>
              
              <Button 
                leftIcon={<FiUser />} 
                variant="ghost" 
                justifyContent="flex-start"
                color="#6E741E"
                _hover={{ bg: "rgba(110,116,30,0.1)" }}
              >
                My Account
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Hero Slider Section */}
      <Box 
        position="relative"
        overflow="hidden"
        mb={10}
        height={{ base: "400px", md: "500px" }}
      >
        {/* Slider Images */}
        <Box 
          position="absolute"
          width="300%"
          height="100%"
          display="flex"
          transition="transform 0.5s ease-in-out"
          transform={`translateX(-${currentHeroSlide * 33.333}%)`}
        >
          {heroImages.map((image, index) => (
            <Box 
              key={index} 
              width="33.333%" 
              height="100%" 
              position="relative"
              bgImage={`url(${image.src})`}
              bgSize="cover"
              bgPosition="center"
            >
              <Box 
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                bgGradient="linear(to-r, rgba(110,116,30,0.8), rgba(0,0,0,0.3))"
              />
              
              <Container maxW="container.xl" h="100%">
                <Flex 
                  direction="column" 
                  justify="center" 
                  height="100%"
                  maxW={{ base: "100%", md: "50%" }}
                  color="white"
                  position="relative"
                  zIndex="1"
                  pl={{ base: 4, md: 0 }}
                >
                  <Heading 
                    as="h1" 
                    size="2xl" 
                    lineHeight="shorter" 
                    mb={4}
                  >
                    {image.heading}
                  </Heading>
                  <Text fontSize="xl" mb={8}>
                    {image.subtext}
                  </Text>
                  <HStack spacing={4}>
                    <Button bg="#6E741E" color="white" size="lg" rightIcon={<FiArrowRight />} _hover={{ bg: "#585D18" }}>
                      Shop Now
                    </Button>
                    <Button variant="outline" color="white" borderColor="white" size="lg" _hover={{ bg: "whiteAlpha.200" }}>
                      Learn More
                    </Button>
                  </HStack>
                </Flex>
              </Container>
            </Box>
          ))}
        </Box>
        
        {/* Navigation Arrows */}
        <IconButton
          icon={<FiChevronLeft size={24} />}
          position="absolute"
          left={4}
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          aria-label="Previous slide"
          onClick={prevSlide}
          rounded="full"
          bg="whiteAlpha.700"
          color="#6E741E"
          _hover={{ bg: "whiteAlpha.900" }}
        />
        
        <IconButton
          icon={<FiChevronRight size={24} />}
          position="absolute"
          right={4}
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          aria-label="Next slide"
          onClick={nextSlide}
          rounded="full"
          bg="whiteAlpha.700"
          color="#6E741E"
          _hover={{ bg: "whiteAlpha.900" }}
        />
        
        {/* Slide Indicators */}
        <HStack 
          spacing={2} 
          position="absolute" 
          bottom={4} 
          left="50%" 
          transform="translateX(-50%)"
          zIndex={2}
        >
          {heroImages.map((_, index) => (
            <Box 
              key={index}
              w={3}
              h={3}
              borderRadius="full"
              bg={currentHeroSlide === index ? "#6E741E" : "whiteAlpha.700"}
              cursor="pointer"
              onClick={() => setCurrentHeroSlide(index)}
            />
          ))}
        </HStack>
      </Box>

      {/* Featured Categories */}
      <Container maxW="container.xl" mb={16}>
        <Heading size="lg" mb={6} color="#6E741E">Shop by Category</Heading>
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
              borderColor="#6E741E"
              borderWidth="1px"
            >
              <Image src={category.image} alt={category.name} h="200px" w="100%" objectFit="cover" />
              <Center py={4}>
                <Text fontWeight="bold" fontSize="lg" color="#6E741E">{category.name}</Text>
              </Center>
            </Box>
          ))}
        </SimpleGrid>
      </Container>

      {/* Products Section */}
      <Container maxW="container.xl" mb={16}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="lg" color="#6E741E">
            {selectedCategory === "all" 
              ? "All Products" 
              : productCategories.find(cat => cat.id.toString() === selectedCategory)?.name || "Products"}
          </Heading>
          <HStack>
            <Button size="sm" variant="ghost" color="#6E741E">
              Latest
            </Button>
            <Button size="sm" variant="ghost" color="#6E741E">
              Best Sellers
            </Button>
            <Button size="sm" variant="ghost" color="#6E741E">
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
                borderColor="gray.200"
                borderWidth="1px"
              >
                {product.isNew && (
                  <Badge 
                    position="absolute" 
                    top={3} 
                    left={3} 
                    bg="#6E741E" 
                    color="white" 
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
                    bg="#6E741E" 
                    color="white" 
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
                    icon={wishlistItems.some(item => item.id === product.id) ? <FiHeart fill="#6E741E" /> : <FiHeart />}
                    position="absolute"
                    bottom={3}
                    right={3}
                    colorScheme="white"
                    bg="white"
                    color="#6E741E"
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
                      <FiStar fill="#6E741E" stroke="#6E741E" />
                      <Text ml={1} fontSize="sm">{product.rating}</Text>
                    </Flex>
                    <Text fontSize="sm" color="gray.500">({product.reviewCount} reviews)</Text>
                  </HStack>
                  <Flex align="center" justify="space-between" mt={2}>
                    <Box>
                      {product.discountPrice ? (
                        <Flex align="center">
                          <Text fontWeight="bold" fontSize="md" color="#6E741E">
                            ${product.discountPrice.toFixed(2)}
                          </Text>
                          <Text ml={2} fontSize="sm" textDecoration="line-through" color="gray.500">
                            ${product.price.toFixed(2)}
                          </Text>
                        </Flex>
                      ) : (
                        <Text fontWeight="bold" fontSize="md" color="#6E741E">
                          ${product.price.toFixed(2)}
                        </Text>
                      )}
                    </Box>
                    <Button 
                      size="sm" 
                      bg="#6E741E" 
                      color="white"
                      leftIcon={<FiShoppingBag size={14} />}
                      onClick={() => addToCart(product)}
                      _hover={{ bg: "#585D18" }}
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
              <Button bg="#6E741E" color="white" onClick={() => setSelectedCategory("all")} _hover={{ bg: "#585D18" }}>
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
          <DrawerHeader borderBottomWidth="1px" color="#6E741E">
            Your Shopping Cart ({cartItemCount} items)
          </DrawerHeader>
          <DrawerBody>
            {cartItems.length === 0 ? (
              <Center h="200px" flexDirection="column">
                <FiShoppingCart size={50} color="#6E741E" />
                <Text mt={4} color="gray.500">Your cart is empty</Text>
                <Button mt={4} bg="#6E741E" color="white" onClick={onCartClose} _hover={{ bg: "#585D18" }}>
                  Continue Shopping
                </Button>
              </Center>
            ) : (
              <VStack spacing={4} align="stretch">
                {cartItems.map((item) => (
                  <Box key={item.id} borderBottomWidth="1px" pb={4}>
                    <Flex justify="space-between" align="center">
                      <Flex>
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          w="80px" 
                          h="80px" 
                          objectFit="cover" 
                          borderRadius="md"
                          mr={3}
                        />
                        <Box>
                          <Text fontWeight="medium">{item.name}</Text>
                          <Text color="gray.500" fontSize="sm">
                            {productCategories.find(cat => cat.id === item.categoryId)?.name}
                          </Text>
                          <Text fontWeight="bold" color="#6E741E">
                            ${(item.discountPrice || item.price).toFixed(2)}
                          </Text>
                        </Box>
                      </Flex>
                      <IconButton
                        icon={<FiTrash2 />}
                        variant="ghost"
                        colorScheme="red"
                        aria-label="Remove item"
                        onClick={() => removeFromCart(item.id)}
                      />
                    </Flex>
                    <Flex justify="space-between" align="center" mt={2}>
                      <HStack spacing={2}>
                        <IconButton
                          icon={<FiMinus />}
                          size="sm"
                          aria-label="Decrease quantity"
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        />
                        <Text>{item.quantity}</Text>
                        <IconButton
                          icon={<FiPlus />}
                          size="sm"
                          aria-label="Increase quantity"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        />
                      </HStack>
                      <Text fontWeight="bold">
                        ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                      </Text>
                    </Flex>
                  </Box>
                ))}
                <Divider />
                <Flex justify="space-between" fontWeight="bold" fontSize="lg">
                  <Text>Total:</Text>
                  <Text>${calculateCartTotal()}</Text>
                </Flex>
                <Button 
                  bg="#6E741E" 
                  color="white" 
                  size="lg" 
                  mt={4}
                  rightIcon={<FiArrowRight />}
                  _hover={{ bg: "#585D18" }}
                >
                  Proceed to Checkout
                </Button>
                <Button 
                  variant="outline" 
                  color="#6E741E" 
                  borderColor="#6E741E" 
                  size="lg" 
                  onClick={onCartClose}
                >
                  Continue Shopping
                </Button>
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Wishlist Drawer */}
      <Drawer isOpen={isWishlistOpen} placement="right" onClose={onWishlistClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" color="#6E741E">
            Your Wishlist ({wishlistItems.length} items)
          </DrawerHeader>
          <DrawerBody>
          {wishlistItems.length === 0 ? (
              <Center h="200px" flexDirection="column">
                <FiHeart size={50} color="#6E741E" />
                <Text mt={4} color="gray.500">Your wishlist is empty</Text>
                <Button mt={4} bg="#6E741E" color="white" onClick={onWishlistClose} _hover={{ bg: "#585D18" }}>
                  Browse Products
                </Button>
              </Center>
            ) : (
              <VStack spacing={4} align="stretch">
                {wishlistItems.map((item) => (
                  <Box key={item.id} borderBottomWidth="1px" pb={4}>
                    <Flex justify="space-between" align="center">
                      <Flex>
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          w="80px" 
                          h="80px" 
                          objectFit="cover" 
                          borderRadius="md"
                          mr={3}
                        />
                        <Box>
                          <Text fontWeight="medium">{item.name}</Text>
                          <Text color="gray.500" fontSize="sm">
                            {productCategories.find(cat => cat.id === item.categoryId)?.name}
                          </Text>
                          <Text fontWeight="bold" color="#6E741E">
                            ${(item.discountPrice || item.price).toFixed(2)}
                          </Text>
                        </Box>
                      </Flex>
                      <IconButton
                        icon={<FiTrash2 />}
                        variant="ghost"
                        colorScheme="red"
                        aria-label="Remove item"
                        onClick={() => removeFromWishlist(item.id)}
                      />
                    </Flex>
                    <Flex justify="flex-end" mt={2}>
                      <Button 
                        size="sm" 
                        bg="#6E741E" 
                        color="white"
                        leftIcon={<FiShoppingBag size={14} />}
                        onClick={() => moveFromWishlistToCart(item)}
                        _hover={{ bg: "#585D18" }}
                      >
                        Add to Cart
                      </Button>
                    </Flex>
                  </Box>
                ))}
                <Divider />
                <Button 
                  bg="#6E741E" 
                  color="white" 
                  size="lg" 
                  mt={4}
                  rightIcon={<FiArrowRight />}
                  onClick={() => {
                    onWishlistClose();
                    onCartOpen();
                  }}
                  _hover={{ bg: "#585D18" }}
                >
                  View Cart
                </Button>
                <Button 
                  variant="outline" 
                  color="#6E741E" 
                  borderColor="#6E741E" 
                  size="lg" 
                  onClick={onWishlistClose}
                >
                  Continue Shopping
                </Button>
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Footer */}
      <Box bg="#6E741E" color="white" py={10}>
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={8}>
            <GridItem>
              <Heading size="md" mb={4}>Bright & Lustre</Heading>
              <Text mb={4}>Premium beauty products for your natural glow.</Text>
              <HStack spacing={4}>
                <IconButton aria-label="Facebook" icon={<FiUser />} variant="ghost" color="white" />
                <IconButton aria-label="Instagram" icon={<FiUser />} variant="ghost" color="white" />
                <IconButton aria-label="Twitter" icon={<FiUser />} variant="ghost" color="white" />
              </HStack>
            </GridItem>
            <GridItem>
              <Heading size="md" mb={4}>Shop</Heading>
              <VStack align="start" spacing={2}>
                {productCategories.slice(0, 4).map((category) => (
                  <Button 
                    key={category.id} 
                    variant="link" 
                    color="white" 
                    fontWeight="normal"
                    onClick={() => {
                      setSelectedCategory(category.id.toString());
                      window.scrollTo(0, 0);
                    }}
                  >
                    {category.name}
                  </Button>
                ))}
              </VStack>
            </GridItem>
            <GridItem>
              <Heading size="md" mb={4}>Customer Service</Heading>
              <VStack align="start" spacing={2}>
                <Button variant="link" color="white" fontWeight="normal">Contact Us</Button>
                <Button variant="link" color="white" fontWeight="normal">FAQs</Button>
                <Button variant="link" color="white" fontWeight="normal">Shipping & Returns</Button>
                <Button variant="link" color="white" fontWeight="normal">Privacy Policy</Button>
              </VStack>
            </GridItem>
            <GridItem>
              <Heading size="md" mb={4}>Newsletter</Heading>
              <Text mb={4}>Subscribe to get updates on new arrivals and special offers.</Text>
              <InputGroup>
                <Input 
                  placeholder="Your email address" 
                  bg="white" 
                  color="gray.800"
                  _placeholder={{ color: "gray.500" }}
                />
                <InputRightElement>
                  <IconButton 
                    aria-label="Subscribe" 
                    icon={<FiArrowRight />} 
                    bg="#6E741E" 
                    color="white"
                    _hover={{ bg: "#585D18" }}
                  />
                </InputRightElement>
              </InputGroup>
            </GridItem>
          </Grid>
          <Divider my={6} borderColor="whiteAlpha.400" />
          <Text textAlign="center" fontSize="sm">
            © {new Date().getFullYear()} Bright & Lustre. All rights reserved.
          </Text>
        </Container>
      </Box>
    </Box>
  );
}
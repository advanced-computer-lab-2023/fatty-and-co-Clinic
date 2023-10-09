import React from "react";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
  Select,
} from "@chakra-ui/react";
// Assets
import signInImage from "assets/img/signInImage.png";

function UpdateHourlyRate() {
  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  return (
    <Flex position='relative' mb='40px'>
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w='100%'
        maxW='1044px'
        mx='auto'
        justifyContent='space-between'
        mb='30px'
        pt={{ sm: "100px", md: "0px" }}>
        <Flex
          alignItems='center'
          justifyContent='start'
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}>
          <Flex
            direction='column'
            w='100%'
            background='transparent'
            p='48px'
            mt={{ md: "150px", lg: "80px" }}>
            <Heading color={titleColor} fontSize='32px' mb='10px'>
              Change Hourly Rate
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              color={textColor}
              fontWeight='bold'
              fontSize='14px'>
                Fill in the below form to change your hourly rate!
            </Text>
            <FormControl>
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Old hourly rate
              </FormLabel>
              <Input
                borderRadius='15px'
                mb='24px'
                fontSize='sm'
                type='number'
                size='lg'
                backgroundColor="white"

              />
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                New hourly rate
              </FormLabel>
              <Select >
               <option value>1</option>
               <option value>2</option>
               <option value>3</option>
               <option value>4</option>
               <option value>5</option>
               <option value>6</option>
               <option value>7</option>
               <option value>8</option>
               <option value>9</option>
               <option value>10</option>
               <option value>11</option>
               <option value>12</option>
               <option value>13</option>
               <option value>14</option>
               <option value>15</option>
               <option value>16</option>
               <option value>17</option>
               <option value>18</option>
               <option value>19</option>
               <option value>20</option>
               <option value>21</option>
               <option value>22</option>
               <option value>23</option>
               <option value>24</option>
               <option value>25</option>
               <option value>26</option>
               <option value>27</option>
               <option value>28</option>
               <option value>29</option>
               <option value>30</option>
               <option value>31</option>
               <option value>32</option>
               <option value>33</option>
               <option value>34</option>
               <option value>35</option>
               <option value>36</option>
               <option value>37</option>
               <option value>38</option>
               <option value>39</option>
               <option value>40</option>
               <option value>41</option>
               <option value>42</option>
               <option value>43</option>
               <option value>44</option>
               <option value>45</option>
               <option value>46</option>
               <option value>47</option>
               <option value>48</option>
               <option value>49</option>
               <option value>50</option>
               <option value>51</option>
               <option value>52</option>
               <option value>53</option>
               <option value>54</option>
               <option value>55</option>
               <option value>56</option>
               <option value>57</option>
               <option value>58</option>
               <option value>59</option>
               <option value>60</option>
               <option value>61</option>
               <option value>62</option>
               <option value>63</option>
               <option value>64</option>
               <option value>65</option>
               <option value>66</option>
               <option value>67</option>
               <option value>68</option>
               <option value>69</option>
               <option value>70</option>
               <option value>71</option>
               <option value>72</option>
               <option value>73</option>
               <option value>74</option>
               <option value>75</option>
               <option value>76</option>
               <option value>77</option>
               <option value>78</option>
               <option value>79</option>
               <option value>80</option>
               <option value>81</option>
               <option value>82</option>
               <option value>83</option>
               <option value>84</option>
               <option value>84</option>
               <option value>86</option>
               <option value>87</option>
               <option value>88</option>
               <option value>89</option>
               <option value>90</option>
               <option value>91</option>
               <option value>92</option>
               <option value>93</option>
               <option value>94</option>
               <option value>95</option>
               <option value>96</option>
               <option value>97</option>
               <option value>98</option>
               <option value>99</option>
               <option value>100</option>
              </Select>
              {/* <Input
                borderRadius='15px'
                mb='36px'
                fontSize='sm'
                type='number'
                placeholder='Select new hourly rate'
                // value="999999"
                step="1"
                
              /> */}

              <Button
                fontSize='20px'
                type='submit'
                bg='teal.300'
                w='100%'
                h='45'
                mb='20px'
                color='white'
                mt='20px'
                _hover={{
                  bg: "teal.200",
                }}
                _active={{
                  bg: "teal.400",
                }}>
                Save
              </Button>
            </FormControl>
            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              maxW='100%'
              mt='0px'>
            </Flex>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          // overflowX='hidden'
          h='100%'
          w='40vw'
          position='relative'
          margin-top='auto'
          margin-right="30px"
          margin-bottom='auto'
          
          >
          <Box
            bgImage={signInImage}
            w='100%'
            h='100%'
            bgSize='cover'
            bgPosition='50%'
            position='absolute'
            borderBottomLeftRadius='20px'></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default UpdateHourlyRate;

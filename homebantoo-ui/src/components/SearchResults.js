import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Heading, Image, Text, UnorderedList, ListItem, Center } from '@chakra-ui/react';

const SearchResults = () => {
  const location = useLocation();
  const results = location.state?.results;

  if (!results) {
    // Handle the case when results are undefined
    return <p>No results found</p>;
  }

  return (
    <Box p={4}>
      <Heading as="h1" mb={4} fontFamily="Ubuntu">
        Search Results
      </Heading>
      <UnorderedList listStyleType="none" p={0}>
        {results.map((result) => (
          <ListItem key={result.id} mb={8} p={4} borderBottom="1px" borderColor="gray.200">
            <Center>
              {result.image && <Image src={result.image} alt={result.title} maxW="200px" mb={4} />}
            </Center>
            <Text fontFamily="Ubuntu" fontSize="xl" fontWeight="bold">
              Title: {result.title}
            </Text>
            <Text>Likes: {result.likes}</Text>
            <Text>Missed Ingredient Count: {result.missedIngredientCount}</Text>
            <Box>
              <Text as="h3" fontFamily="Ubuntu" fontSize="lg" fontWeight="bold" mb={2}>
                Missed Ingredients:
              </Text>
              <UnorderedList>
                {result.missedIngredients &&
                  result.missedIngredients.map((ingredient) => (
                    <ListItem key={ingredient.id}>{ingredient.name}</ListItem>
                  ))}
              </UnorderedList>
            </Box>
            <Box>
              <Text as="h3" fontFamily="Ubuntu" fontSize="lg" fontWeight="bold" mb={2}>
                Used Ingredients:
              </Text>
              <UnorderedList>
                {result.usedIngredients &&
                  result.usedIngredients.map((ingredient) => (
                    <ListItem key={ingredient.id}>{ingredient.name}</ListItem>
                  ))}
              </UnorderedList>
            </Box>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default SearchResults;

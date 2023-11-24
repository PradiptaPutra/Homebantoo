import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Heading, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=5&apiKey=f74cd035d91a4a079f88b50e5e0716aa`
      );
  
      // Check if response.data is an array
      if (!Array.isArray(response.data.results)) {
        console.error('Invalid response format. Expected an array.');
        return;
      }
  
      // For each recipe in the search results, fetch detailed information
      const detailedResults = await Promise.all(
        response.data.results.map(async (recipe) => {
          try {
            const detailedResponse = await axios.get(
              `https://api.spoonacular.com/recipes/${recipe.id}/information?includeNutrition=false&apiKey=f74cd035d91a4a079f88b50e5e0716aa`
            );
            return detailedResponse.data;
          } catch (detailError) {
            console.error(`Error fetching details for recipe ${recipe.id}:`, detailError);
            // Handle the error for this specific recipe fetch
            return null; // or handle the error in a way that suits your needs
          }
        })
      );
  
      // Filter out recipes with null values (those that had an error during fetch)
      const validResults = detailedResults.filter((result) => result !== null);
  
      setSearchResults(validResults);
      navigate('/search-results', { state: { results: validResults } });
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
  };
  
  

  const handleInventorySearch = async () => {
    try {
      const response = await axios.get(`/api/search-recipes?query=${searchQuery}`);
      setSearchResults(response.data);
      navigate('/search-results', { state: { results: response.data } });
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
  };

  return (
    <Box>
      <Heading as="h1" size="xl" mb={4}>
        Welcome to Homebantoo!
      </Heading>
      <Box>
        <Input
          type="text"
          placeholder="Search for food items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          width="300px" // Sesuaikan lebar input sesuai kebutuhan
          mr={2}
        />
        <Button colorScheme="teal" onClick={() => handleSearch(searchQuery)} mr={2} color="white">
          Search Recipes
        </Button>

        <Button colorScheme="teal" onClick={handleInventorySearch} ml={2} color="white">
          Search by Inventory
        </Button>
      </Box>
    </Box>
  );
};

export default Home;

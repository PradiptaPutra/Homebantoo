import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, Spinner } from '@chakra-ui/react';

const InventoryList = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await axios.get('/api/inventory');
        setInventoryItems(response.data.reverse()); // Reverse the order of items
      } catch (error) {
        console.error('Error fetching inventory items:', error);
        setError('Error fetching inventory items. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryItems();
  }, []);

  const handleDeleteItem = async (itemId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');

    if (confirmDelete) {
      try {
        await axios.delete(`/api/inventory/${itemId}`);
        const response = await axios.get('/api/inventory');
        setInventoryItems(response.data.reverse()); // Reverse the order of items
      } catch (error) {
        console.error('Error deleting inventory item:', error);
        setError('Error deleting inventory item. Please try again.');
      }
    }
  };

  const handleUpdateItem = async (itemId, newName) => {
    try {
      await axios.put(`/api/inventory/${itemId}`, { name: newName });
      const response = await axios.get('/api/inventory');
      setInventoryItems(response.data.reverse()); // Reverse the order of items
    } catch (error) {
      console.error('Error updating inventory item:', error);
      setError('Error updating inventory item. Please try again.');
    }
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return <Box color="red">{error}</Box>;
  }

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>
        Inventory List
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Quantity</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {inventoryItems.map((item) => (
            <Tr key={item._id}>
              <Td>{item.name}</Td>
              <Td>{item.quantity}</Td>
              <Td>
                <Button colorScheme="red" size="sm" onClick={() => handleDeleteItem(item._id)}>
                  Delete
                </Button>{' '}
                <Button
                  colorScheme="teal"
                  size="sm"
                  onClick={() => {
                    const newName = prompt('Enter the new name:');
                    if (newName) {
                      handleUpdateItem(item._id, newName);
                    }
                  }}
                >
                  Update
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default InventoryList;

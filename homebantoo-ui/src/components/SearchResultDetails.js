import React, { useEffect } from 'react';

const SearchResultDetails = ({ results }) => {
  useEffect(() => {
    console.log('Raw API Response:', results); // Log raw API response

    // Process the data as needed
    const processedResults = results.map((recipe) => (
      <div key={recipe.id}>
        <h3>{recipe.title}</h3>
        <img src={recipe.image} alt={recipe.title} />
        <h4>Ingredients:</h4>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.amount.metric.value} {ingredient.amount.metric.unit} {ingredient.name}
            </li>
          ))}
        </ul>
      </div>
    ));

    // Log the processed data
    console.log('Processed Data:', processedResults);
  }, [results]);

  return (
    <div>
      {/* Display the processed data if needed */}
      {results.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <img src={recipe.image} alt={recipe.title} />
          <h4>Ingredients:</h4>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.amount.metric.value} {ingredient.amount.metric.unit} {ingredient.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SearchResultDetails;

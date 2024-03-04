import { useState } from "react";

import Navigation from "./Navigation/Nav";
import Products from "./Products/Products";
import products from "./db/data";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import Card from "./components/Card";
import "./index.css";

function App() {

  // so it's creating a selectedCategory variable by state method that it can be used in future to change the state of the Category 
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ----------- Input Filter -----------
  // query is the search bar input variable so the state method will be used to itrate over it and in future when the query changes the items will be filtered according to the query change 
  const [query, setQuery] = useState("");

  //handleInputChange is function that handle's the change in query and setQuery as per event.target.value like change in value of input field
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // so the function filteredItems go and filter the proeducts, that we already imported from our data.jsx file and it itrates over
  //products and create a new array which is filtered by it's condition and the condition is to convert product title and query(input search of user)
  // and converet it into the lower case and see if the indexOf is not euqal to -1
  const filteredItems = products.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // ----------- Radio Filtering -----------
  // it handles the category section 
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // ------------ Button Filtering -----------
  //it's for recommended section
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  
  function filteredData(products, selected, query) {
  //intializing the products array into the filteredProducts
    let filteredProducts = products;

    // Filtering Input Items
    if (query) {
      //If there is a non-empty query, it reassigns filteredProducts to the filteredItems array.
      filteredProducts = filteredItems;
    }

    // Applying selected filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selected ||
          color === selected ||
          company === selected ||
          newPrice === selected ||
          title === selected
      );
    }

    return filteredProducts.map(
      
      //maping into the products to itrate and perform some changes
      // some card props to handle card component
      ({ img, title, star, reviews, prevPrice, newPrice }) => (
        <Card
          key={Math.random()}
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
        />
      )
    );
  }

  const result = filteredData(products, selectedCategory, query);

  return (
    //so here we sending the handleChange , handleInputChange , handleClick function as props (Properties) that we can use it in giving components
    <>
      <Sidebar handleChange={handleChange} />
      <Navigation query={query} handleInputChange={handleInputChange} />
      <Recommended handleClick={handleClick} />
      <Products result={result} />
    </>
  );
}

export default App;
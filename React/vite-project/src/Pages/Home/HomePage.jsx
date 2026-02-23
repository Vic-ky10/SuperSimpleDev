import axios from "axios";
import { Header } from "../../components/Header";
import "./homePage.css";
import  ProductsGrid  from "./ProductsGrid";
import { useEffect, useState } from "react";

function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {                 
            // useEffect = let us control when some code runs
   
    const getHomeDate = async () =>{
            const response = await axios.get("http://localhost:3000/api/products") // axios is the cleaner way to make request to the backend
     setProducts(response.data)
    }
    getHomeDate()
  
  }, []);

  return (
    <>
      <title>Ecommerce Project </title>
      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}

export default HomePage;

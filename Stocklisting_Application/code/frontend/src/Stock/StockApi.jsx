
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StockApi.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const StockApi = () => {
    const [country, setCountry] = useState('');
    const [stockData, setStockData] = useState(null);
    //const[stock, setStock] = useState(null);
    const navigate = useNavigate();
    useEffect(()=> {
        console.log('Stock data changed:', stockData);
    }, [stockData]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!country){
          alert('please fill all fields');
          return;
        }

        try {
            const response = await axios.get(`http://ec2-54-153-187-40.ap-southeast-2.compute.amazonaws.com:8087/api/v1.0/stock/stocks/${country}`, {
            
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            console.log(response.data)
            // Handle the API response
            //console.log(response.data.data);
            setStockData(response.data.data);
            //console.log(stockData);
        } catch (error) {
            // Han]dle the error
            console.error(error);
        }
    };

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };

   /* const addToWishlist = (stock)=>{
        console.log('Added to wishlist', stock);
    }*/
    const addToWishlist = async (stock) => {
      //setStock(stock1);
      try {
          const response = await axios.post(
              `http://ec2-54-153-187-40.ap-southeast-2.compute.amazonaws.com:8089/api/v1.0/wishlist/add/${localStorage.getItem("userName")}`,
              {
                      symbol: stock.symbol,
                      name: stock.name,
                      currency: stock.currency,
                      exchange: stock.exchange,
                      mic_code: stock.mic_code,
                      country: stock.country,
                      type: stock.type
              },
              {
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                      'Content-Type': 'application/json',
                  },
              }
          );

          console.log('Added to Wishlist:', response.data);
          toast.success("successfully stock added");
          setTimeout(()=>{
          navigate('/wishlist');
        }, 2000);
          //navigate('/wishlist');
          //setWishlist((prevWishlist) => [...prevWishlist, stock]);
      } catch (error) {
          console.error('Error adding to Wishlist:', error);
          toast.error("Cannot add stock");
      }
  };
    return (
        <div>
            <h2>Search for stocks</h2>
            <br/>
            <form onSubmit={handleSubmit}>
                <label>
                    Country: &nbsp;
                    <input type="text" value={country} onChange={handleCountryChange} />
                </label>
                <button  className='search' type="submit">Search</button>
                
            </form>
            <br/>
            <br/>

            {stockData && stockData.length > 0 && (
                <Row xs={1} md={4} className="g-4">
                {stockData.slice(0, 21).map((stock, index) => (
                  <Col key={index}>
                    <Card>
                      <Card.Body>
                        <Card.Title>Stocks</Card.Title>
                        <Card.Text>
                              <p className="card-text">symbol:{stock.symbol}</p>
                              <p className="card-text">name:   {stock.name}</p>
                              <p className="card-text">currency: {stock.currency}</p>
                              <p className="card-text">exchange: {stock.exchange}</p>
                              <p className="card-text">mic_code: {stock.mic_code}</p>
                              <p className="card-text">country: {stock.country}</p>
                              
                              <Button onClick={() => addToWishlist(stock)}>Add to Wishlist</Button>
                          
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
                
                   
            )}
            <ToastContainer/>
        </div>
    );
};
export default StockApi;

/*

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function GridExample() {
  return (
    <Row xs={1} md={2} className="g-4">
      {stockData.slice({ 0, 21 }).map((_stock, index) => (
        <Col key={index}>
          <Card>
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                    <h3 className="card-text">symbol:{stock.symbol}</p>
                    <p className="card-text">name:   {stock.name}</p>
                    <p className="card-text">currency: {stock.currency}</p>
                    <p className="card-text">exchange: {stock.exchange}</p>
                    <p className="card-text">micCode: {stock.micCode}</p>
                    <p className="card-text">country: {stock.country}</p>
                    
                    <button className="btn btn-primary" onClick={() => addToWishlist(stock.symbol)}>Add to Wishlist</button>
                
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default GridExample;*/
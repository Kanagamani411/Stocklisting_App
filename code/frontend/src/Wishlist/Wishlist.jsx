import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Wishlist.css';
import { ToastContainer, toast } from 'react-toastify';

const Wishlist = () => {
    const [wishlistData, setWishlistData] = useState([]);
    console.log(localStorage.getItem("token"));
    console.log(localStorage.getItem("userName"));

    useEffect(() => {
        // Fetch wishlist data using an API call
        const fetchWishlistData = async () => {
            try {
                const response = await axios.get(
                    `http://ec2-54-153-187-40.ap-southeast-2.compute.amazonaws.com:8089/api/v1.0/wishlist/get/${localStorage.getItem("userName")}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setWishlistData(response.data);
                console.log(wishlistData);
            } catch (error) {
                console.error('Error fetching wishlist data:', error);
            }
        };

        fetchWishlistData();
    }, []);

    // Function to handle stock deletion
    const deleteFromWishlist = async (stock) => {
        try {
            const response = await axios.delete(
                `http://ec2-54-153-187-40.ap-southeast-2.compute.amazonaws.com:8089/api/v1.0/wishlist/remove/${localStorage.getItem("userName")}`,
                {
                    data: stock,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
  
            console.log('deleted  Wishlist:', response.data);
            //navigate('/wishlist');
            //setWishlist((prevWishlist) => [...prevWishlist, stock]);
            setWishlistData((prevData) => prevData.filter((s)=>s.name !== stock.name));
            toast.success("stock successfully deleted");
        } catch (error) {
            console.error('Error deleting to Wishlist:', error);
            toast.error("deletion failed");
        }
    };

      return (
        <div>
            <h2>Wishlist</h2>
            {wishlistData && wishlistData.length > 0 && (
              <Row xs={1} md={4} className="g-4">
            {wishlistData.map((stock, index) => (
              <Col className='col-design' key={index}>
              <Card className='card-design'>
                <Card.Body>
                  <Card.Title>Stocks</Card.Title>
                  <Card.Text>
                        <p className="card-text">symbol:{stock.symbol}</p>
                        <p className="card-text">name:   {stock.name}</p>
                        <p className="card-text">currency: {stock.currency}</p>
                        <p className="card-text">exchange: {stock.exchange}</p>
                        <p className="card-text">mic_code: {stock.mic_code}</p>
                        <p className="card-text">country: {stock.country}</p>
                        <Button onClick={() => deleteFromWishlist(stock)}>Delete</Button>
                    
                    
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

export default Wishlist;
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to Artemere</h1>
            <p>Create and Breed Digital Art</p>
            <div>
                <Link to="/artist">Artist Dashboard</Link>
                <Link to="/breeder">Breeder Dashboard</Link>
            </div>
        </div>
    );
};

export default Home;

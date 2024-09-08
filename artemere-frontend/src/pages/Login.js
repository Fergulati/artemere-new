import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ethers } from 'ethers';

const Login = () => {
    // State for email/password (Web2 login)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Web3 (MetaMask) State
    const [account, setAccount] = useState(null);

    // Handle Web2 Login (Email/Password)
    const handleWeb2Login = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            const token = response.data.token;
            localStorage.setItem('token', token); // Store the JWT in local storage
            alert('Login successful!');
        } catch (error) {
            console.error(error);
            alert('Web2 Login failed!');
        }
    };

    // Handle Web3 Login (MetaMask)
    const handleWeb3Login = async () => {
        if (!window.ethereum) {
            alert('MetaMask is not installed. Please install it to login using Web3.');
            return;
        }
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', []); // Request MetaMask account access

            const signer = provider.getSigner();
            const userAddress = await signer.getAddress();
            setAccount(userAddress); // Save the wallet address

            // Generate a nonce or message from backend to sign (not secure to use static message)
            const message = 'Please sign this message to authenticate with Artemere.';
            const signature = await signer.signMessage(message);

            // Send the signature to the backend for verification
            const response = await axios.post('/api/auth/web3-login', {
                address: userAddress,
                signature,
            });

            const token = response.data.token;
            localStorage.setItem('token', token); // Store the JWT in local storage
            alert('Web3 Login successful!');
        } catch (error) {
            console.error(error);
            alert('Web3 Login failed!');
        }
    };

    return (
        <LoginContainer>
            <h2>Login</h2>

            {/* Web2 Login Form */}
            <LoginForm onSubmit={handleWeb2Login}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login (Web2)</button>
            </LoginForm>

            <Separator>or</Separator>

            {/* Web3 Login */}
            <Web3LoginContainer>
                <button onClick={handleWeb3Login}>
                    {account ? `Connected: ${account}` : 'Login with MetaMask (Web3)'}
                </button>
            </Web3LoginContainer>
        </LoginContainer>
    );
};
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f9f9f9;
  height: 100vh;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 1rem;

  input {
    padding: 0.75rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  button {
    padding: 0.75rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const Web3LoginContainer = styled.div`
  margin-top: 2rem;
  button {
    padding: 0.75rem;
    background-color: #f6851b;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #e2761b;
    }
  }
`;

const Separator = styled.div`
  margin: 2rem 0;
  font-size: 1.2rem;
`;

export default Login;

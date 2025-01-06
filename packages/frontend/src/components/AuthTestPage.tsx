'use client'
import React, { useState } from 'react';
import ApiClient  from '../api/ApiClient'; // Adjust the import path
import { SignInResponse, UserDTO , APIException } from '../../../shared/front'; // Adjust the import path // Adjust the import path

const AuthTestPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [signInResult, setSignInResult] = useState<SignInResponse | null>(null);
  const [signUpResult, setSignUpResult] = useState<UserDTO | null>(null);
  const [currentUser, setCurrentUser] = useState<UserDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setError(null);
    try {
      const result = await ApiClient.Auth.signIn(email, password);
      setSignInResult(result);
      setToken(result.token); // Assuming token is part of SignInResponse
    } catch (err) {
      if (err instanceof APIException) {
        setError(`Error ${err.status}: ${err.message}`);
      } else {
        setError('An unexpected error occurred during sign-in.');
      }
    }
  };

  const handleSignUp = async () => {
    setError(null);
    try {
      const result = await ApiClient.Auth.signUp(name, email, password);
      setSignUpResult(result);
    } catch (err) {
      if (err instanceof APIException) {
        setError(`Error ${err.status}: ${err.message}`);
      } else {
        setError('An unexpected error occurred during sign-up.');
      }
    }
  };

  const handleGetMe = async () => {
    setError(null);
    try {
      const result = await ApiClient.User.getMe(token);
      setCurrentUser(result);
    } catch (err) {
      if (err instanceof APIException) {
        setError(`Error ${err.status}: ${err.message}`);
      } else {
        setError('Failed to fetch current user data.');
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
  <h2>Auth Test Page</h2>

  {/* Sign Up Section */}
  <h3>Sign Up</h3>
  <input
  type="text"
  placeholder="Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
  />
  <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
  />
  <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
  />
  <button onClick={handleSignUp} style={{ padding: '10px' }}>Sign Up</button>

  {/* Sign In Section */}
  <h3>Sign In</h3>
  <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
  />
  <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
  />
  <button onClick={handleSignIn} style={{ padding: '10px' }}>Sign In</button>

  {/* Get Current User Section */}
  <h3>Get Current User</h3>
  <input
  type="text"
  placeholder="Token"
  value={token}
  onChange={(e) => setToken(e.target.value)}
  style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
  />
  <button onClick={handleGetMe} style={{ padding: '10px' }}>Get Current User</button>

  {/* Error Display */}
  {error && <p style={{ color: 'red' }}>{error}</p>}

    {/* Display Results */}
    {signInResult && (
      <div style={{ marginTop: '20px' }}>
      <h3>Sign In Result</h3>
    <pre>{JSON.stringify(signInResult, null, 2)}</pre>
    </div>
    )}

    {signUpResult && (
      <div style={{ marginTop: '20px' }}>
      <h3>Sign Up Result</h3>
    <pre>{JSON.stringify(signUpResult, null, 2)}</pre>
    </div>
    )}

    {currentUser && (
      <div style={{ marginTop: '20px' }}>
      <h3>Current User</h3>
    <pre>{JSON.stringify(currentUser, null, 2)}</pre>
    </div>
    )}
    </div>
  );
  };

  export default AuthTestPage;

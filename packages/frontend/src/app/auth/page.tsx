// src/pages/AuthTestPage.tsx
import React, { useState } from 'react';
import { Auth } from '../path-to-your-auth-class'; // Adjust import path
import { SignInResponse, UserDTO } from '../path-to-your-dtos'; // Adjust import path

const AuthTestPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInResult, setSignInResult] = useState<SignInResponse | null>(null);
  const [signUpResult, setSignUpResult] = useState<UserDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setError(null);
    try {
      const result = await Auth.signIn(email, password);
      setSignInResult(result);
    } catch (err) {
      setError('Sign In Failed. Please check your credentials.');
    }
  };

  const handleSignUp = async () => {
    setError(null);
    try {
      const result = await Auth.signUp(email, password);
      setSignUpResult(result);
    } catch (err) {
      setError('Sign Up Failed. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Auth Test Page</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }}
      />
      <button onClick={handleSignIn} style={{ marginRight: '10px' }}>Sign In</button>
      <button onClick={handleSignUp}>Sign Up</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

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
    </div>
  );
};

export default AuthTestPage;

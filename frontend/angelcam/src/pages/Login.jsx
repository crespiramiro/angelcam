import { useState } from "react";

const Login = ({ onLogin }) => {
  const [token, setToken] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('authToken', token); 
    onLogin(token); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen px-12 bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <div className="mb-4">
         
          <input
            type="text"
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
            placeholder="Please enter your Personal Access Token"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
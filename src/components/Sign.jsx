import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../axiosConfig';

function SignInSignUp() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ lexusId: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/contacts');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const endpoint = isSignUp ? '/auth/register' : '/auth/login';
      const response = await axios.post(endpoint, formData);

      if (isSignUp) {
        setMessage('Signup successful! Please login to continue.');
        setIsSignUp(false);
        setFormData({ lexusId: '', email: '', password: '' });
      } else {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('lexusId', response.data.lexusId);
        navigate('/contacts');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred, please try again.');
    }
  };

  return (
    <section className="bg-black min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border dark:border-gray-700">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <Link to="/">
              <button className="px-3 py-1 text-sm bg-slate-600 hover:bg-slate-700 text-white rounded-md">
                ← Home
              </button>
            </Link>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsSignUp(false)}
                className={`px-4 py-1 rounded-md font-semibold text-sm ${
                  !isSignUp
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`px-4 py-1 rounded-md font-semibold text-sm ${
                  isSignUp
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {isSignUp ? 'Create an account' : 'Welcome back!'}
          </h1>

          {message && <p className="text-green-500 text-sm">{message}</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignUp && (
              <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white"
                  required
                />
              </div>
            )}
            <div>
              <label htmlFor="lexusId" className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">
                Lexus-ID
              </label>
              <input
                type="text"
                id="lexusId"
                name="lexusId"
                value={formData.lexusId}
                onChange={handleInputChange}
                placeholder="Enter Your Lexus-ID"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white"
                required
              />
            </div>

            {isSignUp && (
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 mr-2 rounded border-gray-300 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300">
                  I accept the{' '}
                  <a href="#" className="text-purple-600 dark:text-purple-400 underline">
                    Terms and Conditions
                  </a>
                </label>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-md font-medium text-sm"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>

            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <button
                type="button"
                onClick={() => setIsSignUp((prev) => !prev)}
                className="text-purple-600 hover:underline dark:text-purple-400"
              >
                {isSignUp ? 'Login here' : 'Sign Up'}
              </button>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignInSignUp;

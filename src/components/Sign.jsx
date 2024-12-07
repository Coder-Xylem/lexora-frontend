import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom';

function SignInSignUp() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ lexusId: '', email: '', password: '' });
  const [message, setMessage] = useState(''); 
    const [error, setError] = useState('');
  const navigate = useNavigate();

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
      } else {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('lexusId', response.data.lexusId);
        navigate('/contacts');
      }
    } catch (err) {
      setError(err.response?.data.error || 'An error occurred, please try again.');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/contacts');
    }
  }, [navigate]);

  return (
    <section className="bg-black h-screen dark:bg-black">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Link to="/" className="text-sm text-gray-00 hover:text-white">
              <button className="px-3 py-2 mb-8 text-[18px] bg-slate-600 hover:text-white hover:underline text-gray-300 rounded-md">Home</button>
      </Link>
        <div className="w-full max-w-md bg-white rounded-lg shadow dark:border md:mt-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-around mb-4">
              <button
                onClick={() => setIsSignUp(false)}
                className={`w-full py-2 rounded-lg ${
                  isSignUp ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-900'
                } focus:outline-none transition duration-200`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`w-full py-2 rounded-lg ${
                  isSignUp ?   'bg-gray-200 text-gray-900':'bg-primary-600 text-white'
                } focus:outline-none transition duration-200`}
              >
                Sign Up
              </button>
            </div>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {isSignUp ? 'Create an account' : 'Welcome back!'}
            </h1>
            {message && <p className="text-green-500 text-sm">{message}</p>}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {isSignUp && (
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
              )}
              <div>
                <label
                  htmlFor="lexusId"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Lexus-ID
                </label>
                <input
                  type="text"
                  name="lexusId"
                  id="lexusId"
                  value={formData.lexusId}
                  onChange={handleInputChange}
                  placeholder="Enter Your Lexus-ID"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              {isSignUp && (
                <div className="flex items-start">
                  <input
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 text-sm font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{' '}
                    <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              )}
              <button
                type="submit"
                className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
              >
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="font-medium text-purple-600 hover:underline dark:text-purple-500"
                >
                  {isSignUp ? 'Login here' : 'Sign Up'}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignInSignUp;

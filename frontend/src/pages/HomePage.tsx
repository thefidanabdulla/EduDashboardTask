import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;

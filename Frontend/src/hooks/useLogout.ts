import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function useLogout() {
    const { setAccessToken } = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        setAccessToken(null);
        navigate('/login');
    };

    return logout;
}
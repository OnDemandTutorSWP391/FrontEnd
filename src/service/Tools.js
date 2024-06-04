import { jwtDecode } from 'jwt-decode';
import useStore from '../../src/app/store';
const checkTokenExpiration = () => {
    const token = useStore.getState().accessToken;
    console.log(token); // Assume the token is stored in the state
    if (!token) return false;
    
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        return decodedToken.exp < currentTime; // Check if the token has expired
    } catch (error) {
        console.error("Invalid token", error);
        return true;
    }
};
export {checkTokenExpiration}
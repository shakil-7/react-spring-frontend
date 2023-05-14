import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';


export const DeletePage = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    const [jwtToken, setJwtToken] = useState('');
    const reloadCount = sessionStorage.getItem('reloadCount');

    useEffect(() => {

        if (Cookies.get('isLoggedIn') === 'true') {
            setIsLoggedIn(true);
        }
        setCurrentUser(Cookies.get('currentUser'));
        setJwtToken(Cookies.get(currentUser + '#jwtToken'));

        if (Cookies.get('isLoggedIn') === 'true') {
            setIsLoggedIn(true);

            Cookies.remove('isLoggedIn');
            Cookies.remove('currentUser');
            Cookies.remove(currentUser + '#jwtToken');
        }

        
        if (reloadCount < 1) {
            sessionStorage.setItem('reloadCount', String(reloadCount + 1));
            window.location.reload();
        } else {
            sessionStorage.removeItem('reloadCount');
        }


    }, []);

    return (
        < div > Succesfully removed </div >
    )
}

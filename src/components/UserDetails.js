import { useParams, useHistory } from "react-router-dom";
import { useFetchUser } from "./customHook/useFetchUser";
import { NotFound } from "./NotFound";

export const UserDetails = () => {

    const { email } = useParams();
    const history = useHistory();

    const { data: user, isPending, errorMessage } = useFetchUser(
        'http://localhost:8080/user?email=' + email
    )

    const handleClick = () => {
        fetch('http://localhost:8080/user?email=' + email, {
            method: 'DELETE'
        }).then(() => {
            history.push('/all-user')
        });
    };

    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {!isPending && (errorMessage.length > 0) && <div>{errorMessage}</div>}
            {!isPending &&
                (
                    <article>
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                        <div>{user.genter}</div>
                        { !user.name && <NotFound /> }
                        { user.name && <button onClick={handleClick}>Delete</button> }
                    </article>
                )

            }
        </div>
    );
}

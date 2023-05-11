import { useParams } from "react-router-dom";
import { useFetchUser } from "./customHook/useFetchUser";

export const UserDetails = () => {

    const { email } = useParams();

    const { data: user, isPending, errorMessage } = useFetchUser(
        'http://localhost:8080/user?email=' + email
    )

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
                    </article>
                )
            
            }
        </div>
    );
}

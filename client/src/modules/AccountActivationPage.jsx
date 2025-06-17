import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../components/AuthContext";
import { Navigate, useParams } from "react-router-dom";
import { Loader } from "../components/Loader";

export const AccountActivationPage = () => {
    const [error, setError] = useState('');
    const [done, setDone] = useState(false);

    const { activate } = useContext(AuthContext);
    const { activationToken } = useParams();

    useEffect(() => {
        activate(activationToken)
            .catch((error) => {
                setError(error.response?.data?.message || `Wrong activation link`);
            })
            .finally(() => {
                setDone(true);
            });
    }, []);

    if (!done) {
        return <Loader />;
    }

    return (
        <>
            <h1 className="title">Account activation</h1>

            {error ? (
                <p className="notification is-danger is-light">{error}</p>
            ) : (
                <Navigate to={"/profile"} />
            )}
        </>
    )
}
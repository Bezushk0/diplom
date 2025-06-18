import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../components/AuthContext";
import { Navigate, useParams } from "react-router-dom";
import { Loader } from "../components/Loader";

export const AccountActivationPage = () => {
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const { activate } = useContext(AuthContext);
  const { activationToken } = useParams();

  useEffect(() => {
    activate(activationToken)
      .then(() => {
        setDone(true);
        setTimeout(() => setRedirect(true), 3000);
      })
      .catch((error) => {
        setError(error.response?.data?.message || `Wrong activation link`);
        setDone(true);
      });
  }, [activationToken]);

  if (!done) {
    return <Loader />;
  }

  if (redirect) {
    return <Navigate to="/profile" />;
  }

  return (
    <>
      <h1 className="title">Account activation</h1>
      {error ? (
        <p className="notification is-danger is-light">{error}</p>
      ) : (
        <p className="notification is-success is-light">
          Account activated successfully! Redirecting to profile...
        </p>
      )}
    </>
  );
};

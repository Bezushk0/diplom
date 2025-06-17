import { useContext } from "react"
import { AuthContext } from "../components/AuthContext"
import { Loader } from "../components/Loader";
import { ChangeName } from "../components/ChangeName";
import { ChangePassword } from "../components/ChangePassword";
import { ChangeEmailConfirmation } from "../components/ChangeEmailConfirmation";

export const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    return (
        <>
            {!user ? (
                <Loader />
            ): (
                <>
                    <ChangeName />
                    <ChangePassword />
                    <ChangeEmailConfirmation />    
                </>   
            )}
        </>
    );
};
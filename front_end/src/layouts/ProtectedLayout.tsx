import { Outlet, Navigate} from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

const ProtectedLayout = () => {
    const { user } = useAuth();
    console.log("Current user in: ", user);
    console.log(user);
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return (
        <>
            {/* <NavBar /> */}
            <main>
                <Outlet />
            </main>
        </>
    )
};

export default ProtectedLayout;
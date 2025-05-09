import { useAuth } from '../hooks/AuthContext'; // Adjust the import path as necessary
const Home = () => {
    const { user } = useAuth(); // Assuming you have a custom hook for authentication
    return (
        <>
            <div>Home!!</div>
            {user?<div>
                    <p>{user.email}</p>
                    <p>{user.username}</p>
                    <p>{user.createdAt}</p>
                </div>
                :<p>Not logged in</p>
            }
        </>
    );
};

export default Home;
import { useAuth } from '../hooks/AuthContext';
const Home = () => {
    const { user } = useAuth();
    return (
        <>
            <div className="flex flex-col font-primary items-center justify-center h-screen bg-background text-text">
                <h1 className="text-4xl font-title font-bold mb-4">Welcome to Speech Summarizer</h1>
                <p className="text-xl mb-2">Your AI-powered speech summarization tool</p>
                {user && (
                    <p className="text-lg mt-4">Hello, {user.email}!</p>
                )}
            </div>
        </>
    );
};

export default Home;
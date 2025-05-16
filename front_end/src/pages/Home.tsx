import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
const Home = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    return (
        <>
            <div className="flex flex-col font-primary items-center justify-center h-screen bg-background text-text">
                <h1 className="text-4xl font-title font-bold mb-4">Welcome to Speech Summarizer</h1>
                <p className="text-xl mb-2">Your AI-powered speech summarization tool</p>
                {user && (
                    <p className="text-lg mt-4">Hello, {user.username.split(' ')[0]}!</p>
                )}
                <button 
                    onClick={() => navigate('/dashboard')}
                    className="px-4 bg-primary hover:bg-primary-dark text-white font-medium py-2 rounded-lg transition duration-200 mt-4"
                >
                    Upload Audio
                </button>
            </div>
        </>
    );
};

export default Home;
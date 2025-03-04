import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { User, Mail, LogOut, Edit } from 'lucide-react';

const Profile = () => {
    const { user, logout, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    // Redirect to login if user is not authenticated
    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

    // Handle Logout
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Handle Edit Profile
    const handleEditProfile = () => {
        navigate('/profile/edit');
    };

    return (
        <div className="max-w-lg mx-auto mt-32 bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">
                User Profile
            </h2>

            <div className="flex flex-col items-center gap-4">
                {/* User Icon */}
                <User className="w-16 h-16 text-blue-500" />

                {/* User Info */}
                <div className="text-center">
                    <h3 className="text-xl font-semibold">
                        {user?.name || 'Unknown User'}
                    </h3>
                    <p className="text-gray-600 flex items-center gap-2">
                        <Mail className="w-5 h-5 text-gray-500" />{' '}
                        {user?.email || 'No Email'}
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                    {/* Edit Profile Button */}
                    <button
                        onClick={handleEditProfile}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-600 transition"
                    >
                        <Edit className="w-5 h-5" /> Edit Profile
                    </button>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded-md flex items-center gap-2 hover:bg-red-600 transition"
                    >
                        <LogOut className="w-5 h-5" /> Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;

import { useRouter } from 'vue-router';

export function useAuthUtils() {
    const router = useRouter();

    const checkTokenAndRedirect = () => {
        if (process.client) {
            const token = localStorage.getItem('token');
            if (!token) {
                router.replace('/login');
            }
            return token !== null;
        }
        return false;
    };

    const handleLogout = () => {
        try {
            localStorage.removeItem('token');
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return { checkTokenAndRedirect, handleLogout };
}

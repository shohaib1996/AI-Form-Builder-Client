import { useEffect, useState } from 'react';

interface UserInfo {
    _id: string;
    name?: string;
    planType?: string;
    role?: string;
    createdAt?: string;
    updatedAt?: string;
    photo?: string;
    email: string;
   
}

interface DecodedJWT {
    user: UserInfo;
}

function decodeJWT(token: string): DecodedJWT | null {
    try {
        const payload = token.split('.')[1];
        const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(decoded);
    } catch {
        return null;
    }
}

export function useUser() {
    const [user, setUser] = useState<DecodedJWT | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            const userInfo = decodeJWT(token);
            setUser(userInfo);
        } else {
            setUser(null);
        }
        setLoading(false);
    }, []);

    return { user, loading };
}
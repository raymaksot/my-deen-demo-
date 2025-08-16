import { api } from './api';
import { User } from '../models/User';

export const authService = {
	async login(email: string, password: string): Promise<{ token: string; user: User }> {
		return await api.post('/api/auth/login', { email, password });
	},
	async register(name: string, email: string, password: string): Promise<{ token: string; user: User }> {
		return await api.post('/api/auth/register', { name, email, password });
	},
	async googleLogin(idToken: string): Promise<{ token: string; user: User }> {
		return await api.post('/api/auth/google', { idToken });
	},
	/**
	 * Update the authenticated user's profile.  Accepts a partial user payload
	 * containing name, gender, language or location.  Returns the updated user.
	 */
	async updateProfile(payload: Partial<{ name: string; gender: string; language: string; location: string }>): Promise<User> {
		const res = await api.put('/api/users/me', payload);
		return res.data as User;
	},
};
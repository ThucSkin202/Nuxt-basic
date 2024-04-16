import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: null,
        errorMessage: null,
        isLoggedIn: false,

        dataUser: [],
    }),
    actions: {
        async login(username, password) {
            try {
                const response = await fetch('https://laco-auth.10z.one/auth/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                });

                const data = await response.json();
                if (data.access_token) {
                    localStorage.setItem('token', data.access_token);

                    this.accessToken = data.access_token;
                } else {
                    this.errorMessage = data.message || 'Đăng nhập thất bại';
                }

                this.isLoggedIn = true;
                this.errorMessage = null;
            } catch (error) {
                console.error('Lỗi đăng nhập:', error);
                this.errorMessage = 'Lỗi kết nối';
            }
        },

        async register(username, password) {
            try {
                const response = await fetch('https://laco-auth.10z.one/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                });

                const data = await response.json();

                if (data && (data.status === 'success' || data.statusCode === 400)) {
                    this.errorMessage = data.message;
                    this.isLoggedIn = false;
                } else {
                    this.errorMessage = 'Đăng ký thất bại';
                }
            } catch (error) {
                console.error('Lỗi đăng ký:', error);
                this.errorMessage = 'Đăng ký thất bại';
            }
        },

        async getAllUsers() {
            try {
                const response = await fetch('https://laco-auth.10z.one/users');
                if (!response.ok) {
                    throw new Error('Không thể lấy dữ liệu người dùng');
                }

                const data = await response.json();
                this.dataUser = data.data;

                this.errorMessage = null;
                this.isLoggedIn = true;
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu người dùng:', error);
                return null;
            }
        },

        async handleDeleteUser(id) {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error('Token không tồn tại');
                }

                const response = await fetch(`https://laco-auth.10z.one/users/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    this.errorMessage = "Bạn không có quyền xóa!";
                    throw new Error('Không thể xóa người dùng');
                }

                this.errorMessage = null;
                this.isLoggedIn = true;
            } catch (error) {
                console.error('Lỗi khi xóa người dùng:', error);
            }
        },

        logout() {
            this.accessToken = null;
            this.errorMessage = null;
            this.isLoggedIn = false;
            localStorage.removeItem('token');
        },
    },
    persist: true,
});

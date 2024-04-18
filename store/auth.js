import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: null,
        errorMessage: null,
        isLoggedIn: false,

        userData: [],
        userTotal: 0,

        roleData: [],
        roleTotal: 0,

        roleDetails: [],
        rolePermissions: [],
        roleUsers: [],
        roleName: null,
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

        async getAllUsers(limit, page) {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error('Token không tồn tại');
                }

                const url = `https://laco-auth.10z.one/users?limit=${limit}&page=${page}`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Không thể lấy dữ liệu người dùng');
                }

                const data = await response.json();
                this.userData = data.data.users;
                this.userTotal = data.data.total;

                this.errorMessage = null;

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

        //roles
        async getAllRoles(limit, page) {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error('Token không tồn tại');
                }

                const url = `https://laco-auth.10z.one/roles?limit=${limit}&page=${page}`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Không tìm thấy vai trò người dùng');
                }

                const data = await response.json();
                this.roleData = data.data.roles;
                this.roleTotal = data.data.total;

                this.roleName = data.data.roles.name;

                this.errorMessage = null;
                this.isLoggedIn = true;

            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu người dùng:', error);
                return null;
            }
        },

        async getRoleById(id) {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error('Token không tồn tại');
                }

                const url = `https://laco-auth.10z.one/roles/${id}`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Không tìm thấy vai trò người dùng');
                }

                const data = await response.json();
                this.roleDetails = data.data;
                this.rolePermissions = data.data.permissions;
                this.roleUsers = data.data.users;

                this.errorMessage = null;
                this.isLoggedIn = true;

            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu người dùng:', error);
                return null;
            }
        },

        async createRoles(name, description) {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token không tồn tại');
                }

                await this.getAllRoles();

                const roleNameExists = this.roleData.some(role => role.name === name);
                if (roleNameExists) {
                    this.errorMessage = 'Name role already exists.';
                    return;
                }

                const response = await fetch('https://laco-auth.10z.one/roles', {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        description,
                        permissions: [
                            {
                                "feature": "user",
                                "actions": [
                                    "read",
                                    "create",
                                    "update",
                                    "delete"
                                ],
                                "description": "roles user",
                                "_id": "661bf3169e8e16a32504e92c"
                            }
                        ]
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    this.errorMessage = 'Add new role successfully';
                } else {
                    const errorMessage = data && data.message ? data.message : 'Lỗi không xác định';
                    this.errorMessage = errorMessage;
                }
            } catch (error) {
                console.error('Lỗi đăng ký:', error);
                this.errorMessage = 'Lôi kết nối: ', + error.message;
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

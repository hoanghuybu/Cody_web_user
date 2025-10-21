
export const AuthUtils = {
  isAuthenticated: (): boolean => {
    return sessionStorage.getItem("auth_token") !== null;
  },

  // Get user information from session
  getUserInfo: () => {
    const userInfo = sessionStorage.getItem("user_info");
    return userInfo ? JSON.parse(userInfo) : null;
  },

  getAccessToken: (): string | null => {
    return sessionStorage.getItem("auth_token");
  },

  getRefreshToken: (): string | null => {
    return sessionStorage.getItem("refresh_token");
  },

  saveAuthData: (accessToken: string, refreshToken?: string) => {
    sessionStorage.setItem("auth_token", accessToken);
    if (refreshToken) {
      sessionStorage.setItem("refresh_token", refreshToken);
    }
  },

  clearAuthData: () => {
    sessionStorage.removeItem("auth_token");
    sessionStorage.removeItem("refresh_token");
  },

  // Get user's full name
  getUserFullName: (): string | null => {
    const userInfo = AuthUtils.getUserInfo();
    if (userInfo && userInfo.firstName && userInfo.lastName) {
      return `${userInfo.lastName} ${userInfo.firstName}`;
    }
    return null;
  }
};

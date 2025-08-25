// Authentication utility functions for session management

export const AuthUtils = {
  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return sessionStorage.getItem("auth_token") !== null;
  },

  // Get user information from session
  getUserInfo: () => {
    const userInfo = sessionStorage.getItem("user_info");
    return userInfo ? JSON.parse(userInfo) : null;
  },

  // Get access token
  getAccessToken: (): string | null => {
    return sessionStorage.getItem("auth_token");
  },

  // Get refresh token
  getRefreshToken: (): string | null => {
    return sessionStorage.getItem("refresh_token");
  },

  // Save authentication data to session
  saveAuthData: (accessToken: string, refreshToken?: string, userInfo?: any) => {
    sessionStorage.setItem("auth_token", accessToken);
    if (refreshToken) {
      sessionStorage.setItem("refresh_token", refreshToken);
    }
    if (userInfo) {
      sessionStorage.setItem("user_info", JSON.stringify(userInfo));
    }
  },

  // Clear all authentication data
  clearAuthData: () => {
    sessionStorage.removeItem("auth_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("user_info");
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

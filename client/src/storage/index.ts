const tokenKey = 'chat-user';

export const setToken = (token: string) => {
  localStorage.setItem(tokenKey, JSON.stringify(token));
};

export const removeToken = () => {
  localStorage.removeItem(tokenKey);
};

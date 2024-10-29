interface TokenUser {
  id: number;
  name: string;
  username: string;
  email: string;
  gender: string;
}

interface TokenPayload {
  user: TokenUser;
  iat: number;
  exp: number;
}

export const decodeJWTToken = (token: string) => {
  if (token) {
    try {
      const base64Payload = token.split('.')[1];
      const decodedPayload = atob(base64Payload);
      const tokenPayload: TokenPayload = JSON.parse(decodedPayload);

      return tokenPayload.user;
    } catch (error) {
      console.error('Error decoding token', error);
    }
  }
};

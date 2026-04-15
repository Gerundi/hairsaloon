declare namespace Express {
  interface Request {
    adminSession?: {
      login: string;
      csrfToken: string;
      exp: number;
    };
  }
}


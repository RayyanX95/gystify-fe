export interface GoogleExchangeNew {
  accessToken: string;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
  };
}

export interface NormalizedUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  profilePicture?: string;
}

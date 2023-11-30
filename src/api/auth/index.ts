import type { User } from 'src/types/user';
import { createResourceId } from 'src/utils/create-resource-id';
import { decode, JWT_EXPIRES_IN, JWT_SECRET, sign } from 'src/utils/jwt';
import { wait } from 'src/utils/wait';

import { users } from './data';
import axios from 'axios';

const STORAGE_KEY = 'users';

// NOTE: We use sessionStorage since memory storage is lost after page reload.
//  This should be replaced with a server call that returns DB persisted data.

const getPersistedUsers = (): User[] => {
  try {
    const data = sessionStorage.getItem(STORAGE_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data) as User[];
  } catch (err) {
    console.error(err);
    return [];
  }
};

const persistUser = (user: User): void => {
  try {
    const users = getPersistedUsers();
    const data = JSON.stringify([...users, user]);
    sessionStorage.setItem(STORAGE_KEY, data);
  } catch (err) {
    console.error(err);
  }
};

type SignInRequest = {
  email: string;
  password: string;
};

type SignInResponse = Promise<{
  accessToken: string;
}>;

type SignUpRequest = {
  email: string;
  name: string;
  password: string;
};

type SignUpResponse = Promise<{
  accessToken: string;
}>;

type MeRequest = {
  accessToken: string;
};

type MeResponse = Promise<User>;

class AuthApi {
  async signIn(request: SignInRequest) {
    const { email, password } = request;
       let resp= await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,{
        email:email,
        password:password
      })
    return new Promise((resolve, reject) => {
      try {
          let accessToken = resp.data?.idToken
        resolve({ accessToken });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  async signUp(request: SignUpRequest) {
    const { email, name, password } = request;
    let resp= await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,{
      email:email,
      password:password,
      name: name
    })
    // await wait(1000);
    return resp.data?.message
  }

  async verifyEmail(email:string, oneTimeCode:string){
    let resp= await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`,{
      email:email,
      oneTimeCode:oneTimeCode,
    })
    return resp.data
  }

  async resendVerificationCode(email:string){
    let resp= await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/resend`,{
      email:email,
    })
    return resp.data
  }

  async forgotPassword(email:string){
    let resp= await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/password/forgot`,{
      email:email,
    })
    return resp.data
  }

  async resetPassword(email:string, oneTimeCode:string, password:string){
    let resp= await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/password/confirm`,{
      email:email,
      oneTimeCode:oneTimeCode,
      newPassword:password
    })
    return resp.data
  }

  me(request: MeRequest): MeResponse {
    const { accessToken } = request;

    return new Promise((resolve, reject) => {
      try {
        // Decode access token
        const decodedToken = decode(accessToken) as any;

        // Merge static users (data file) with persisted users (browser storage)
        const mergedUsers = [...users, ...getPersistedUsers()];

        // Find the user
        const { userId } = decodedToken;
        const user = mergedUsers.find((user) => user.id === userId);

        if (!user) {
          reject(new Error('Invalid authorization token'));
          return;
        }

        resolve({
          id: user.id,
          avatar: user.avatar,
          email: user.email,
          name: user.name,
          plan: user.plan,
        });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const authApi = new AuthApi();

import axios from 'axios';
import type { User } from 'src/types/user';

export const users: User[] = [
  {
    id: '5e86809283e28b96d2d38537',
    avatar: '/assets/avatars/avatar-anika-visser.png',
    email: 'alishah40440@gmail.com',
    name: 'Anika Visser',
    password: 'password@1',
    plan: 'Premium',
  },
];

export const  signAuth=async(email:string,password:string)=>{
   const resp= axios.post('https://gnx5mqqz88.execute-api.us-east-2.amazonaws.com/auth/sign-in',{
        email:email,
        password:password
      })

      return (await resp).data.idToken
}

// signAuth: async (values, helpers): Promise<void> =>

import { User } from '../models/user_model';

type UserProfilePic = Pick<User, 'username' | 'gender'>;

//picture assignation
export const generateProfilePic = (data: UserProfilePic) => {
  let linkGender: string;

  if (data.gender === 'male') {
    linkGender = 'boy';
  } else {
    linkGender = 'girl';
  }
  const profilePic: string = `https://avatar.iran.liara.run/public/${linkGender}?username=${data.username}`;

  return profilePic;
};

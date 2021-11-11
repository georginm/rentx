interface ICreateUserDTO {
  id?: string;
  name: string;
  password: string;
  email: string;
  driverLicense: string;
  avatarUrl?: string;
}

export { ICreateUserDTO };

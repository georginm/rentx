interface IUserResponseDTO {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  driverLicense: string;
  getAvatar(): string;
}

export { IUserResponseDTO };

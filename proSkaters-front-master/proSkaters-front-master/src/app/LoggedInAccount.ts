export interface LoggedInAccount {
  email: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  token: string;
}

import { USER_ROLE } from "./user.constants";

export type TUser = {
    _id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    role: keyof typeof USER_ROLE.user;
    phoneNumber: number;
    address: string;
  }
  
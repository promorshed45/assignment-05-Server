import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import { USER_ROLE } from './user.constants';
import config from '../../config';
import bcrypt from 'bcrypt'

const UserSchema = new Schema<TUser>({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "Invalid email address"], unique: true },
  password: { type: String, required: [true, "Password is required"], select: 0 },
  phone: { type: String, required: [true, "Phone number is required"] },
  role: { type: String, default: USER_ROLE.user },
  address: { type: String, required: [true, "Address is required"] },
}, {
  timestamps: true
});

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
  this.role = "user";
  next();
});


// UserSchema.post("save", function (doc, next) {
//   doc.password = "";
//   next();
// });

export const User = model<TUser>("User", UserSchema);

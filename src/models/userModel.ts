import mongoose, { Document, Schema, Model, model, Query } from "mongoose";
import * as bcrypt from "bcrypt";
import validator from "validator";

export interface IUserDocument extends Document {
  // _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string | undefined;
  passwordConfirm: string | undefined;
}

export interface IUser extends IUserDocument {
  correctPassword(
    candidatePassword: string,
    userPassword: string | undefined
  ): boolean;
}

// Create schema
const userSchema: Schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please tell us your first name"],
  },

  lastName: {
    type: String,
    required: [true, "Please tell us your last name"],
  },

  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },

  username: {
    type: String,
    required: [true, "Please provide your username"],
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, "Please provide a password"],
    validate: {
      // This only works on Create and SAVE!!!
      validator: function (this: IUser, el: string) {
        return el === this.password;
      },
      message: "Password mismatch",
    },
  },
});

userSchema.pre<IUser>("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete the passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

// Query middleware for for any word starting with find
userSchema.pre<Query<IUser, IUser>>(/^find/, function (next: any) {
  this.find({ active: { $ne: false } });
  next();
});

// Instance method is a method that will be available in all collection of a document
userSchema.method(
  "correctPassword",
  async function (candidatePassword, userPassword): Promise<boolean> {
    // candidatePassword ===> password form the user
    //  userPassword ===> password from the DB
    return await bcrypt.compare(candidatePassword, userPassword);
  }
);

// Create model
export const User: Model<IUser> = model("User", userSchema);

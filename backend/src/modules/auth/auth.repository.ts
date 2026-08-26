import { UserModel, type UserDocument } from "./auth.model.js";

export class AuthRepository {
  async findByEmail(
    email: string,
  ): Promise<UserDocument | null> {
    return UserModel.findOne({
      email: email.toLowerCase(),
    });
  }

  async findByEmailWithPassword(
    email: string,
  ): Promise<UserDocument | null> {
    return UserModel.findOne({
      email: email.toLowerCase(),
    }).select("+password");
  }

  async findById(
    userId: string,
  ): Promise<UserDocument | null> {
    return UserModel.findById(userId);
  }

  async create(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<UserDocument> {
    return UserModel.create(data);
  }
}
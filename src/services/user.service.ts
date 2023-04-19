import { Inject, Service } from "typedi";
import { UserModel } from "../models";
import { getDefaultRoot, getDefaultRootPass } from "../lib/config";
import { PasswordService } from "../lib/services";
import Boom from "@hapi/boom";

import { AvatarGenerator } from "random-avatar-generator";

const generator = new AvatarGenerator();

@Service()
export class UserService {
  @Inject(() => PasswordService)
  passwordService!: PasswordService;

  public async checkUserAuth({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    //check normal user
    const userExist = await UserModel.findOne({ username });

    if (username === getDefaultRoot() && !userExist) {
      let user = new UserModel();
      user.username = username;
      if (password === getDefaultRootPass()) {
        user.password = this.passwordService.generateHash(password);
        user.roles = ["admin"];
        user.avatar = generator.generateRandomAvatar();
        const newUser = await user.save();
        return newUser;
      } else {
        return null;
      }
    }

    if (userExist) {
      const isMatch = this.passwordService.checkHash(
        password,
        userExist.password
      );
      if (isMatch) {
        return userExist;
      }
    }
    return null;
  }

  public async getUserById(id: string) {
    const user = await UserModel.findOne({ id: id });
    if (!user) {
      throw Boom.notFound("User not found");
    }
    const showUser = user.toObject();
    showUser.password = undefined;
    return showUser;
  }
}

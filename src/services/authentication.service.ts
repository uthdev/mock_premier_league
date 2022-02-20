import CreateUserDto from "dto/user.dto";import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import omit from 'lodash.omit';
import { getRepository } from "typeorm";
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import TokenData from '../interfaces/tokenData.interface';
import User from '../interfaces/user.interface';
import { UserEntity } from '../db/entity/User'
// import userModel from './../user/user.model';

class AuthenticationService {
  
  // public user = User

  static async register(userData: CreateUserDto) {
    const userRepository = getRepository(UserEntity);
    if (
      await userRepository.findOne({ email: userData.email })
    ) {
      throw new UserWithThatEmailAlreadyExistsException(userData.email);
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user: User = userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    const result = await userRepository.save(user);
    // return response.status(201).json(omit(result, ["password"]))
    return {
      user: omit(result, ["password"]),
    };
  }

  public static createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
  
  static createToken(user: User): TokenData {
    const expiresIn = 60 * 60; // an hour
    const secret = <string>process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
      isAdmin: user.isAdmin || false
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }
}

export default AuthenticationService;

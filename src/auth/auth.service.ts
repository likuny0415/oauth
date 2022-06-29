import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { sign } from "jsonwebtoken";
require("dotenv").config();

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateOAuthLogin(userProfile: any, provider: string) {
    try {
      let existingUser = await this.usersService.findOne(
        provider,
        userProfile.thirdPartyId,
      );
      if (!existingUser) {
        existingUser = await this.usersService.signup(userProfile);
      }

      const { id } = existingUser;
      const signinPayload = { id };
      const jwt: string = sign(signinPayload, this.JWT_SECRET_KEY, {
        expiresIn: "365d",
      });
      return { jwt, user: existingUser };
    } catch (error) {
      throw new InternalServerErrorException(
        "validateOAuthLogin",
        error.message,
      );
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (user) {
      const verified = await this.usersService.verifyUser(
        password,
        user.password,
      );
      if (verified) {
        const { id } = user;
        const signinPayload = { id };
        const jwt: string = sign(signinPayload, this.JWT_SECRET_KEY, {
          expiresIn: "365d",
        });
        return { jwt, user };
      }
    }
    return null;
  }

  async signup(data) {
    const { email, password } = data;

    const user = await this.usersService.findUserByEmail(email);
    if (user) {
      throw new BadRequestException("Email in Use");
    } else {
        const user = await this.usersService.createUser(email, password);
        return user;
    }
  }

  async test(userProfile: any, provider: string) {
    const result = await this.validateOAuthLogin(userProfile, provider);

    return { ...JSON.parse(JSON.stringify(result.user)), jwt: result.jwt };
  }
}

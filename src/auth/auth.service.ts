import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { RegisterUserInput } from 'src/user/user.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log("validateUser", email,password)
    const user = await this.usersService.findUser({ email, password });
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(registerUserInput: RegisterUserInput) {
    const createUser = await this.usersService.create(registerUserInput);
    const payload = { email: createUser.email, sub: createUser.id };
    return { ...createUser, access_token: this.jwtService.sign(payload) };
  }
  async login(user: UserEntity) {
    console.log('iseojrvi', user);
    const payload = { email: user.email, sub: user.id };
    return { ...user, access_token: this.jwtService.sign(payload) };
  }
}

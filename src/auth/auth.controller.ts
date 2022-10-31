import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthEndpointName, AuthSwaggerTag } from './auth.constants';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtPayload, LoginCredentials } from './auth.types';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { CreateUser, SecuredUser } from '../users/users.types';

@ApiBearerAuth()
@Controller(AuthEndpointName)
@ApiTags(AuthSwaggerTag)
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    description: 'The credentials used for authentication',
    type: LoginCredentials,
  })
  @ApiResponse({
    status: 201,
    type: JwtPayload,
    description: 'The authentication was successful.',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid authentication credentials.',
  })
  async login(@Request() req): Promise<JwtPayload> {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiBody({
    description: 'The user create payload.',
    type: CreateUser,
  })
  @ApiResponse({
    status: 201,
    type: SecuredUser,
    description: 'The registered user information.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid user data payload.',
  })
  async register(@Body() payload: CreateUser): Promise<SecuredUser> {
    return this.usersService.create(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiResponse({
    status: 200,
    type: SecuredUser,
    description: 'The currently authenticated user.',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid authentication credentials.',
  })
  getProfile(@Request() req): Promise<SecuredUser> {
    const user = req.user as Partial<SecuredUser>;
    return this.usersService.getById(user.id);
  }
}

import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRoles {
  Admin = 'admin',
  User = 'user',
  Customer = 'customer',
}

const UserRolesValues = [UserRoles.Admin, UserRoles.User, UserRoles.Customer];

export class User {
  @ApiProperty({
    format: 'UUIDV4',
    description: 'The id of the user',
    example: '2916a854-d829-46b1-a39c-bb5f74456296',
  })
  id?: string;

  @ApiProperty({
    description: 'The username of the user',
    example: 'doej',
  })
  username: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  fullname: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  password: string;

  @ApiProperty({
    description: 'The roles of the user',
    isArray: true,
    enum: UserRolesValues,
    example: ['user', 'customer'],
  })
  roles: UserRoles[];
}

export class CreateUser {
  @ApiProperty({
    required: true,
    minLength: 4,
    description: 'The username of the user',
    example: 'doej',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @ApiProperty({
    required: true,
    minLength: 1,
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({
    required: true,
    minLength: 4,
    description: 'The password of the user',
    example: '12345678',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @ApiProperty({
    required: true,
    minLength: 1,
    isArray: true,
    enum: UserRolesValues,
    description: 'The roles of the user',
    example: ['user', 'customer'],
  })
  @IsNotEmpty()
  @IsEnum(UserRolesValues, { each: true })
  roles: UserRoles[];
}

export class SecuredUser implements Omit<User, 'password'> {
  @ApiProperty({
    format: 'UUIDV4',
    description: 'The id of the user',
    example: '2916a854-d829-46b1-a39c-bb5f74456296',
  })
  id?: string;

  @ApiProperty({
    description: 'The username of the user',
    example: 'doej',
  })
  username: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  fullname: string;

  @ApiProperty({
    description: 'The roles of the user',
    isArray: true,
    enum: UserRolesValues,
    example: ['user', 'customer'],
  })
  roles: UserRoles[];
}

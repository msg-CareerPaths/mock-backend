import { Controller, Get, Param } from '@nestjs/common';
import { UsersEndpointName, UsersSwaggerTag } from './users.constants';
import { SecuredUser } from './users.types';
import { UsersService } from './users.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(UsersSwaggerTag)
@Controller(UsersEndpointName)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: SecuredUser,
    description: 'The user with the requested id',
  })
  @ApiResponse({
    status: 404,
    description: 'The user with the requested id could not be found',
  })
  async retrieveUserById(@Param('id') id: string): Promise<SecuredUser> {
    return this.usersService.getById(id);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: [SecuredUser],
    description: 'The users list',
  })
  async retrieveUsers(): Promise<SecuredUser[]> {
    return this.usersService.getAll();
  }
}

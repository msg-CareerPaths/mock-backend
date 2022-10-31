import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUser, SecuredUser, User } from './users.types';
import { v4 as uuidv4 } from 'uuid';
import { isNil as _isNil } from 'lodash';
import { UsersUtils } from './users.utils';
import * as initialUsers from '../assets/users.json';

@Injectable()
export class UsersService {
  private _usersRepository: Map<string, User> = new Map<string, User>();
  constructor() {
    this.seed();
  }

  private seed(): void {
    const initialUsersKeys = Object.keys(initialUsers);
    initialUsersKeys.forEach((key) => {
      this._usersRepository.set(key, initialUsers[key]);
    });
  }
  async create(payload: CreateUser): Promise<SecuredUser> {
    const id = uuidv4();
    const newUser: User = {
      ...payload,
      id,
    };
    this._usersRepository.set(id, newUser);
    return UsersUtils.secureUserData(newUser);
  }

  async getById(id: string): Promise<SecuredUser> {
    if (this._usersRepository.has(id)) {
      const user = this._usersRepository.get(id);
      return UsersUtils.secureUserData(user);
    }
    throw new NotFoundException();
  }

  async getByUsername(username: string): Promise<User> {
    const foundUser = Array.from(this._usersRepository.values()).find(
      (u) => u.username === username,
    );
    if (_isNil(foundUser)) {
      throw new NotFoundException();
    }
    return foundUser;
  }

  async getAll(): Promise<SecuredUser[]> {
    return Array.from(this._usersRepository.values()).map((u) =>
      UsersUtils.secureUserData(u),
    );
  }
}

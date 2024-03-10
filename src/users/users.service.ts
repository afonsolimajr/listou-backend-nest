import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRepository } from "./users.repository";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  private usersRepository = new UserRepository();

  async findAll() {
    const ret = await this.usersRepository.getAllUsers();
    return ret;
    `This action returns all users`;
  }

  async findOne(id: string) {
    // const ret = await this.usersRepository.getUser(id);
    const ret = await this.usersRepository.getUserByLogin(id);
    return ret;
  }

  async findOneByLogin(username: string) {
    const ret = await this.usersRepository.getUserByLogin(username);
    return ret;
  }

  async create(newuser: User) {
    newuser.name = newuser.name.trim();
    newuser.username = newuser.username.trim().toLowerCase();
    newuser.email = newuser.email.trim().toLowerCase();

    const ret = await this.usersRepository.createUser(newuser);
    return ret;
  }

  async update(user: User) {
    user.name = user.name.trim();
    user.username = user.username.trim().toLowerCase();
    user.email = user.email.trim().toLowerCase();
    const ret = await this.usersRepository.updateUser(user);
    return ret;
  }

  async remove(username: string) {
    // return `This action removes a #${id} user`;
    const ret = await this.usersRepository.removeUser(username);
    return ret;
  }
}

import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRepository } from "./users.repository";

@Injectable()
export class UsersService {
  private usersRepository = new UserRepository();
  create(createUserDto: CreateUserDto) {
    return "This action adds a new user";
  }

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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

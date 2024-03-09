import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: User) {
    return this.usersService.create(user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Put()
  update(@Body() user: User) {
    return this.usersService.update(user);
  }

  @Delete(":username")
  remove(@Param("username") username: string) {
    return this.usersService.remove(username);
  }
}

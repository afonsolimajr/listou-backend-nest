import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { ListasService } from "./listas.service";
import { Lista } from "./entities/lista.entity";

@Controller("listas")
export class ListasController {
  constructor(private readonly service: ListasService) {}

  @Post()
  create(@Body() lista: Lista) {
    return this.service.create(lista);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  @Put()
  update(@Body() lista: Lista) {
    return this.service.update(lista);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}

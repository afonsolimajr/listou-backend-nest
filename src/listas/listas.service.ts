import { Injectable } from "@nestjs/common";
import { ListaRepository } from "./listas.repository";
import { Lista } from "./entities/lista.entity";

@Injectable()
export class ListasService {
  private repository = new ListaRepository();

  async findAll() {
    const ret = await this.repository.getAll();
    return ret;
    `This action returns all users`;
  }

  async findOne(id: string) {
    const ret = await this.repository.get(id);
    return ret;
  }

  async create(lista: Lista) {
    const ret = await this.repository.create(lista);
    return ret;
  }

  async update(lista: Lista) {
    const ret = await this.repository.update(lista);
    return ret;
  }

  async remove(id: string) {
    const ret = await this.repository.remove(id);
    return ret;
  }
}

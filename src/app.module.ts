import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { ListasModule } from "./listas/listas.module";

@Module({
  imports: [UsersModule, ListasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

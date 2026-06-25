import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class TaskService {
  @Cron('*/14 * * * *')
  async handleCron() {
    try {
      const url = 'https://homeburgersbackend.onrender.com/auth/health';
      await fetch(url);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('please check server logs');
  }
}
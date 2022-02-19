import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import PublicFile from './publicFile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PublicFile]), AuthModule, ConfigModule],
  providers: [FileService],
  exports: [FileService],
  controllers: [FileController],
})
export class FileModule {}

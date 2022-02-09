import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PublicFile from './publicFile.entity';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { User } from 'src/auth/user.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(PublicFile)
    private publicFilesRepository: Repository<PublicFile>,
    private readonly configService: ConfigService,
  ) {}

  async uploadPublicFile(file: Buffer, filename: string, user: User) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: file,
        Key: `${uuid()}-${filename}`,
        Tagging: 'key1=1',
      })
      .promise();

    const newFile = this.publicFilesRepository.create({
      name: filename,
      key: uploadResult.Key,
      url: uploadResult.Location,
      user: user,
    });
    await this.publicFilesRepository.save(newFile);

    // const task = await this.getTaskById(id, user);
    // task.status = status;
    // await this.tasksRepository.save(task);
    // return task;

    return newFile;
  }
  async getPublicFile(key) {
    const s3 = new S3();
    const file = await s3
      .getObject({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Key: key,
      })
      .promise();
    return file;
  }

  async getKey(name) {
    const file = await this.publicFilesRepository.findOne({
      where: { name },
      order: { created_at: 'DESC' },
    });
    console.log('file ', file);
    return file.key;
  }
}

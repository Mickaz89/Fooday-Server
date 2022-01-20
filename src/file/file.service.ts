import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PublicFile from './publicFile.entity';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(PublicFile)
    private publicFilesRepository: Repository<PublicFile>,
    private readonly configService: ConfigService,
  ) {}

  async uploadPublicFile(file: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: file,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    const newFile = this.publicFilesRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });
    await this.publicFilesRepository.save(newFile);
    return newFile;
  }
  async getPublicFile() {
    const s3 = new S3();
    const file = await s3
      .getObject({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Key: 'baa2a885-f355-4d6a-b5c2-457de7680cf9-product_template.csv',
      })
      .promise();

    return file;
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { title } from 'process';
import { ReferAmountEntity } from 'src/db/entities/referamount.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(ReferAmountEntity)
    private readonly referamountEntity: Repository<ReferAmountEntity>,
  ) {}

  async saveReferAmount(referAmountDto) {
    if (referAmountDto.isActive) {
      await this.findReferAmountRecord().then((res) => {
        if (res) {
          throw new HttpException(
            "can't save record, record already active!",
            HttpStatus.BAD_REQUEST,
          );
        }
      });
    }

    await this.findReferAmountRecordByTitle(referAmountDto.title).then(
      (res) => {
        if (res) {
          throw new HttpException(
            "can't save record, title already exist!",
            HttpStatus.BAD_REQUEST,
          );
        }
      },
    );

    const referamt = new ReferAmountEntity(
      referAmountDto.title.trim(),
      referAmountDto.amount,
      referAmountDto.isActive,
    );
    return await this.referamountEntity.save(referamt);
  }

  async findReferAmountRecord() {
    return await this.referamountEntity.findOne({
      where: [{ isActive: true }],
    });
  }

  async findReferAmountRecordByTitle(title) {
    return await this.referamountEntity.findOne({
      where: [{ title: title.trim() }],
    });
  }
}

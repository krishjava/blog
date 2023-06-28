import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from '../auth/dto/user.dto';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import generateReferCode from 'src/common/helpers/referral.code';
import { ReferCodeEntity } from 'src/db/entities/refercode.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ReferCodeEntity)
    private readonly rcRepository: Repository<ReferCodeEntity>,
  ) {}

  async createUser(userDto: UserDto): Promise<any> {
    return await this.findUser(userDto?.email, userDto?.mobile)
      .then((res) => {
        if (res)
          throw new HttpException('user already exist', HttpStatus.CONFLICT);
      })
      .then(async () => {
        const newUser = await this.saveUser(userDto);
        if (newUser) {
          return {
            message: 'success',
          };
        }
        if (!newUser) {
          throw new HttpException(
            'something went wrong when creating user',
            HttpStatus.BAD_REQUEST,
          );
        }
      });
  }

  async findUser(email, mobile) {
    return await this.userRepository.findOne({
      where: [{ email: email.trim() }, { mobile: mobile.trim() }],
    });
  }

  async saveUser(userDto: UserDto) {
    userDto.isActive = false;
    userDto.createdDate = new Date();
    userDto.otp = Math.floor(100000 + Math.random() * 900000);
    const referCode = await this.rcRepository.findOne({
      where: {
        used: false,
      },
    });
    referCode.used = true;
    return await this.rcRepository
      .update({ id: referCode.id }, referCode)
      .then(() => {
        userDto.referralCode = referCode;
        return this.userRepository.save(userDto);
      });
  }

  /**
   * generate refer codes
   */
  genRefercode() {
    const codes = [];
    for (let i = 0; i < 1000; i++) {
      const gencode = new ReferCodeEntity();
      gencode.code = generateReferCode(6);
      codes.push(gencode);
    }
    this.rcRepository.save(codes);
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ){}
  
  async createUser(userDto: UserDto): Promise<any> {
    return await this.findUser(userDto?.email, userDto?.mobile).then((res)=>{
      if(res) throw new HttpException('user already exist', HttpStatus.CONFLICT);
    }).then(async () => {
      const newUser = await this.saveUser(userDto);
      if(newUser) {
        return {
          message: 'success'
        }
      }
      if(!newUser){
        throw new HttpException('something went wrong when creating user', HttpStatus.BAD_REQUEST);
      }
    });
  }

  async findUser(email, mobile){
    return await this.userRepository.findOne({
      where: [
        {email: email.trim()},
        {mobile: mobile.trim()}
      ]
    })
  }

  async saveUser(userDto: UserDto){
    userDto.isActive = false;
    userDto.createdDate = new Date();
    userDto.otp = Math.floor(100000 + Math.random() * 900000)
    return this.userRepository.save(userDto);
  }
}

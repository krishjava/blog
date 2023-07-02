import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ReferAmountDto } from './dto/referamount.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create/refer-amount')
  @HttpCode(200)
  async handleReferAmount(@Body() referAmountDto: ReferAmountDto) {
    return await this.adminService.saveReferAmount(referAmountDto);
  }
}

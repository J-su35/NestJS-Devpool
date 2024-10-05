import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Query, ParseArrayPipe, BadRequestException } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/entities/user.entity';
import { MsgParseIntPipe } from 'src/pipes/msg-parse-int.pipe';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }
  // last day
  @Get('search')
  searchByIds(@Query('ids', new ParseArrayPipe({ items: Number, separator: ',' })) ids: number[]) {
    // return this.itemsService.searchByIds(ids); //option 1
    return this.itemsService.searchByIdsNativeQuery(ids) //option 2
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  // @Get(':id')  //original code
  // findOne(@Param('id') id: string) {
  //   return this.itemsService.findOne(+id); //NaN Not A Number
  // }
  
  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.itemsService.findOne(id);
  // }

  @Get(':id')
  findOne(@Param('id', MsgParseIntPipe) id: number) {
    return this.itemsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  // Original code
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.itemsService.remove(+id);
  // }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe({ exceptionFactory: (errer: string) => (new BadRequestException(`id ควรเป็น int`)) })) id: string) {
    return this.itemsService.remove(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.ADMIN, Role.MANAGER])
  @Patch('approve/:id')
  // @Patch(':id/approve')
  approve(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.approve(id);
  }
}

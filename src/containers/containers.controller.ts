import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContainersService } from './containers.service';
import { CreateContainerDto } from './dto/create-container.dto';
import { UpdateContainerDto } from './dto/update-container.dto';

@Controller('containers')
export class ContainersController {
  constructor(private readonly containersService: ContainersService) {}

  // Rutas existentes

  @Post()
  create(@Body() createContainerDto: CreateContainerDto) {
    return this.containersService.create(createContainerDto);
  }

  @Get()
  findAll() {
    return this.containersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.containersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateContainerDto: UpdateContainerDto) {
    return this.containersService.update(+id, updateContainerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.containersService.remove(+id);
  }

  // Nuevas rutas

  @Get('data')
  async getData() {
    return this.containersService.data();
  }

  @Get('days/:find')
  async findDays(@Param('find') find: string) {
    return this.containersService.findDays(find);
  }
  
}

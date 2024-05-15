import { Injectable } from '@nestjs/common';
import { CreateContainerDto } from './dto/create-container.dto';
import { UpdateContainerDto } from './dto/update-container.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Container } from './entities/container.entity';
import { Repository, Between } from 'typeorm';

@Injectable()
export class ContainersService {
  constructor(
    @InjectRepository(Container)
    private readonly containerRepository: Repository<Container>,
  ) {}

  async create(createContainerDto: CreateContainerDto) {
    const container = this.containerRepository.create(createContainerDto);
    return await this.containerRepository.save(container);
  }

  async findAll() {
    return await this.containerRepository.find({
      order: {
        timestamp: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    return await this.containerRepository.findOne({  where:{id} });
  }

  async update(id: number, updateContainerDto: UpdateContainerDto) {
    return await this.containerRepository.update(id, updateContainerDto);
  }

  async remove(id: number) {
    return await this.containerRepository.softDelete(id);
  }

  async findDays(find: string) {
    const today = new Date();
    switch (find) {
      case 'today':
        return await this.findDataOfDays(today);
      case 'yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        return await this.findDataOfDays(yesterday);
      case 'beforeYesterday':
        const beforeYesterday = new Date(today);
        beforeYesterday.setDate(today.getDate() - 2);
        return await this.findDataOfDays(beforeYesterday);
      default:
        return [];
    }
  }
  

  async findDataOfDays(date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return await this.containerRepository.find({
      where: {
        timestamp: Between(startOfDay, endOfDay),
      },
      order: {
        level: 'ASC',
      },
      take: 5,
    });
  }

  async data() {
    const numberRegisters = await this.containerRepository.count();
    const today = await this.findDays('today');
    const yesterday = await this.findDays('yesterday');
    const beforeYesterday = await this.findDays('beforeYesterday');

//    const todayMaxLevel = today.length > 0 ? Math.max(...today.map(container => container.level)) : 0;
//    const todayMinLevel = today.length > 0 ? Math.min(...today.map(container => container.level)) : 0;

//    const yesterdayMaxLevel = yesterday.length > 0 ? Math.max(...yesterday.map(container => container.level)) : 0;
//    const yesterdayMinLevel = yesterday.length > 0 ? Math.min(...yesterday.map(container => container.level)) : 0;

//    const beforeYesterdayMaxLevel = beforeYesterday.length > 0 ? Math.max(...beforeYesterday.map(container => container.level)) : 0;
//   const beforeYesterdayMinLevel = beforeYesterday.length > 0 ? Math.min(...beforeYesterday.map(container => container.level)) : 0;

    return {
      numberRegisters,
      today: {
//        maxLevel: todayMaxLevel,
//        minLevel: todayMinLevel,
        data: today,
      },
      yesterday: {
//        maxLevel: yesterdayMaxLevel,
//        minLevel: yesterdayMinLevel,
        data: yesterday,
      },
      beforeYesterday: {
//        maxLevel: beforeYesterdayMaxLevel,
//        minLevel: beforeYesterdayMinLevel,
        data: beforeYesterday,
      },
    };
  }
  
}

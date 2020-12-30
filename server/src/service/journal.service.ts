import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { JournalDTO } from '../service/dto/journal.dto';
import { JournalMapper } from '../service/mapper/journal.mapper';
import { JournalRepository } from '../repository/journal.repository';

const relationshipNames = [];

@Injectable()
export class JournalService {
  logger = new Logger('JournalService');

  constructor(@InjectRepository(JournalRepository) private journalRepository: JournalRepository) {}

  async findById(id: string): Promise<JournalDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.journalRepository.findOne(id, options);
    return JournalMapper.fromEntityToDTO(result);
  }

  async findByfields(options: FindOneOptions<JournalDTO>): Promise<JournalDTO | undefined> {
    const result = await this.journalRepository.findOne(options);
    return JournalMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<JournalDTO>): Promise<[JournalDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.journalRepository.findAndCount(options);
    const journalDTO: JournalDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(journal => journalDTO.push(JournalMapper.fromEntityToDTO(journal)));
      resultList[0] = journalDTO;
    }
    return resultList;
  }

  async save(journalDTO: JournalDTO): Promise<JournalDTO | undefined> {
    const entity = JournalMapper.fromDTOtoEntity(journalDTO);
    const result = await this.journalRepository.save(entity);
    return JournalMapper.fromEntityToDTO(result);
  }

  async update(journalDTO: JournalDTO): Promise<JournalDTO | undefined> {
    const entity = JournalMapper.fromDTOtoEntity(journalDTO);
    const result = await this.journalRepository.save(entity);
    return JournalMapper.fromEntityToDTO(result);
  }

  async deleteById(id: string): Promise<void | undefined> {
    await this.journalRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}

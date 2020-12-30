import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { NoteDTO } from '../service/dto/note.dto';
import { NoteMapper } from '../service/mapper/note.mapper';
import { NoteRepository } from '../repository/note.repository';

const relationshipNames = [];
relationshipNames.push('journal');

@Injectable()
export class NoteService {
  logger = new Logger('NoteService');

  constructor(@InjectRepository(NoteRepository) private noteRepository: NoteRepository) {}

  async findById(id: string): Promise<NoteDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.noteRepository.findOne(id, options);
    return NoteMapper.fromEntityToDTO(result);
  }

  async findByfields(options: FindOneOptions<NoteDTO>): Promise<NoteDTO | undefined> {
    const result = await this.noteRepository.findOne(options);
    return NoteMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<NoteDTO>): Promise<[NoteDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.noteRepository.findAndCount(options);
    const noteDTO: NoteDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(note => noteDTO.push(NoteMapper.fromEntityToDTO(note)));
      resultList[0] = noteDTO;
    }
    return resultList;
  }

  async save(noteDTO: NoteDTO): Promise<NoteDTO | undefined> {
    const entity = NoteMapper.fromDTOtoEntity(noteDTO);
    const result = await this.noteRepository.save(entity);
    return NoteMapper.fromEntityToDTO(result);
  }

  async update(noteDTO: NoteDTO): Promise<NoteDTO | undefined> {
    const entity = NoteMapper.fromDTOtoEntity(noteDTO);
    const result = await this.noteRepository.save(entity);
    return NoteMapper.fromEntityToDTO(result);
  }

  async deleteById(id: string): Promise<void | undefined> {
    await this.noteRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}

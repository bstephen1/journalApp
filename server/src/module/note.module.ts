import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteController } from '../web/rest/note.controller';
import { NoteRepository } from '../repository/note.repository';
import { NoteService } from '../service/note.service';

@Module({
  imports: [TypeOrmModule.forFeature([NoteRepository])],
  controllers: [NoteController],
  providers: [NoteService],
  exports: [NoteService]
})
export class NoteModule {}

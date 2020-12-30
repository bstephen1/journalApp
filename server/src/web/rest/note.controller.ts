import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { NoteDTO } from '../../service/dto/note.dto';
import { NoteService } from '../../service/note.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/notes')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('notes')
export class NoteController {
  logger = new Logger('NoteController');

  constructor(private readonly noteService: NoteService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: NoteDTO
  })
  async getAll(@Req() req: Request): Promise<NoteDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.noteService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: NoteDTO
  })
  async getOne(@Param('id') id: string): Promise<NoteDTO> {
    return await this.noteService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create note' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: NoteDTO
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() noteDTO: NoteDTO): Promise<NoteDTO> {
    const created = await this.noteService.save(noteDTO);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Note', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update note' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: NoteDTO
  })
  async put(@Req() req: Request, @Body() noteDTO: NoteDTO): Promise<NoteDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Note', noteDTO.id);
    return await this.noteService.update(noteDTO);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete note' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Note', id);
    return await this.noteService.deleteById(id);
  }
}

import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { JournalDTO } from '../../service/dto/journal.dto';
import { JournalService } from '../../service/journal.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/journals')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('journals')
export class JournalController {
  logger = new Logger('JournalController');

  constructor(private readonly journalService: JournalService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: JournalDTO
  })
  async getAll(@Req() req: Request): Promise<JournalDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.journalService.findAndCount({
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
    type: JournalDTO
  })
  async getOne(@Param('id') id: string): Promise<JournalDTO> {
    return await this.journalService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create journal' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: JournalDTO
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() journalDTO: JournalDTO): Promise<JournalDTO> {
    const created = await this.journalService.save(journalDTO);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Journal', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update journal' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: JournalDTO
  })
  async put(@Req() req: Request, @Body() journalDTO: JournalDTO): Promise<JournalDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Journal', journalDTO.id);
    return await this.journalService.update(journalDTO);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete journal' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Journal', id);
    return await this.journalService.deleteById(id);
  }
}

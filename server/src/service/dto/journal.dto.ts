/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { NoteDTO } from './note.dto';

/**
 * A Journal DTO object.
 */
export class JournalDTO extends BaseDTO {
  @IsNotEmpty()
  @ApiModelProperty({ description: 'title field' })
  title: string;

  @ApiModelProperty({ type: NoteDTO, isArray: true, description: 'notes relationship' })
  notes: NoteDTO[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

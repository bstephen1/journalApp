/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { JournalDTO } from './journal.dto';

/**
 * A Note DTO object.
 */
export class NoteDTO extends BaseDTO {
  @ApiModelProperty({ description: 'title field', required: false })
  title: string;

  @ApiModelProperty({ description: 'content field', required: false })
  content: string;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'creationDate field' })
  creationDate: any;

  @ApiModelProperty({ type: JournalDTO, description: 'journal relationship' })
  journal: JournalDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Note } from './note.entity';

/**
 * A Journal.
 */
@Entity('journal')
export class Journal extends BaseEntity {
  @Column({ name: 'title', unique: true })
  title: string;

  @OneToMany(
    type => Note,
    other => other.journal
  )
  notes: Note[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Journal } from './journal.entity';

/**
 * A Note.
 */
@Entity('note')
export class Note extends BaseEntity {
  @Column({ name: 'title', nullable: true })
  title: string;

  @Column({ name: 'content', nullable: true })
  content: string;

  @Column({ type: 'date', name: 'creation_date' })
  creationDate: any;

  @ManyToOne(type => Journal)
  journal: Journal;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

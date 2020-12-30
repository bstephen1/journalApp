import { EntityRepository, Repository } from 'typeorm';
import { Journal } from '../domain/journal.entity';

@EntityRepository(Journal)
export class JournalRepository extends Repository<Journal> {}

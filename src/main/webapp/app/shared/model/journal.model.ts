import { INote } from 'app/shared/model/note.model';

export interface IJournal {
  id?: number;
  title?: string;
  notes?: INote[];
}

export class Journal implements IJournal {
  constructor(public id?: number, public title?: string, public notes?: INote[]) {}
}

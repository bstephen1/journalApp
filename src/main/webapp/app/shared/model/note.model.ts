import { Moment } from 'moment';
import { IJournal } from 'app/shared/model/journal.model';

export interface INote {
  id?: number;
  title?: string;
  content?: string;
  creationDate?: Moment;
  journal?: IJournal;
}

export class Note implements INote {
  constructor(
    public id?: number,
    public title?: string,
    public content?: string,
    public creationDate?: Moment,
    public journal?: IJournal
  ) {}
}

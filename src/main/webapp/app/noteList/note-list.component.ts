import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IJournal } from 'app/shared/model/journal.model';
import { INote } from 'app/shared/model/note.model';
import { flatMap } from 'rxjs/operators';

import { NoteListService } from './note-list.service';

@Component({
  selector: 'jhi-note-list',
  templateUrl: './note-list.component.html'
})
export class NoteListComponent implements OnInit {
  error = false;
  success = false;
  notes: any;
  @Input()
  journalFilter: string;

  constructor(private noteListService: NoteListService, private route: ActivatedRoute) {
    this.journalFilter = '';
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(flatMap(params => this.noteListService.getNotesForJournal())).subscribe(
      data => {
        this.notes = data;
        this.success = true;
      },
      () => (this.error = true)
    );
  }

  filterByJournal(notes: INote[]): INote[] {
    return notes.filter(note => note.journal && note.journal.title !== this.journalFilter);
  }
}

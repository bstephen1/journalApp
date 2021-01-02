import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private noteListService: NoteListService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(flatMap(params => this.noteListService.getNotesForJournal())).subscribe(
      data => {
        this.notes = data;
        console.log(data);
        this.success = true;
      },
      () => (this.error = true)
    );
  }
}

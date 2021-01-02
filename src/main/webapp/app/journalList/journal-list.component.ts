import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatMap } from 'rxjs/operators';

import { JournalListService } from './journal-list.service';

@Component({
  selector: 'jhi-journal-list',
  templateUrl: './journal-list.component.html'
})
export class JournalListComponent implements OnInit {
  error = false;
  success = false;
  journals: any;

  constructor(private journalListService: JournalListService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(flatMap(params => this.journalListService.getAll())).subscribe(
      data => {
        this.journals = data;
        this.success = true;
      },
      () => (this.error = true)
    );
  }
}

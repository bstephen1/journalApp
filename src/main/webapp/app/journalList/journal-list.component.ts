import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatMap } from 'rxjs/operators';

import { JournalListService } from './journal-list.service';

@Component({
  selector: 'jhi-journal-list',
  templateUrl: './journal-list.component.html',
  providers: []
})
export class JournalListComponent implements OnInit {
  error = false;
  success = false;
  journals: any;

  constructor(private journalListService: JournalListService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    //fetch journal data from backend
    this.route.queryParams.pipe(flatMap(params => this.journalListService.getAll())).subscribe(
      data => {
        this.journals = data;
        console.log(data);
        this.success = true;
      },
      () => (this.error = true)
    );
  }
}
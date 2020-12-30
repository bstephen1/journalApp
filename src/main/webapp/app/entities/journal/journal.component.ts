import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IJournal } from 'app/shared/model/journal.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { JournalService } from './journal.service';
import { JournalDeleteDialogComponent } from './journal-delete-dialog.component';

@Component({
  selector: 'jhi-journal',
  templateUrl: './journal.component.html'
})
export class JournalComponent implements OnInit, OnDestroy {
  journals: IJournal[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected journalService: JournalService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.journals = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.journalService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IJournal[]>) => this.paginateJournals(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.journals = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInJournals();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IJournal): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInJournals(): void {
    this.eventSubscriber = this.eventManager.subscribe('journalListModification', () => this.reset());
  }

  delete(journal: IJournal): void {
    const modalRef = this.modalService.open(JournalDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.journal = journal;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateJournals(data: IJournal[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.journals.push(data[i]);
      }
    }
  }
}

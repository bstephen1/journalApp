import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JournalAppSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { JournalListComponent } from '../journalList/journal-list.component';

@NgModule({
  imports: [JournalAppSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent, JournalListComponent]
})
export class JournalAppHomeModule {}

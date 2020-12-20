import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { JournalAppSharedModule } from 'app/shared/shared.module';
import { JournalAppCoreModule } from 'app/core/core.module';
import { JournalAppAppRoutingModule } from './app-routing.module';
import { JournalAppHomeModule } from './home/home.module';
import { JournalAppEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    JournalAppSharedModule,
    JournalAppCoreModule,
    JournalAppHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    JournalAppEntityModule,
    JournalAppAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class JournalAppAppModule {}

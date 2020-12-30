import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { JournalComponentsPage, JournalDeleteDialog, JournalUpdatePage } from './journal.page-object';

const expect = chai.expect;

describe('Journal e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let journalComponentsPage: JournalComponentsPage;
  let journalUpdatePage: JournalUpdatePage;
  let journalDeleteDialog: JournalDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Journals', async () => {
    await navBarPage.goToEntity('journal');
    journalComponentsPage = new JournalComponentsPage();
    await browser.wait(ec.visibilityOf(journalComponentsPage.title), 5000);
    expect(await journalComponentsPage.getTitle()).to.eq('Journals');
    await browser.wait(ec.or(ec.visibilityOf(journalComponentsPage.entities), ec.visibilityOf(journalComponentsPage.noResult)), 1000);
  });

  it('should load create Journal page', async () => {
    await journalComponentsPage.clickOnCreateButton();
    journalUpdatePage = new JournalUpdatePage();
    expect(await journalUpdatePage.getPageTitle()).to.eq('Create or edit a Journal');
    await journalUpdatePage.cancel();
  });

  it('should create and save Journals', async () => {
    const nbButtonsBeforeCreate = await journalComponentsPage.countDeleteButtons();

    await journalComponentsPage.clickOnCreateButton();

    await promise.all([journalUpdatePage.setTitleInput('title')]);

    expect(await journalUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');

    await journalUpdatePage.save();
    expect(await journalUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await journalComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Journal', async () => {
    const nbButtonsBeforeDelete = await journalComponentsPage.countDeleteButtons();
    await journalComponentsPage.clickOnLastDeleteButton();

    journalDeleteDialog = new JournalDeleteDialog();
    expect(await journalDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Journal?');
    await journalDeleteDialog.clickOnConfirmButton();

    expect(await journalComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

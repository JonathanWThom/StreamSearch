import { BlankAndChillPage } from './app.po';

describe('blank-and-chill App', function() {
  let page: BlankAndChillPage;

  beforeEach(() => {
    page = new BlankAndChillPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

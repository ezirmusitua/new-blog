import { Web1Page } from './app.po';

describe('web1 App', function() {
  let page: Web1Page;

  beforeEach(() => {
    page = new Web1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

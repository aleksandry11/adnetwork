import { AdNetworkPage } from './app.po';

describe('ad-network App', () => {
  let page: AdNetworkPage;

  beforeEach(() => {
    page = new AdNetworkPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

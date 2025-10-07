describe('Weather Bot healthcheck', () => {
  it('should return status 200 and contain "Bot is running"', () => {
    cy.request('https://waleriaqaweatherbot.netlify.app/.netlify/functions/bot')
      .its('status')
      .should('eq', 200);

    cy.request('https://waleriaqaweatherbot.netlify.app/.netlify/functions/bot')
      .its('body')
      .should('include', 'Bot is running');
  });
});

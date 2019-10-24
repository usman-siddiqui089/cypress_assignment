// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

function serviceDomainReducer(accumulator, domain) {
    accumulator[domain.service] = domain.baseURI;
    return accumulator;
}

function loginToLiveEngage(){

    const username = Cypress.env('userName');
    const password = Cypress.env('password');
    const accountId = Cypress.env('accountID');
    const origin = Cypress.env('host');
    const userCredentials = {
        username,
        password,
  };
  cy.request({
    url: `https://sy.agentvep.liveperson.net/api/account/${accountId}/login?v=1.3`,
    method: 'POST',
    body: userCredentials,
  })
    .its('body')
    .then(body => {
      const serviceDomains = body.csdsCollectionResponse.baseURIs.reduce(
        serviceDomainReducer,
        {}
      );
      const lpAccountInfo = {
        accountId,
        csrf: body.csrf,
        userId: body.config.userId,
        userName: body.config.loginName,
        token: body.bearer,
        serviceDomains,
        sessionURL: `https://${
          serviceDomains.agentVep
        }/api/account/${accountId}/agentSession/${Date.now()}`,
      };
      window.localStorage.setItem(
        'lp-accountInfo',
        JSON.stringify(lpAccountInfo)
      );
      cy.request({
        url: '/.netlify/functions/login-liveperson',
        method: 'POST',
        body: {
          ...userCredentials,
          accountId,
          lpLoginResponse: body,
        },
        headers: {
          origin,
        },
      })
        .its('body')
        .then(body => {
          window.localStorage.setItem('userId', body.user.user_id);
          window.localStorage.setItem('crestaAuthToken', body.token);

          cy.visit('/auth/loading');
        });
    });

}

Cypress.Commands.add("login", loginToLiveEngage)
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

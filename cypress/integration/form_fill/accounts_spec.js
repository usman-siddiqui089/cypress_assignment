/// <reference types="cypress" />

import { redirectToForm } from "../functions/functions"

const red_email = Cypress.env('red_email')
const red_pass = Cypress.env('red_password')

describe('Redirect to Google Accounts First',()=>{

    it('Redirection to Form',()=>{

        cy.visit('')
        redirectToForm(red_email,red_pass)

    })

})
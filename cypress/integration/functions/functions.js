/// <reference types="cypress" />

export function redirectToForm(email,password){

    cy.get('[type=email]').clear().type(email)
    cy.contains('Next').click()

    cy.wait(2000)
    cy.get('[type=password]').type(password)
    cy.contains('Next').click()

    Cypress.Cookies.preserveOnce()

}

export function fillUserCredentials(name,phone,cnic,email){

    cy.wait(2500)

    cy.get('[aria-label=Name]').type(name,{timeout:12000,delay:100})
    cy.get('[aria-label=Phone Number]').type(name,{delay:100})
    cy.get('[aria-label=Email]').type(name,{delay:100})
    cy.get('[aria-label=CNIC]').type(name,{delay:100})

    cy.contains('NEXT').click()

}
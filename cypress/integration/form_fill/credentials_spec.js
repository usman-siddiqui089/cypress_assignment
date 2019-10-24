/// <reference types="cypress" />

import { fillUserCredentials, redirectToForm } from "../functions/functions"

const name = Cypress.env('name')
const phone = Cypress.env('phone')
const cnic = Cypress.env('cnic')
const email = Cypress.env('email')
const red_email = Cypress.env('red_email')
const red_pass = Cypress.env('red_password')

describe('Credentials Fill',()=>{

    // it('Redirection to Form',()=>{

    //     cy.visit('')
    //     redirectToForm(red_email,red_pass)

    // })

//    before('Visit Docs Form',()=>{

        

//     })

    it('Fill User Credentials',()=>{

        cy.visit('https://docs.google.com/forms/d/e/1FAIpQLSfSGh4qzssK1gnZ6JEUe1D4E3lmGCelVD0VZgdHs_y7K_U7rA/formResponse')
        fillUserCredentials(name,phone,cnic,email)

    })

})
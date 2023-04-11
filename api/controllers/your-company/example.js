
/**
 * THIS FILE AND DIRECTORY ARE JUST EXAMPLES TO GUIDE YOU ON YOUR OWN INTEGRATION
 * JOURNEY. BE SURE TO REPLACE 'your-company' WITH A SHORT NAME TO IDENTITY YOUR
 * COMPANY, AND REPLACE 'example.js' WITH YOUR OWN FILE NAME.
 */

const moment = require('moment')
const actions = require('../actions')
const issue_response = require('../../example-responses/issue-card.json')

exports.open_account = async (req, res) => {
    const customer_id = req.body.customer_id;
    const apikey = req.headers.authorization;
    const issue_physical = req.body.issue_physical || 'Y'
    const identifier = `acc_${uuidv4()}`
    try {
        if (!customer_id) {
            res.status(400).json({
                error_type: 'incomplete_resources',
                message: "The request is missing a customer id."
            });
        } else if (!issue_physical.toUpperCase() == 'Y' || !issue_physical.toUpperCase() == 'N') {
            res.status(400).json({
                error_type: 'incomplete_resources',
                message: "Issue Physical should either be Y or N."
            });
        } else {
            const customer = actions.getCustomer(customer_id, apikey)
            if (customer == '') {
                res.status(400).json({
                    error_type: 'no_customer',
                    message: "No customer found with this customer identifier."
                });
            } else if (!customer.verification_status == 'pass') {
                res.status(400).json({
                    error_type: 'issuing_error',
                    message: "This user has either not been verified or failed kyc. Please have this resolved before using this endpoint."
                });
            } else {
                //Go ahead and open the account with pre-verified information
                // const first_name = customer.first_name
                // const last_name = customer.last_name
                // const address = JSON.parse(customer.address)
                // const dob = moment(customer.date_of_birth, "YYYY/MM/DD")
                // const dobformat = dob.format("YYYY-MM-DD") ///FEEL FREE TO CHANGE THIS TO YOUR EXPECTED FORMAT
                // const ssn_ = customer.ssn
                // const physical = issue_physical.toUpperCase() == 'Y' ? 'PrintedCard' : 'VirtualCard'
                const account = openAccount()
                console.log(account)
            }
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error_type: 'request_error',
            message: "We have encountered an error with this request. Please, try again at a later time."
        });
    }
}
/**
 * THIS IS WHERE YOU WILL MAKE ANY API CALL TO YOUR SYSTEM TO ISSUE THE CARD
 * FOR THE SAKE OF THIS EXAMPLE, WE WILL MOCK THE EXPECTED RESPONSE AND DATA FORMAT.
 */
function openAccount() { 
    return issue_response
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
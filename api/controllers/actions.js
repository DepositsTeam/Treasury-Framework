const customer_data = require('../example-responses/customer.json')

module.exports = {
    getCustomer(id, api_key) {
        //console.log((customer_data.customer_id == id) ? customer_data : '')
        return (customer_data.customer_id == id) ? customer_data : ''
    }
}
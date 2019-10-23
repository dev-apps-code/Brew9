import BaseRequestObject from "./base_request_object";

class UpdatePaymentSessionRequestObject extends BaseRequestObject{

    constructor(name,card_number,security_code,month,year){
        super();
        this.name = name
        this.card_number = card_number
        this.security_code = security_code
        this.month = month
        this.year = year
    }

    getFormData(){
        
        let card_prefix = this.card_number.substring(0, 10);
        let formData = {"sourceOfFunds":{"type":"CARD","provided":{"card":{"prefix":card_prefix,"nameOnCard":this.name,"securityCode":this.security_code,"expiry":{"month":this.month,"year":this.year}}}}}
        
        console.log(`formdata ${JSON.stringify(formData)}`)
        return JSON.stringify(formData)
    }
  
}
export default UpdatePaymentSessionRequestObject


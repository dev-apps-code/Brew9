import BaseRequestObject from "./base_request_object";

class VerifyCouponCodeObj extends BaseRequestObject {

    constructor(code) {
        super();
        this.code = code


    }

    getUrlString() {
        return `coupon_codes/verify_code/`
    }

    getFormData() {
        var string = JSON.stringify({ 'code': this.code });

        return string
    }
}
export default VerifyCouponCodeObj
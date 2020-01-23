import BaseRequestObject from "./base_request_object";

class MakeOrderReviewObj extends BaseRequestObject {

    constructor(order_id, rating, remark, topic, image) {
        super();
        this.id = order_id
        this.rating = rating
        this.remark = remark
        this.topic = topic
        this.image = image

    }

    getUrlString() {
        return `orders/${this.id}/order_review`
    }

    getFormData() {
        var string = JSON.stringify({ 'id': this.id, 'rating': this.rating, 'remark': this.remark, 'topic': this.topic, 'image': this.image });

        return string
    }
}
export default MakeOrderReviewObj
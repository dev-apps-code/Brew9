class EventObject {
    constructor(jsonData) {
        this.success = jsonData.success
        this.result = jsonData.result
        this.code = jsonData.code
        this.message = jsonData.message
        this.total = jsonData.total
        this.member = jsonData.member
    }
}

export default EventObject

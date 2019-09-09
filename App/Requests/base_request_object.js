class BaseRequestObject {

    setUrlId(url_id){
        this.url_id = url_id
    }

    setPage(page) {
        this.page_no = page
    }

    getFormData(){
  
        let formBody = []
        Object.entries(this).forEach(entry => {

            if (entry[0] != 'url_id'){

                const encodedKey = encodeURIComponent(entry[0]);
                const encodedValue = encodeURIComponent(entry[1]);
                formBody.push(`${encodedKey}=${encodedValue}`)
            }
            //use key and value here
            });
            formBody = formBody.join('&')
        return formBody
    }
}
export default BaseRequestObject
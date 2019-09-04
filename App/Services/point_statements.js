import { KSERVERURL, encodeForFormData,KCURRENT_API_VERSION_HEADER } from '../webservice/server.js'
import { getBasicAuthentication } from '../utils/webservice_helper'

function logResponse(description) {
    return function(res) {
        console.log(description, res)
        return res
    }
}

function _parseJSON(response) {
    return response.text().then(text => (text ? JSON.parse(text) : {}))
}

export function getPointHistories(authtoken, id, page) {
    const urlString = `${KSERVERURL}members/${id}/pointHistory?page=${page}`

    return fetch(urlString, {
        method: 'GET',
        headers: {
            Accept: KCURRENT_API_VERSION_HEADER,
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: getBasicAuthentication(authtoken),
        },
    })
    .then(response => _parseJSON(response))
    .then(logResponse('json'))
    .catch(error => {
        console.error(error)
    })
}
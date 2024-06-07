import axios from "axios";
import httpClient from '../services/httpClient'

export const filterPaginationData = async ({ create_new_arr = false, state, data, page, countRoute, data_to_send = {}, user = undefined }) => {
    let obj;

    let headers = {}

    if (state !== null && !create_new_arr) {
        obj = { ...state, results: [...data], page: page }
    }
    else {
        await httpClient.post(countRoute, data_to_send, headers)
            .then(({ data: { totalDocs } }) => {
                obj = { results: data, page: 1, totalDocs }

            })
            .catch(err => {
                console.log(err)
            })
    }
    return obj

}
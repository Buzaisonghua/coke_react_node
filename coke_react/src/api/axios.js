import axios from 'axios'

const axiosType = (url, type="GET", data={}) => {
    type = type.toLocaleUpperCase()
    if (type === 'POST') {
        url = `/api${url}`
        return {
            url: url,
            method: type,
            data: {
                ...data
            }
        }
    } else if (type === 'GET' ) {
        if (JSON.stringify(data) !== '{}') {
            let dataStr = '?'
            for (let i in data) {
                dataStr += `${i}=${data[i]}&`
            }
            dataStr = dataStr.slice(0, dataStr.length - 1)
            url += dataStr
        }
        return {
            url: url,
            methods: type
        }
    }
}

export default (url, type="GET", data={}) => new Promise((resolve, reject) => {
    axios({
        ...axiosType(url, type,data)
    }).then(res => {
        resolve(res.data)
    }).catch(e => {
        console.log(e)
        reject()
    })
})
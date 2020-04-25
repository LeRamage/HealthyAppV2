import http from "../http-common"

class DataService {
    connect(data) {
        return http.post("/login", data)
    }
    signup(data) {
        return http.post('/signup', data)
    }
}

export default new DataService();
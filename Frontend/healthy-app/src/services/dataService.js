import http from "../http-common"

class DataService {
    connect(data) {
        return http.post("/login", data)
    }
}

export default new DataService();
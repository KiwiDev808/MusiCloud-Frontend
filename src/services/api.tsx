import axios from 'axios'

axios.defaults.baseURL = 'https://backend-fullstack-labenu.herokuapp.com'

interface loginInput {
  email: string
  password: string
}

interface signupInput {
  name: string
  email: string
  password: string
  nickname: string
}

export class API {
  static async signup(data: signupInput) {
    const request = axios.post('/user/signup', data)
    return request.then((response) => response.data)
  }

  static async login(data: loginInput) {
    const request = axios.post('/user/login', data)
    return request.then((response) => response.data)
  }

  static async getAllMusics(token: string) {
    const request = axios.get('/music/all', {
      headers: {
        Authorization: token,
      },
    })
    return request.then((response) => response.data)
  }

  static async getAllGenres(token: string) {
    const request = axios.get('/music/genres', {
      headers: {
        Authorization: token,
      },
    })
    return request.then((response) => response.data)
  }

  static async getUserAlbum(token: string) {
    const request = axios.get('/music/albums', {
      headers: {
        Authorization: token,
      },
    })
    return request.then((response) => response.data)
  }

  static async getMusicById(token: string, id: string) {
    const request = axios.get(`/music/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    return request.then((response) => response.data)
  }
}

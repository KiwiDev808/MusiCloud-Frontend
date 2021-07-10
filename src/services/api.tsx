import axios from 'axios'

axios.defaults.baseURL = 'https://musicloud-backend.herokuapp.com'

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

interface createMusicInput {
  title: string
  genresIds: string
  albumId: string
  file: string
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

  static async getUserMusics(token: string) {
    const request = axios.get('/music', {
      headers: {
        Authorization: token,
      },
    })
    return request.then((response) => response.data)
  }

  static async createMusic(data: createMusicInput, token: string) {
    const request = axios.post('/music', data, {
      headers: {
        Authorization: token,
      },
    })
    return request.then((response) => response.data)
  }

  static async getAllGenres(token: string) {
    const request = axios.get('/genre', {
      headers: {
        Authorization: token,
      },
    })
    return request.then((response) => response.data)
  }

  static async getUserAlbum(token: string) {
    const request = axios.get('/album', {
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

import { Music } from './Music'

export type MusicDetails = Music & { genres: string[]; album: string }

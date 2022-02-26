export type LoginDto = {
    email: string
    password: string
}

export type RegisterDto = {
    fullName: string
} & LoginDto;
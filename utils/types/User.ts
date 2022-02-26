export type UserType = {
    createdAt: string
    email: string
    fullName: string
    id: number
    password: string
    updatedAt: string
    token: string
};

export type UserRatingType = {
    commentsCount: number
} & UserType;
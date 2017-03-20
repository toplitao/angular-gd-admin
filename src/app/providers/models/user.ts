export class Token {
    token_type: string;
    expires_in: string;
    access_token: string;
    refresh_token: string;
}

export class User {
    id: string;
    username: string;
    mobile: string;
    created_at: string;
    shop?: any;
}

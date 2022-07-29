const jwt = require('jsonwebtoken')


const accessTokenPrivateKey = process.env.ACCESS_TOKEN_PRIVATE_KEY
const accessTokenPublicKey = process.env.ACCESS_TOKEN_PUBLIC_KEY

const refreshTokenPrivateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY
const refreshTokenPublicKey = process.env.REFRESH_TOKEN_PUBLIC_KEY

// we sign with private and verify with publick
export const signJWT = 
(
    payload: Object,
    keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
    options: any
) => {
    const privateKey = Buffer.from( accessTokenPrivateKey, 'base64').toString('ascii');
    return jwt.sign(payload, privateKey, { ...(options && options), algorithm: 'RS256'});
};



// export const verifyJWT = <T>(

// )
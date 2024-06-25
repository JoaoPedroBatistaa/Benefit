import { constants, publicEncrypt } from 'crypto';

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1FWs4gcR1o/Md1Cx1w3A
OnZsqZtzNGGnlIFigEGTohxb3lCGfjl+p45Pn9lkPdL/GeFHA7hvtXM1eXXQt/T1
icwfcP+zTRcyu8QXO8A1gTupBUcnciHz5H4dVPwYUE2QE3AHJWdamawrVQo/PN71
BAUT3nn/nBnm1cvy/IqE7gKILfxPHxBt5xKDQ9mGneuCKwAYEZiZs8o2dr8Rjk94
Qo6HV294oh7Le6incM1tTPr1uk/P8gPxhAUr4Wrt5ri45aaeKQVPHcZX7zVtJ4r6
zCNGumnXK+24q0h3uap5Fi+rSFJ0FusCT1A7Kw3NLYccjB3+5LLXHeggpETQMK2e
3QIDAQAB
-----END PUBLIC KEY-----`;

export default function handler(req: any, res: any) {
    try {
        const { data } = req.body;

        const buffer = Buffer.from(data);
        const encrypted = publicEncrypt({
            key: publicKey,
            padding: constants.RSA_PKCS1_PADDING
        }, buffer);

        res.status(200).json({ encrypted: encrypted.toString('base64') });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error encrypting data' });
    }
}

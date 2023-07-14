import crypto from "crypto"

export function getHash(data:string) {
    return crypto.createHash("sha256").update(data).digest("hex")
}

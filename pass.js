import bcrypt from 'bcrypt';
import dotenv from 'dotenv';


export default async function checkPass (password) {
    dotenv.config();
    const hash = await bcrypt.hash(process.env.PASSWORD, 3);
    
    return await bcrypt.compare(password, hash);
}
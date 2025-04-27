import bcrypt from 'bcryptjs';

const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);  
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

const CheckPassword = async (enteredPassword: string, hashedPassword: string) => {
    const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);
    return isMatch;
};

export function Senhas(tipo: string, senha: string, senha2: string) {
    switch(tipo) {
        case "Hash":
            hashPassword(senha)
            break
        case "Check":
            CheckPassword(senha,senha2)
            break
    }
}
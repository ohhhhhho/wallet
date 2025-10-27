export interface UserBase {
    id: string;
    password: string;
    createdAt: string;
}

export interface UserWithActive extends UserBase {
    active: boolean;
}

export interface UserImport{
    mnemonic:string;
    isImport: boolean;
}

export interface UserKeys {
    publicKey:string;
    privateKey:string;
    address:string;
}

export interface WalletData {
    password?: string; 
    active?: boolean;
    mnemonic?: string;
    publicKey?: string;
    privateKey?: string;
    address?: string;
    isImport?: boolean;
}
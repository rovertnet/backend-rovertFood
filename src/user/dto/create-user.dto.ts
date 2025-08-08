export class CreateUserDto {
  email: string;
  nom: string;
  motDePasse: string;
  role: 'CLIENT' | 'ADMIN' = 'CLIENT'; // Default role is CLIENT
}

export default interface User {
  userData: {
    // caso a api passe a retornar mais informações do user só adicionar aqui
    id: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
}


export interface ICompany {
    id: number;
    email: string;
    name: string;
    description: string;
    image_url: string;
}



export class ICreateCompanyDto {
  email: string;
  name: string;
  description?: string;
  image_url?: string;
}


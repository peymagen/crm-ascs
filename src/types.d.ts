declare module "*.svg" {
  import * as React from "react";
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

interface Base {
  id?: number;
  status?: number;
  created_at?: string;
  updated_at?: string;
}

interface IUser extends Base {
  email: string;
  password?: string;
}

interface ILoginFormInputs {
  email: string;
  password: string;
}

interface IResponse {
  total?: number;
  data?: {
    accessToken: string;
    refreshToken: string;
    user?: object;
  };
  message: string;
  success: boolean;
}

interface IGalleryItem {
  id: number;
  ref_id: string;
  image: string;
  title?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

interface IGalleryResponse {
  data: IGalleryItem[];
  success: boolean;
  message?: string;
}

interface IResponse {
  success: boolean;
  message: string;
  data?: any;
}
interface ISliders extends Base {
  title: string;
  description: string;
  image: File | string;
}

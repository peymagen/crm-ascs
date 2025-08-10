// declare module "*.svg" {
//   import * as React from "react";
//   export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
//   const src: string;
//   export default src;
// }

// declare module "*.module.css" {
//   const classes: { [key: string]: string };
//   export default classes;
// }

// interface Base {
//   id?: number;
//   status: number;
//   created_at?: string;
//   updated_at?: string;
// }

// interface IUser {
//   email: string;
//   password?: string;
//   role: string;
// }




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
  status: number;
  created_at?: string;
  updated_at?: string;
}

interface IUser {
  email: string;
  password?: string;
  role: string;
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
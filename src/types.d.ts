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
  createdOn?: string;
  updatedOn?: string;
}

interface IUser extends Base {
  email: string;
  password?: string;
}

interface ILoginFormInputs {
  email: string;
  password: string;
}

interface IFAQ extends Base {
  question: string;
  answer: string;
}

interface IGalleryCategory extends Base {
  title: string;
  description: string;
}

interface IGalleryImage extends Base {
  ref_id: number;
  image: File | FileList | string; // stored path or URL
}
interface IGalleryItem extends Base {
  title: string;
  description: string;
  images: IGalleryImage[];
}

interface IPage extends Base {
  append(arg0: string, arg1: string): unknown;
  title: string;
  description: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  image?: string | FileList | File;
  publishDate: string;
  lang: string;
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

interface IMainMenu extends Base {
  name: string;
  url?: string;
  other_url?: string;
  target?: string;
  sorting_order?: number;
  lang?: string;
}
interface IFooterMenu extends Base {
  name: string;
  url?: string;
  other_url?: string;
  target?: string;
  sorting_order?: number;
  lang?: string;
}
interface IQuickMenu extends Base {
  name: string;
  url?: string;
  other_url?: string;
  target?: string;
  sorting_order?: number;
  lang?: string;
}

interface ISettings extends Base {
  name: string;
  logo?: File | FileList | string;
  slogan: string;
  videoUrl?: File | FileList | string;
  content: string;
  audioUrl?: File | FileList | string;
  lang: string;
}

interface ISubMenu extends Base {
  name: string;
  url?: string;
  parent_id?: number;
  other_url?: string;
  target?: string;
  sorting_order?: number;
  lang?: string;
}

interface IOpportunity extends Base {
  get(arg0: string): unknown;
  title: string;
  file_url: File | string | FileList;
  type: string;
  notice: number;
}

interface IPortal extends Base {
  title: string;
  url: string;
  image: File | string | FileList;
}
interface ISliders extends Base {
  title: string;
  description: string;
  image?: File | string | FileList;
}
interface ISocialLink extends Base {
  title: string;
  url: string;
}
interface ITelephonic extends Base {
  name: string;
  email: string;
  phone: string;
  description: string;
}

export interface Discovery {
  id?: string;
  title: string;
  link: string;        // slug sans slash: 'umbria-jazz'
  imgPath: string;
  content?: string;
  textTitle?: string;
  paragraphs?: string[];
  imgs?: string[];
  order?: number;
}

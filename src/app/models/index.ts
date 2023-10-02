export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Review {
  id: number;
  title: string;
  body: string;
  author: {
    name: string;
    date: number;
    photo: string;
  };
  views: number;
  score: number;
  brand: string;
  brandId: string;
  model: string;
  type: string;
  dealer: string;
}

export interface SelectData {
  label: string;
  id: string;
}

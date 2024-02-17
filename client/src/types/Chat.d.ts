interface Chat {
  _id: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface PotentialChat {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

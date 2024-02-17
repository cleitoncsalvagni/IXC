interface Chat {
  _id: string;
  members: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface PotentialChat {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

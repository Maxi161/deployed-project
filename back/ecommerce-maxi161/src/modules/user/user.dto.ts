interface IUserDataTransfer {
  id?: string;
  email: string;
  name: string;
  password: string;
  address: string;
  phone: number;
  country?: string;
  city?: string;
}

export default IUserDataTransfer;

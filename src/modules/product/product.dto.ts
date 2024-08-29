interface IProductDataTransfer {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl?: string;
  category?: string;
}

export default IProductDataTransfer;

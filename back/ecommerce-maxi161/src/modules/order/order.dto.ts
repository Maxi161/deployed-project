import { Product } from '../../entities/product.entity';

interface IOrderDataTransfer {
  userId: string;
  products: Product[];
  time: string;
}

export default IOrderDataTransfer;

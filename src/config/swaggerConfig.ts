import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Api Ecommerce Maxi161')
  .setDescription(
    'Esta es una documentación creada para facilitar la utilización de la api. Aqui se podrán observar los end-point con sus respectivos bodys y headers',
  )
  .setVersion('1.0')
  .addBearerAuth()
  .addBasicAuth()
  .build();

export default swaggerConfig;

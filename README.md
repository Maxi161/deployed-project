# Proyecto de E-commerce - Back-End

## User Stories

    1. Como usuario no registrado, quiero poder registrarme en la aplicación para poder ingresar con un usuario y contraseña.
    2. Como usuario registrado, quiero poder agregar productos al carrito para poder realizar compras, limitado a una unidad por producto.
    3. Como usuario registrado, quiero poder emitir una Orden de Compra para registrar la compra de los productos seleccionados en un Detalle de Compras.
    4. Como usuario registrado, quiero que mis órdenes de compra estén asociadas a mi cuenta para poder ver un Detalle de Compra con la información de los productos adquiridos.
    5. Como administrador, quiero poder actualizar la información de los productos para mantener la base de datos de productos actualizada.
    6. Como administrador, quiero poder actualizar el stock de los productos y agregar imágenes para gestionar el inventario y presentación de productos utilizando un servicio de nube.

## Consideraciones:

    1. Un usuario no registrado debe poder navegar por la tienda, pero no podrá realizar compras hasta que se registre.
    2. Las órdenes de compra deben estar vinculadas al usuario que las realiza para asegurar un historial de compras preciso.
    3. Los productos en el carrito deben estar limitados a una unidad por producto para simplificar la gestión de inventario.

## Administrador:

    1. El usuario administrador debe ser capaz de cargar nuevas imágenes para los productos mediante un servicio de nube.
    2. El usuario registrado debe poder visualizar un historial de compras con detalles específicos de cada transacción.
    3. La aplicación debe ofrecer una sección donde el administrador pueda gestionar los productos y su stock de manera eficiente.

## Diagrama de Entidad Relación (DER)

<img src="./DER/e-commerce DER.png">

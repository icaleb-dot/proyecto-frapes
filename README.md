# proyecto-frapes
NoSQL class project
# debuggin in postman

1. Crear Menú:
POST http://localhost:3001/api/menu
{
  "nombre": "Frappe Gansito",
  "precio": 60,
  "categoria": "frappe",
  "tamano": "grande",
  "descripcion": "Delicioso frappe de gansito"
}


1. Registrar usuario:
POST http://localhost:3001/api/users/register
{
  "nombre": "Tester Postman",
  "email": "postman@test.com",
  "password": "123456",
  "rol": "cliente"
}

2. Logear usuario:
POST http://localhost:3001/api/users/login
{
  "email": "postman@test.com",
  "password": "123456"
}
(copiar ID!!)

3. Ver Perfil (GET - Prueba de Sesión):
GET http://localhost:3001/api/users/ID

4. Crear pedido
POST http://localhost:3001/api/orders
{
  "usuarioId": "PEGAR_ID_AQUI",
  "productos": [
    {
      "nombre": "Frappe Gansito",
      "tamano": "grande",
      "precio": 60,
      "detalles": "Con chispas extra",
      "cantidad": 1
    }
  ],
  "total": 60
}

5. Ver pedidos (todos)
GET http://localhost:3001/api/orders


6. Ver analiticas (cassandra)
GET http://localhost:3001/api/analytics/dashboard


SEEDING EN TERMINAL
MENU:
docker exec -it frapes-app node seedMenu.js
ADMINISTRADOR:
docker exec -it frapes-app node createAdmin.js
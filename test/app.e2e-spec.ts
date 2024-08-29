import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YTFmOWJlMC0zYmJhLTQ1MDgtYTgyNC1kZDIxMDU1M2YwMDIiLCJpZCI6IjlhMWY5YmUwLTNiYmEtNDUwOC1hODI0LWRkMjEwNTUzZjAwMiIsImVtYWlsIjoicGVyb25wZXJvbnBuQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzI0Njg3MTc4LCJleHAiOjE3MjQ2OTA3Nzh9.Ajnpi9PHUPuJ0beUIQFhPj7nKV4FkQbXgjeJDblP5TM';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Post /auth/signUp', async () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        userData: {
          email: 'peronperonper@gmail.com',
          name: 'PeronPERONPERON',
          password: 'password123',
          address: '123 Main St',
          phone: '+123456789',
          country: 'Argentina',
          city: 'TUCUmán',
        },
        passwordToConfirm: 'password123',
      })
      .expect(400)
      .expect(Object);
  });

  it('Post /auth/signin', async () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'peronperonper@gmail.com',
        password: 'password123',
      })
      .expect(201)
      .expect(Object);
  });

  it('Post /product', async () => {
    return request(app.getHttpServer())
      .post('/product')
      .set('Authorization', 'Basic test@email.com:testPassword123')
      .send({
        name: 'Dron',
        description: 'the best Dron',
        price: 1550.5,
        stock: 1,
        imgUrl: 'https://example.com/images/gaming-headset.jpg',
        category: 'Tech',
      })
      .expect(201)
      .expect(String);
  });

  it('Get /user', async () => {
    return request(app.getHttpServer())
      .get('/user')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect(Object);
  });

  it('Get /Product', async () => {
    return request(app.getHttpServer())
      .get('/product')
      .expect(200)
      .expect(Object);
  });
});

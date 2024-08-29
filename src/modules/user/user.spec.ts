import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CreateUserDto } from '../../dtos/createUser.dto';
import { User } from '../../entities/user.entity';
import { Role } from '../../decorators/roles.enum';

describe('UserService', () => {
  let userService: UserService;

  const getAllUsers = () =>
    Promise.resolve([
      {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        address: '123 Main St',
        phone: 123456789,
        country: 'Argentina',
        city: 'Tucumán',
        role: Role.User,
      },
    ]);

  const createUser = (userData: CreateUserDto) =>
    Promise.resolve({
      ...userData,
      id: '1',
    } as User);

  const getUserById = (id: string) =>
    Promise.resolve({
      id,
      email: 'test@example.com',
      name: 'Test User',
      address: '123 Main St',
      phone: 123456789,
      country: 'Argentina',
      city: 'Tucumán',
      role: Role.User,
    } as User);

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserService,
          useValue: {
            getAllUsers,
            createUser,
            getUserById,
          },
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create a user and return it without password', async () => {
    const userData: CreateUserDto = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123',
      address: '123 Main St',
      phone: 123456789,
      country: 'Argentina',
      city: 'Tucumán',
      role: Role.User,
    };

    const result = await userService.createUser(userData);
    expect(result).toEqual(
      expect.objectContaining({
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      }),
    );
  });

  it('should return a list of users without passwords', async () => {
    const users = await userService.getAllUsers(1, 10);
    expect(users.length).toBe(1);
  });

  it('should return a user by ID without password', async () => {
    const result = await userService.getUserById('1');
    expect(result).toEqual(
      expect.objectContaining({
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      }),
    );
  });
});

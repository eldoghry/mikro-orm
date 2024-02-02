import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const _em = this.em.fork();
    const user = _em.create(User, createUserDto);
    await _em.persistAndFlush(user);
    return user;
  }

  async findAll() {
    const _em = this.em.fork();
    // const users = await _em.find(User, {});

    // const users = await this.repo.find({});
    const [users, total] = await _em.findAndCount(User, {});
    return { total, data: users };
  }

  async findOne(id: number) {
    const user = await this.findOneOrFail(id);
    await wrap(user).populate(['bio', 'password']);
    console.log(user); //password is hidden by serialization
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOneOrFail(id);
    const _em = this.em.fork();

    console.log(updateUserDto);

    _em.assign(user, updateUserDto);
    await _em.persist(user).flush();

    return user;
  }

  remove(id: number) {
    const _em = this.em.fork();
    const user = _em.getReference(User, id); // no need to load entity for db, you can load ony ref from identity map
    return _em.removeAndFlush(user);
  }

  async findOneOrFail(id: number) {
    // const user = await this.userRepo.findOne({ id });

    const _em = this.em.fork();
    const user = await _em.findOne(User, { id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}

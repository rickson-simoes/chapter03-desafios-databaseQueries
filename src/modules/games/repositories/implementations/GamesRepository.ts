import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder("games")
      .where("title ILIKE '%' || :title || '%'", { title: param })
      .getMany();
      // Complete usando query builder
      // outra forma de colocar o like
      // .where("title ILIKE :title", { title: `%${param}%` })
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("SELECT COUNT(*) FROM games"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository
      .createQueryBuilder("games")
      .innerJoinAndSelect("games.users", "user")
      .where("games.id = :id", { id })
      .getOneOrFail()
      .then(({users}) => {
        return users
      });

      /*
      Outra forma.

      const games = await this.repository
      .createQueryBuilder("games")
      .innerJoinAndSelect("games.users", "user")
      .where("games.id = :id", { id })
      .getOneOrFail();

      const { users } = games;
    
      return users;
      
      */
      // Complete usando query builder
  }
}
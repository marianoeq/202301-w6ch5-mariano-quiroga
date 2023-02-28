import { ThingsFileRepo } from './things.file.repo';
import fs from 'fs/promises';
import { knowledge } from '../entities/things.models';
//Mockeo el file system
jest.mock('fs/promises');

describe('Given', () => {
  //ARRANGE
  const repo = new ThingsFileRepo();

  //ACT

  test('Then it could be instantiated', () => {
    expect(repo).toBeInstanceOf(ThingsFileRepo);
  });

  describe('When I use query', () => {
    test('It should return data', async () => {
      //ASSERT
      (fs.readFile as jest.Mock).mockResolvedValue('[]');
      const result = await repo.query();

      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When I use query id', () => {
    test('then it should.... if it has a valid ID', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{ "id": 1}]');
      const id = 1;
      const result = await repo.queryId(id);
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual({ id: 1 });
    });

    test('then it should.... if it has a NO valid ID', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{ "id": "2" }]');
      const id = 1;
      // CUando testeamos un error delante del toThrow poner rejects para que avise que es asincrono.
      expect(async () => await repo.queryId(id)).rejects.toThrow();
      expect(fs.readFile).toHaveBeenCalled();
    });
  });
  describe('When I use create', () => {
    test('Then it should return an object with data I sent', async () => {
      (fs.writeFile as jest.Mock).mockResolvedValue(
        '[{"id":2,"name": "flex"}]'
      );
      const result = await repo.create({ id: 2, name: 'flex' });
      expect(result).toEqual({ id: 2, name: 'flex' });
      expect(fs.writeFile).toHaveBeenCalled();
    });
  });

  describe('When call the update method (ok)', () => {
    test('Then it should call readFile, writeFile and return the item updated', async () => {
      const value = [
        { id: 5, name: 'Test' },
        { id: 1, name: 'Test2' },
      ];
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(value));
      const result = await repo.update({ id: 5, name: 'Test' });
      expect(fs.readFile).toHaveBeenCalled();
      expect(fs.writeFile).toHaveBeenCalled();

      expect(result).toEqual({ id: 5, name: 'Test' });
    });
  });
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { UserServiceService } from '../services/user-service.service';

const localidades = [
  { id: 1, nombre: 'Capital Federal' },
  { id: 2, nombre: 'Rosario' },
];

const mockRepo = {
  findAll: async () => localidades,
  findOne: async (id: number) => localidades.find((l) => l.id === id),
  create: async (dto: any) => ({ id: 3, ...dto }),
  update: async (id: number, dto: any) => ({ id, ...dto }),
  remove: async (id: number) => ({ id, nombre: 'deleted' }),
};

const service = new UserServiceService(mockRepo as any);

test('UserServiceService.findAll returns localidades', async () => {
  const res = await service.findAll();
  assert.deepStrictEqual(res, localidades);
});

test('UserServiceService.findOne returns a localidad by id', async () => {
  const res = await service.findOne(2);
  assert.deepStrictEqual(res, localidades[1]);
});

test('UserServiceService.create returns created localidad', async () => {
  const res = await service.create({ nombre: 'Mendoza' });
  assert.strictEqual(res.nombre, 'Mendoza');
  assert.strictEqual(res.id, 3);
});

test('UserServiceService.update returns updated localidad', async () => {
  const res = await service.update(1, { nombre: 'Buenos Aires' });
  assert.strictEqual(res.nombre, 'Buenos Aires');
  assert.strictEqual(res.id, 1);
});

test('UserServiceService.remove returns removed localidad', async () => {
  const res = await service.remove(1);
  assert.strictEqual(res.id, 1);
});

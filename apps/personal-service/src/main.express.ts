import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { json } from 'body-parser';
import { RolRepository } from './daos/rol.repository';
import { PermisoRepository } from './daos/permiso.repository';
import { RolPermisoRepository } from './daos/rol-permiso.repository';
import { PrismaService } from './lib/prisma.service';
import { PersonalServiceService } from './services/personal-service.service';
import { personalRouter } from './routes/personal.router';

const app = express();
app.use(cors());
app.use(json());

// Instantiate Prisma and repositories (manual DI)
const prisma = new PrismaService();
prisma.$connect().catch((err) => console.error('Prisma connect error', err));
const rolRepo = new RolRepository(prisma as any);
const permisoRepo = new PermisoRepository(prisma as any);
const rolPermisoRepo = new RolPermisoRepository(prisma as any);
const service = new PersonalServiceService(rolRepo as any, permisoRepo as any, rolPermisoRepo as any);

// Attach router with service bound
app.use('/', personalRouter(service as any));

// Minimal OpenAPI spec so Swagger UI shows our endpoints (manual definition)
const swaggerSpec = {
  openapi: '3.0.0',
  info: { title: 'Personal Service API', version: '1.0.0' },
  paths: {
    '/roles': {
      get: { summary: 'Listar roles', responses: { '200': { description: 'OK' } } },
      post: {
        summary: 'Crear rol',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateRol' },
              example: { nombre: 'ADMIN', activo: true },
            },
          },
        },
        responses: { '201': { description: 'Created' } },
      },
    },
    '/roles/{id}': {
      get: { summary: 'Obtener rol por id', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' } } },
      put: {
        summary: 'Actualizar rol',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/UpdateRol' }, example: { nombre: 'USER', activo: true } } } },
        responses: { '200': { description: 'OK' } },
      },
      patch: {
        summary: 'Actualizar parcialmente rol',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/UpdateRol' }, example: { activo: false } } } },
        responses: { '200': { description: 'OK' } },
      },
      delete: { summary: 'Eliminar rol', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' } } },
    },
    '/permisos': {
      get: { summary: 'Listar permisos', responses: { '200': { description: 'OK' } } },
      post: {
        summary: 'Crear permiso',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CreatePermiso' }, example: { recurso: 'usuarios', accion: 'create', nombre: 'Crear usuarios' } } } },
        responses: { '201': { description: 'Created' } },
      },
    },
    '/permisos/{id}': {
      get: { summary: 'Obtener permiso por id', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' } } },
      put: {
        summary: 'Actualizar permiso',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/UpdatePermiso' }, example: { recurso: 'usuarios', accion: 'update', nombre: 'Actualizar usuarios' } } } },
        responses: { '200': { description: 'OK' } },
      },
      patch: {
        summary: 'Actualizar parcialmente permiso',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/UpdatePermiso' }, example: { nombre: 'Editar usuarios' } } } },
        responses: { '200': { description: 'OK' } },
      },
      delete: { summary: 'Eliminar permiso', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' } } },
    },
    '/roles/{idRol}/permisos': {
      get: { summary: 'Listar permisos asignados a un rol', parameters: [{ name: 'idRol', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' } } },
      post: {
        summary: 'Asignar permiso a rol',
        parameters: [{ name: 'idRol', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateRolPermiso' }, example: { idPermiso: 2 } } } },
        responses: { '201': { description: 'Created' } },
      },
    },
    '/roles/{idRol}/permisos/{idPermiso}': {
      delete: { summary: 'Remover permiso de un rol', parameters: [{ name: 'idRol', in: 'path', required: true, schema: { type: 'integer' } }, { name: 'idPermiso', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' } } },
    },
  },
  components: {
    schemas: {
      Rol: { type: 'object', properties: { id: { type: 'integer' }, nombre: { type: 'string' }, activo: { type: 'boolean' } } },
      CreateRol: { type: 'object', required: ['nombre'], properties: { nombre: { type: 'string' }, activo: { type: 'boolean' } } },
      UpdateRol: { type: 'object', properties: { nombre: { type: 'string' }, activo: { type: 'boolean' } } },
      Permiso: { type: 'object', properties: { id: { type: 'integer' }, recurso: { type: 'string' }, accion: { type: 'string' }, nombre: { type: 'string' } } },
      CreatePermiso: { type: 'object', required: ['recurso','accion'], properties: { recurso: { type: 'string' }, accion: { type: 'string' }, nombre: { type: 'string' } } },
      UpdatePermiso: { type: 'object', properties: { recurso: { type: 'string' }, accion: { type: 'string' }, nombre: { type: 'string' } } },
      CreateRolPermiso: { type: 'object', required: ['idPermiso'], properties: { idPermiso: { type: 'integer' } } },
    },
  },
};

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Personal service (Express) listening on http://localhost:${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`Swagger available at http://localhost:${PORT}/swagger`);
});

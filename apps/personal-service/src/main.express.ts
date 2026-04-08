import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { json } from 'body-parser';
import { RolRepository } from './daos/rol.repository';
import { PermisoRepository } from './daos/permiso.repository';
import { PersonalServiceService } from './services/personal-service.service';
import { personalRouter } from './routes/personal.router';

const app = express();
app.use(cors());
app.use(json());

// Instantiate repositories and service (simple manual DI)
const rolRepo = new RolRepository();
const permisoRepo = new PermisoRepository();
const service = new PersonalServiceService(rolRepo as any, permisoRepo as any);

// Attach router with service bound
app.use('/', personalRouter(service as any));

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: { title: 'Personal Service API', version: '1.0.0' },
  },
  apis: [],
});

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Personal service (Express) listening on http://localhost:${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`Swagger available at http://localhost:${PORT}/swagger`);
});

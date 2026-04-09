import { Router, Request, Response } from 'express';
import { PersonalServiceService } from '../services/personal-service.service';

export function personalRouter(service: PersonalServiceService) {
  const router = Router();

  // Roles
  router.get('/roles', async (req: Request, res: Response) => {
    const list = await service.findAllRoles();
    res.json(list);
  });

  router.get('/roles/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const item = await service.findOneRol(id);
    res.json(item);
  });

  router.post('/roles', async (req: Request, res: Response) => {
    const created = await service.createRol(req.body);
    res.status(201).json(created);
  });

  router.put('/roles/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const updated = await service.updateRol(id, req.body);
    res.json(updated);
  });

  router.patch('/roles/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const updated = await service.updateRol(id, req.body);
    res.json(updated);
  });

  router.delete('/roles/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const removed = await service.removeRol(id);
    res.json(removed);
  });

  // Permisos
  router.get('/permisos', async (req: Request, res: Response) => {
    const list = await service.findAllPermisos();
    res.json(list);
  });

  router.get('/permisos/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const item = await service.findOnePermiso(id);
    res.json(item);
  });

  router.post('/permisos', async (req: Request, res: Response) => {
    const created = await service.createPermiso(req.body);
    res.status(201).json(created);
  });

  router.put('/permisos/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const updated = await service.updatePermiso(id, req.body);
    res.json(updated);
  });

  router.patch('/permisos/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const updated = await service.updatePermiso(id, req.body);
    res.json(updated);
  });

  router.delete('/permisos/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const removed = await service.removePermiso(id);
    res.json(removed);
  });

  // Rol <-> Permiso assignments
  router.post('/roles/:idRol/permisos', async (req: Request, res: Response) => {
    const idRol = Number(req.params.idRol);
    const idPermiso = Number(req.body.idPermiso);
    const created = await service.assignPermisoToRol({ idRol, idPermiso });
    res.status(201).json(created);
  });

  router.get('/roles/:idRol/permisos', async (req: Request, res: Response) => {
    const idRol = Number(req.params.idRol);
    const list = await service.listPermisosDeRol(idRol);
    res.json(list);
  });

  router.delete('/roles/:idRol/permisos/:idPermiso', async (req: Request, res: Response) => {
    const idRol = Number(req.params.idRol);
    const idPermiso = Number(req.params.idPermiso);
    const removed = await service.removePermisoFromRol(idRol, idPermiso);
    res.json(removed);
  });

  return router;
}

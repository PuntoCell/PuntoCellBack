import { Injectable, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class ApiGatewayService {
  private readonly logger = new Logger(ApiGatewayService.name);

  private serviceMap(): Record<string, string> {
    type ServiceKey =
      | 'user'
      | 'personal'
      | 'client'
      | 'notificaciones'
      | 'sucursales'
      | 'dispositivos'
      | 'inventario'
      | 'reportes'
      | 'ventas'
      | 'reparaciones'
      | 'catalogo';

    const defaults: Record<ServiceKey, string> = {
      // preserve existing ports for services already used
      user: process.env.SERVICE_USER ?? 'http://localhost:3001',
      personal: process.env.SERVICE_PERSONAL ?? 'http://localhost:3002',
      client: process.env.SERVICE_CLIENT ?? 'http://localhost:3003',
      notificaciones: process.env.SERVICE_NOTIFICACIONES ?? 'http://localhost:3004',

      // additional services (default ports start at 3005)
      sucursales: process.env.SERVICE_SUCURSALES ?? 'http://localhost:3005',
      dispositivos: process.env.SERVICE_DISPOSITIVOS ?? 'http://localhost:3006',
      inventario: process.env.SERVICE_INVENTARIO ?? 'http://localhost:3007',
      reportes: process.env.SERVICE_REPORTES ?? 'http://localhost:3008',
      ventas: process.env.SERVICE_VENTAS ?? 'http://localhost:3009',
      reparaciones: process.env.SERVICE_REPARACIONES ?? 'http://localhost:3010',
      catalogo: process.env.SERVICE_CATALOGO ?? 'http://localhost:3011',
    };

    // expose some useful aliases (spanish/english and singular/plural)
    return {
      ...defaults,
      clientes: defaults.client,
      cliente: defaults.client,
      usuarios: defaults.user,
      usuario: defaults.user,
      notif: defaults.notificaciones,
      notifications: defaults.notificaciones,
    };
  }

  private resolveTarget(path: string): string | null {
    // Expect paths like /user/... or /personal/...
    const parts = path.split('/').filter(Boolean);
    if (!parts.length) return null;
    const svc = parts[0];
    if (!svc) return null;
    const map = this.serviceMap();
    return map[svc] ?? null;
  }

  async proxy(req: Request, res: Response) {
    const targetBase = this.resolveTarget(req.path);
    if (!targetBase) {
      res.status(502).json({ error: 'Unknown service for path' });
      return;
    }

    const targetUrl = `${targetBase}${req.originalUrl}`;
    this.logger.log(`Proxy ${req.method} ${req.originalUrl} -> ${targetUrl}`);

    const headers = { ...req.headers } as Record<string, any>;
    delete headers.host;

    const axiosConfig: AxiosRequestConfig = {
      url: targetUrl,
      method: req.method as any,
      headers,
      responseType: 'stream',
      data: req.body,
      validateStatus: () => true,
      timeout: 30000,
    };

    try {
      const response = await axios.request(axiosConfig);
      // copy status and headers
      Object.entries(response.headers || {}).forEach(([k, v]) => {
        try {
          res.setHeader(k, v as any);
        } catch (e) {
          // ignore header set errors
        }
      });
      res.status(response.status);
      // pipe stream
      if (response.data && typeof (response.data as any).pipe === 'function') {
        (response.data as any).pipe(res);
      } else {
        res.send(response.data);
      }
    } catch (err: any) {
      this.logger.error('Proxy error', err?.message ?? err);
      res.status(502).json({ error: 'Bad gateway', details: err?.message });
    }
  }
}

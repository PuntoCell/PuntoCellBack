import {
  Injectable,
  InternalServerErrorException,
  OnModuleDestroy,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sql from 'mssql';

@Injectable()
export class SqlServerService implements OnModuleDestroy {
  private pool: sql.ConnectionPool | null = null;

  constructor(private readonly configService: ConfigService) {}

  async createRequest(): Promise<sql.Request> {
    const pool = await this.getPool();
    return pool.request();
  }

  async onModuleDestroy(): Promise<void> {
    if (this.pool) {
      await this.pool.close();
      this.pool = null;
    }
  }

  private async getPool(): Promise<sql.ConnectionPool> {
    if (this.pool?.connected) {
      return this.pool;
    }

    const connectionOptions = this.getConnectionOptions();
    this.pool = await new sql.ConnectionPool(connectionOptions).connect();

    return this.pool;
  }

  private getConnectionOptions(): sql.config {
    const server = this.getRequired('DB_HOST');
    const database = this.getRequired('DB_NAME');
    const user = this.getRequired('DB_USER');
    const password = this.getRequired('DB_PASSWORD');
    const instanceName = this.configService.get<string>('DB_INSTANCE');
    const encrypt = this.configService.get<string>('DB_ENCRYPT') === 'true';
    const trustServerCertificate =
      this.configService.get<string>('DB_TRUST_SERVER_CERTIFICATE') !== 'false';
    const portValue = this.configService.get<string>('DB_PORT');
    const port = portValue ? Number(portValue) : undefined;

    return {
      server,
      database,
      user,
      password,
      options: {
        encrypt,
        trustServerCertificate,
        instanceName: port ? undefined : instanceName || undefined,
      },
      ...(port ? { port } : {}),
    };
  }

  private getRequired(key: string): string {
    const value = this.configService.get<string>(key);

    if (!value) {
      throw new InternalServerErrorException(
        `Falta configurar la variable ${key} en el archivo .env`,
      );
    }

    return value;
  }
}
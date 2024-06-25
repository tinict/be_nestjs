import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

async function DatabaseOrmModule(): Promise<DynamicModule> {
  const envFile = path.resolve(__dirname, '../../../', `.env`);
  const envConfig = dotenv.parse(fs.readFileSync(envFile));

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });

  return TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.RDS_HOST,
    port: +process.env.RDS_PORT,
    database: process.env.RDS_NAME,
    username: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    // socketPath: `/cloudsql/${process.env.INSTANCE_UNIX_SOCKET}`,
    // replication: {
    //   master: {
    //     host: process.env.RDS_HOST,
    //     port: +process.env.RDS_PORT,
    //     database: process.env.RDS_NAME,
    //     username: process.env.DB_USER,
    //     password: process.env.DB_PASSWORD,
    //   },
    //   slaves: [
    //     {
    //       host: process.env.RDS_READ_HOST,
    //       port: +process.env.RDS_READ_PORT,
    //       database: process.env.RDS_READ_NAME,
    //       username: process.env.DB_READ_USER,
    //       password: process.env.DB_READ_PASSWORD,
    //     },
    //   ],
    // },
    synchronize: true,
    entities: [__dirname + '../../**/*.entity{.ts,.js}'],
    logging: true,
  });
}

@Global()
@Module({
  imports: [DatabaseOrmModule()],
})
export class MysqlModule {}

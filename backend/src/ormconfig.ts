import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config()

const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default ormConfig;

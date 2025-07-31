import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(
    private readonly sequelize: Sequelize,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    const isProduction = this.configService.get('NODE_ENV') === 'production';
    const shouldRunMigrations =
      this.configService.get('RUN_MIGRATIONS', 'false') === 'true';
    const shouldRunSeeds =
      this.configService.get('RUN_SEEDS', 'false') === 'true';

    try {
      // Test database connection
      await this.sequelize.authenticate();
      this.logger.log('Database connection established successfully.');

      // Run migrations if enabled
      if (shouldRunMigrations) {
        await this.runMigrations();
      }

      // Run seeds if enabled
      if (shouldRunSeeds) {
        await this.runSeeds();
      }

      // In development, sync models (disabled in production)
      if (!isProduction) {
        await this.sequelize.sync({ alter: true });
        this.logger.log('Database synchronized in development mode.');
      }
    } catch (error) {
      this.logger.error('Database initialization failed:', error);
      throw error;
    }
  }

  private async runMigrations() {
    try {
      this.logger.log('Running database migrations...');
      const { exec } = require('child_process');
      const { promisify } = require('util');
      const execAsync = promisify(exec);

      const result = await execAsync('npx sequelize-cli db:migrate');
      this.logger.log('Migrations completed successfully');
      this.logger.debug(result.stdout);
    } catch (error) {
      this.logger.error('Migration failed:', error);
      throw error;
    }
  }

  private async runSeeds() {
    try {
      this.logger.log('Running database seeds...');
      const { exec } = require('child_process');
      const { promisify } = require('util');
      const execAsync = promisify(exec);

      const result = await execAsync('npx sequelize-cli db:seed:all');
      this.logger.log('Seeds completed successfully');
      this.logger.debug(result.stdout);
    } catch (error) {
      this.logger.error('Seeding failed:', error);
      throw error;
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.sequelize.authenticate();
      return true;
    } catch (error) {
      this.logger.error('Database health check failed:', error);
      return false;
    }
  }
}

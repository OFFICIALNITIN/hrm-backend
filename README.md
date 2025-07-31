<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# HRM Backend

A comprehensive Human Resource Management System backend built with NestJS and PostgreSQL.

## Features

- User authentication and authorization
- Employee management
- Department management
- Leave request management
- Attendance tracking
- RESTful API with Swagger documentation
- Database migrations and seeding
- Cloud-ready deployment

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Local Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd hrm-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env
   # Edit .env with your database credentials
   ```

4. **Run with Docker (recommended)**

   ```bash
   docker-compose up --build
   ```

5. **Or run locally**
   ```bash
   # Start PostgreSQL first, then:
   npm run db:setup
   npm run start:dev
   ```

## Database Setup

### Automatic Setup (Recommended)

The application automatically handles database setup when you set these environment variables:

```env
RUN_MIGRATIONS=true
RUN_SEEDS=true
```

### Manual Setup

1. **Create database**

   ```bash
   npm run db:create
   ```

2. **Run migrations**

   ```bash
   npm run db:migrate
   ```

3. **Seed initial data**
   ```bash
   npm run db:seed
   ```

### Database Scripts

- `npm run db:migrate` - Run pending migrations
- `npm run db:migrate:undo` - Undo last migration
- `npm run db:migrate:undo:all` - Undo all migrations
- `npm run db:seed` - Run all seeders
- `npm run db:seed:undo` - Undo all seeds
- `npm run db:setup` - Run migrations and seeds
- `npm run db:reset` - Reset database (undo all + setup)

## Cloud Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://your-frontend-domain.com

# Database Configuration
DB_DIALECT=postgres
DB_HOST=your-db-host
DB_PORT=5432
DB_USERNAME=your-db-username
DB_PASSWORD=your-db-password
DB_DATABASE=your-db-name

# Database Setup
RUN_MIGRATIONS=true
RUN_SEEDS=true
WAIT_FOR_DB=true

# JWT Configuration
JWT_SECRET=your-secure-jwt-secret
JWT_EXPIRES_IN=24h
```

### Deployment Options

#### 1. Docker Deployment

```bash
# Build and run with Docker
docker build -t hrm-backend .
docker run -p 3000:3000 --env-file .env hrm-backend
```

#### 2. Manual Deployment

```bash
# Install dependencies
npm ci --only=production

# Build application
npm run build

# Run deployment script
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

#### 3. Platform-Specific Deployment

**Heroku:**

```bash
# Add PostgreSQL addon
heroku addons:create heroku-postgresql:hobby-dev

# Deploy
git push heroku main

# Run migrations
heroku run npm run db:migrate
heroku run npm run db:seed
```

**AWS/EC2:**

```bash
# Use the deployment script
./scripts/deploy.sh
```

**Vercel/Railway/Render:**

- Set environment variables in platform dashboard
- Deploy using Git integration
- The app will automatically run migrations and seeds on startup

### Health Check

The application provides a health check endpoint:

```
GET /health
```

Response:

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": "connected"
}
```

## API Documentation

Once the application is running, visit:

- Swagger UI: `http://localhost:3000/api-docs`
- Health Check: `http://localhost:3000/health`

## Default Admin User

After running seeds, you can login with:

- Email: `admin@hrm.com`
- Password: `admin123`

**Important:** Change the default password in production!

## Development

### Project Structure

```
src/
├── auth/           # Authentication module
├── users/          # User management
├── modules/        # Business modules
│   ├── departments/
│   ├── employees/
│   ├── leave/
│   └── attendance/
├── core/           # Core services
│   └── database/   # Database service
├── config/         # Configuration
├── migrations/     # Database migrations
└── seeders/        # Database seeders
```

### Adding New Migrations

```bash
npx sequelize-cli migration:generate --name migration-name
```

### Adding New Seeders

```bash
npx sequelize-cli seed:generate --name seeder-name
```

## Troubleshooting

### Database Connection Issues

1. Check environment variables
2. Ensure database is running
3. Verify network connectivity
4. Check SSL configuration for cloud databases

### Migration Issues

1. Check migration files for syntax errors
2. Ensure database exists
3. Verify user permissions
4. Check for conflicting migrations

### Seed Issues

1. Ensure migrations have run first
2. Check seed file syntax
3. Verify foreign key relationships
4. Check for duplicate data

## License

This project is licensed under the MIT License.

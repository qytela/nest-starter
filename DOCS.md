# Documentation: Crafting Elegance in Code

## Table of Contents 📕

- [Authentication](#authentication)
  - [Assign Role to User](#assign-role-to-user)
- [Decorators](#decorators)
  - [Entity Decorator](#entity-decorator)
  - [Role Decorator](#role-decorator)
  - [Permission Decorator](#permission-decorator)
  - [UserAccess Decorator](#useraccess-decorator)
- [Resource & Collection](#resource--collection)
  - [Resource](#resource)
  - [Collection](#collection)
- [Storage](#storage)
  - [Add Storage Module](#add-storage-module)
  - [Methods](#methods)
- [Mailer](#mailer)
  - [Add Mailer Module](#add-mailer-module)
  - [Usage](#usage)
- [Models](#models)
- [Migrations](#migrations)
- [Seeders](#seeders)

## **Authentication**

Unravel the authentication process, granting you unparalleled control over user roles.

### **Assign Role to User**

Assign roles effortlessly using the model's method. Example:

```typescript
const user = await this.usersModel.findOne({ where: { name: 'Qytela' } });
await user.assignRole(RolesEnum.USER);
```

For a seamless experience (using transactions), consider the recommended approach. Example:

```typescript
...
import { Sequelize } from 'sequelize-typescript';
...

@Injectable()
export class AuthService {
  constructor(
    ...
    private sequelize: Sequelize,
  ) {}

  async register(body): Promise<Users> {
    try {
      return await this.sequelize.transaction(async (transaction) => {
        const user = await this.usersModel.create(body, { transaction });

        // Single
        await user.assignRole(RolesEnum.USER, transaction);

        // Multiple
        await user.assignRole(
          [RolesEnum.ADMIN, RolesEnum.USER],
          transaction
        );

        return user;
      });
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
```

## **Decorators**

Explore custom decorators, meticulously designed to enhance your application's functionality.

### **Entity Decorator**

Effortlessly find entities by passing parameters. Customize your queries with ease.

Example:

```typescript
...
import { Entity } from 'src/decorators/entity.decorator';
import { Books } from 'src/models/books.model';
...

@Controller('books')
export class BooksController {
  ...

  @Get(':id')
  findOne(@Entity(Books) book: Books) {
    return new ApiResource(new BooksResource(book));
  }
}
```

Default parameter is `id`. You have the power to customize the parameter like this:

```typescript
@Controller('books')
export class BooksController {
  ...

  @Get('title/:title')
  findByTitle(@Entity([Books, 'title']) book: Books) {
    return new ApiResource(new BooksResource(book));
  }

  // You can pass the relations too
  @Get('title/:title')
  findByTitleAndGetUser(@Entity([Books, 'title', [Users, ...Others]]) book: Books) {
    return new ApiResource(new BooksResource(book));
  }
}
```

### **Role Decorator**

Guard your routes by verifying user roles. Control who can access your protected routes.

Example:

```typescript
...
import { RolesGuard } from 'src/modules/auth/strategy/roles-auth.guard';
import { Role } from 'src/decorators/role.decorator';
...

@Controller('books')
export class BooksController {
  ...

  @UseGuards(RolesGuard, ...Others)
  @Role(['Admin', 'Officer', ...Others])
  @Get()
  async findAll() {
    return 'You access the protect route!'
  }
}

```

### **Permission Decorator**

Fortify your routes with fine-grained access control, ensuring robust security through role permissions. This decorator checks the user roles for specific permissions, providing an extra layer of security for your routes.

Example:

```typescript
...
import { PermissionsGuard } from 'src/modules/auth/strategy/permissions-auth.guard';
import { Permission } from 'src/decorators/permission.decorator';
...

@Controller('books')
export class BooksController {
  ...

  @UseGuards(PermissionsGuard, ...Others)
  @Permission(['create-book', 'delete-book', ...Others])
  @Get()
  async findAll() {
    return 'You access the protect route!'
  }
}
```

Extend your protection with [Role Decorators](#role-decorator):

```typescript
...
import { RolesGuard } from 'src/modules/auth/strategy/roles-auth.guard';
import { PermissionsGuard } from 'src/modules/auth/strategy/permissions-auth.guard';
import { Role } from 'src/decorators/role.decorator';
import { Permission } from 'src/decorators/permission.decorator';
...

@Controller('books')
export class BooksController {
  ...

  @UseGuards(RolesGuard, PermissionsGuard, ...Others)
  @Role(['Admin', 'Officer', ...Others])
  @Permission(['create-book', 'delete-book', ...Others])
  @Get()
  async findAll() {
    return 'You access the protect route!'
  }
}
```

### **UserAccess Decorator**

Get the user, roles, permissions easier with UserAccess Decorator.

Example:

```typescript
...
import { JwtAuthGuard } from 'src/modules/auth/strategy/jwt-auth.guard';
import { UserAccess } from 'src/decorators/user-access.decorator';
...

@Controller('books')
export class BooksController {
  ...

  @UseGuard(JwtAuthGuard)
  @Get('roles-permissions')
  findRolesPermissions(
    @UserAccess() user, // get user
    @UserAccess('roles') roles, // get roles
    @UserAccess('permissions') permissions, // get permissions
  ) {
    return new ApiResource({
      user: new UsersResource(user),
      roles,
      permissions,
    });
  }
}
```

## **Resource & Collection**

### **Resource**

Refine your responses effortlessly with straightforward resource creation.

Example to create a resource:

```bash
$ node cmd generate:resource --name books --path src/resources/books
```

`src/resources/books/books.resource.ts`

```typescript
import { UsersResource } from '../users/users.resource'; // Import another resource
import { Books } from 'src/models/books.model';

export class BooksResource {
  constructor(data: Books) {
    return {
      id: data.id,
      title: data.title,
      author: data.author,
      description: data.description,

      // ...() > to check if object exists, avoiding 'cannot get the property' errors
      ...(data.user && { user: new UsersResource(data.user) }),
    };
  }
}
```

### **Collection**

Collections are automatically generated after resource creation.

`src/resources/books/books.collection.ts`

```typescript
import { BooksResource } from './books.resource';
import { Books } from 'src/models/books.model';

export class BooksCollection {
  constructor(data: Books[]) {
    const collections = data.map((v) => new BooksResource(v));

    return {
      foo: 'This is extra json from collections',
      bar: 'You can add extra json or remove it',
      data: collections,
    };
  }
}

// Or in a concise format

export class BooksCollection {
  constructor(data: Books[]) {
    return data.map((v) => new BooksResource(v));
  }
}
```

## **Storage**

Save, Delete, Retreive and more using Storage.

### **Add Storage Module**

```typescript
...
import { StorageModule } from '@app/storage';
...

@Module({
  imports: [
    ...
    // Add Storage Module
    StorageModule.forRoot({
      default: config('storage.STORAGE_DEFAULT'),
      disks: {
        public: {
          driver: 'public',
        },
        s3: {
          driver: 's3',
          endpoint: config('storage.AWS_ENDPOINT'),
          bucket: config('storage.AWS_BUCKET'),
          region: config('storage.AWS_REGION'),
          accessKeyId: config('storage.AWS_ACCESS_KEY'),
          secretAccessKey: config('storage.AWS_SECRET_ACCESS_KEY'),
          forcePathStyle: config('storage.AWS_FORCE_PATH_STYLE'),
        },
      },
    }),
  ],
  ...
})
export class AppModule {}
```

`src/main.ts`

```typescript
...
import fastifyMultipart from '@fastify/multipart';
...

async function bootstrap() {
  ...
  // Register fastify multipart
  await app.register(fastifyMultipart);
  ...
}

bootstrap();
```

### **Methods**

```typescript
/**
 * Retrieves the content of a file from the specified path and returns it as a Buffer.
 * @param path - The path of the file to retrieve.
 */
get(path: string): Promise<Buffer>;

/**
 * Generates a public URL for the file located at the specified path.
 * @param path - The file path to generate the URL for.
 */
url?(path: string): Promise<string>;

/**
 * (S3) Generates a signed URL for the file located at the specified path.
 * A signed URL provides limited-time access to the file.
 * @param path - The file path to generate the signed URL for.
 * @param expiresIn - The duration in seconds for which the signed URL will be valid (default 15 minutes).
 */
signedUrl?(path: string, expiresIn?: number): Promise<string>;

/**
 * Uploads a file to the system with optional options and returns the file URL.
 * @param file - The file object to be uploaded.
 * @param options - Additional options for the file upload (optional).
 */
put(file: IFile, options?: IPutOptions): Promise<string>;

/**
 * Checks if a file exists at the specified path.
 * @param path - The path of the file to check for existence.
 */
exists(path: string): Promise<boolean>;

/**
 * Deletes the file at the specified path and returns true if successful.
 * @param path - The path of the file to delete.
 */
remove(path: string): Promise<boolean>;
```

Example:

```typescript
...
import { ..., UseInterceptors } from '@nestjs/common';
import { Storage } from '@app/storage';
import { IFileResponse } from '@app/storage/interfaces/file-response.interface';
import { FastifyFileInterceptor } from 'src/interceptors/fastify-file.interceptor';
import { FastifyFile } from 'src/decorators/fastify-file.decorator';
...

@Controller('books')
export class BooksController {
  ...

  @UseInterceptors(FastifyFileInterceptor(fieldName)) // fieldName (string) is the field name of the request, like 'file', 'image', etc...
  @Post('upload')
  async uploadFile(@FastifyFile() fastifyFile: IFileResponse) {
    // INIT STORAGE DISK
    const storage = Storage.disk('public');

    // GET
    const get = await storage.get('test.txt');

    // URL
    const url = await storage.url('test.txt');

    // URL (S3)
    const signedUrl = await storage.signedUrl(
      'test.txt',
      3600, // expires in seconds (default 15 minutes)
    );

    // PUT (Default)
    const put = await storage.put(fastifyFile.file);

    // PUT (Options)
    const put = await storage.put(fastifyFile.file, {
      filePath: 'thumbnail', // storage/public/thumbnail, folder will created if doesn't exists
      fileName: 'inyourdream', // remove this if you want generate random filename uuid
      replacing: true, // replacing file if filename exists (except ext)
    });

    // EXISTS
    const exists = await storage.exists('test.txt');

    // REMOVE
    const remove = await storage.remove('test.txt');

    // RETREIVE MORE FIELD
    const moreField = fastifyFile.field
  }
}
```

## **Mailer**

Send mail using NodeMailer.

> https://nodemailer.com/about

### Add Mailer Module

```typescript
...
import { MailerModule } from '@app/mailer';
...

@Module({
  imports: [
    ...
    // Add Mailer Module
    MailerModule.forRoot({
      service: config('mailer.MAIL_SERVICE'),
      host: config('mailer.MAIL_HOST'),
      port: config('mailer.MAIL_PORT'),
      secure: config('mailer.MAIL_SECURE'),
      auth: {
        user: config('mailer.MAIL_USERNAME'),
        pass: config('mailer.MAIL_PASSWORD'),
      },
    }),
  ],
  ...
})
export class AppModule {}
```

### **Usage**

```typescript
// In controller or service
import { MailerService } from '@app/mailer'

...
constructor(private mailService: MailService) {}
...

@Get('test-mail')
async testMail() {
  const info = await this.mailerService.sendMail();
  return info;
}
```

## **Models**

Craft your data models effortlessly.

Example to create a model:

```bash
$ node cmd generate:model --name books --attributes author:string,title:string,description:text,isActive:boolean
```

Example to create a model (with migration):

```bash
$ node cmd generate:model --name books --attributes author:string,title:string,description:text,isActive:boolean -m
```

> Note: if model name more than 1 word, use (-). Example: --name book-organization

See more DataTypes on [Sequelize docs](https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types).

## **Migrations**

Craft your migrations effortlessly.

Example to ceate a migration (same as creating model but only migration):

```bash
$ node cmd generate:migration --name books --attributes author:string,title:string,description:text,isActive:boolean
```

> Note: if table name more than 1 word, use (-). Example: --name book-organization

Run your migration:

```bash
$ npx sequelize-cli db:migrate
```

> This command requires sequelize-cli with npx, see more [here](https://sequelize.org/docs/v6/other-topics/migrations).

## **Seeders**

Craft your seeders effortlessly.

Example to create a seeder:

```bash
$ npx sequelize-cli seed:generate --name books
```

Run your seeds:

```bash
$ npx sequelize-cli db:seed:all
```

Run specific seed:

```bash
$ npx sequelize-cli db:seed --seed 0000-seed.js
```

> This command requires sequelize-cli with npx, see more [here](https://sequelize.org/docs/v6/other-topics/migrations).

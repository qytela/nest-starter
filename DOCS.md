# Documentation: Crafting Elegance in Code

## Table of Contents 📕

- [Authentication](#authentication)
  - [Assign Role to User](#assign-role-to-user)
- [Decorators](#decorators)
  - [Entity Decorator](#entity-decorator)
  - [Role Decorator](#role-decorator)
- [Resource & Collection](#resource--collection)
  - [Resource](#resource)
  - [Collection](#collection)
- [Models](#models)
- [Migrations](#migrations)

## **Authentication**

Unravel the authentication process, granting you unparalleled control over user roles.

### **Assign Role to User**

Assign roles effortlessly using the model's static method:

```typescript
await this.usersModel.assignRole(user.id, RolesEnum.USER, transaction);
```

For a seamless experience (using transactions), consider the recommended approach:

```typescript
async register(body): Promise<Users> {
  try {
    return await this.sequelize.transaction(async (transaction) => {
      const user = await this.usersModel.create(body, { transaction });
      await this.usersModel.assignRole(user.id, RolesEnum.USER, transaction);

      return user;
    });
  } catch (e) {
    throw new InternalServerErrorException(e.message);
  }
}
```

## **Decorators**

Explore custom decorators, meticulously designed to enhance your application's functionality.

### **Entity Decorator**:

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

See more DataTypes on [Sequelize docs](https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types).

## **Migrations**

Craft your migrations effortlessly.

Example to ceate a migration (same as creating model but only migration):

```bash
$ node cmd generate:migration --name books --attributes author:string,title:string,description:text,isActive:boolean
```
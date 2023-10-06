# Sentry and Telegram Bot Notification

## Table of Contents 📕

- [Getting Started](#getting-started-🚀)
  - [Create Sentry Project](#create-sentry-project)
  - [Setting up Sentry WebHooks](#setting-up-sentry-webhooks)
  - [Create Telegram Bot](#create-telegram-bot)
  - [Setting up .env](#setting-up-env)
  - [Add Sentry & Telegram Module](#add-sentry--telegram-module)
- [Testing Log Exception Sentry](#testing-log-exception-sentry)

## **Getting Started**

If you want to use Sentry to log exceptions and send issue notifications via Telegram Bot, follow these steps.

### **Create Sentry Project**

First you need to create Sentry Project, just go to https://sentry.io then register if you doesn't have account, finally create the Project.

If you confused with configuration step on Sentry Dashboard, follow this step:

- Select NodeJS platform.
- Set your alert frequency (ignore to default).
- Name your project and assign it a team.
- Click "Create Project". If a popup asks "Do you use a framework?" just "Skip".
- Copy the DSN.

### **Setting up Sentry WebHooks**

After successfully create Project, you must add WebHooks url.

1. Go to Project settings:

   ![Project](https://i.ibb.co/tLPH3rz/image.png)

2. Navigate to Legacy Integration > WebHooks > Enable Plugin > Fill in your WebHooks URL > Save Changes:

   ![WebHooks](https://i.ibb.co/j8Nc8Wy/image.png)

   - Note: You can use ngrok or other tools for testing, Sentry does not allow localhost.
   - Default Sentry WebHooks route is 'api/sentry/webhook'. You can change the route or add custom security.

3. Create Alert Rule

- Select project and environment (Recommended is All Environments).
- The key steps here are 1 and 2, you can customize other settings, then create the rule.

  ![Number 2](https://i.ibb.co/BGLZkhn/image.png)

### **Create Telegram Bot**

You can create the Telegram Bot on Telegram app.

> 1. Find @BotFather, follow the step and finally you get the API Token.
> 2. Get your chat id, see tutorial [here](https://www.wikihow.com/Know-Chat-ID-on-Telegram-on-Android) (Scroll to Part 2)

### **Setting up .env**

```bash
SENTRY_ENV=development # development, production, or etc...
SENTRY_DSN= # paste Sentry DSN here
SENTRY_WEBHOOK=true # if you enable (true) this, make sure the Telegram bot has configurated
SENTRY_PATH_WEBHOOK=webhook # Sentry WebHooks path
SENTRY_EXCEPTION_CODE=500,502,503,504,400,403,413,429 # only defined http status code can send notification to Telegram

# using Telegram bot to send Sentry notification issue
TELEGRAM_BOT_TOKEN= # get from @BotFather
TELEGRAM_MYCHAT_ID= # paste your chat id here
```

### **Add Sentry & Telegram Module**

`src/app.module.ts`

```typescript
...
// Import Sentry & Telegram Module
import { SentryModule } from '@app/sentry';
import { TelegramModule } from '@app/telegram';
...

@Module({
  imports: [
    ...
    // Add Sentry Module
    SentryModule.forRoot({
      enableWebHook: config('sentry.SENTRY_WEBHOOK'),
      pathWebHook: config('sentry.SENTRY_PATH_WEBHOOK'),
    }),
    // Add Telegram Module
    TelegramModule.forRoot({
      token: config('telegram.TELEGRAM_BOT_TOKEN'),
      chatId: config('telegram.TELEGRAM_MYCHAT_ID'),
    }),
  ],
  ...
})
export class AppModule {}
```

`src/main.ts`

```typescript
...
// Import Requires Class
import { ..., HttpAdapterHost } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import { SentryFilter } from '@app/sentry/exceptions/sentry.filter';
...

async function bootstrap() {
  ...
  // Sentry
  Sentry.init({
    environment: config('sentry.SENTRY_ENV'),
    dsn: config('sentry.SENTRY_DSN'),
  });

  const { httpAdapter } = app.get(HttpAdapterHost);

  // Using global filters to send all exceptions
  app.useGlobalFilters(
    new SentryFilter(httpAdapter, config('sentry.SENTRY_EXCEPTION_CODE')),
  );
  ...
}
bootstrap();
```

## **Testing Log Exception Sentry**

Simply add exceptions like UnauthorizedException, InternalServerErrorException, etc...

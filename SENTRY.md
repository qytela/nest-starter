# Sentry and Telegram Bot Notification

If you want using Sentry to log exception and send notification issue with Telegram Bot, you can follow this step.

## Create Sentry Project

First you need to create Sentry Project, just go to https://sentry.io then register if you doesn't have account, finally create the Project.

If you confused with configuration step on Sentry Dashboard, follow this step:

> 1. Select NodeJS platform
> 2. Set your alert frequency (ignore to default)
> 3. Name your project and assign it a team
> 4. push "Create Project" button, if popup show "Do you use a framework?" just "Skip"
> 5. Copy the DSN

## Setting up Sentry WebHooks

After successfully create Project, you must add WebHooks url.

1. Go to Project settings
   ![Project](https://i.ibb.co/tLPH3rz/image.png)

2. Legacy Integration > WebHooks > Enable Plugin > Fill your WebHooks url > Save Changes
   ![WebHooks](https://i.ibb.co/j8Nc8Wy/image.png)

   > You can use ngrok or other to testing, Sentry not allowed localhost.

   > Default Sentry WebHooks route is 'api/sentry/webhooks', You can change the route or add custom security.

3. Create Alert Rule

- Select project and environment (Recommended is All Environments)
- The important of this step is number 1 and 2, you can customize the other settings then Create the Rule
  ![Number 2](https://i.ibb.co/BGLZkhn/image.png)

## Create Telegram Bot

You can create the Telegram Bot on Telegram app.

> 1. Find @BotFather, follow the step and finally you get the API Token.
> 2. Get your chat id, see tutorial https://www.wikihow.com/Know-Chat-ID-on-Telegram-on-Android (Scroll to Part 2)

## Setting up .env

```bash
SENTRY_ENV=development # development, production, or etc...
SENTRY_DSN= # paste Sentry DSN here
SENTRY_WEBHOOKS=true # if you enable (true) this, make sure the Telegram bot has configurated
SENTRY_EXCEPTION_CODE=500,502,503,504,400,403,413,429 # only defined http status code can send notification to Telegram

# using Telegram bot to send Sentry notification issue
TELEGRAM_BOT_TOKEN= # get from @BotFather
TELEGRAM_MYCHAT_ID= # paste your chat id here
```

## Testing Log Exception Sentry

Just add exception like UnauthorizedException, InternalServerErrorException, etc...

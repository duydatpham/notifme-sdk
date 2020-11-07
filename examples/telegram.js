/* @flow */
const NotifmeSdk = require('../src').default // notifme-sdk

const notifmeSdk = new NotifmeSdk({
  channels: {
    slack: {
      providers: [{
        type: 'webhook',
        bot_token: "bot_token",
        base_url: "base_url"
      }]
    }
  }
})

const notificationRequest = {
  telegram: {
    chat_id: "chat_id",
    message: "message",
  }
}

notifmeSdk.send(notificationRequest).then(console.log)

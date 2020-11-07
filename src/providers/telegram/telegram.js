/* @flow */
import fetch from '../../util/request'
// Types
import type { TelegramRequestType } from '../../models/notification-request'

export default class TelegramProvider {
  id: string = 'telegram-provider'
  bot_token: string
  base_url: string

  constructor(config: Object) {
    this.base_url = config.base_url
    this.bot_token = config.bot_token
  }

  async send(request: TelegramRequestType): Promise<string> {
    const { chat_id, message, parse_mode, ...rest } = request.customize ? (await request.customize(this.id, request)) : request
    const apiRequest = {
      method: 'POST',
      body: JSON.stringify({
        chat_id,
        text: message,
        parse_mode: parse_mode || 'html'
      })
    }
    const response = await fetch(`${this.base_url}/${this.bot_token}/sendMessage`, apiRequest)

    if (response.ok) {
      return '' // Telegram API only returns 'ok'
    } else {
      const responseText = await response.text()
      throw new Error(`${response.status} - ${responseText}`)
    }
  }
}

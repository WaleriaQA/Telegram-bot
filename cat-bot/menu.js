import { keyboard } from "telegraf/markup"

export const showMenu = (bot, chatId) => {
bot.telegram.sendMessage(chatId, "Choose the action", {
    reply_markup: {
        keyboard: [
            [
                {
                    text: "Find out the weather",
                    request_location: true
                }
            ],
            ["Get a cat picture"],
            ["Close"]
        ]
    }
})
}

export const closeMenu = (bot, chatId) => {
bot.telegram.sendMessage(chatId, "The keyboard is closed", {
    reply_markup: {
        remove_keyboard: true
    }
})
};
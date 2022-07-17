using Microsoft.AspNetCore.SignalR;

namespace SignalRExample.SignalR;

public class ChatHubInstance : Hub
{
    public async Task SendChatMessage(string user, string chatMessage)
    {
        await Clients.All.SendAsync("ReceiveChatMessage", user, chatMessage);
    }
}
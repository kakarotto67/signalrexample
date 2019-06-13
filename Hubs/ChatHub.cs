
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            // Send message to all connected clients
            // ReceiveMessage is defined in chat.js - it is a handler to this message
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
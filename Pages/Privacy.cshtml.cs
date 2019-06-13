using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.SignalR;
using SignalRChat.Hubs;

namespace SignalRChat.Pages
{
    public class PrivacyModel : PageModel
    {
        private readonly IHubContext<ChatHub> hubContext;

        public PrivacyModel(IHubContext<ChatHub> hubContext)
        {
            this.hubContext = hubContext;

            // Send custom message when this ctor is initialized
            this.hubContext.Clients.All.SendAsync("ReceiveMessage", "Privacy Page", "Updated");
        }

        public void OnGet()
        {
        }
    }
}
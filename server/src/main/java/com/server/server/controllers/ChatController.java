package com.server.server.controllers;

import com.server.server.models.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    @MessageMapping("/send")
    @SendTo("/topic/messages")
    public Message sendMessage(Message message){
        System.out.println(message.message);
        return message;
    }

}

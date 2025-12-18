package com.server.server.controllers;

import com.server.server.models.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate template;

    @MessageMapping("/send")
    @SendTo("/topic/messages")
    public Message sendMessage(Message message){
        System.out.println(message.message);
        return message;
    }

    //message to a prticular user
    @MessageMapping("/send/one")
    public void sendMessageToOneUser(@Payload Message message, Principal principal){
        System.out.println(message.sender+" "+message.receiver+" "+principal.getName());
        template.convertAndSendToUser(message.receiver,"/queue/messages",message);
    }


}

package com.server.server.controllers;

import com.server.server.enums.Status;
import com.server.server.models.Message;
import com.server.server.models.User;
import com.server.server.temp.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate template;

    public List<User> tempUsers= Data.tempUsers;


    @MessageMapping("/send")
    @SendTo("/topic/messages")
    public Message sendMessage(Message message) {
        System.out.println(message.message);
        return message;
    }

    //message to a prticular user
    @MessageMapping("/send/one")
    public void sendMessageToOneUser(@Payload Message message, Principal principal) {
        System.out.println(message.sender + " " + message.receiver + " " + principal.getName());
        template.convertAndSendToUser(message.receiver, "/queue/messages", message);
    }

    @MessageMapping("/send/presence")
    @SendTo("/topic/present")
    public List<User> handlingUserStatus(Principal principal) {
//        String username=principal.getName();
//        System.out.println(username);
////        tempUsers.stream().filter((user)->user.username.equals(username)).findFirst()
//        tempUsers.forEach(user -> {
//            if(user.username.equals(username)){
//                user.status=Status.ONLINE;
//            }
//        });
        return tempUsers;
    }
}

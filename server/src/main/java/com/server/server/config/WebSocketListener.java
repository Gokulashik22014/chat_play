package com.server.server.config;

import com.server.server.enums.Status;
import com.server.server.temp.Data;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.security.Principal;

@Component
public class WebSocketListener {
    @EventListener
    public void handleSessionConnected(SessionConnectedEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());

        String sessionId = accessor.getSessionId();
        Principal user = accessor.getUser();   // THIS is where setUser() went

        if (user != null) {
            String username = user.getName();

            Data.tempUsers.forEach(u -> {
                if (u.username.equals(username)) {
                    u.status = Status.ONLINE;
                }
            });

            System.out.println("User online: " + username + ", Session ID: " + sessionId);
        }
    }
    @EventListener
    public void handleSessionDisconnect(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());

        String sessionId = accessor.getSessionId();
        Principal user = accessor.getUser();   // THIS is where setUser() went

        if (user != null) {
            String username = user.getName();

            Data.tempUsers.forEach(u -> {
                if (u.username.equals(username)) {
                    u.status = Status.OFFLINE;
                }
            });

            System.out.println("User offline: " + username + ", Session ID: " + sessionId);
        }
    }
}

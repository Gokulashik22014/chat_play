package com.server.server.models;

import jakarta.persistence.*;

import java.time.LocalTime;

@Entity
@Table(name="Message")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    public String sender;
    public String receiver;
    public String message;
//    LocalTime time;
}

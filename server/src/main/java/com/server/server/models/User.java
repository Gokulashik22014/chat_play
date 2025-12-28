package com.server.server.models;

import com.server.server.enums.Status;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@RequiredArgsConstructor
@ToString
public class User {
    public long id;
    public String username;
    public Status status=Status.OFFLINE;
    public User(long id,String username){
        this.id = id;
        this.username = username;
    }
}

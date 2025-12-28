package com.server.server.temp;

import com.server.server.models.User;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Data {
    public static List<User> tempUsers = new ArrayList<>(
            Arrays.asList(
                    new User(1, "ken"),
                    new User(2, "Alice"),
                    new User(3, "Ben"),
                    new User(4, "Kai")
            ));
}

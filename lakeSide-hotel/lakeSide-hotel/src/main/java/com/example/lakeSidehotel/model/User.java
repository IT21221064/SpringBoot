package com.example.lakeSidehotel.model;

import java.util.Collection;
import java.util.HashSet;

public class User {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private Collection<Role> roles = new HashSet<>();
}

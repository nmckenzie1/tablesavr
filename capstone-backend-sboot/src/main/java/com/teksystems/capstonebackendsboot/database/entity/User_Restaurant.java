package com.teksystems.capstonebackendsboot.database.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User_Restaurant {
    @Id
    @Column(nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userID")
    @JsonBackReference (value = "user_restaurants")
    private User user;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "restaurantID")
    @JsonBackReference (value = "user_restaurant")
    private Restaurant restaurant;
}

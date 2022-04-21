package com.teksystems.capstonebackendsboot.database.entity;



import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.sql.Time;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Restaurant extends BaseEntity {
    @Id
    @Column(nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long restaurantID;
    @Column(length = 50, nullable = false, unique = true)
    String restaurantName;
    @Column(nullable = false)
    Time openTime;
    @Column(nullable = false)
    Time closeTime;
    @Column(length = 50, nullable = false)
    String imageURL;
    @Column(length = 200, nullable = false)
    String description;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "restaurant")
    @JsonManagedReference
    private Set<TableTop> tableTops;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "restaurant")
    @JsonManagedReference
    Set<Reservation> reservations;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "restaurant")
    @JsonManagedReference (value = "user_restaurant")
    private Set<User_Restaurant> userRestaurants;


}
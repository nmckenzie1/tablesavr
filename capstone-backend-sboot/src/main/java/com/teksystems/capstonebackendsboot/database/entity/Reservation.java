package com.teksystems.capstonebackendsboot.database.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Reservation extends BaseEntity {
    @Id
    @Column(nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long reservationID;
    @Column(length = 50, nullable = false)
    Time time;
    @Column(length = 50, nullable = false)
    Date date;
    @Column(length = 50, nullable = false)
    String restaurantName;
    @Column(length = 50, nullable = false)
    int guests;
    @Column()
    String lastName;
    @ManyToOne
    @JoinColumn (name = "userID")
    @JsonBackReference(value = "reservations")
    private User user;
    @ManyToOne
    @JoinColumn (name = "restaurantID")
    @JsonBackReference
    private Restaurant restaurant;
}
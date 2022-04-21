package com.teksystems.capstonebackendsboot.database.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.*;

import javax.persistence.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class TableTop extends BaseEntity {
    @Id
    @Column(nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long tableID;
    @Column(nullable = false)
    int maxGuests;
    @Column(length = 50, nullable = false)
    String tableLabel;
    @ManyToOne
    @JoinColumn (name = "restaurantID")
    @JsonBackReference
    private Restaurant restaurant;
}
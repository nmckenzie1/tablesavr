package com.teksystems.capstonebackendsboot.database.dao;

import com.teksystems.capstonebackendsboot.database.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface RestaurantDAO extends JpaRepository<Restaurant, Long> {
    Optional<List<Restaurant>> getRestaurantsByRestaurantNameStartingWith(String name);
    Optional<Restaurant> getRestaurantByRestaurantName(String name);
}
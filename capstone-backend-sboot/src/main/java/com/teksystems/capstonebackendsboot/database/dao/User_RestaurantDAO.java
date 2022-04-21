package com.teksystems.capstonebackendsboot.database.dao;

import com.teksystems.capstonebackendsboot.database.entity.User;
import com.teksystems.capstonebackendsboot.database.entity.User_Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface User_RestaurantDAO extends JpaRepository<User_Restaurant, Long> {
    @Query(value = "FROM User_Restaurant r WHERE r.user = :userID")
    Optional<List<User_Restaurant>> findUser_RestaurantByUserUserID(@Param("userID") User user);
}

package com.teksystems.capstonebackendsboot.controller;

import com.teksystems.capstonebackendsboot.database.dao.RestaurantDAO;
import com.teksystems.capstonebackendsboot.database.dao.UserDAO;
import com.teksystems.capstonebackendsboot.database.dao.User_RestaurantDAO;
import com.teksystems.capstonebackendsboot.database.entity.Reservation;
import com.teksystems.capstonebackendsboot.database.entity.Restaurant;
import com.teksystems.capstonebackendsboot.database.entity.User;
import com.teksystems.capstonebackendsboot.database.entity.User_Restaurant;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class User_RestaurantController {
    @Autowired
    User_RestaurantDAO user_restaurantRepository;
    @Autowired
    UserDAO userRepository;
    @Autowired
    RestaurantDAO restaurantRepository;
    @GetMapping("/restaurants/myrestaurants")
    public ResponseEntity<List<Restaurant>> getRestaurants(@RequestParam long userID){
        User user = userRepository.findById(userID).get();
        List<User_Restaurant> user_restaurantData = user_restaurantRepository.findUser_RestaurantByUserUserID(user).get();
        List <Restaurant> restaurantList = new ArrayList<>();
       user_restaurantData.forEach((item) -> restaurantList.add(item.getRestaurant()));
        if (restaurantList.size() > 0){
            return new ResponseEntity<>(restaurantList, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

package com.teksystems.capstonebackendsboot.controller;

import com.teksystems.capstonebackendsboot.database.dao.RestaurantDAO;
import com.teksystems.capstonebackendsboot.database.dao.UserDAO;
import com.teksystems.capstonebackendsboot.database.dao.User_RestaurantDAO;
import com.teksystems.capstonebackendsboot.database.entity.Restaurant;
import com.teksystems.capstonebackendsboot.database.entity.User_Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")

public class RestaurantController {
    @Autowired
    RestaurantDAO restaurantRepository;
    @Autowired
    UserDAO userRepository;
    @Autowired
    User_RestaurantDAO user_restaurantRepository;

    @GetMapping("/restaurantbyid/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable("id") long id) {
        Optional<Restaurant> restaurantData = restaurantRepository.findById(id);
        if (restaurantData.isPresent()) {
            return new ResponseEntity<>(restaurantData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/restaurant/{restaurantName}")
    public ResponseEntity<Optional<List<Restaurant>>> getRestaurantByName(@PathVariable("restaurantName") String restaurantName) {
        try {

            Optional<List<Restaurant>> restaurantData = restaurantRepository.getRestaurantsByRestaurantNameStartingWith(restaurantName);
            if (restaurantData.isPresent()) {

                return new ResponseEntity<>(restaurantData, HttpStatus.OK);
            } else {

                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){


            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }
    @GetMapping("/restaurant")
    public ResponseEntity<List<Restaurant>> getAllRestaurant() {
        List<Restaurant> restaurantData = restaurantRepository.findAll();
        if (restaurantData.size() > 0) {
            return new ResponseEntity<>(restaurantData, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
@PutMapping(value="/restaurant/update")
    public void updateRestaurant(@RequestParam long id,@RequestParam Time openTime, @RequestParam Time closeTime, @RequestParam String description, @RequestParam String imageURL, @RequestParam String restaurantName){
        Restaurant restaurant = restaurantRepository.getById(id);
        restaurant.setRestaurantName(restaurantName);
        restaurant.setOpenTime(openTime);
        restaurant.setCloseTime(closeTime);
        restaurant.setDescription(description);
        restaurant.setImageURL(imageURL);
        restaurantRepository.save(restaurant);

    }
    @GetMapping("/restaurant/newrestaurant")
    public ResponseEntity<Restaurant> createRestaurant(@RequestParam Time openTime, @RequestParam Time closeTime, @RequestParam String description, @RequestParam String imageURL, @RequestParam String restaurantName,@RequestParam String owner,@RequestParam long userID) {
        Optional<Restaurant> restaurant = restaurantRepository.getRestaurantByRestaurantName(restaurantName);
        if(restaurant.isPresent()){
            return new ResponseEntity<>(restaurant.get(), HttpStatus.ALREADY_REPORTED);
        }else{
        Restaurant newRestaurant = new Restaurant();

        newRestaurant.setImageURL(imageURL);
        newRestaurant.setOpenTime(openTime);
        newRestaurant.setCloseTime(closeTime);
        newRestaurant.setRestaurantName(restaurantName);
        newRestaurant.setDescription(description);
        restaurantRepository.save(newRestaurant);

        if(owner.equals("Yes")){

            User_Restaurant user_restaurant = new User_Restaurant();
            user_restaurant.setUser(userRepository.getById(userID));
            user_restaurant.setRestaurant(newRestaurant);
            user_restaurantRepository.save(user_restaurant);
        }
        newRestaurant.setImageURL(imageURL+"&random="+newRestaurant.getRestaurantID());
        restaurantRepository.save(newRestaurant);

        return new ResponseEntity<>(newRestaurant, HttpStatus.CREATED);
        }}


    }

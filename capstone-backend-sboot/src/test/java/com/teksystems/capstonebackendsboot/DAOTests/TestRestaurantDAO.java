package com.teksystems.capstonebackendsboot.DAOTests;

import com.teksystems.capstonebackendsboot.database.dao.RestaurantDAO;
import com.teksystems.capstonebackendsboot.database.entity.Restaurant;
import com.teksystems.capstonebackendsboot.database.entity.TableTop;
import lombok.extern.java.Log;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.ClassOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;


@DataJpaTest
@TestMethodOrder(OrderAnnotation.class)
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
public class TestRestaurantDAO {
    @Autowired
   private RestaurantDAO restaurantRepository;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveRestaurantTest() {

        Restaurant restaurant = Restaurant.builder().restaurantName("Name").openTime(java.sql.Time.valueOf("10:00:00")).closeTime(java.sql.Time.valueOf("12:00:00")).description("Dummy Description").imageURL("https://placeimg.com/640/480/any")
                .build();

        restaurantRepository.save(restaurant);

        Assertions.assertThat(restaurant.getRestaurantID()).isGreaterThan(0);
    }
    @Test
    @Order(2)
    public void getRecipeTest() {

        Restaurant restaurant = restaurantRepository.getById(1L);
        Assertions.assertThat(restaurant.getRestaurantID()).isEqualTo(1);
    }
    @Test
    @Order(3)
    public void getListOfRestaurant() {
        List<Restaurant> restaurants = restaurantRepository.findAll();
        Assertions.assertThat(restaurants.size()).isGreaterThan(0);
    }
    @Test
    @Order(4)
    @Rollback(value = false)
    public void updateRestaurantTest() {
        Restaurant restaurant = restaurantRepository.getById(1L);
        restaurant.setRestaurantName("Beans");
        Assertions.assertThat(restaurantRepository.getById(1L).getRestaurantName()).isEqualTo(restaurant.getRestaurantName());
    }
    @Test
    @Order(5)
    @Rollback(value = false)
    public void deleteRestaurantTest() {
        Restaurant restaurant = restaurantRepository.getById(1L);
        restaurantRepository.delete(restaurant);

        Restaurant temprest = null;
        if (!restaurantRepository.findById(restaurant.getRestaurantID()).isEmpty()){
            temprest = restaurantRepository.findById(restaurant.getRestaurantID()).get();
        };
        Assertions.assertThat(temprest).isNull();

    }
    @ParameterizedTest
    @Order(6)
    @ValueSource(longs = {1,2,3,4,5})
    void test_long_array(long arg) {
        Restaurant restaurant = Restaurant.builder().restaurantName("Name"+arg).openTime(java.sql.Time.valueOf("10:00:00")).closeTime(java.sql.Time.valueOf("12:00:00")).description("Dummy Description").imageURL("https://placeimg.com/640/480/any")
                .build();

        restaurantRepository.save(restaurant);

                Assertions.assertThat(arg == restaurant.getRestaurantID());
    }

}

package com.teksystems.capstonebackendsboot.DAOTests;


import com.teksystems.capstonebackendsboot.database.dao.RestaurantDAO;
import com.teksystems.capstonebackendsboot.database.entity.Restaurant;
import com.teksystems.capstonebackendsboot.database.entity.TableTop;
import org.assertj.core.api.Assertions;
import org.h2.table.Table;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;
import com.teksystems.capstonebackendsboot.database.dao.TableTopDAO;


import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
public class TestTableTopDAO {
    @Autowired
    private TableTopDAO tableTopRepository;
    @Autowired
    private RestaurantDAO restaurantRepository;
    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveRestaurantTest() {
        Restaurant restaurant = Restaurant.builder().restaurantName("Name").openTime(java.sql.Time.valueOf("10:00:00")).closeTime(java.sql.Time.valueOf("12:00:00")).description("Dummy Description").imageURL("https://placeimg.com/640/480/any")
                .build();

        restaurantRepository.save(restaurant);
        TableTop tableTop = TableTop.builder().tableLabel("1").maxGuests(3).restaurant(restaurant).build();

        tableTopRepository.save(tableTop);

        Assertions.assertThat(tableTop.getTableID()).isGreaterThan(0);
    }
    @Test
    @Order(2)
    public void getRecipeTest() {

       TableTop tableTop = tableTopRepository.getById(1L);
        Assertions.assertThat(tableTop.getTableID()).isEqualTo(1);
    }
    @Test
    @Order(3)
    public void getListOfRestaurant() {
        List<TableTop> tableTops = tableTopRepository.findAll();
        Assertions.assertThat(tableTops.size()).isGreaterThan(0);
    }
    @Test
    @Order(4)
    @Rollback(value = false)
    public void updateRestaurantTest() {
        TableTop tableTop = tableTopRepository.getById(1L);
        tableTop.setTableLabel("2");
        Assertions.assertThat(tableTopRepository.getById(1L).getTableLabel()).isEqualTo(tableTop.getTableLabel());
    }
    @Test
    @Order(5)
    @Rollback(value = false)
    public void deleteRestaurantTest() {
        TableTop tableTop = tableTopRepository.getById(1L);
        tableTopRepository.delete(tableTop);

        TableTop temprest = null;
        if (!tableTopRepository.findById(tableTop.getTableID()).isEmpty()){
            temprest = tableTopRepository.findById(tableTop.getTableID()).get();
        };
        Assertions.assertThat(temprest).isNull();

    }


}


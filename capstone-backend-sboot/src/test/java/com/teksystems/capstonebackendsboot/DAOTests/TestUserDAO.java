package com.teksystems.capstonebackendsboot.DAOTests;

import com.teksystems.capstonebackendsboot.database.dao.ReservationDAO;
import com.teksystems.capstonebackendsboot.database.dao.RestaurantDAO;
import com.teksystems.capstonebackendsboot.database.dao.RoleDAO;
import com.teksystems.capstonebackendsboot.database.dao.UserDAO;
import com.teksystems.capstonebackendsboot.database.entity.*;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
public class TestUserDAO {
    @Autowired
    private RoleDAO roleRepository;
    @Autowired
    private UserDAO userRepository;
    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveRestaurantTest() {
        Role role = Role.builder().description("Role Admin").name("ADMIN").build();
        roleRepository.save(role);
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        User user = User.builder().username("n.mckenzie@live.com").roles(roles).password("password").confirmPassword("password").firstName("Neil").lastName("Neil").build();
        userRepository.save(user);


        Assertions.assertThat(user.getUserID()).isGreaterThan(0);
    }
    @Test
    @Order(2)
    public void getRecipeTest() {

        User user = userRepository.getById(1L);
        Assertions.assertThat(user.getUserID()).isEqualTo(1);
    }
    @Test
    @Order(3)
    public void getListOfRestaurant() {
        List<User> user = userRepository.findAll();
        Assertions.assertThat(user.size()).isGreaterThan(0);
    }
    @Test
    @Order(4)
    @Rollback(value = false)
    public void updateRestaurantTest() {
        User user = userRepository.getById(1L);
        user.setUsername("n.mckenzie12@live.com");
        Assertions.assertThat(userRepository.getById(1L).getUsername()).isEqualTo(user.getUsername());
    }
    @Test
    @Order(5)
    @Rollback(value = false)
    public void deleteRestaurantTest() {
        User user = userRepository.getById(1L);
        userRepository.delete(user);

        User temprest = null;
        if (!userRepository.findById(user.getUserID()).isEmpty()){
            temprest = userRepository.findById(user.getUserID()).get();
        };
        Assertions.assertThat(temprest).isNull();

    }
}

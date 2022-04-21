package com.teksystems.capstonebackendsboot.database.dao;

import com.teksystems.capstonebackendsboot.database.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDAO extends JpaRepository<User, Long> {
        User findByUsername(String username);
        User getById(Long id);

}
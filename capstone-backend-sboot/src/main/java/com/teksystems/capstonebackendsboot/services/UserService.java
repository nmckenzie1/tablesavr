package com.teksystems.capstonebackendsboot.services;

import com.teksystems.capstonebackendsboot.database.dao.UserDAO;
import com.teksystems.capstonebackendsboot.database.entity.User;
import com.teksystems.capstonebackendsboot.exceptions.UsernameAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserDAO userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    public User saveUser (User newUser){
        try{
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));

            newUser.setUsername(newUser.getUsername());

            newUser.setConfirmPassword("");

            return userRepository.save(newUser);

        }catch (Exception e){
            throw new UsernameAlreadyExistsException("Username '"+newUser.getUsername()+"' already exists. Or your response has empty fields.");
        }
    }
}

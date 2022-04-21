package com.teksystems.capstonebackendsboot.controller;


import com.teksystems.capstonebackendsboot.database.dao.RoleDAO;
import com.teksystems.capstonebackendsboot.database.entity.Role;
import com.teksystems.capstonebackendsboot.validator.UserValidator;
import com.teksystems.capstonebackendsboot.database.dao.UserDAO;
import com.teksystems.capstonebackendsboot.database.entity.User;
import com.teksystems.capstonebackendsboot.payload.JWTLoginSucessReponse;
import com.teksystems.capstonebackendsboot.payload.LoginRequest;
import com.teksystems.capstonebackendsboot.security.JwtTokenProvider;
import com.teksystems.capstonebackendsboot.security.MapValidationErrorService;
import com.teksystems.capstonebackendsboot.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static com.teksystems.capstonebackendsboot.security.SecurityConstants.TOKEN_PREFIX;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")

public class UserController {
    @Autowired
    UserDAO userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private UserValidator userValidator;
    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;
    @Autowired
    private RoleDAO roleRepository;


    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") long id) {
        Optional<User> userData = userRepository.findById(id);
        if (userData.isPresent()) {
            return new ResponseEntity<>(userData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/user/login")
    public ResponseEntity<?> authenticateUser(@RequestBody @Valid LoginRequest loginRequest, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX +  tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSucessReponse(true, jwt));
    }

    @PostMapping("/user/register")
    public ResponseEntity<?> registerUser(@RequestBody User user, BindingResult result){

        userValidator.validate(user,result);


        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;

        User newUser = userService.saveUser(user);
        Role role = roleRepository.findRoleByName("USER");
        Set<Role> roleSet = new HashSet<>();
        roleSet.add(role);
            newUser.setRoles(roleSet);
            userRepository.save(newUser);
        return  new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }
    @RequestMapping(value="/user/edit", method = RequestMethod.PUT)
    public void getUser(@RequestParam long id, @RequestParam String firstName, @RequestParam String lastName, @RequestParam String username) {

        User currentUser = userRepository.getById(id);
        currentUser.setFirstName(firstName);
        currentUser.setLastName(lastName);
        currentUser.setUsername(username);
        userRepository.save(currentUser);

    }





}
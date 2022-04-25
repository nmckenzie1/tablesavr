package com.teksystems.capstonebackendsboot.controller;


import com.google.gson.Gson;
import com.teksystems.capstonebackendsboot.database.dao.ReservationDAO;
import com.teksystems.capstonebackendsboot.database.dao.RestaurantDAO;
import com.teksystems.capstonebackendsboot.database.dao.TableTopDAO;
import com.teksystems.capstonebackendsboot.database.dao.UserDAO;
import com.teksystems.capstonebackendsboot.database.entity.Reservation;
import com.teksystems.capstonebackendsboot.database.entity.Restaurant;
import com.teksystems.capstonebackendsboot.database.entity.TableTop;
import com.teksystems.capstonebackendsboot.database.entity.User;
import com.teksystems.capstonebackendsboot.logging.Logger;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
@PreAuthorize("isAuthenticated()")
public class ReservationController {
    @Autowired
    TableTopDAO tabletopRepository;
    @Autowired
    ReservationDAO reservationRepository;
    @Autowired
    RestaurantDAO restaurantRepository;
    @Autowired
    UserDAO userRepository;

    @GetMapping("/getreservations")
    public ResponseEntity<Optional<List<Reservation>>>getReservations(@RequestParam long userID){
        Optional<List<Reservation>> reservationsData = reservationRepository.getReservationsByUserUserID(userID);

        if (reservationsData.isPresent()){
            log.info("Reservation Data Accessed");
            return new ResponseEntity<>(reservationsData,HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/getreservationbyID")
    public Reservation getReservationByID(@RequestParam long reservationID){
        Reservation reservationData = reservationRepository.findById(reservationID).get();
        log.info("Reservation Data By ID Accessed");
        return reservationData;




    }
    @GetMapping("/reservation")
    public ResponseEntity<String>createReservation(@RequestParam long id,@RequestParam int amount, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,@RequestParam String time,@RequestParam long uid) {
        Optional<List<TableTop>> tableTopList = tabletopRepository.getTableTopsByRestaurant_RestaurantIDAndMaxGuestsGreaterThanEqual(id, amount);
        List<TableTop> newlist = tableTopList.get();

        Time time1 = java.sql.Time.valueOf(time);

        Optional<List<Reservation>> reservationList = reservationRepository.getReservationsByRestaurant_RestaurantIDAndGuestsGreaterThanEqualAndDateAndTime(id,amount,date, time1);
        List<Reservation> newlist2 = reservationList.get();

        if (tableTopList.isPresent() && reservationList.isPresent() && newlist.size() > newlist2.size()) {

            Restaurant restaurant = restaurantRepository.getById(id);
            User user = userRepository.getById(uid);
            Reservation reservation = new Reservation();
            reservation.setDate(date);
            reservation.setUser(user);
            reservation.setGuests(amount);
            reservation.setRestaurant(restaurant);
            reservation.setRestaurantName(restaurant.getRestaurantName());
            reservation.setTime(time1);
            reservation.setLastName(user.getLastName());
            reservationRepository.save(reservation);
            log.info("Reservation" + reservation+" created!");
            String success = "Reservation Created, thanks " + user.getFirstName()+" !";
            return new ResponseEntity<>(success, HttpStatus.CREATED);
        } else {
            String nosuccess= "No tables available at this time!";
            return new ResponseEntity<>(nosuccess, HttpStatus.OK);
        }
    }
    @DeleteMapping(value = "/deleteres")
    public ResponseEntity<Void> deleteReservation(@RequestParam long resID) {
        reservationRepository.deleteByID(resID);
        log.info("Reservation deleted!");




        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/getReservationsByRestaurant")
    public List<Reservation> getReservationsByRestaurant(@RequestParam long restaurantID,@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,@RequestParam boolean checked){
        List<Reservation> reservationData = reservationRepository.getReservationsByDateAndRestaurantRestaurantID(date, restaurantID);
        if (checked){
            Logger.writeLog(restaurantRepository.getById(restaurantID).getRestaurantName());
            Logger.writeLog(date.toString());
           reservationData.forEach((item)->Logger.writeLog("Reservation for: " +item.getLastName()+ " at "+item.getTime()+" for "+item.getGuests()));
           Logger.writeLog("--------------------------------------------------------------------------------------------------------");
        }
        return reservationData;




    }


}
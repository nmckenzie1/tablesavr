package com.teksystems.capstonebackendsboot.database.dao;

import com.teksystems.capstonebackendsboot.database.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Time;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationDAO extends JpaRepository<Reservation, Long> {
    Optional<List<Reservation>> getReservationsByRestaurant_RestaurantIDAndGuestsGreaterThanEqualAndDateAndTime(long id, int amount, Date date, Time time);

    Optional<List<Reservation>> getReservationsByUserUserID(long userID);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM Reservation r WHERE r.reservationID = :reservationID")
    int deleteByID(@Param("reservationID") long reservationID);

    @Query(value = "SELECT * FROM reservation WHERE date = :date GROUP BY :restaurantID",
            nativeQuery = true
           )
     List<Reservation> getReservationsByDateAndRestaurantRestaurantID(Date date, long restaurantID);

}




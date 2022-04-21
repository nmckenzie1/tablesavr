package com.teksystems.capstonebackendsboot.database.dao;

import com.teksystems.capstonebackendsboot.database.entity.TableTop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TableTopDAO extends JpaRepository<TableTop, Long> {
Optional<List<TableTop>> getTableTopsByRestaurant_RestaurantIDAndMaxGuestsGreaterThanEqual(long id, int amount);
    Optional<List<TableTop>> getTableTopsByRestaurant_RestaurantID(long rid);
}
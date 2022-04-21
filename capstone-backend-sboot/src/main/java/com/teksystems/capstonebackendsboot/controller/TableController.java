package com.teksystems.capstonebackendsboot.controller;


import com.teksystems.capstonebackendsboot.logging.Logger;
import com.teksystems.capstonebackendsboot.database.dao.RestaurantDAO;
import com.teksystems.capstonebackendsboot.database.dao.TableTopDAO;
import com.teksystems.capstonebackendsboot.database.entity.TableTop;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class TableController {
    @Autowired
    TableTopDAO tableRepository;
    @Autowired
    RestaurantDAO restaurantRepository;

    @GetMapping("/gettables")
    public ResponseEntity<Optional<List<TableTop>>>getTables(@RequestParam long rid){
    Optional<List<TableTop>> tableData = tableRepository.getTableTopsByRestaurant_RestaurantID(rid);
        tableData.get().forEach((i) -> {
            Logger.writeLog(i.getTableLabel());
        });
    if (tableData.isPresent()){
        log.info("Table data accessed.");
        return new ResponseEntity<>(tableData,HttpStatus.OK);
    }else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

    @DeleteMapping(value = "/deletetable")
    public ResponseEntity<Void> deleteTable(@RequestParam long tableID) {

        tableRepository.deleteById(tableID);

        if (tableRepository.existsById(tableID)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        log.info("Table deleted.");
        return new ResponseEntity<>(HttpStatus.OK);
    }



    @PostMapping("/createtable")
    public ResponseEntity<TableTop> createTable(@RequestParam int maxGuests, @RequestParam String tableLabel, @RequestParam long restaurantID){
        TableTop newTable = new TableTop();
                newTable.setMaxGuests(maxGuests);
                newTable.setTableLabel(tableLabel);
                newTable.setRestaurant(restaurantRepository.getById(restaurantID));
                tableRepository.save(newTable);
                log.info("New table "+ newTable+ " created." );
        return new ResponseEntity<>(newTable, HttpStatus.CREATED);
    }
}

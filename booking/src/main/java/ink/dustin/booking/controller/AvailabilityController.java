package ink.dustin.booking.controller;

import ink.dustin.booking.entities.Availability;
import ink.dustin.booking.services.AvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/availability")
public class AvailabilityController {
    private AvailabilityService service;
    @Autowired
    AvailabilityController(AvailabilityService service){
        this.service = service;
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<?> getAvail(@PathVariable Long id){
        return ResponseEntity.ok(service.getAvail(id));
    }

    @CrossOrigin
    @GetMapping()
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(service.getAll());
    }


    @CrossOrigin
    @PostMapping()
    public  ResponseEntity<?> saveAvail(@RequestBody Availability availability){
        return ResponseEntity.ok(service.saveAvail(availability));
    }
}

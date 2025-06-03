package ink.dustin.booking.controller;

import ink.dustin.booking.entities.Tattoo;
import ink.dustin.booking.services.TattooService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tattoo")
public class TattooController {
    private TattooService service;
    TattooController(TattooService service){
        this.service=service;
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<?> getTattoo(@PathVariable Long id){
        return ResponseEntity.ok(service.getTattoo(id));
    }


    @CrossOrigin
    @GetMapping()
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(service.getAllTattoos());
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<?> saveTattoo(@RequestBody Tattoo tattoo){
        return ResponseEntity.ok(service.saveTattoo(tattoo));
    }
}

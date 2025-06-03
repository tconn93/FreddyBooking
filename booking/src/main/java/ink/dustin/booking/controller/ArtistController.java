package ink.dustin.booking.controller;

import ink.dustin.booking.entities.Artist;
import ink.dustin.booking.services.ArtistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/artist")
public class ArtistController {
    private ArtistService service;
    ArtistController(ArtistService service){
        this.service=service;
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<?> getArtist(@PathVariable Long id){
        return ResponseEntity.ok(service.getArtist(id));
    }


    @CrossOrigin
    @GetMapping()
    public ResponseEntity<?> getAllArtist(){
        return ResponseEntity.ok(service.getAllArtist());
    }

    @CrossOrigin
    @PostMapping()
    public ResponseEntity<?> saveArtist(@RequestBody Artist artist){
        return ResponseEntity.ok(service.saveArtist(artist));
    }
}

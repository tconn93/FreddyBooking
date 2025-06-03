package ink.dustin.booking.services;

import ink.dustin.booking.entities.Artist;
import ink.dustin.booking.repos.ArtistRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArtistService {

private ArtistRepo repo;

@Autowired
    ArtistService(ArtistRepo repo){
    this.repo=repo;
}


public Artist getArtist(Long id){
    return repo.findById(id).orElseThrow();
}

public Artist saveArtist(Artist artist){
    return repo.saveAndFlush(artist);
}

public List<Artist> getAllArtist(){
    return repo.findAll();
}

}

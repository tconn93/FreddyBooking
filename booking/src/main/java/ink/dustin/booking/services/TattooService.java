package ink.dustin.booking.services;

import ink.dustin.booking.entities.Tattoo;
import ink.dustin.booking.repos.TattooRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TattooService {

    private TattooRepo repo;

    @Autowired
    TattooService(TattooRepo repo){
        this.repo=repo;
    }

    public Tattoo getTattoo(Long id){
        return repo.findById(id).orElseThrow();
    }

    public Tattoo saveTattoo(Tattoo tattoo){
        return repo.saveAndFlush(tattoo);
    }

    public List<Tattoo> getAllTattoos(){
        return repo.findAll();
    }
}

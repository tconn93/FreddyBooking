package ink.dustin.booking.services;

import ink.dustin.booking.entities.Availability;
import ink.dustin.booking.repos.AvailabilityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvailabilityService {
    private AvailabilityRepo repo;
    @Autowired
    AvailabilityService(AvailabilityRepo repo){
        this.repo=repo;
    }

    public Availability getAvail(Long id){
        return repo.findById(id).orElseThrow();
    }

    public Availability saveAvail(Availability availability){
        return repo.saveAndFlush(availability);
    }

    public List<Availability> getAll(){
        return repo.findAll();
    }

}

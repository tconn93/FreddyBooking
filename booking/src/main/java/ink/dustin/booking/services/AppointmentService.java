package ink.dustin.booking.services;

import ink.dustin.booking.entities.Appointment;
import ink.dustin.booking.repos.AppointmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    private AppointmentRepo repo;
    @Autowired
    AppointmentService(AppointmentRepo repo){
        this.repo=repo;
    }


    public Appointment getAppointment(Long id){
        return repo.findById(id).orElseThrow();
    }

    public Appointment saveAppointment(Appointment appointment){
        return repo.saveAndFlush(appointment);
    }

    public List<Appointment> getAllAppointments(){
        return repo.findAll();
    }

}

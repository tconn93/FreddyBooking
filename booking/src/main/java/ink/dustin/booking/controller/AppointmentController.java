package ink.dustin.booking.controller;

import ink.dustin.booking.entities.Appointment;
import ink.dustin.booking.services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {
    private AppointmentService service;

    @Autowired
    AppointmentController(AppointmentService service){
        this.service= service;
    }


    @CrossOrigin
    @GetMapping()
    public ResponseEntity<?> getAllAppointments(){
        return ResponseEntity.ok(service.getAllAppointments());
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<?> getAppointment(@PathVariable Long id){
        return ResponseEntity.ok(service.getAppointment(id));
    }

    @CrossOrigin
    @PostMapping()
    public ResponseEntity<?> saveAppointment(@RequestBody Appointment appointment){
        return ResponseEntity.ok(service.saveAppointment(appointment));
    }
}

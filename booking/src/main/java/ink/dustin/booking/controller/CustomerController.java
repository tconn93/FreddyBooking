package ink.dustin.booking.controller;


import ink.dustin.booking.entities.Customer;
import ink.dustin.booking.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer")
public class CustomerController {
    private CustomerService service;

    @Autowired
    CustomerController(CustomerService service){
        this.service=service;
    }


    @CrossOrigin
    @GetMapping("/{email}")
    public ResponseEntity<?> getCustomer(@PathVariable String email){
        return ResponseEntity.ok(service.getCustomer(email));
    }

    @CrossOrigin
    @GetMapping()
    public ResponseEntity<?> getAllCustomers(){
        return ResponseEntity.ok(service.getAllCustomers());
    }

    @CrossOrigin
    @PostMapping()
    public ResponseEntity<?> saveCustomer(@RequestBody Customer customer){
        return ResponseEntity.ok(service.saveCustomer(customer));
    }

}

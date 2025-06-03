package ink.dustin.booking.services;

import ink.dustin.booking.entities.Customer;
import ink.dustin.booking.repos.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepo repo;

    @Autowired
    CustomerService(CustomerRepo repo){
        this.repo=repo;
    }



    public Customer saveCustomer(Customer customer){
        customer.setEmail(customer.getEmail().toUpperCase());
        return repo.saveAndFlush(customer);
    }

    public Customer getCustomer(String id){
        return repo.findById(id).orElseThrow();
    }

    public List<Customer> getAllCustomers(){
        return repo.findAll();
    }

//    public Customer saveNewCustomer(Customer customer){
//        Customer result;
//        try{
//
//        }catch (Exception e){
//
//        }
//
//        return result;
//    }

}

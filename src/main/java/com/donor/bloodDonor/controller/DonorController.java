package com.donor.bloodDonor.controller;

import java.util.Optional;

import java.util.Date;
import com.donor.bloodDonor.model.Donor;
import com.donor.bloodDonor.repository.DonorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;

import java.util.List;

// Annotation
@RestController

// Class
@Controller
public class DonorController {
    @GetMapping("/myPage")
    public String index() {
        return "index"; // This corresponds to the name of your HTML file (index.html)
    }

    @Autowired
	private DonorRepo repo;

    @PostMapping("/addDonor")
	public String addDonor(@RequestBody Donor donor){
        Date currentDate = new Date(); // Current date
        Date lastDonationDate = donor.getLastDonationDate(); // Last donation date
    
        // Calculate the difference in milliseconds between the current date and last donation date
        long differenceInMillis = currentDate.getTime() - lastDonationDate.getTime();
    
        // Calculate the difference in months
        int differenceInMonths = (int) (differenceInMillis / (1000L * 60 * 60 * 24 * 30));
    
        if (differenceInMonths > 2) {
            donor.setStatus("active");
        } else {
            donor.setStatus("inactive");
        }
        
		repo.save(donor);
	
		return "Added Successfully";
	}

    @GetMapping("/findAllDonors")
	public List<Donor> getDonors() {
	
		return repo.findAll();
	}

    @DeleteMapping("/delete/{phoneNumber}")
    public String deleteDonor(@PathVariable String phoneNumber) {
    repo.deleteById(phoneNumber);
    return "Deleted Successfully";
}

    @GetMapping("/findDonorsByBloodGroupAndAddress")
    public ResponseEntity<List<Donor>> findDonorsByBloodGroupAndAddress(
    @RequestParam("bloodGroup") String bloodGroup,
    @RequestParam("address") String address) {
    
    List<Donor> donors = repo.findDonorsByBloodGroupAndAddress(bloodGroup, address);
    
    if (!donors.isEmpty()) {
        return ResponseEntity.ok(donors);
    } else {
        return ResponseEntity.notFound().build();
    }
}

@PatchMapping("/updateDonor/{phoneNumber}")
public String updateDonor(@PathVariable String phoneNumber, @RequestBody Donor updatedDonor) {
    Optional<Donor> existingDonor = repo.findById(phoneNumber);

    if (existingDonor.isPresent()) {
        Donor donorToUpdate = existingDonor.get();

        // Update the properties from the updatedDonor
        if (updatedDonor.getDonorName() != null) {
            donorToUpdate.setDonorName(updatedDonor.getDonorName());
        }
        if (updatedDonor.getBloodGroup() != null) {
            donorToUpdate.setBloodGroup(updatedDonor.getBloodGroup());
        }
        if (updatedDonor.getAddress() != null) {
            donorToUpdate.setAddress(updatedDonor.getAddress());
        }
        if (updatedDonor.getLastDonationDate() != null) {
            donorToUpdate.setLastDonationDate(updatedDonor.getLastDonationDate());
        }
        if (updatedDonor.getStatus() != null) {
            donorToUpdate.setStatus(updatedDonor.getStatus());
        }
        // Update other properties as needed

        repo.save(donorToUpdate);
        return "Updated Successfully";
    } else {
        return "Donor not found for phone number: " + phoneNumber;
    }
}
}

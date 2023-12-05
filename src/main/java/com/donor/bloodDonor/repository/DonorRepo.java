package com.donor.bloodDonor.repository;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.donor.bloodDonor.model.Donor;

public interface DonorRepo 
    extends MongoRepository<Donor, String> {
    List<Donor> findDonorsByBloodGroupAndAddress(String bloodGroup, String address);
}


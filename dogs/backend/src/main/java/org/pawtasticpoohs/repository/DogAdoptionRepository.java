package org.pawtasticpoohs.repository;

import org.pawtasticpoohs.model.DogAdoption;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DogAdoptionRepository extends JpaRepository<DogAdoption, Integer>{

}

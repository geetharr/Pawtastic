package org.pawtasticpoohs.repository;

import org.pawtasticpoohs.model.DoctorAppointment;
import org.pawtasticpoohs.model.DogAdoption;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorAppointmentRepository  extends JpaRepository<DoctorAppointment, Integer> {
}

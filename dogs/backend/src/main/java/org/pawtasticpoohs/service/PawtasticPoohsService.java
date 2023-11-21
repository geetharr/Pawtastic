package org.pawtasticpoohs.service;

import java.util.List;

import org.pawtasticpoohs.model.*;

public interface PawtasticPoohsService {
	public DogBoarding registerDogBoarding(DogBoarding dogBoarding);
	public DogGrooming scheduleDogGrooming(DogGrooming dogGrooming);
	public DogTraining scheduleDogTraining(DogTraining dogTraining);
	public Volunteer registerVolunteer(Volunteer volunteer);
	public DogAdoption adoptDog(DogAdoption dogAdoption);
	public List<DogBoarding> getDogs(int userId);
	public DogBoarding getDog(int dogId);
	public List<DogNeedsSubCategories> getDogNeeds();

	DoctorAppointment bookAppointment(DoctorAppointment doctorAppointment);
}

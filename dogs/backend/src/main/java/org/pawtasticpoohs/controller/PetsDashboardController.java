package org.pawtasticpoohs.controller;

import java.util.List;

import org.pawtasticpoohs.model.*;
import org.pawtasticpoohs.service.PawtasticPoohsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pawtasticpoohs/dashboard")
public class PetsDashboardController {
	
	@Autowired
	private PawtasticPoohsService pawtasticPoohsService;
	
	@PostMapping("/dogboarding")
	public DogBoarding createDogBoarding(@RequestBody DogBoarding dogBoarding) {
		return pawtasticPoohsService.registerDogBoarding(dogBoarding);
	}
	@PostMapping("/meetvet")
	public DoctorAppointment bookAppointment(@RequestBody DoctorAppointment doctorAppointment){
		return pawtasticPoohsService.bookAppointment(doctorAppointment);
	}
	
	@PostMapping("/doggrooming")
	public DogGrooming createDogGrooming(@RequestBody DogGrooming dogGrooming) {
		return pawtasticPoohsService.scheduleDogGrooming(dogGrooming);
	}
	
	@PostMapping("/dogtraining")
	public DogTraining createDogTraining(@RequestBody DogTraining dogTraining) {
		return pawtasticPoohsService.scheduleDogTraining(dogTraining);
	}
	
	@PostMapping("/volunteer")
	public Volunteer createVolunteer(@RequestBody Volunteer volunteer) {
		return pawtasticPoohsService.registerVolunteer(volunteer);
		
	}
	
	@PostMapping("/dogadoption")
	public DogAdoption createAdopt(@RequestBody DogAdoption dogAdoption) {
		return pawtasticPoohsService.adoptDog(dogAdoption);
	}
	
	@GetMapping("/dogslist")
	public List<DogBoarding> getDogs(@RequestParam Integer userId) {
		return pawtasticPoohsService.getDogs(userId);
	}
	
	@GetMapping("/getdog")
	public DogBoarding getDog(@RequestParam Integer dogId) {
		return pawtasticPoohsService.getDog(dogId);
	}
	
	@GetMapping("/getdogneeds")
	public List<DogNeedsSubCategories> getDogNeeds() {
		return pawtasticPoohsService.getDogNeeds();
	}
	
	@PostMapping("/doggoodies")
	public String checkout(@RequestBody Object o) {
		return "Your order placed successfully";
	}
}

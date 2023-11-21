package org.pawtasticpoohs.service;

import java.util.List;

import org.pawtasticpoohs.model.*;
import org.pawtasticpoohs.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;
import javax.mail.internet.MimeMessage;
@Service
public class PawtasticPoohsServiceImpl implements PawtasticPoohsService {

	@Autowired
	private DogBoardingRepository dogBoardingRepository;
	
	@Autowired
	private DogGroomingRepository dogGroomingRepository;
	
	@Autowired
	private DogTrainingRepository dogTrainingRepository;
	
	@Autowired
	private VolunteerRepository volunteerRepository;
	
	@Autowired
	private DogAdoptionRepository dogAdoptionRepository;
	@Autowired
	private DoctorAppointmentRepository doctorAppointmentRepository;
	
	@Autowired
	private DogNeedsSubCategoriesRepository dogNeedsSubCategoriesRepository;
	@Autowired
	private SpringTemplateEngine templateEngine;
	@Autowired
	private JavaMailSenderImpl mailSender;
	@Value("${spring.mail.username}")
	private String sender;

	@Override
	public DogBoarding registerDogBoarding(DogBoarding dogBoarding) {
		DogBoarding savedDogBoarding = dogBoardingRepository.saveAndFlush(dogBoarding);

		// Send confirmation email
		sendConfirmationEmail(savedDogBoarding,"dog_boarding_confirmation");

		return savedDogBoarding;
	}

	@Override
	public DogGrooming scheduleDogGrooming(DogGrooming dogGrooming) {
		DogGrooming savedGrooming = dogGroomingRepository.saveAndFlush(dogGrooming);

		// Send confirmation email
		sendConfirmationEmail(savedGrooming, "dog_grooming_confirmation");

		return savedGrooming;
	}

	@Override
	public DogTraining scheduleDogTraining(DogTraining dogTraining) {
		DogTraining savedDogTraining = dogTrainingRepository.saveAndFlush(dogTraining);
		sendConfirmationEmail(savedDogTraining, "dog_training_confirmation");
		return savedDogTraining ;
	}

	@Override
	public Volunteer registerVolunteer(Volunteer volunteer) {
		Volunteer savedVolunteer = volunteerRepository.saveAndFlush(volunteer);

		// Send confirmation email
		sendConfirmationEmail(savedVolunteer, "volunteer_confirmation");

		return savedVolunteer;
	}

	@Override
	public DogAdoption adoptDog(DogAdoption dogAdoption) {
		DogAdoption savedDogAdoption = dogAdoptionRepository.saveAndFlush(dogAdoption);

		// Send confirmation email
		sendConfirmationEmail(savedDogAdoption, "dog_adoption_confirmation");

		return savedDogAdoption;
	}
	@Override
	public DoctorAppointment bookAppointment(DoctorAppointment doctorAppointment) {
		DoctorAppointment savedDoctorAppointment=doctorAppointmentRepository.saveAndFlush(doctorAppointment);
		sendConfirmationEmail(savedDoctorAppointment, "dog_appointment_confirmation");
		return savedDoctorAppointment;
	}


	@Override
	public List<DogBoarding> getDogs(int userId) {
		return dogBoardingRepository.findAll();
	}

	@Override
	public DogBoarding getDog(int dogId) {
		return dogBoardingRepository.findById(dogId).get(); 
	}
	
	public List<DogNeedsSubCategories> getDogNeedsSubCategories() {
		return dogNeedsSubCategoriesRepository.findAll();
	}

	@Override
	public List<DogNeedsSubCategories> getDogNeeds() {
		return dogNeedsSubCategoriesRepository.findAll();
	}



	private void sendConfirmationEmail(Object entity, String templateName) {
		try {
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message);

			String userEmail = null;

			if (entity instanceof DogTraining) {
				userEmail = ((DogTraining) entity).getEmail();
			} else if (entity instanceof DogGrooming) {

					userEmail = ((DogGrooming) entity).getEmail();
			} else if (entity instanceof DogBoarding) {

					userEmail = ((DogBoarding) entity).getEmail();


					System.out.println("User object in DogBoarding is null. Entity: " + entity);

			}
			else if (entity instanceof Volunteer) {
//				if (((Volunteer) entity).getUser() != null) {
					userEmail = ((Volunteer) entity).getEmail();
//				} else {
					System.out.println("User object in Volunteer is null. Entity: " + entity);
//				}
			} else if (entity instanceof DogAdoption) {
//				if (((DogAdoption) entity).getUser() != null) {
					userEmail = ((DogAdoption) entity).getEmail();
//				} else {
//					System.out.println("User object in DogAdoption is null. Entity: " + entity);
//				}
			}else if (entity instanceof DoctorAppointment) {
//				if (((DoctorAppointment) entity).getUser() != null) {
					userEmail = ((DoctorAppointment) entity).getEmail();
//				} else {
//					System.out.println("User object in DoctorAppointment is null. Entity: " + entity);
//				}
			}else {

				// Handle other types if necessary
				return;
			}
			System.out.println("User email: " + userEmail);  // Add this line for debugging
	if (userEmail != null) {
				System.out.println("User email: " + userEmail);  // Add this line for debugging
				helper.setTo(userEmail);
				helper.setSubject(getConfirmationSubject(entity));

				Context context = new Context();
				context.setVariable("entity", entity);

				String content = this.templateEngine.process(templateName, context);

				helper.setText(content, true);
				mailSender.send(message);
			} else {
				// Log or handle the case where the userEmail is null
				System.out.println("User email is null. Cannot send confirmation email.");
			}
		} catch (Exception e) {
			e.printStackTrace();
			// Handle exception or log the error
		}
	}


	private String getConfirmationSubject(Object entity) {
		if (entity instanceof DogTraining) {
			return "Dog Training Confirmation";
		} else if (entity instanceof DogGrooming) {
			return "Dog Grooming Confirmation";
		} else if (entity instanceof DogBoarding) {
			return "Dog Boarding Confirmation";
		}
		else if (entity instanceof DogAdoption) {
			return "Dog Adoption Confirmation";
		}
		else if (entity instanceof Volunteer) {
			return "Volunteer Confirmation";
		}
		else if (entity instanceof DoctorAppointment) {
			return "Doctor Appointment Confirmation";
		}else {
			// Handle other types if needed
			return "Confirmation Subject";
		}
	}
}

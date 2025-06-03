package ink.dustin.booking.repos;

import ink.dustin.booking.entities.Availability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface AvailabilityRepo extends JpaRepository<Availability,Long> {
}

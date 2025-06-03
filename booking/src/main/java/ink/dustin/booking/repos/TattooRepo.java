package ink.dustin.booking.repos;

import ink.dustin.booking.entities.Tattoo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface TattooRepo extends JpaRepository<Tattoo,Long> {
}

package ink.dustin.booking.entities;

import jakarta.persistence.*;

@Entity
public class Tattoo {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String string;

    @Column(name = "description")
    private String description;

    @Column(name = "basePrice")
    private Double basePrice;

    @Column(name = "estimatedDuration")
    private Integer estimatedDuration;





}

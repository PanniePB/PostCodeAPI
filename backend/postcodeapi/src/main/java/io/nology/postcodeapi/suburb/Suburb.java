package io.nology.postcodeapi.suburb;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Entity()
public class Suburb {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Getter
  private Long id;

  @NotBlank
  @Column
  @Getter
  @Setter
  private String name;

  @Column
  @Getter
  @Setter
  private Integer population;

  @Column
  @Getter
  @Setter
  private Integer postcode;

  public Suburb() {
  }

  public Suburb(String name, Integer population, Integer postcode) {
    super();
    this.name = name;
    this.population = population;
    this.postcode = postcode;
  }

}
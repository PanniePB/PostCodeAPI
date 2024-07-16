package io.nology.postcodeapi.postcode;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;

@Entity()
public class Postcode {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "postcode_id")
  @Getter
  private Long id;

  @Getter
  @Setter
  @Column(name = "postcode_number")
  private int postcode;

  public Postcode() {
  }

  public Postcode(Long id, int postcode) {
    super();
    this.id = id;
    this.postcode = postcode;
  }
}
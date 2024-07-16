package io.nology.postcodeapi.suburb;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

public class SuburbCreateDTO {

  @NotBlank
  @Getter
  @Setter
  private String name;

  @Min(10)
  @Getter
  @Setter
  private Integer population;

  @Min(10)
  @Getter
  @Setter
  private Integer postcode;

  public SuburbCreateDTO(String name, Integer population, Integer postcode) {
    this.name = name;
    this.population = population;
    this.postcode = postcode;
  }

}

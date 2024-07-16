package io.nology.postcodeapi.suburb;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public class SuburbUpdateDTO {

  @Size(min = 1, max = 50)
  private String name;

  @Min(value = 10, message = "Population must be greater than or equal to 10")
  private Integer population;

  @Min(value = 10, message = "Postcode must be greater than or equal to 10")
  private Integer postcode;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Integer getPopulation() {
    return population;
  }

  public void setPopulation(Integer population) {
    this.population = population;
  }

  public Integer getPostcode() {
    return postcode;
  }

  public void setPostcode(Integer postcode) {
    this.postcode = postcode;
  }
}
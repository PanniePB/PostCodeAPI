package io.nology.postcodeapi.postcode;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;

public class PostcodeCreateDTO {

  @Min(0)
  @Getter
  @Setter
  private int postcode;

}

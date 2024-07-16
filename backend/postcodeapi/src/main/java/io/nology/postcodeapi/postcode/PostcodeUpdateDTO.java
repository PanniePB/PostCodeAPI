package io.nology.postcodeapi.postcode;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public class PostcodeUpdateDTO {

  private int postcode;

  public int getPostcode() {
    return postcode;
  }

  public void setPostcode(int postcode) {
    this.postcode = postcode;
  }
}

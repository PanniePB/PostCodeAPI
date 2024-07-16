package io.nology.postcodeapi.postcode;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.nology.postcodeapi.exceptions.NotFoundException;
import io.nology.postcodeapi.suburb.Suburb;
import io.nology.postcodeapi.suburb.SuburbService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/postcode")
public class PostcodeController {
  @Autowired
  SuburbService suburbService;

  @Autowired
  PostcodeService postcodeService;

  @PostMapping
  public ResponseEntity<Postcode> createPostcode(@Valid @RequestBody PostcodeCreateDTO data) {
    Postcode postcode = this.postcodeService.createPostcode(data);
    return new ResponseEntity<Postcode>(postcode, HttpStatus.OK);
  }

  @GetMapping
  public ResponseEntity<List<Postcode>> getAll() {
    List<Postcode> allPostcodes = this.postcodeService.getAll();
    return new ResponseEntity<List<Postcode>>(allPostcodes, HttpStatus.OK);
  }

  @GetMapping("/postcodes")
  public ResponseEntity<Integer> getBySuburbName(@RequestParam String suburb) {
    Suburb foundSuburb = suburbService.getByName(suburb).orElseThrow(() -> {
      throw new NotFoundException("Could not find a suburb of name: " + suburb);
    });
    return new ResponseEntity<Integer>(foundSuburb.getPostcode(), HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Postcode> getById(@PathVariable Long id) {
    Optional<Postcode> found = this.postcodeService.getById(id);
    if (found.isPresent()) {
      return new ResponseEntity<Postcode>(found.get(), HttpStatus.OK);
    }
    throw new NotFoundException(String.format("Postcode with id: %d does not exist", id));

  }

  @PatchMapping("/{id}")
  public ResponseEntity<Postcode> updateById(@PathVariable Long id, @Valid @RequestBody PostcodeUpdateDTO data) {

    Optional<Postcode> updated = this.postcodeService.updateById(id, data);

    if (updated.isPresent()) {
      return new ResponseEntity<Postcode>(updated.get(), HttpStatus.OK);
    }

    throw new NotFoundException(String.format("Post with id: %d does not exist, could not update", id));
  }

}

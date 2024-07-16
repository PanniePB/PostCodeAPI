package io.nology.postcodeapi.suburb;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.nology.postcodeapi.exceptions.NotFoundException;
import io.nology.postcodeapi.postcode.Postcode;
import io.nology.postcodeapi.postcode.PostcodeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/suburb")
public class SuburbController {
  @Autowired
  private SuburbService suburbService;
  @Autowired
  private PostcodeService postcodeService;

  @PostMapping
  public ResponseEntity<Suburb> createSuburbAndPostCode(@Valid @RequestBody SuburbCreateDTO data) {
    if (postcodeService.getByPostcodeNumber(data.getPostcode()).isEmpty()) {
      this.postcodeService.createPostcode(data.getPostcode());
    }
    Suburb newSuburb = this.suburbService.createSuburbAndPostCode(data);
    return new ResponseEntity<Suburb>(newSuburb, HttpStatus.CREATED);
  }

  @GetMapping
  public ResponseEntity<List<Suburb>> findAllSuburbs() {
    List<Suburb> allSuburbs = this.suburbService.getAll();
    return new ResponseEntity<List<Suburb>>(allSuburbs, HttpStatus.OK);
  }

  @GetMapping("/suburbs")
  public ResponseEntity<List<Suburb>> findSuburbByPostcode(@RequestParam Integer postcode) {
    List<Suburb> suburb = this.suburbService.getAllByPostcodeNumber(postcode).orElseThrow(() -> {
      throw new NotFoundException("Could not find any suburb with postcode: " + postcode);
    });
    ;
    return new ResponseEntity<List<Suburb>>(suburb, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Suburb> findSuburbById(@PathVariable Long id) {
    Optional<Suburb> found = this.suburbService.getById(id);
    if (found.isPresent()) {
      return new ResponseEntity<Suburb>(found.get(), HttpStatus.OK);
    }
    throw new NotFoundException(String.format("Post with id: %d does not exist", id));
  }

  @PatchMapping("/{id}")
  public ResponseEntity<Suburb> updateSuburbById(@PathVariable Long id, @Valid @RequestBody SuburbUpdateDTO data) {
    if (data.getPostcode() != null && postcodeService.getByPostcodeNumber(data.getPostcode()).isEmpty()) {
      postcodeService.createPostcode(data.getPostcode());
    }
    // Suburb suburb = findSuburbById(id);
    Optional<Suburb> updated = this.suburbService.updateSuburbById(id, data);
    if (updated.isPresent()) {
      return new ResponseEntity<Suburb>(updated.get(), HttpStatus.OK);
    }

    throw new NotFoundException(String.format("Suburb with id: %d does not exist, could not update", id));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Suburb> deleteById(@PathVariable Long id) {
    boolean deleted = this.suburbService.deleteById(id);

    if (deleted == true) {
      return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
    }

    throw new NotFoundException(String.format("Post with id: %d does not exist, could not delete", id));
  }

}

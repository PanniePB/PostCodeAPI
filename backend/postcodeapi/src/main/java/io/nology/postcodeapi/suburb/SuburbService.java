package io.nology.postcodeapi.suburb;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class SuburbService {
  @Autowired
  private SuburbRepository suburbRepository;

  @Autowired
  private ModelMapper mapper;

  public Suburb createSuburbAndPostCode(SuburbCreateDTO data) {
    Suburb newSuburb = mapper.map(data, Suburb.class);
    return this.suburbRepository.save(newSuburb);
  }

  public List<Suburb> getAll() {
    return this.suburbRepository.findAll();
  }

  public Optional<List<Suburb>> getAllByPostcodeNumber(Integer postcode) {
    List<Suburb> suburbs = this.suburbRepository.findByPostcode(postcode);
    return Optional.ofNullable(suburbs.isEmpty() ? null : suburbs);
  }

  public Optional<Suburb> getById(Long id) {
    return this.suburbRepository.findById(id);
  }

  public Optional<Suburb> getByName(String name) {
    return this.suburbRepository.findByName(name);
  }

  public boolean deleteById(Long id) {
    Optional<Suburb> foundSuburb = this.suburbRepository.findById(id);
    if (foundSuburb.isPresent()) {
      this.suburbRepository.delete(foundSuburb.get());
      return true;
    }

    return false;

  }

  public Optional<Suburb> updateSuburbById(Long id, SuburbUpdateDTO data) {
    Optional<Suburb> foundSuburb = this.getById(id);
    if (foundSuburb.isPresent()) {
      Suburb toUpdate = foundSuburb.get();
      mapper.map(data, toUpdate);
      Suburb updatedSuburb = this.suburbRepository.save(toUpdate);

      return Optional.of(updatedSuburb);
    }

    return foundSuburb;
  }
}

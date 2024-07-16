package io.nology.postcodeapi.postcode;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class PostcodeService {
  @Autowired
  PostcodeRepository postcodeRepository;

  @Autowired
  private ModelMapper mapper;

  public Postcode createPostcode(PostcodeCreateDTO data) {
    Postcode newPostcode = new Postcode();
    newPostcode.setPostcode(data.getPostcode());
    return this.postcodeRepository.save(newPostcode);
  }

  // An overload to accept post code integer
  public Postcode createPostcode(Integer postcodeNumber) {
    Postcode newPostCode = new Postcode();
    newPostCode.setPostcode(postcodeNumber);
    return this.postcodeRepository.save(newPostCode);
  }

  public List<Postcode> getAll() {
    return this.postcodeRepository.findAll();
  }

  public Optional<Postcode> getById(Long id) {
    return this.postcodeRepository.findById(id);
  }

  public Optional<Postcode> getByPostcodeNumber(Integer postcode) {
    return this.postcodeRepository.findByPostcode(postcode);
  }

  public Optional<Postcode> updateById(Long id, PostcodeUpdateDTO data) {
    Optional<Postcode> foundPost = this.getById(id);
    if (foundPost.isPresent()) {
      Postcode toUpdate = foundPost.get();
      mapper.map(data, toUpdate);
      Postcode updatedPost = this.postcodeRepository.save(toUpdate);
      return Optional.of(updatedPost);
    }
    return foundPost;
  }

  // Omit delete due to post code table coupled with suburb table as foreign key
}

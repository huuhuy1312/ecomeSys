package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.services.FileService;
import com.bezkoder.springjwt.services.ImageClassifications1Service;
import com.bezkoder.springjwt.services.ImageProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestController {
  private final ImageClassifications1Service imageClassifications1Service;
  @GetMapping("/all")
  public String allAccess() {
    return "Public Content.";
  }

  @GetMapping("/user")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public String userAccess() {
    return "User Content.";
  }

  @GetMapping("/mod")
  @PreAuthorize("hasRole('MODERATOR')")
  public String moderatorAccess() {
    return "Moderator Board.";
  }

  @GetMapping("/admin")
  @PreAuthorize("hasRole('ADMIN')")
  public String adminAccess() {
    return "Admin Board.";
  }

  @PostMapping("/test-delete-files-ip")
  public void deleteFilesIpByIds(@RequestParam List<Long> ids){
      imageClassifications1Service.deleteByIds(ids);
  }
}

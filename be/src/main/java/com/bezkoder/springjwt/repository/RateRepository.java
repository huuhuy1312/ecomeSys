package com.bezkoder.springjwt.repository;


import com.bezkoder.springjwt.models.Rates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Repository
public interface RateRepository extends JpaRepository<Rates,Long> {
    List<Rates> findByProductId(long pid);
}


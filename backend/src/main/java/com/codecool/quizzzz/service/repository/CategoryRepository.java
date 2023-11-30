package com.codecool.quizzzz.service.repository;

import com.codecool.quizzzz.model.Category;
import com.codecool.quizzzz.model.CategoryEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
  Set<Category> findAllByCategoryEnumIn(Set<CategoryEnum> categoryEnum);
}

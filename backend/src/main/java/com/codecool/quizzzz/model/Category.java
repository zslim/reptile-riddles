package com.codecool.quizzzz.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category {
  @Id
  @GeneratedValue
  private Long id;
  @Enumerated(value = EnumType.STRING)
  private CategoryEnum categoryEnum;
}

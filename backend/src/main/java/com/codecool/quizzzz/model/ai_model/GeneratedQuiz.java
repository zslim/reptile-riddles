package com.codecool.quizzzz.model.ai_model;

import com.fasterxml.jackson.annotation.JsonPropertyDescription;
import java.util.*;

public class GeneratedQuiz {
  @JsonPropertyDescription("Quiz Question about geography")
  public String question;
  @JsonPropertyDescription("A list of answers to the question, 1 is correct, the other 3 is wrong")
  public ArrayList<String> answers;
}



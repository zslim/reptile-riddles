// package com.codecool.quizzzz.service;
//
// import com.codecool.quizzzz.dto.quiz.GameQuizDTO;
// import com.codecool.quizzzz.dto.user.NewPlayerDTO;
// import com.codecool.quizzzz.exception.NotFoundException;
// import com.codecool.quizzzz.model.Game;
// import com.codecool.quizzzz.model.Quiz;
// import com.codecool.quizzzz.service.repository.GameRepository;
// import com.codecool.quizzzz.service.repository.QuizRepository;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.mockito.Mockito;
//
// import java.util.Optional;
// import java.util.Set;
// import java.util.stream.Collectors;
//
// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.junit.jupiter.api.Assertions.assertThrows;
//
// class GameServiceTest {
//  private QuizRepository quizRepositoryMock;
//  private GameRepository gameRepositoryMock;
//  private GameService gameService;
//
//  @BeforeEach
//  void beforeEach() {
//    quizRepositoryMock = Mockito.mock(QuizRepository.class);
//    gameRepositoryMock = Mockito.mock(GameRepository.class);
//    gameService = new GameService(quizRepositoryMock, gameRepositoryMock);
//  }
//
//  @Test
//  void testGameCreationNoIssues() {
//    Mockito.when(quizRepositoryMock.findById(1L)).thenReturn(Optional.ofNullable(getSampleQuiz()));
//
//    GameQuizDTO expected = new GameQuizDTO(1L, "My new Quiz", 0);
//    GameQuizDTO actual = gameService.createGame(1L);
//    assertEquals(expected, actual);
//  }
//
//  Quiz getSampleQuiz() {
//    Quiz quiz = new Quiz();
//    quiz.setId(1L);
//    quiz.setTitle("My new Quiz");
//    return quiz;
//  }
//
//  @Test
//  void testGameCreationWithNonExistentQuizId() {
//    Long quizId = 1L;
//    Mockito.when(quizRepositoryMock.findById(quizId)).thenReturn(Optional.empty());
//
//    assertThrows(NotFoundException.class, () -> gameService.createGame(quizId));
//  }
//
//  @Test
//  void testGameJoinSingleJoin() {
//    Long gameId = 1L;
//    NewPlayerDTO newPlayerDTO = new NewPlayerDTO("New player");
//    Mockito.when(gameRepositoryMock.findGameById(gameId)).thenReturn(Optional.ofNullable(getSampleGame()));
//
//    Long expected = 1L;
//    Long actual = gameService.joinToGame(gameId, newPlayerDTO);
//    assertEquals(expected, actual);
//  }
//
//  Game getSampleGame() {
//    return new Game(getSampleQuiz());
//  }
//
//  @Test
//  void testGameJoinMultipleJoins() {
//    Long gameId = 1L;
//    Set<NewPlayerDTO> newPlayerDTOSet = Set.of(new NewPlayerDTO("p1"), new NewPlayerDTO("p2"), new NewPlayerDTO
//    ("p3"));
//    Mockito.when(gameRepositoryMock.findGameById(gameId)).thenReturn(Optional.ofNullable(getSampleGame()));
//
//    Set<Long> expected = Set.of(1L, 2L, 3L);
//    Set<Long> actual = newPlayerDTOSet.stream()
//                                      .map(dto -> gameService.joinToGame(gameId, dto))
//                                      .collect(Collectors.toSet());
//    assertEquals(expected, actual);
//  }
//
//  @Test
//  void testGameJoinInvalidGameId() {
//    Long gameId = 1L;
//    Mockito.when(gameRepositoryMock.findGameById(gameId)).thenReturn(Optional.empty());
//
//    assertThrows(NotFoundException.class, () -> gameService.joinToGame(1L, new NewPlayerDTO("new player 1")));
//  }
//}

package com.codecool.quizzzz.websocket;

import com.codecool.quizzzz.dto.game.GameAnswerClassDTO;
import com.codecool.quizzzz.dto.game.PlayerClassDTO;
import com.codecool.quizzzz.dto.game.TaskChangeClassDTO;
import com.codecool.quizzzz.dto.task.GameTaskDTO;
import com.codecool.quizzzz.dto.user.NewPlayerDTO;
import com.codecool.quizzzz.dto.user.PlayerDTO;
import com.codecool.quizzzz.service.GameService;
import com.codecool.quizzzz.service.repository.GameRepository;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class SocketModule {
  private final SocketIOServer server;
  private final GameRepository gameRepository;
  private final GameService gameService;


  @Autowired
  public SocketModule(SocketIOServer server, GameRepository gameRepository, GameService gameService) {
    this.gameService = gameService;
    this.gameRepository = gameRepository;
    this.server = server;
    this.server.addConnectListener(onConnected());
    this.server.addDisconnectListener(onDisconnected());

    this.server.addEventListener("join", PlayerClassDTO.class, onPlayerJoin());
    this.server.addEventListener("create_room", Long.class, onCreateRoom());
    this.server.addEventListener("task_change", TaskChangeClassDTO.class, onTaskChange());
    this.server.addEventListener("submit", GameAnswerClassDTO.class, onSubmit());
    this.server.addEventListener("scoreboard", Long.class, onScoreboardDisplay());
    this.server.addEventListener("exit", Long.class, onExit());
  }

  private DataListener<Long> onCreateRoom() {
    return (client, data, ackSender) -> {
      System.out.println("creating room");
      client.joinRoom(data.toString());
    };
  }

  private DataListener<Long> onExit() {
    return (client, data, ackSender) -> {
      System.out.println("sending exit order");
      gameRepository.removeGame(data);
      server.getRoomOperations(data.toString()).sendEvent("exit");
    };
  }

  private DataListener<Long> onScoreboardDisplay() {
    return (client, data, ackSender) -> {
      System.out.println("sending scoreboard");
      List<PlayerDTO> results = gameService.getResult(data);
      client.sendEvent("scoreboard", results);
      server.getRoomOperations(data.toString()).sendEvent("result");
    };
  }

  private DataListener<GameAnswerClassDTO> onSubmit() {
    return (client, data, ackSender) -> {
      System.out.println("sending submit result to " + client);
      boolean isCorrect = gameService.handleAnswerSubmit(data.getGameId(), data.getAnswerId(), data.getUsername());
      client.sendEvent("submit", isCorrect);
    };
  }

  private DataListener<TaskChangeClassDTO> onTaskChange() {
    return (client, data, ackSender) -> {
      System.out.println("sending task");
      GameTaskDTO gameTaskDTO = gameService.getNextTaskFromGame(data.getGameId());
      server.getRoomOperations(data.getGameId().toString()).sendEvent("task_change", gameTaskDTO);
    };
  }

  private DataListener<PlayerClassDTO> onPlayerJoin() {
    return (client, data, ackSender) -> {
      System.out.println("joining " + client);
      client.joinRoom(data.getGameId().toString());
      gameService.joinToGame(data.getGameId(), new NewPlayerDTO(data.getName()));
      int playerCount = gameRepository.findGameById(data.getGameId()).get().getPlayerCount();
      server.getRoomOperations(data.getGameId().toString()).sendEvent("join", playerCount);
    };
  }

  private ConnectListener onConnected() {
    return client -> System.out.println(client + "connected");
  }

  private DisconnectListener onDisconnected() {
    return client -> System.out.println(client + "disconnected");
  }
}

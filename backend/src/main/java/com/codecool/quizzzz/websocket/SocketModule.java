package com.codecool.quizzzz.websocket;

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
    System.out.println("here");
//    this.namespace = server.addNamespace("");
    this.gameService = gameService;
    this.gameRepository = gameRepository;
    this.server = server;
    this.server.addConnectListener(onConnected());
    this.server.addDisconnectListener(onDisconnected());
    this.server.addEventListener("join", PlayerClassDTO.class, onPlayerJoin());
    this.server.addEventListener("task_change", TaskChangeClassDTO.class, onTaskChange());
    this.server.addEventListener("submit", GameAnswerClassDTO.class, onSubmit());
    this.server.addEventListener("scoreboard", Long.class, onScoreboardDisplay());
    this.server.addEventListener("exit", Long.class, onExit());
  }

  private ConnectListener onConnected() {
    System.out.println("connected");
    return client -> System.out.println(client + "connected");
  }

  private DisconnectListener onDisconnected() {
    System.out.println("disconnected");
    return client -> System.out.println(client + "disconnected");
  }

  private DataListener<PlayerClassDTO> onPlayerJoin() {
    System.out.println("on player join");
    return (client, data, ackSender) -> {
      System.out.println("joined");
      gameService.joinToGame(data.getGameId(), new NewPlayerDTO(data.getName()));
      int playerCount = gameRepository.findGameById(data.getGameId()).get().getPlayerCount();
      server.getBroadcastOperations().sendEvent("join", playerCount);
    };
  }

  private DataListener<TaskChangeClassDTO> onTaskChange() {
    System.out.println("on task change");
    return (client, data, ackSender) -> {
      System.out.println("sending task");
      GameTaskDTO gameTaskDTO = gameService.getNextTaskFromGame(data.getGameId());
      server.getBroadcastOperations().sendEvent("task_change", gameTaskDTO);
    };
  }

  private DataListener<GameAnswerClassDTO> onSubmit() {
    System.out.println("on submit");
    return (client, data, ackSender) -> {
      System.out.println("sending submit result");
      boolean isCorrect = gameService.handleAnswerSubmit(data.getGameId(), data.getAnswerId(), data.getUsername());
      System.out.println(isCorrect);
      client.sendEvent("submit", isCorrect);
    };
  }

  private DataListener<Long> onScoreboardDisplay() {
    System.out.println("on scoreboard display");
    return (client, data, ackSender) -> {
      System.out.println("sending scoreboard");
      List<PlayerDTO> results = gameService.getResult(data);
      client.sendEvent("scoreboard", results);
      server.getBroadcastOperations().sendEvent("result");
    };
  }

  private DataListener<Long> onExit() {
    System.out.println("on exit");
    return (client, data, ackSender) -> {
      System.out.println("sending exit order");
      gameRepository.removeGame(data);
      server.getBroadcastOperations().sendEvent("exit");
    };
  }
}

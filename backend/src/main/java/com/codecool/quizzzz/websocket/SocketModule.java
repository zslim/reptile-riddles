package com.codecool.quizzzz.websocket;

import com.codecool.quizzzz.dto.answer.GameAnswerClassDTO;
import com.codecool.quizzzz.dto.game.GameDataClassDTO;
import com.codecool.quizzzz.dto.user.PlayerClassDTO;
import com.codecool.quizzzz.dto.task.TaskDataClassDTO;
import com.codecool.quizzzz.dto.task.GameTaskDTO;
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
import java.util.UUID;

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
    this.server.addEventListener("create_room", UUID.class, onCreateRoom());
    this.server.addEventListener("task_change", TaskDataClassDTO.class, onTaskChange());
    this.server.addEventListener("submit", GameAnswerClassDTO.class, onSubmit());
    this.server.addEventListener("scoreboard", GameDataClassDTO.class, onScoreboardDisplay());
    this.server.addEventListener("exit", UUID.class, onExit());
  }

  private DataListener<UUID> onCreateRoom() {
    return (client, data, ackSender) -> {
      System.out.println("creating room");
      client.joinRoom(data.toString());
    };
  }

  private DataListener<UUID> onExit() {
    return (client, data, ackSender) -> {
      System.out.println("sending exit order");
      gameRepository.removeGame(data);
      server.getRoomOperations(data.toString()).sendEvent("exit");
    };
  }

  private DataListener<GameDataClassDTO> onScoreboardDisplay() {
    return (client, data, ackSender) -> {
      System.out.println("sending scoreboard");
      List<PlayerDTO> results = gameService.getResult(data.getGameId());
      client.sendEvent("scoreboard", results);
      server.getRoomOperations(data.getGameUUID().toString()).sendEvent("result");
    };
  }

  private DataListener<GameAnswerClassDTO> onSubmit() {
    return (client, data, ackSender) -> {
      System.out.println("sending submit result to " + client.getSessionId());
      System.out.println("clients: " + server.getRoomOperations(data.getGameId().toString()).getClients());
      boolean isCorrect = gameService.handleAnswerSubmit(data.getGameId(), data.getAnswerId(), data.getPlayerId());
      System.out.println(isCorrect);
      client.sendEvent("submit", isCorrect);
    };
  }

  private DataListener<TaskDataClassDTO> onTaskChange() {
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
//      gameService.joinToGame(data.getGameId(), new NewPlayerDTO(data.getName()));
      int playerCount = gameRepository.findGameByUUID(data.getGameId()).get().getPlayerCount();
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

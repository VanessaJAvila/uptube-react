-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 23-Nov-2022 às 13:48
-- Versão do servidor: 10.4.24-MariaDB
-- versão do PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `uptube`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `achievements`
--

CREATE TABLE `achievements` (
  `achievements_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `achievement_level_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `achievements`
--

INSERT INTO `achievements` (`achievements_id`, `name`, `achievement_level_id`) VALUES
(1, '100 comments made!', 2),
(2, '200 comments made!', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `achievement_level`
--

CREATE TABLE `achievement_level` (
  `achievement_level_id` int(11) NOT NULL,
  `level` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `achievement_level`
--

INSERT INTO `achievement_level` (`achievement_level_id`, `level`) VALUES
(1, 'Gold'),
(2, 'Silver'),
(3, 'Bronze');

-- --------------------------------------------------------

--
-- Estrutura da tabela `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `comment` longtext NOT NULL,
  `user_id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `comments`
--

INSERT INTO `comments` (`comment_id`, `timestamp`, `comment`, `user_id`, `video_id`) VALUES
(3, '2022-11-16 17:33:10', 'Que video inutil, uma perda de tempo.', 6, 5),
(4, '2022-11-16 17:35:27', 'Sem palavras, muito bom mesmo,consegui reparar o meu ac sem gastar um balurdio em técnicos!!', 11, 4),
(5, '2022-11-16 17:36:40', 'Uma delicia, fiquei mesmo com vontade de uma bela mariscada!', 12, 1),
(6, '2022-11-16 17:40:59', 'kjdkdkwdwdkjbwkjdbwjd', 11, 4);

-- --------------------------------------------------------

--
-- Estrutura da tabela `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `seen` tinyint(1) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `type` varchar(45) NOT NULL,
  `mail_subject` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `notifications`
--

INSERT INTO `notifications` (`notification_id`, `user_id`, `seen`, `date`, `type`, `mail_subject`) VALUES
(1, 1, 0, '2022-11-14 01:26:28', 'Liked the video', '');

-- --------------------------------------------------------

--
-- Estrutura da tabela `playlist`
--

CREATE TABLE `playlist` (
  `playlist_id` int(11) NOT NULL,
  `title` varchar(45) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `creator_id` int(11) NOT NULL,
  `thumbnail` varchar(45) NOT NULL,
  `visibility` enum('public','private') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `playlist`
--

INSERT INTO `playlist` (`playlist_id`, `title`, `timestamp`, `creator_id`, `thumbnail`, `visibility`) VALUES
(1, 'Videos para adormecer', '2022-11-13 18:33:17', 1, 'url/imagens/imagem1', 'public'),
(2, 'Fails', '2022-11-14 20:15:18', 1, 'url/imagens/imagem7', 'public');

-- --------------------------------------------------------

--
-- Estrutura da tabela `playlist_has_invitees`
--

CREATE TABLE `playlist_has_invitees` (
  `playlist_id` int(11) NOT NULL,
  `invited_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `playlist_has_videos`
--

CREATE TABLE `playlist_has_videos` (
  `playlist_id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL,
  `timestamp_video_add` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `playlist_has_videos`
--

INSERT INTO `playlist_has_videos` (`playlist_id`, `video_id`, `timestamp_video_add`) VALUES
(1, 1, '2022-11-13 18:33:46'),
(1, 4, '2022-11-14 01:23:39');

-- --------------------------------------------------------

--
-- Estrutura da tabela `reaction`
--

CREATE TABLE `reaction` (
  `user_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `video_id` int(11) NOT NULL,
  `reaction_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `reaction`
--

INSERT INTO `reaction` (`user_id`, `date`, `video_id`, `reaction_type_id`) VALUES
(10, '2022-11-17 20:17:19', 4, 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `reaction_type`
--

CREATE TABLE `reaction_type` (
  `reaction_type_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `reaction_type`
--

INSERT INTO `reaction_type` (`reaction_type_id`, `name`) VALUES
(1, 'Like'),
(2, 'Dislike');

-- --------------------------------------------------------

--
-- Estrutura da tabela `reports`
--

CREATE TABLE `reports` (
  `report_id` int(11) NOT NULL,
  `comment_id` int(11) DEFAULT NULL,
  `report_type_id` varchar(45) NOT NULL,
  `video_id` int(11) DEFAULT NULL,
  `timestamp_report` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `state` enum('Pending','Solved') NOT NULL,
  `obs` longtext DEFAULT NULL,
  `action` enum('Banned','Warning','Invalid report') DEFAULT NULL,
  `reporter_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `reports`
--

INSERT INTO `reports` (`report_id`, `comment_id`, `report_type_id`, `video_id`, `timestamp_report`, `state`, `obs`, `action`, `reporter_id`) VALUES
(9, 3, '1', 5, '2022-11-17 10:54:01', 'Pending', NULL, 'Invalid report', 10),
(10, NULL, '2', 4, '2022-11-17 10:54:18', 'Pending', NULL, 'Warning', 11);

-- --------------------------------------------------------

--
-- Estrutura da tabela `report_type`
--

CREATE TABLE `report_type` (
  `report_id` int(11) NOT NULL,
  `type` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `report_type`
--

INSERT INTO `report_type` (`report_id`, `type`) VALUES
(1, 'Verbal offense'),
(2, 'Spamming');

-- --------------------------------------------------------

--
-- Estrutura da tabela `searchhistory`
--

CREATE TABLE `searchhistory` (
  `search_id` int(11) NOT NULL,
  `input` varchar(45) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `subscriptions`
--

CREATE TABLE `subscriptions` (
  `user_following_id` int(11) NOT NULL,
  `user_followed_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `subscriptions`
--

INSERT INTO `subscriptions` (`user_following_id`, `user_followed_id`, `date`) VALUES
(4, 1, '2022-11-14 01:30:54'),
(5, 17, '2022-11-17 13:01:25'),
(10, 1, '2022-11-14 21:40:47');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tags`
--

CREATE TABLE `tags` (
  `tag_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tags`
--

INSERT INTO `tags` (`tag_id`, `name`) VALUES
(1, 'Comédia'),
(2, 'Drama'),
(3, 'futebol'),
(4, 'Tenis'),
(5, 'Jogos de tabuleiro');

-- --------------------------------------------------------

--
-- Estrutura da tabela `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `token` varchar(45) DEFAULT NULL,
  `bio` longtext DEFAULT NULL,
  `photo` varchar(45) NOT NULL,
  `header` varchar(45) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `administrator` tinyint(1) NOT NULL DEFAULT 0,
  `account_opening` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `user`
--

INSERT INTO `user` (`user_id`, `username`, `name`, `email`, `password`, `token`, `bio`, `photo`, `header`, `birthday`, `administrator`, `account_opening`) VALUES
(1, 'FernandoS', 'Fernando', 'fernandoS@hotmail.com', '123456', 'sadasdGDSGDS', 'lelelelelelel', 'url/pastas/imagens/imagem1', 'Os pessegos', '1992-11-01', 1, '2022-11-16 12:18:25'),
(4, 'Sandruxa05', 'Sandra chan', 'sandrachan@mail.com', 'teste123', NULL, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', 'url/pastas/imagens/imagem3', 'ni ao?', '1975-05-31', 1, '2022-11-14 01:16:46'),
(5, 'Catso', 'Catia Sofia', 'catiasofia@mail.com', 'password', NULL, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', 'url/pastas/imagens/imagem4', 'xungita', '1985-12-01', 1, '2022-11-14 01:18:11'),
(6, 'Oneofthemastermind', 'Vanessa Avila', 'vanessa.3bl@gmail.com', 'teste123', 'asiufhashfãsFSADASD', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', 'url/pastas/imagens/imagem9', 'url/pastas/imagens/img_capa1', '1984-09-01', 1, '2022-11-14 09:44:06'),
(7, 'Ellonusk', 'Ellon Musk', 'EllyMonk@gmail.com', '1234567', NULL, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', 'url/pastas/imagens/imagem10', 'url/pastas/imagens/imagem10', '1982-11-30', 0, '2022-11-14 09:48:21'),
(8, 'Billy', 'Bill Gates', 'microBill@gmail.com', 'benfica', NULL, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', 'url/pastas/imagens/imagem11', 'url/pastas/imagens/imagem13', '1952-09-30', 0, '2022-11-14 09:49:36'),
(9, 'AdaLove22', 'Ada Lovelace', 'Ad_love@gmail.com', 'teste123', NULL, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', 'url/pastas/imagens/imagem14', 'url/pastas/imagens/imagem16', '1996-07-15', 1, '2022-11-14 09:56:37'),
(10, 'MaddamC', 'Madam Curry', 'mcurry@gmail.com', 'teste123', NULL, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', 'url/pastas/imagens/imagem15', 'url/pastas/imagens/imagem17', '1976-02-15', 1, '2022-11-14 09:57:46'),
(11, 'ewfdsa', 'asjkfbkasj', 'fer@gmailc.om', 'fsdfdsf', NULL, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', 'url/pastas/imagens/imagem1', 'url/pastas/imagens/imagem14', '1982-11-30', 1, '2022-11-14 12:14:19'),
(12, 'Gabi', 'Gabriel Pensador', 'Gabi_pensa@gmail.com', '123456', NULL, 'jdsngfijdsnfosdniadsjngidas', 'url/pastas/imagens/imagem11', 'url/pastas/imagens/imagem10', '1992-11-01', 0, '2022-11-16 10:18:30'),
(13, '', 'Otavio Gomes', 'OtaGom@gmail.com', '123456', NULL, NULL, '', NULL, '0000-00-00', 0, '2022-11-16 10:55:11'),
(16, '', 'lara pinto', 'lara@gmail.com', '123245', NULL, NULL, '', NULL, NULL, 0, '2022-11-16 12:10:47'),
(17, '', 'Eder', 'eder@gmail.com', '$2b$10$Ii8vUdMce27UEi3KmKzEBOHN1WAHSE5CxcP0TC', NULL, NULL, '', NULL, NULL, 0, '2022-11-16 12:45:57');

-- --------------------------------------------------------

--
-- Estrutura da tabela `user_has_achievements`
--

CREATE TABLE `user_has_achievements` (
  `user_id` int(11) NOT NULL,
  `achievements_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `user_has_achievements`
--

INSERT INTO `user_has_achievements` (`user_id`, `achievements_id`) VALUES
(6, 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `video`
--

CREATE TABLE `video` (
  `video_id` int(11) NOT NULL,
  `title` varchar(45) NOT NULL,
  `thumbnail` varchar(45) NOT NULL,
  `description` longtext NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) NOT NULL,
  `duration` time NOT NULL,
  `url_video` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `video`
--

INSERT INTO `video` (`video_id`, `title`, `thumbnail`, `description`, `date`, `user_id`, `duration`, `url_video`) VALUES
(1, ' A maria foi á fonte', '', '', '2022-11-18 10:45:33', 1, '00:00:00', ''),
(4, ' A maria vai á fonte', '', '', '2022-11-18 10:46:13', 4, '00:00:00', ''),
(5, ' A maria vai á fonte', '', '', '2022-11-18 11:20:20', 4, '00:00:00', ''),
(7, ' A maria vai á fonte', '.kndkwlnd', 'dhdiwd', '2022-11-18 11:26:08', 7, '00:50:00', '');

-- --------------------------------------------------------

--
-- Estrutura da tabela `video_has_tags`
--

CREATE TABLE `video_has_tags` (
  `video_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `video_has_tags`
--

INSERT INTO `video_has_tags` (`video_id`, `tag_id`) VALUES
(1, 1),
(1, 2),
(4, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `views`
--

CREATE TABLE `views` (
  `view_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL,
  `timestamp_start` datetime NOT NULL,
  `timestamp_end` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `views`
--

INSERT INTO `views` (`view_id`, `user_id`, `video_id`, `timestamp_start`, `timestamp_end`) VALUES
(1, 1, 1, '2022-11-13 18:38:11', '2022-11-13 18:38:34');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `achievements`
--
ALTER TABLE `achievements`
  ADD PRIMARY KEY (`achievements_id`),
  ADD KEY `achievement_level_id` (`achievement_level_id`);

--
-- Índices para tabela `achievement_level`
--
ALTER TABLE `achievement_level`
  ADD PRIMARY KEY (`achievement_level_id`);

--
-- Índices para tabela `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `video_id` (`video_id`);

--
-- Índices para tabela `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices para tabela `playlist`
--
ALTER TABLE `playlist`
  ADD PRIMARY KEY (`playlist_id`,`creator_id`) USING BTREE,
  ADD KEY `creator_id` (`creator_id`);

--
-- Índices para tabela `playlist_has_invitees`
--
ALTER TABLE `playlist_has_invitees`
  ADD PRIMARY KEY (`playlist_id`,`invited_id`),
  ADD KEY `invited_id` (`invited_id`,`playlist_id`) USING BTREE;

--
-- Índices para tabela `playlist_has_videos`
--
ALTER TABLE `playlist_has_videos`
  ADD PRIMARY KEY (`playlist_id`,`video_id`),
  ADD KEY `video_id` (`video_id`,`playlist_id`) USING BTREE;

--
-- Índices para tabela `reaction`
--
ALTER TABLE `reaction`
  ADD PRIMARY KEY (`user_id`,`video_id`),
  ADD KEY `video_id` (`video_id`),
  ADD KEY `reaction_type_id` (`reaction_type_id`) USING BTREE;

--
-- Índices para tabela `reaction_type`
--
ALTER TABLE `reaction_type`
  ADD PRIMARY KEY (`reaction_type_id`);

--
-- Índices para tabela `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `comment_id` (`comment_id`),
  ADD KEY `video_id` (`video_id`),
  ADD KEY `reporter_id` (`reporter_id`);

--
-- Índices para tabela `report_type`
--
ALTER TABLE `report_type`
  ADD PRIMARY KEY (`report_id`) USING BTREE;

--
-- Índices para tabela `searchhistory`
--
ALTER TABLE `searchhistory`
  ADD PRIMARY KEY (`search_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices para tabela `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`user_following_id`,`user_followed_id`),
  ADD KEY `user_follower_id` (`user_followed_id`);

--
-- Índices para tabela `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`tag_id`);

--
-- Índices para tabela `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices para tabela `user_has_achievements`
--
ALTER TABLE `user_has_achievements`
  ADD PRIMARY KEY (`user_id`,`achievements_id`),
  ADD KEY `achievements_id` (`achievements_id`);

--
-- Índices para tabela `video`
--
ALTER TABLE `video`
  ADD PRIMARY KEY (`video_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices para tabela `video_has_tags`
--
ALTER TABLE `video_has_tags`
  ADD PRIMARY KEY (`video_id`,`tag_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- Índices para tabela `views`
--
ALTER TABLE `views`
  ADD PRIMARY KEY (`view_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `video_id` (`video_id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `achievements`
--
ALTER TABLE `achievements`
  MODIFY `achievements_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `achievement_level`
--
ALTER TABLE `achievement_level`
  MODIFY `achievement_level_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `playlist`
--
ALTER TABLE `playlist`
  MODIFY `playlist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `reaction_type`
--
ALTER TABLE `reaction_type`
  MODIFY `reaction_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `reports`
--
ALTER TABLE `reports`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `report_type`
--
ALTER TABLE `report_type`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `searchhistory`
--
ALTER TABLE `searchhistory`
  MODIFY `search_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tags`
--
ALTER TABLE `tags`
  MODIFY `tag_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de tabela `video`
--
ALTER TABLE `video`
  MODIFY `video_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `views`
--
ALTER TABLE `views`
  MODIFY `view_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `achievements`
--
ALTER TABLE `achievements`
  ADD CONSTRAINT `achievements_ibfk_1` FOREIGN KEY (`achievement_level_id`) REFERENCES `achievement_level` (`achievement_level_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `video` (`video_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `playlist`
--
ALTER TABLE `playlist`
  ADD CONSTRAINT `playlist_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `playlist_has_invitees`
--
ALTER TABLE `playlist_has_invitees`
  ADD CONSTRAINT `playlist_has_invitees_ibfk_1` FOREIGN KEY (`invited_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `playlist_has_invitees_ibfk_2` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`playlist_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `playlist_has_videos`
--
ALTER TABLE `playlist_has_videos`
  ADD CONSTRAINT `playlist_has_videos_ibfk_1` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`playlist_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `playlist_has_videos_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `video` (`video_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `reaction`
--
ALTER TABLE `reaction`
  ADD CONSTRAINT `reaction_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reaction_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `video` (`video_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reaction_ibfk_3` FOREIGN KEY (`reaction_type_id`) REFERENCES `reaction_type` (`reaction_type_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`comment_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `video` (`video_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `reports_ibfk_4` FOREIGN KEY (`reporter_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `searchhistory`
--
ALTER TABLE `searchhistory`
  ADD CONSTRAINT `searchhistory_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD CONSTRAINT `subscriptions_ibfk_1` FOREIGN KEY (`user_followed_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `subscriptions_ibfk_2` FOREIGN KEY (`user_following_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `user_has_achievements`
--
ALTER TABLE `user_has_achievements`
  ADD CONSTRAINT `user_has_achievements_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_has_achievements_ibfk_2` FOREIGN KEY (`achievements_id`) REFERENCES `achievements` (`achievements_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `video`
--
ALTER TABLE `video`
  ADD CONSTRAINT `video_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `video_has_tags`
--
ALTER TABLE `video_has_tags`
  ADD CONSTRAINT `video_has_tags_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `video_has_tags_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `video` (`video_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `views`
--
ALTER TABLE `views`
  ADD CONSTRAINT `views_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `views_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `video` (`video_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

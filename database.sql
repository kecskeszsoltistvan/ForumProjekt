-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Ápr 15. 22:13
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `forum_test`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `categories`
--

CREATE TABLE `categories` (
  `ID` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `body` text NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `categories`
--

INSERT INTO `categories` (`ID`, `title`, `body`, `created_at`) VALUES
(1, 'AI', 'Mindenféle megjegyzések, észrevételek, kérdések a Mesterséges intelligenciával kapcsolatban', '2024-02-08'),
(2, 'Classdle', 'Egy nagyon jó kis játék. Kisbarátom aki csinálta', '2024-04-15'),
(3, 'Filmek', 'Filmek véleményezése, ajánlása', '2023-10-17'),
(4, 'Gaming', 'Játékok bemutatása, véleményezése, ajánlása', '2024-01-17'),
(5, 'Tech', 'Minden ami tech meg ilyenek', '2024-01-17'),
(6, 'Az erdő titka', 'https://www.youtube.com/watch?v=0s0IYhEz_2U', '2023-12-24'),
(7, 'Art', 'Minden ami művészet', '2024-02-21');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `comments`
--

CREATE TABLE `comments` (
  `ID` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `text` text NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `posts`
--

CREATE TABLE `posts` (
  `ID` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `text` text NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `posts`
--

INSERT INTO `posts` (`ID`, `user_id`, `category_id`, `title`, `text`, `created_at`) VALUES
(1, 1, 1, 'Ai - tapaszalatok', 'Éájt használtunk a projektünkhöz, nagyon király :)', '2024-04-15'),
(2, 2, 2, 'Ez meg micsoda?', 'Valaki el tudná nekem magyarázni hogy hogyan működik ez az oldal. Sehol nem találtam leírást és kicsit elvesztem.', '2024-04-11'),
(3, 2, 6, 'Az erdő titka', 'Az emberek\r\nAz erdőbe\r\nBejönnek meg\r\nKimennek\r\nMert az olyan\r\nSűrű hogy már\r\nTényleg hogy már\r\nNagyon sűrű\r\nAztán hogyha\r\nAz erdőből\r\nKijöttek meg\r\nBementek\r\nAz erdőbe\r\nÖssze-vissza\r\nCsavarva meg\r\nTekerve', '2024-02-09'),
(4, 2, 7, 'Kezdő festőnek tanácsok', 'El szeretnék kezdeni festeni, de nem tudom hogyan kezdjek neki.', '2024-04-09'),
(5, 2, 3, 'Interstellar ajánlás', 'A napokban megnéztem az Interstellart. Nagyon tetsztt nekem a film. Mindenkinek csak ajánlani tudom, nagyon szép grafikai megvalósítás és jó történet.', '2023-12-13'),
(6, 1, 4, 'Loloztam, nem kellett volna', 'Ma hajnali 4-ig rankedeztem és mindig noobokat dobott csak be a csapatomba az enemybe meg diásokat. Mikor javítja már ki a riot ezt???', '2024-01-10'),
(7, 2, 5, 'Vettem egy új alaplapot de nem tudom hogyan kell beszerelni.', 'Vettem egy új alaplapot de nem tudom berakni a gépházba. Nem fér bele és nem tudom hogyan kéne megoldanom ezt a problémát. Kérlek segítsetek. Előre is köszi :)', '2024-04-01');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `name` varchar(32) DEFAULT NULL,
  `email` varchar(32) DEFAULT NULL,
  `password` varchar(52) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`ID`, `name`, `email`, `password`) VALUES
(1, 'Jani', 'jani@jani.jani', '646c3fad45809c2a958cce7b5df636ef8de93e7d'),
(2, 'Kis Elemér', 'elemer@elemer.com', 'c6bc29f7fab8395896b940d5af26acf5d0fe2ca1');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `user_id` (`user_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `categories`
--
ALTER TABLE `categories`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `comments`
--
ALTER TABLE `comments`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `posts`
--
ALTER TABLE `posts`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`ID`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`ID`);

--
-- Megkötések a táblához `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`ID`),
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

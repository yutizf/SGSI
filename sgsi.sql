-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-07-2020 a las 15:27:06
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sgsi`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dominios_tareas`
--

CREATE TABLE `dominios_tareas` (
  `ID_Tareas` int(11) NOT NULL,
  `ID_Dominio` int(11) NOT NULL,
  `Tarea` varchar(100) NOT NULL,
  `Peso_Tarea` int(11) NOT NULL,
  `Cumplimiento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `normativas`
--

CREATE TABLE `normativas` (
  `ID_Normativa` int(11) NOT NULL,
  `ID_Dominio` int(11) NOT NULL,
  `Cumplimiento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `normativas_dominios`
--

CREATE TABLE `normativas_dominios` (
  `ID_Dominio` int(11) NOT NULL,
  `ID_Normativa_General` int(11) NOT NULL,
  `Dominio` varchar(100) NOT NULL,
  `Cumplimiento` int(11) NOT NULL,
  `Peso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `normativas_general`
--

CREATE TABLE `normativas_general` (
  `ID_Normativa_General` int(11) NOT NULL,
  `Normativa_General` varchar(50) NOT NULL,
  `Cumplimiento` int(11) NOT NULL,
  `Peso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `ID_Usuario` int(11) NOT NULL,
  `Usuario` varchar(30) NOT NULL,
  `Clave` varchar(50) NOT NULL,
  `Correo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `dominios_tareas`
--
ALTER TABLE `dominios_tareas`
  ADD PRIMARY KEY (`ID_Tareas`);

--
-- Indices de la tabla `normativas`
--
ALTER TABLE `normativas`
  ADD PRIMARY KEY (`ID_Normativa`);

--
-- Indices de la tabla `normativas_dominios`
--
ALTER TABLE `normativas_dominios`
  ADD PRIMARY KEY (`ID_Dominio`);

--
-- Indices de la tabla `normativas_general`
--
ALTER TABLE `normativas_general`
  ADD PRIMARY KEY (`ID_Normativa_General`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`ID_Usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `dominios_tareas`
--
ALTER TABLE `dominios_tareas`
  MODIFY `ID_Tareas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `normativas`
--
ALTER TABLE `normativas`
  MODIFY `ID_Normativa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `normativas_dominios`
--
ALTER TABLE `normativas_dominios`
  MODIFY `ID_Dominio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `normativas_general`
--
ALTER TABLE `normativas_general`
  MODIFY `ID_Normativa_General` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID_Usuario` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

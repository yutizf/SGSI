-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-09-2020 a las 09:49:52
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

DROP TABLE IF EXISTS `dominios_tareas`;
CREATE TABLE IF NOT EXISTS `dominios_tareas` (
  `ID_Tareas` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Dominio` int(11) NOT NULL,
  `Tarea` varchar(100) NOT NULL,
  `Peso_Tarea` int(11) NOT NULL,
  `Cumplimiento` int(11) NOT NULL,
  `Fecha_Actualizacion` datetime NOT NULL,
  PRIMARY KEY (`ID_Tareas`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `normativas_dominios`
--

DROP TABLE IF EXISTS `normativas_dominios`;
CREATE TABLE IF NOT EXISTS `normativas_dominios` (
  `ID_Dominio` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Normativa_General` int(11) NOT NULL,
  `Dominio` varchar(100) NOT NULL,
  `Cumplimiento` int(11) NOT NULL,
  `Peso` int(11) NOT NULL,
  PRIMARY KEY (`ID_Dominio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `normativas_general`
--

DROP TABLE IF EXISTS `normativas_general`;
CREATE TABLE IF NOT EXISTS `normativas_general` (
  `ID_Normativa_General` int(11) NOT NULL AUTO_INCREMENT,
  `Normativa_General` varchar(50) NOT NULL,
  `Cumplimiento` int(11) NOT NULL,
  `Peso` int(11) NOT NULL,
  PRIMARY KEY (`ID_Normativa_General`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas_usuarios`
--

DROP TABLE IF EXISTS `tareas_usuarios`;
CREATE TABLE IF NOT EXISTS `tareas_usuarios` (
  `ID_Tarea_Usuario` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Usuario` int(11) NOT NULL,
  `ID_Tarea` int(11) NOT NULL,
  `Peso` int(11) NOT NULL,
  `Cumplimiento` int(11) NOT NULL,
  PRIMARY KEY (`ID_Tarea_Usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `ID_Usuario` int(11) NOT NULL AUTO_INCREMENT,
  `Usuario` varchar(30) NOT NULL,
  `Clave` varchar(50) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Apellido` varchar(100) NOT NULL,
  `Correo` varchar(50) NOT NULL,
  `Grupo` int(11) NOT NULL,
  PRIMARY KEY (`ID_Usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 02-04-2025 a las 00:08:28
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `aulas_gestion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignado`
--

DROP TABLE IF EXISTS `asignado`;
CREATE TABLE IF NOT EXISTS `asignado` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_campo` int NOT NULL,
  `id_docente` int NOT NULL,
  `id_materia` int NOT NULL,
  `id_turno` int NOT NULL,
  `id_usuario` int NOT NULL,
  `descripcion` text,
  `requerimientos` text,
  `dias` varchar(50) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_final` date DEFAULT NULL,
  `fecha_registro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_campo` (`id_campo`),
  KEY `id_docente` (`id_docente`),
  KEY `id_materia` (`id_materia`),
  KEY `id_turno` (`id_turno`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asignado`
--

INSERT INTO `asignado` (`id`, `id_campo`, `id_docente`, `id_materia`, `id_turno`, `id_usuario`, `descripcion`, `requerimientos`, `dias`, `fecha_inicio`, `fecha_final`, `fecha_registro`) VALUES
(34, 1, 1, 2, 1, 1, 'aula asignada para ciencias de la computacion', '-wampserver\n-visual estudio code', '1,2,3,4,5', '2025-04-03', '2025-05-05', '2025-04-01 22:47:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `campo`
--

DROP TABLE IF EXISTS `campo`;
CREATE TABLE IF NOT EXISTS `campo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero` varchar(10) NOT NULL,
  `piso` int NOT NULL,
  `capacidad` int NOT NULL,
  `tipo` enum('Aula','Laboratorio','Otro') NOT NULL,
  `descripcion` text,
  `estado` enum('disponible','ocupado') DEFAULT 'disponible',
  `id_turno` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_campo_turno` (`id_turno`)
) ENGINE=MyISAM AUTO_INCREMENT=181 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `campo`
--

INSERT INTO `campo` (`id`, `numero`, `piso`, `capacidad`, `tipo`, `descripcion`, `estado`, `id_turno`) VALUES
(1, 'N200', 2, 30, 'Laboratorio', 'NN', 'ocupado', 1),
(2, 'N200', 2, 30, 'Laboratorio', 'NN', 'disponible', 2),
(3, 'N200', 2, 30, 'Laboratorio', 'NN', 'disponible', 3),
(4, 'N200', 2, 30, 'Laboratorio', 'NN', 'disponible', 4),
(5, 'N200', 2, 30, 'Laboratorio', 'NN', 'disponible', 5),
(6, 'N201', 2, 30, 'Laboratorio', 'NN', 'disponible', 1),
(7, 'N201', 2, 30, 'Laboratorio', 'NN', 'disponible', 2),
(8, 'N201', 2, 30, 'Laboratorio', 'NN', 'disponible', 3),
(9, 'N201', 2, 30, 'Laboratorio', 'NN', 'disponible', 4),
(10, 'N201', 2, 30, 'Laboratorio', 'NN', 'disponible', 5),
(11, 'N211', 2, 30, 'Laboratorio', 'NN', 'disponible', 1),
(12, 'N211', 2, 30, 'Laboratorio', 'NN', 'disponible', 2),
(13, 'N211', 2, 30, 'Laboratorio', 'NN', 'disponible', 3),
(14, 'N211', 2, 30, 'Laboratorio', 'NN', 'disponible', 4),
(15, 'N211', 2, 30, 'Laboratorio', 'NN', 'disponible', 5),
(16, 'N212', 2, 30, 'Otro', 'NN', 'disponible', 1),
(17, 'N212', 2, 30, 'Otro', 'NN', 'disponible', 2),
(18, 'N212', 2, 30, 'Otro', 'NN', 'disponible', 3),
(19, 'N212', 2, 30, 'Otro', 'NN', 'disponible', 4),
(20, 'N212', 2, 30, 'Otro', 'NN', 'disponible', 5),
(21, 'N220', 2, 30, 'Laboratorio', 'NN', 'disponible', 1),
(22, 'N220', 2, 30, 'Laboratorio', 'NN', 'disponible', 2),
(23, 'N220', 2, 30, 'Laboratorio', 'NN', 'disponible', 3),
(24, 'N220', 2, 30, 'Laboratorio', 'NN', 'disponible', 4),
(25, 'N220', 2, 30, 'Laboratorio', 'NN', 'disponible', 5),
(26, 'N221', 2, 30, 'Laboratorio', 'NN', 'disponible', 1),
(27, 'N221', 2, 30, 'Laboratorio', 'NN', 'disponible', 2),
(28, 'N221', 2, 30, 'Laboratorio', 'NN', 'disponible', 3),
(29, 'N221', 2, 30, 'Laboratorio', 'NN', 'disponible', 4),
(30, 'N221', 2, 30, 'Laboratorio', 'NN', 'disponible', 5),
(31, 'N300', 3, 30, 'Laboratorio', 'NN', 'disponible', 1),
(32, 'N300', 3, 30, 'Laboratorio', 'NN', 'disponible', 2),
(33, 'N300', 3, 30, 'Laboratorio', 'NN', 'disponible', 3),
(34, 'N300', 3, 30, 'Laboratorio', 'NN', 'disponible', 4),
(35, 'N300', 3, 30, 'Laboratorio', 'NN', 'disponible', 5),
(36, 'N301', 3, 30, 'Laboratorio', 'NN', 'disponible', 1),
(37, 'N301', 3, 30, 'Laboratorio', 'NN', 'disponible', 2),
(38, 'N301', 3, 30, 'Laboratorio', 'NN', 'disponible', 3),
(39, 'N301', 3, 30, 'Laboratorio', 'NN', 'disponible', 4),
(40, 'N301', 3, 30, 'Laboratorio', 'NN', 'disponible', 5),
(41, 'N302', 3, 30, 'Laboratorio', 'NN', 'disponible', 1),
(42, 'N302', 3, 30, 'Laboratorio', 'NN', 'disponible', 2),
(43, 'N302', 3, 30, 'Laboratorio', 'NN', 'disponible', 3),
(44, 'N302', 3, 30, 'Laboratorio', 'NN', 'disponible', 4),
(45, 'N302', 3, 30, 'Laboratorio', 'NN', 'disponible', 5),
(46, 'NLS', 3, 30, 'Laboratorio', 'NN', 'disponible', 1),
(47, 'NLS', 3, 30, 'Laboratorio', 'NN', 'disponible', 2),
(48, 'NLS', 3, 30, 'Laboratorio', 'NN', 'disponible', 3),
(49, 'NLS', 3, 30, 'Laboratorio', 'NN', 'disponible', 4),
(50, 'NLS', 3, 30, 'Laboratorio', 'NN', 'disponible', 5),
(51, 'NLS', 3, 30, 'Laboratorio', 'NN', 'disponible', 1),
(52, 'NLS', 3, 30, 'Laboratorio', 'NN', 'disponible', 2),
(53, 'NLS', 3, 30, 'Laboratorio', 'NN', 'disponible', 3),
(54, 'NLS', 3, 30, 'Laboratorio', 'NN', 'disponible', 4),
(55, 'NLS', 3, 30, 'Laboratorio', 'NN', 'disponible', 5),
(56, 'N400', 4, 30, 'Laboratorio', 'NN', 'disponible', 1),
(57, 'N400', 4, 30, 'Laboratorio', 'NN', 'disponible', 2),
(58, 'N400', 4, 30, 'Laboratorio', 'NN', 'disponible', 3),
(59, 'N400', 4, 30, 'Laboratorio', 'NN', 'disponible', 4),
(60, 'N400', 4, 30, 'Laboratorio', 'NN', 'disponible', 5),
(61, 'N401', 4, 30, 'Laboratorio', 'NN', 'disponible', 1),
(62, 'N401', 4, 30, 'Laboratorio', 'NN', 'disponible', 2),
(63, 'N401', 4, 30, 'Laboratorio', 'NN', 'disponible', 3),
(64, 'N401', 4, 30, 'Laboratorio', 'NN', 'disponible', 4),
(65, 'N401', 4, 30, 'Laboratorio', 'NN', 'disponible', 5),
(66, 'N402', 4, 30, 'Laboratorio', 'NN', 'disponible', 1),
(67, 'N402', 4, 30, 'Laboratorio', 'NN', 'disponible', 2),
(68, 'N402', 4, 30, 'Laboratorio', 'NN', 'disponible', 3),
(69, 'N402', 4, 30, 'Laboratorio', 'NN', 'disponible', 4),
(70, 'N402', 4, 30, 'Laboratorio', 'NN', 'disponible', 5),
(71, 'N420', 4, 30, 'Laboratorio', 'NN', 'disponible', 1),
(72, 'N420', 4, 30, 'Laboratorio', 'NN', 'disponible', 2),
(73, 'N420', 4, 30, 'Laboratorio', 'NN', 'disponible', 3),
(74, 'N420', 4, 30, 'Laboratorio', 'NN', 'disponible', 4),
(75, 'N420', 4, 30, 'Laboratorio', 'NN', 'disponible', 5),
(76, 'N421', 4, 30, 'Laboratorio', 'NN', 'disponible', 1),
(77, 'N421', 4, 30, 'Laboratorio', 'NN', 'disponible', 2),
(78, 'N421', 4, 30, 'Laboratorio', 'NN', 'disponible', 3),
(79, 'N421', 4, 30, 'Laboratorio', 'NN', 'disponible', 4),
(80, 'N421', 4, 30, 'Laboratorio', 'NN', 'disponible', 5),
(81, 'N500', 5, 30, 'Laboratorio', 'NN', 'disponible', 1),
(82, 'N500', 5, 30, 'Laboratorio', 'NN', 'disponible', 2),
(83, 'N500', 5, 30, 'Laboratorio', 'NN', 'disponible', 3),
(84, 'N500', 5, 30, 'Laboratorio', 'NN', 'disponible', 4),
(85, 'N500', 5, 30, 'Laboratorio', 'NN', 'disponible', 5),
(86, 'N501', 5, 30, 'Laboratorio', 'NN', 'disponible', 1),
(87, 'N501', 5, 30, 'Laboratorio', 'NN', 'disponible', 2),
(88, 'N501', 5, 30, 'Laboratorio', 'NN', 'disponible', 3),
(89, 'N501', 5, 30, 'Laboratorio', 'NN', 'disponible', 4),
(90, 'N501', 5, 30, 'Laboratorio', 'NN', 'disponible', 5),
(91, 'N502', 5, 30, 'Laboratorio', 'NN', 'disponible', 1),
(92, 'N502', 5, 30, 'Laboratorio', 'NN', 'disponible', 2),
(93, 'N502', 5, 30, 'Laboratorio', 'NN', 'disponible', 3),
(94, 'N502', 5, 30, 'Laboratorio', 'NN', 'disponible', 4),
(95, 'N502', 5, 30, 'Laboratorio', 'NN', 'disponible', 5),
(96, 'N503', 5, 30, 'Laboratorio', 'NN', 'disponible', 1),
(97, 'N503', 5, 30, 'Laboratorio', 'NN', 'disponible', 2),
(98, 'N503', 5, 30, 'Laboratorio', 'NN', 'disponible', 3),
(99, 'N503', 5, 30, 'Laboratorio', 'NN', 'disponible', 4),
(100, 'N503', 5, 30, 'Laboratorio', 'NN', 'disponible', 5),
(101, 'N510', 5, 30, 'Laboratorio', 'NN', 'disponible', 1),
(102, 'N510', 5, 30, 'Laboratorio', 'NN', 'disponible', 2),
(103, 'N510', 5, 30, 'Laboratorio', 'NN', 'disponible', 3),
(104, 'N510', 5, 30, 'Laboratorio', 'NN', 'disponible', 4),
(105, 'N510', 5, 30, 'Laboratorio', 'NN', 'disponible', 5),
(106, 'N520', 5, 30, 'Laboratorio', 'NN', 'disponible', 1),
(107, 'N520', 5, 30, 'Laboratorio', 'NN', 'disponible', 2),
(108, 'N520', 5, 30, 'Laboratorio', 'NN', 'disponible', 3),
(109, 'N520', 5, 30, 'Laboratorio', 'NN', 'disponible', 4),
(110, 'N520', 5, 30, 'Laboratorio', 'NN', 'disponible', 5),
(111, 'N521', 5, 30, 'Laboratorio', 'NN', 'disponible', 1),
(112, 'N521', 5, 30, 'Laboratorio', 'NN', 'disponible', 2),
(113, 'N521', 5, 30, 'Laboratorio', 'NN', 'disponible', 3),
(114, 'N521', 5, 30, 'Laboratorio', 'NN', 'disponible', 4),
(115, 'N521', 5, 30, 'Laboratorio', 'NN', 'disponible', 5),
(116, 'N522', 5, 30, 'Laboratorio', 'NN', 'disponible', 1),
(117, 'N522', 5, 30, 'Laboratorio', 'NN', 'disponible', 2),
(118, 'N522', 5, 30, 'Laboratorio', 'NN', 'disponible', 3),
(119, 'N522', 5, 30, 'Laboratorio', 'NN', 'disponible', 4),
(120, 'N522', 5, 30, 'Laboratorio', 'NN', 'disponible', 5),
(121, 'N600', 6, 30, 'Aula', 'NN', 'disponible', 1),
(122, 'N600', 6, 30, 'Aula', 'NN', 'disponible', 2),
(123, 'N600', 6, 30, 'Aula', 'NN', 'disponible', 3),
(124, 'N600', 6, 30, 'Aula', 'NN', 'disponible', 4),
(125, 'N600', 6, 30, 'Aula', 'NN', 'disponible', 5),
(126, 'N601', 6, 30, 'Aula', 'NN', 'disponible', 1),
(127, 'N601', 6, 30, 'Aula', 'NN', 'disponible', 2),
(128, 'N601', 6, 30, 'Aula', 'NN', 'disponible', 3),
(129, 'N601', 6, 30, 'Aula', 'NN', 'disponible', 4),
(130, 'N601', 6, 30, 'Aula', 'NN', 'disponible', 5),
(131, 'N602', 6, 30, 'Otro', 'NN', 'disponible', 1),
(132, 'N602', 6, 30, 'Otro', 'NN', 'disponible', 2),
(133, 'N602', 6, 30, 'Otro', 'NN', 'disponible', 3),
(134, 'N602', 6, 30, 'Otro', 'NN', 'disponible', 4),
(135, 'N602', 6, 30, 'Otro', 'NN', 'disponible', 5),
(136, 'N603', 6, 30, 'Otro', 'NN', 'disponible', 1),
(137, 'N603', 6, 30, 'Otro', 'NN', 'disponible', 2),
(138, 'N603', 6, 30, 'Otro', 'NN', 'disponible', 3),
(139, 'N603', 6, 30, 'Otro', 'NN', 'disponible', 4),
(140, 'N603', 6, 30, 'Otro', 'NN', 'disponible', 5),
(141, 'N604', 6, 30, 'Laboratorio', 'NN', 'disponible', 1),
(142, 'N604', 6, 30, 'Laboratorio', 'NN', 'disponible', 2),
(143, 'N604', 6, 30, 'Laboratorio', 'NN', 'disponible', 3),
(144, 'N604', 6, 30, 'Laboratorio', 'NN', 'disponible', 4),
(145, 'N604', 6, 30, 'Laboratorio', 'NN', 'disponible', 5),
(146, 'N605', 6, 30, 'Laboratorio', 'NN', 'disponible', 1),
(147, 'N605', 6, 30, 'Laboratorio', 'NN', 'disponible', 2),
(148, 'N605', 6, 30, 'Laboratorio', 'NN', 'disponible', 3),
(149, 'N605', 6, 30, 'Laboratorio', 'NN', 'disponible', 4),
(150, 'N605', 6, 30, 'Laboratorio', 'NN', 'disponible', 5),
(151, 'N606', 6, 30, 'Laboratorio', 'NN', 'disponible', 1),
(152, 'N606', 6, 30, 'Laboratorio', 'NN', 'disponible', 2),
(153, 'N606', 6, 30, 'Laboratorio', 'NN', 'disponible', 3),
(154, 'N606', 6, 30, 'Laboratorio', 'NN', 'disponible', 4),
(155, 'N606', 6, 30, 'Laboratorio', 'NN', 'disponible', 5),
(156, 'N610', 6, 30, 'Laboratorio', 'NN', 'disponible', 1),
(157, 'N610', 6, 30, 'Laboratorio', 'NN', 'disponible', 2),
(158, 'N610', 6, 30, 'Laboratorio', 'NN', 'disponible', 3),
(159, 'N610', 6, 30, 'Laboratorio', 'NN', 'disponible', 4),
(160, 'N610', 6, 30, 'Laboratorio', 'NN', 'disponible', 5),
(161, 'N620', 6, 30, 'Aula', 'NN', 'disponible', 1),
(162, 'N620', 6, 30, 'Aula', 'NN', 'disponible', 2),
(163, 'N620', 6, 30, 'Aula', 'NN', 'disponible', 3),
(164, 'N620', 6, 30, 'Aula', 'NN', 'disponible', 4),
(165, 'N620', 6, 30, 'Aula', 'NN', 'disponible', 5),
(166, 'N621', 6, 30, 'Aula', 'NN', 'disponible', 1),
(167, 'N621', 6, 30, 'Aula', 'NN', 'disponible', 2),
(168, 'N621', 6, 30, 'Aula', 'NN', 'disponible', 3),
(169, 'N621', 6, 30, 'Aula', 'NN', 'disponible', 4),
(170, 'N621', 6, 30, 'Aula', 'NN', 'disponible', 5),
(171, 'N622', 6, 30, 'Aula', 'NN', 'disponible', 1),
(172, 'N622', 6, 30, 'Aula', 'NN', 'disponible', 2),
(173, 'N622', 6, 30, 'Aula', 'NN', 'disponible', 3),
(174, 'N622', 6, 30, 'Aula', 'NN', 'disponible', 4),
(175, 'N622', 6, 30, 'Aula', 'NN', 'disponible', 5),
(176, 'N623', 6, 30, 'Aula', 'NN', 'disponible', 1),
(177, 'N623', 6, 30, 'Aula', 'NN', 'disponible', 2),
(178, 'N623', 6, 30, 'Aula', 'NN', 'disponible', 3),
(179, 'N623', 6, 30, 'Aula', 'NN', 'disponible', 4),
(180, 'N623', 6, 30, 'Aula', 'NN', 'disponible', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dias`
--

DROP TABLE IF EXISTS `dias`;
CREATE TABLE IF NOT EXISTS `dias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dia` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `dias`
--

INSERT INTO `dias` (`id`, `dia`) VALUES
(1, 'Lunes'),
(2, 'Martes'),
(3, 'Miércoles'),
(4, 'Jueves'),
(5, 'Viernes'),
(6, 'Sábado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docente`
--

DROP TABLE IF EXISTS `docente`;
CREATE TABLE IF NOT EXISTS `docente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ci` varchar(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ci` (`ci`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `docente`
--

INSERT INTO `docente` (`id`, `ci`, `nombre`, `telefono`) VALUES
(1, '1111111', 'Dennis Delgado', '11111111'),
(2, '2222222', 'Rolando Cespedes', '22222222'),
(3, '3333333', 'Franz Troche', '33333333'),
(4, '4444444', 'German Parraga', '44444444'),
(5, '5555555', 'Julio Cesar', '55555555'),
(6, '6666666', 'Fernando Cajiri', '66666666'),
(7, '7777777', 'Marcelo Yanez', '77777777');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facultad`
--

DROP TABLE IF EXISTS `facultad`;
CREATE TABLE IF NOT EXISTS `facultad` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `facultad`
--

INSERT INTO `facultad` (`id`, `nombre`) VALUES
(1, 'FACULTAD DE CIENCIAS EMPRESARIALES'),
(2, 'FACULTAD DE CIENCIAS Y TECNOLOGÍA'),
(3, 'FACULTAD DE CIENCIAS JURÍDICAS, SOCIALES Y HUMANÍSTICAS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

DROP TABLE IF EXISTS `materia`;
CREATE TABLE IF NOT EXISTS `materia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(10) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `id_facultad` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`),
  KEY `id_facultad` (`id_facultad`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`id`, `codigo`, `nombre`, `id_facultad`) VALUES
(3, 'SAL-301', 'ALGORITMOS Y PROGRAMACIÓN', 2),
(2, 'SCC-300', 'CIENCIAS DE LA COMPUTACIÓN', 2),
(1, 'SAL-304', 'MATEMATICAS DISCRETAS', 2),
(4, 'FCT-300', 'COSTOS I', 1),
(5, 'CMB-300', 'FUNDAMENTOS DE MARKETING', 1),
(6, 'FIN-301', 'FINANZAS I', 1),
(7, 'RBA-334', 'ORATORIA', 3),
(8, 'PMA-301', 'MEDIO AMBIENTE', 3),
(9, 'DCO-300', 'TEORÍA DEL ESTADO', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rol` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `rol`) VALUES
(1, 'administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turno`
--

DROP TABLE IF EXISTS `turno`;
CREATE TABLE IF NOT EXISTS `turno` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_final` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `turno`
--

INSERT INTO `turno` (`id`, `nombre`, `hora_inicio`, `hora_final`) VALUES
(5, 'Noche 19-22', '19:15:00', '22:15:00'),
(4, 'Tarde 16-19', '16:15:00', '19:15:00'),
(3, 'Tarde 13-16', '13:15:00', '16:15:00'),
(2, 'Mañana 10-13', '10:15:00', '13:15:00'),
(1, 'Mañana 7-10', '07:15:00', '10:15:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(20) NOT NULL,
  `contraseña` varchar(20) NOT NULL,
  `id_rol` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_rol` (`id_rol`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `contraseña`, `id_rol`) VALUES
(1, 'admin', '123', 1),
(2, 'admin2', '123', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

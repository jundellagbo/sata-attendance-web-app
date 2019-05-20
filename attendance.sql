-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 20, 2019 at 12:03 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `attendance`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance_records`
--

CREATE TABLE `attendance_records` (
  `id` int(10) UNSIGNED NOT NULL,
  `records` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `room` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `user` int(11) NOT NULL,
  `subject` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_recorded` date NOT NULL,
  `time_recorded` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roomid` int(11) NOT NULL,
  `subjectid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attendance_records`
--

INSERT INTO `attendance_records` (`id`, `records`, `room`, `user`, `subject`, `date_recorded`, `time_recorded`, `roomid`, `subjectid`) VALUES
(1, '[{\"id\":1,\"firstname\":\"Jundell\",\"middlename\":\"Quillan\",\"lastname\":\"Agbo\",\"address\":\"Poblacion Cordova Cebu\",\"contact\":\"09213586258\",\"guardian_name\":\"Lidelina Agbo\",\"guardian_contact\":\"09435153915\",\"roomid\":1,\"late\":\"\",\"present\":true}]', '{\"id\":1,\"roomname\":\"Section A\",\"levelid\":7}', 1, '{\"id\":1,\"roomid\":1,\"subjectname\":\"Mathematics\",\"timein\":\"1:00 PM\",\"timeout\":\"2:00 PM\"}', '2019-03-03', '01:33 PM', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `level`
--

CREATE TABLE `level` (
  `id` int(10) UNSIGNED NOT NULL,
  `level` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `strandid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `level`
--

INSERT INTO `level` (`id`, `level`, `strandid`) VALUES
(6, '22', 8),
(7, 'Grade 1', 2);

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `id` int(10) UNSIGNED NOT NULL,
  `logname` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `datelog` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `logs`
--

INSERT INTO `logs` (`id`, `logname`, `datelog`, `userid`) VALUES
(59, 'Aldric Leander (root) - adding new user named Jundell (jquillen)', '02/13/2019 11:05 PM', 1),
(60, 'Aldric Leander (root) - editing user named Jundell (jquillen)', '02/13/2019 11:10 PM', 1),
(61, 'Aldric Leander (root) - editing user named Jundell (jquillen)', '02/13/2019 11:13 PM', 1),
(62, 'Aldric Leander (root) - editing user named Aldric Leander (root)', '02/13/2019 11:26 PM', 1),
(63, 'Aldric Leander (root) - editing user named Aldric Leander sad (root)', '02/13/2019 11:26 PM', 1),
(64, 'Aldric Leander sad (root) - editing user named Aldric Leander (root)', '02/13/2019 11:27 PM', 1),
(65, 'Jundell (jquillen) - editing user named Jundell (jquillen)', '02/13/2019 11:28 PM', 3),
(66, 'Jundell (jquillen) - editing user named Jundell aa (jquillen)', '02/13/2019 11:28 PM', 3),
(67, 'Jundell aa (jquillen) - editing user named Jundell (jquillen)', '02/13/2019 11:28 PM', 3),
(68, 'Aldric Leander (root) - adding new user named Mikamo (jundell)', '02/14/2019 11:42 PM', 1),
(69, 'Aldric Leander (root) - approving user named Mikamo (jundell)', '02/14/2019 11:43 PM', 1),
(70, 'Aldric Leander (root) - adding new strand named test', '02/14/2019 11:54 PM', 1),
(71, 'Aldric Leander (root) - adding new student named a a a', '02/15/2019 12:01 AM', 1),
(72, 'Aldric Leander (root) - declined user named Mikamo (jundell)', '02/15/2019 12:12 AM', 1),
(73, 'Aldric Leander (root) - approving user named Jundell (jquillen)', '02/15/2019 12:12 AM', 1),
(74, 'Aldric Leander (root) - approving user named Jundell (jquillen)', '02/15/2019 02:57 AM', 1),
(75, 'Aldric Leander (root) - declined user named Jundell (jquillen)', '02/15/2019 02:57 AM', 1),
(76, 'Aldric Leander (root) - removing track named aa, including strand, level, rooms, subject and students under this track.', '02/27/2019 01:57 AM', 1),
(77, 'Aldric Leander (root) - removing strand named bb, including level, rooms, subject and students under this strand.', '02/27/2019 01:58 AM', 1),
(78, 'Aldric Leander (root) - removing strand named aa, including students and subjects.', '02/27/2019 02:00 AM', 1),
(79, 'Aldric Leander (root) - removing strand named aa, including students and subjects.', '02/27/2019 02:02 AM', 1),
(80, 'Aldric Leander (root) - adding new track named ', '02/28/2019 02:21 AM', 1),
(81, 'Aldric Leander (root) - removing track named asd, including strand, level, rooms, subject and students under this track.', '02/28/2019 02:22 AM', 1),
(82, 'Aldric Leander (root) - removing track named dd, including strand, level, rooms, subject and students under this track.', '02/28/2019 02:22 AM', 1),
(83, 'Aldric Leander (root) - adding new track named ', '02/28/2019 02:23 AM', 1),
(84, 'Aldric Leander (root) - adding new track named ', '02/28/2019 02:25 AM', 1),
(85, 'Aldric Leander (root) - editing track named ', '02/28/2019 02:28 AM', 1),
(86, 'Aldric Leander (root) - adding new track named sadas', '02/28/2019 02:32 AM', 1),
(87, 'Aldric Leander (root) - editing track named Academic', '02/28/2019 02:39 AM', 1),
(88, 'Aldric Leander (root) - editing track named Senior Highschool', '02/28/2019 02:40 AM', 1),
(89, 'Aldric Leander (root) - editing track named Secondary', '02/28/2019 02:40 AM', 1),
(90, 'Aldric Leander (root) - editing track named Primary', '02/28/2019 02:40 AM', 1),
(91, 'Aldric Leander (root) - editing strand named sadda', '02/28/2019 03:06 AM', 1),
(92, 'Aldric Leander (root) - editing strand named sadda', '02/28/2019 03:06 AM', 1),
(93, 'Aldric Leander (root) - adding new strand named sad', '02/28/2019 03:10 AM', 1),
(94, 'Aldric Leander (root) - editing strand named GAS', '02/28/2019 03:10 AM', 1),
(95, 'Aldric Leander (root) - editing strand named Humss', '02/28/2019 03:10 AM', 1),
(96, 'Aldric Leander (root) - adding new strand named Test', '02/28/2019 03:11 AM', 1),
(97, 'Aldric Leander (root) - adding new strand named Test', '02/28/2019 03:13 AM', 1),
(98, 'Aldric Leander (root) - removing strand named Test, including level, rooms, subject and students under this strand.', '02/28/2019 03:13 AM', 1),
(99, 'Aldric Leander (root) - removing track named Primary, including strand, level, rooms, subject and students under this track.', '02/28/2019 03:14 AM', 1),
(100, 'Aldric Leander (root) - removing track named Secondary, including strand, level, rooms, subject and students under this track.', '02/28/2019 03:14 AM', 1),
(101, 'Aldric Leander (root) - removing track named Senior Highschool, including strand, level, rooms, subject and students under this track.', '02/28/2019 03:14 AM', 1),
(102, 'Aldric Leander (root) - adding new track named TVL', '02/28/2019 03:14 AM', 1),
(103, 'Aldric Leander (root) - removing strand named Test, including level, rooms, subject and students under this strand.', '02/28/2019 03:17 AM', 1),
(104, 'Aldric Leander (root) - adding new strand level named Grade 1', '03/02/2019 02:06 AM', 1),
(105, 'Aldric Leander (root) - adding new strand level named Grade 2', '03/02/2019 02:10 AM', 1),
(106, 'Aldric Leander (root) - adding new strand level named Grade 3', '03/02/2019 02:10 AM', 1),
(107, 'Aldric Leander (root) - removing level named Grade 3, including rooms, subject and students under this level.', '03/02/2019 02:12 AM', 1),
(108, 'Aldric Leander (root) - adding new section named Section A', '03/02/2019 02:34 AM', 1),
(109, 'Aldric Leander (root) - adding new section named Section B', '03/02/2019 02:34 AM', 1),
(110, 'Aldric Leander (root) - editing section named Section AB', '03/02/2019 02:36 AM', 1),
(111, 'Aldric Leander (root) - editing section named Section A', '03/02/2019 02:36 AM', 1),
(112, 'Aldric Leander (root) - adding new student named Jundell Quillan Agbo', '03/02/2019 03:01 AM', 1),
(113, 'Aldric Leander (root) - adding new strand named Strand Sample', '03/02/2019 03:07 AM', 1),
(114, 'Aldric Leander (root) - adding new user named Jundell (jquillen)', '03/02/2019 03:14 AM', 1),
(115, 'Aldric Leander (root) - editing user named Jundell (jquillen)', '03/02/2019 03:27 AM', 1),
(116, 'Aldric Leander (root) - editing user named Jundell (jquillen)', '03/02/2019 03:27 AM', 1),
(117, 'Aldric Leander (root) - adding new track named Track 1', '03/03/2019 12:08 AM', 1),
(118, 'Aldric Leander (root) - adding new track named Track 2', '03/03/2019 12:41 AM', 1),
(119, 'Aldric Leander (root) - removing track named Track 2, including strand, level, rooms, subject and students under this track.', '03/03/2019 12:41 AM', 1),
(120, 'Aldric Leander (root) - editing track named Track 123', '03/03/2019 12:43 AM', 1),
(121, 'Aldric Leander (root) - adding new strand named Strand 1', '03/03/2019 12:43 AM', 1),
(122, 'Aldric Leander (root) - adding new strand named Strand 2', '03/03/2019 12:45 AM', 1),
(123, 'Aldric Leander (root) - removing strand named Strand 2, including level, rooms, subject and students under this strand.', '03/03/2019 12:48 AM', 1),
(124, 'Aldric Leander (root) - removing strand named Strand 1, including level, rooms, subject and students under this strand.', '03/03/2019 12:54 AM', 1),
(125, 'Aldric Leander (root) - removing track named Track 123, including strand, level, rooms, subject and students under this track.', '03/03/2019 12:57 AM', 1),
(126, 'Aldric Leander (root) - adding new strand named Strand 1', '03/03/2019 12:57 AM', 1),
(127, 'Aldric Leander (root) - removing strand named Strand 1, including level, rooms, subject and students under this strand.', '03/03/2019 12:59 AM', 1),
(128, 'Aldric Leander (root) - editing strand named GAS 123', '03/03/2019 12:59 AM', 1),
(129, 'Aldric Leander (root) - editing strand named GAS', '03/03/2019 12:59 AM', 1),
(130, 'Aldric Leander (root) - removing level named Grade 2, including rooms, subject and students under this level.', '03/03/2019 01:21 AM', 1),
(131, 'Aldric Leander (root) - adding new strand level named Grade 2', '03/03/2019 01:25 AM', 1),
(132, 'Aldric Leander (root) - removing level named Grade 2, including rooms, subject and students under this level.', '03/03/2019 01:26 AM', 1),
(133, 'Aldric Leander (root) - Submitting an attendance.', '03/03/2019 01:33 PM', 1),
(134, 'Aldric Leander (root) - adding new section named Section C', '03/03/2019 01:42 PM', 1);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(22, '2014_10_12_000000_create_users_table', 1),
(23, '2014_10_12_100000_create_password_resets_table', 1),
(24, '2016_06_01_000001_create_oauth_auth_codes_table', 1),
(25, '2016_06_01_000002_create_oauth_access_tokens_table', 1),
(44, '2016_06_01_000003_create_oauth_refresh_tokens_table', 2),
(45, '2016_06_01_000004_create_oauth_clients_table', 2),
(46, '2016_06_01_000005_create_oauth_personal_access_clients_table', 2),
(48, '2019_01_12_142548_create_students_table', 2),
(52, '2019_01_20_061433_create_logs_table', 3),
(60, '2019_01_28_154701_create_attendance_records_table', 4),
(61, '2019_01_29_143028_create_subject_table', 4),
(62, '2019_02_01_151905_create_smslogs_table', 4),
(63, '2019_02_26_143126_create_tracks_table', 4),
(64, '2019_02_26_143141_create_strand_table', 4),
(65, '2019_02_26_143208_create_level_table', 4),
(66, '2019_01_11_152242_create_rooms_table', 5);

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `client_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_access_tokens`
--

INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
('00680ec67e419b881e70968b77d8598cc76036553fe47670c83cc5a1d17c9144ba49edad6fe1baa5', 2, 1, 'user', '[]', 0, '2019-05-19 23:21:29', '2019-05-19 23:21:29', '2020-05-20 07:21:29'),
('06c315117ea6c55d5eefd4b8fc753fb652ebbdd6adf75ebd96d720f0c840506308fca11906f5824a', 1, 1, 'user', '[]', 1, '2019-02-13 07:26:23', '2019-02-13 07:26:23', '2020-02-13 15:26:23'),
('0f8e2726439751e8e76b499e0b3c1f76a969c9184febd64fda72cf22a28d8f28fdf408ee10d8ba35', 1, 1, 'user', '[]', 1, '2019-03-02 21:39:38', '2019-03-02 21:39:38', '2020-03-03 05:39:38'),
('107c22321a47be8953d23c8c45302d7994aa9bed82b759c0c8af4bb649f590b4e5f2cc87bceff989', 2, 1, 'user', '[]', 1, '2019-03-02 21:40:36', '2019-03-02 21:40:36', '2020-03-03 05:40:36'),
('17417d2002897f2a1d5d7aed183202dfe4641cc8df5d86bf150a8834ba11b4e18b0972de53d7735e', 1, 1, 'user', '[]', 1, '2019-03-01 11:16:48', '2019-03-01 11:16:48', '2020-03-01 19:16:48'),
('1ab92d4fb55d30b392ec5f164e7a06a3f5538f68cf673902e849a95cefb8cbce716f8b84c5690295', 2, 1, 'user', '[]', 1, '2019-03-01 11:18:47', '2019-03-01 11:18:47', '2020-03-01 19:18:47'),
('1aee9d4633f1e000b090b3b64ce27fbca5702ff379d2cd74b913be9122a7e7c110837c7ee421c5e0', 1, 1, 'user', '[]', 1, '2019-03-02 08:30:42', '2019-03-02 08:30:42', '2020-03-02 16:30:42'),
('2375f133ec8a2a2915d02609ec5aac1b6490e860406f42f0035c69123d1332b59b55ba116d85a44f', 1, 1, 'user', '[]', 0, '2019-03-02 08:25:40', '2019-03-02 08:25:40', '2020-03-02 16:25:40'),
('24193b8b1db86452c01c38d72dd29d4dd14e9bfa48a783e6ebbd2f88831d4896c900c206a9ce728e', 1, 1, 'user', '[]', 0, '2019-02-26 06:59:37', '2019-02-26 06:59:37', '2020-02-26 14:59:37'),
('2b02899dd7812b6431ac44aa251e28e2ab9745781b9c36fb11666cc8d2837e3d7098b4febf74840b', 1, 1, 'user', '[]', 0, '2019-02-14 08:19:17', '2019-02-14 08:19:17', '2020-02-14 16:19:17'),
('2c527f128a9cc5e8fddea7aecc604eda209aa5434b37c7a0259f78ddbc0005c684b3c20cdcea982f', 2, 1, 'user', '[]', 1, '2019-03-01 11:14:37', '2019-03-01 11:14:37', '2020-03-01 19:14:37'),
('2c5a29194a8f7e9c25b59fde7c16f7844359549ebde9c0be45d25e35d1efac1ee2a5df653b0141cf', 2, 1, 'user', '[]', 0, '2019-05-19 21:36:07', '2019-05-19 21:36:07', '2020-05-20 05:36:07'),
('3d536b30f6b464216d0ed3aafd0ad5c0bbf1f625cad56c5b4e1ab1984b847fa2a7533005866911e0', 3, 1, 'user', '[]', 1, '2019-02-13 07:13:41', '2019-02-13 07:13:41', '2020-02-13 15:13:41'),
('438dcea7e2f7e3ca6ec2096a8eb80c2541d7ceb371549ea779a02ac7e390e94b49ec4e852e32b9a6', 1, 1, 'user', '[]', 0, '2019-03-02 07:52:39', '2019-03-02 07:52:39', '2020-03-02 15:52:39'),
('472f63762fa887c17f94fe69d9ca8ff031b1018706737ea1660a27e94f761817385f6a55da49a0e0', 1, 1, 'user', '[]', 0, '2019-03-02 08:30:17', '2019-03-02 08:30:17', '2020-03-02 16:30:17'),
('4a790414159ee52cee82a1797180da8d3a83f9c20857eed0bd8c8c017d932282dd29a23516336ced', 1, 1, 'user', '[]', 1, '2019-02-13 07:10:13', '2019-02-13 07:10:13', '2020-02-13 15:10:13'),
('521c0525c53ae450a03a8ad341d76421410c246121aa1ab0355c63fa000d53bac8b3ca0f2b6a4d81', 2, 1, 'user', '[]', 1, '2019-03-01 11:15:59', '2019-03-01 11:15:59', '2020-03-01 19:15:59'),
('52de5eb45d0d33f21dfab592d3c57c57c8ce61c516271bb6d21e160f79a4195a408111a4139688f3', 2, 1, 'user', '[]', 1, '2019-03-02 08:18:38', '2019-03-02 08:18:38', '2020-03-02 16:18:38'),
('5d0fab937e96782cdcda9bceaaf35a02f54d75d96e7a4c314f4007eff3e16e1416132c9c8b658471', 1, 1, 'user', '[]', 1, '2019-02-27 09:53:42', '2019-02-27 09:53:42', '2020-02-27 17:53:42'),
('5fbb418ec91b8377a17e452ffa6746e446eba2121b81225a162d8811279d3be650e048a790aa72c1', 1, 1, 'user', '[]', 1, '2019-03-01 09:46:19', '2019-03-01 09:46:19', '2020-03-01 17:46:19'),
('6545e217b3bf6eae565d2391f49016d723094111bfc0927672864eda23effe3a71ba950b449eb8f3', 2, 1, 'user', '[]', 1, '2019-03-02 21:35:40', '2019-03-02 21:35:40', '2020-03-03 05:35:40'),
('654fbda5420cf0be90c3cbcb3377b47603359b2af75f3c6e45f08a01a53c61c963967e7d8a66b688', 1, 1, 'user', '[]', 1, '2019-02-13 07:25:35', '2019-02-13 07:25:35', '2020-02-13 15:25:35'),
('7661942c2584d54cfffff1546cecf168f7abcd334a2fc2c0364aadf51c0d43a631dd8965834429d3', 1, 1, 'user', '[]', 1, '2019-03-02 08:14:55', '2019-03-02 08:14:55', '2020-03-02 16:14:55'),
('87b1a8b6f2e6b33a3480691b2c9bae1fc440a255826c14936ebc3a9cf030367e5672f37f7852c68f', 3, 1, 'user', '[]', 1, '2019-02-13 07:32:51', '2019-02-13 07:32:51', '2020-02-13 15:32:51'),
('939a740df6258d6cd14d7b0db6bf87b346463223145bb92ae210e4e48dbf2a1c324f79d8c4f33c93', 1, 1, 'user', '[]', 0, '2019-02-27 07:16:55', '2019-02-27 07:16:55', '2020-02-27 15:16:55'),
('a1e649bdb850401328b2ea5312cf729213f9a5fa93a7238d04c82e6860d012ff4cedfed837de9200', 1, 1, 'user', '[]', 1, '2019-03-02 21:41:54', '2019-03-02 21:41:54', '2020-03-03 05:41:54'),
('ad983a5ab90f5c57619a1d8cb66e2297cf478afe186bf44bf3e67abdc376abe77692082aacfdc680', 2, 1, 'user', '[]', 1, '2019-03-02 21:34:05', '2019-03-02 21:34:05', '2020-03-03 05:34:05'),
('b0c19c5d4769abd3fa20299d900655d33dc458dad2801b4b1787441f1ac0d51994b1af7bd3c880a9', 3, 1, 'user', '[]', 0, '2019-02-13 07:29:15', '2019-02-13 07:29:15', '2020-02-13 15:29:15'),
('b29b8897d3597eadeba0423d19eb0489297df70831ca537afe61bbf06affb6969d342c0a857f5f47', 1, 1, 'user', '[]', 0, '2019-03-02 08:18:58', '2019-03-02 08:18:58', '2020-03-02 16:18:58'),
('bf7b6e8249621edd2a84cfc4a0d55adb9541931042731fd5e0f99d53ad0894d7a52ea0a75126f358', 1, 1, 'user', '[]', 1, '2019-02-13 07:26:38', '2019-02-13 07:26:38', '2020-02-13 15:26:38'),
('c9cd954a2b9b33627a5e86e519add2fc5a4916b4567fd341f01a10e9a53509f731ce8bbc15067348', 1, 1, 'user', '[]', 1, '2019-03-01 11:26:58', '2019-03-01 11:26:58', '2020-03-01 19:26:58'),
('cd90910ab088a94a1ec3ce0b7ff1a0ad0c030a1e82d11b6cbcd9a84fc322e38de13c026b7cec4243', 1, 1, 'user', '[]', 0, '2019-03-02 21:44:46', '2019-03-02 21:44:46', '2020-03-03 05:44:46'),
('d2f4154c15f64dc136c5ad884a7eec63f7f7314c4d79bb62b9e73c28cdc359fc460e36e619e2a0ad', 3, 1, 'user', '[]', 1, '2019-02-13 07:10:42', '2019-02-13 07:10:42', '2020-02-13 15:10:42'),
('d7a5da871ef2790f80ceb7910fe8284829b079917098f17bc8e139fc0424023076746e0ef6375d8a', 3, 1, 'user', '[]', 1, '2019-02-13 07:28:08', '2019-02-13 07:28:08', '2020-02-13 15:28:08'),
('d9ba3b1a8aef005872e3b73491d2721a35f516e420440cee311bcfcfae6345b122d8680793f5b5ee', 1, 1, 'user', '[]', 1, '2019-03-02 21:16:07', '2019-03-02 21:16:07', '2020-03-03 05:16:07'),
('dc1f61666e653ec233a9de5721e394e6444468018d7f64a51ba4fef454f6ede4624d44f6b0dc2230', 1, 1, 'user', '[]', 1, '2019-02-13 07:04:43', '2019-02-13 07:04:43', '2020-02-13 15:04:43'),
('dda8fb967013ee2484e4b25e04c1bc344f624d0082b446e13d06d70dc853c4690e92ae029f14e347', 1, 1, 'user', '[]', 0, '2019-03-02 09:25:04', '2019-03-02 09:25:04', '2020-03-02 17:25:04'),
('efe60005658761e87d9f9d14e75848fd4f970446ed60e258a71d88423baf476433d4b2ef7c9df1b4', 1, 1, 'user', '[]', 0, '2019-02-14 10:56:40', '2019-02-14 10:56:40', '2020-02-14 18:56:40'),
('f0657f4454986659192deee85f5fb9aca8dd963a53b3f55c00bc4581878d6c0c3809772c753ea671', 2, 1, 'user', '[]', 0, '2019-05-19 23:37:27', '2019-05-19 23:37:27', '2020-05-20 07:37:27'),
('f26dd57e5ca039a74a009685a1c435f16d799da601f6549df3aebb6dfd6eed5971fe1e62a9137274', 2, 1, 'user', '[]', 0, '2019-05-19 23:17:58', '2019-05-19 23:17:58', '2020-05-20 07:17:58'),
('f652bfc7f410b1ae6f0bcd0e5656758d1662401bf3e2e9f77cbdba537c4d69490984e3e9fdba0daa', 1, 1, 'user', '[]', 1, '2019-03-02 07:24:22', '2019-03-02 07:24:22', '2020-03-02 15:24:22'),
('f79fbe46fc954581cfc3abc0b731749923cb768e95cbf1054e2a786b3a15366c6810875a798f0a54', 3, 1, 'user', '[]', 1, '2019-02-13 07:05:22', '2019-02-13 07:05:22', '2020-02-13 15:05:22'),
('f959cb202b15d36358ffc62b3f3606f9d4f9c1c354fbac3d71f285dbb0377d2e2c356e1909d40b9b', 1, 1, 'user', '[]', 1, '2019-02-13 07:10:54', '2019-02-13 07:10:54', '2020-02-13 15:10:54'),
('fdf461354a66437df0da4339eefa5a09dd652976aaf2c4025c822a2e1b492f6461ff34e6bdf0996e', 1, 1, 'user', '[]', 0, '2019-02-14 07:42:19', '2019-02-14 07:42:19', '2020-02-14 15:42:19'),
('fe5dc115e74a9ac28d26bbae09c006c30aa3dcd81cd2df6186f6c78c0a5492aab7ea40212599faa3', 1, 1, 'user', '[]', 0, '2019-03-02 08:12:42', '2019-03-02 08:12:42', '2020-03-02 16:12:42');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `client_id` int(10) UNSIGNED NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Laravel Personal Access Client', 'kjJK9YeePGqCu1eUeWb1UpDl9Rn28dpKbdc9DR4T', 'http://localhost', 1, 0, 0, '2019-01-29 06:40:10', '2019-01-29 06:40:10');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
  `id` int(10) UNSIGNED NOT NULL,
  `client_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_personal_access_clients`
--

INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2019-01-29 06:40:10', '2019-01-29 06:40:10');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(10) UNSIGNED NOT NULL,
  `roomname` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `levelid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `roomname`, `levelid`) VALUES
(1, 'Section A', 7),
(2, 'Section B', 7),
(3, 'Section C', 7);

-- --------------------------------------------------------

--
-- Table structure for table `smslogs`
--

CREATE TABLE `smslogs` (
  `id` int(10) UNSIGNED NOT NULL,
  `records` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `room` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `user` int(11) NOT NULL,
  `subject` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_recorded` date NOT NULL,
  `time_recorded` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roomid` int(11) NOT NULL,
  `subjectid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `smslogs`
--

INSERT INTO `smslogs` (`id`, `records`, `room`, `user`, `subject`, `date_recorded`, `time_recorded`, `roomid`, `subjectid`) VALUES
(1, '[{\"id\":1,\"firstname\":\"Jundell\",\"middlename\":\"Quillan\",\"lastname\":\"Agbo\",\"address\":\"Poblacion Cordova Cebu\",\"contact\":\"09213586258\",\"guardian_name\":\"Lidelina Agbo\",\"guardian_contact\":\"09435153915\",\"roomid\":1,\"late\":\"\",\"present\":true}]', '{\"id\":1,\"roomname\":\"Section A\",\"levelid\":7}', 1, '{\"id\":1,\"roomid\":1,\"subjectname\":\"Mathematics\",\"timein\":\"1:00 PM\",\"timeout\":\"2:00 PM\"}', '2019-03-03', '01:33 PM', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `strand`
--

CREATE TABLE `strand` (
  `id` int(10) UNSIGNED NOT NULL,
  `strands` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `trackid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `strand`
--

INSERT INTO `strand` (`id`, `strands`, `trackid`) VALUES
(2, 'GAS', 8),
(3, 'Humss', 8),
(4, 'Strand Sample', 13);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(10) UNSIGNED NOT NULL,
  `firstname` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `middlename` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guardian_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guardian_contact` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userid` int(11) NOT NULL,
  `roomid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `firstname`, `middlename`, `lastname`, `address`, `contact`, `guardian_name`, `guardian_contact`, `userid`, `roomid`) VALUES
(1, 'Jundell', 'Quillan', 'Agbo', 'Poblacion Cordova Cebu', '09213586258', 'Lidelina Agbo', '09435153915', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `id` int(10) UNSIGNED NOT NULL,
  `roomid` int(11) NOT NULL,
  `subjectname` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `timein` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `timeout` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`id`, `roomid`, `subjectname`, `timein`, `timeout`) VALUES
(1, 1, 'Mathematics', '1:00 PM', '2:00 PM'),
(2, 2, 'English', '1:00 PM', '2:00 PM');

-- --------------------------------------------------------

--
-- Table structure for table `tracks`
--

CREATE TABLE `tracks` (
  `id` int(10) UNSIGNED NOT NULL,
  `tracks` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tracks`
--

INSERT INTO `tracks` (`id`, `tracks`) VALUES
(8, 'Academic'),
(13, 'TVL');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `firstname` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `middlename` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` int(11) NOT NULL,
  `confirmation` int(11) NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `middlename`, `lastname`, `contact`, `username`, `email`, `password`, `role`, `confirmation`, `remember_token`) VALUES
(1, 'Aldric Leander', 'Soriano', 'Sarmiento', '09481878270', 'root', 'root@gmail.com', '$2y$10$9aEQl/PjRc3rrnQ0i4spcez2iUTzVp2qcmw0w5pwBQNiU4vdai7IG', 1, 1, NULL),
(2, 'Jundell', 'Quillan', 'Agbo', '09213586258', 'jquillen', 'jquillen@dyl.com', '$2y$10$9aEQl/PjRc3rrnQ0i4spcez2iUTzVp2qcmw0w5pwBQNiU4vdai7IG', 0, 1, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance_records`
--
ALTER TABLE `attendance_records`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `level`
--
ALTER TABLE `level`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_personal_access_clients_client_id_index` (`client_id`);

--
-- Indexes for table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `smslogs`
--
ALTER TABLE `smslogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `strand`
--
ALTER TABLE `strand`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tracks`
--
ALTER TABLE `tracks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance_records`
--
ALTER TABLE `attendance_records`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `level`
--
ALTER TABLE `level`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `smslogs`
--
ALTER TABLE `smslogs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `strand`
--
ALTER TABLE `strand`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tracks`
--
ALTER TABLE `tracks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

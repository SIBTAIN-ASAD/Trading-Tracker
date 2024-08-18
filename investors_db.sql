-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Εξυπηρετητής: mysql_db
-- Χρόνος δημιουργίας: 09 Μαρ 2024 στις 18:54:36
-- Έκδοση διακομιστή: 8.2.0
-- Έκδοση PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Βάση δεδομένων: `investors_db`
--

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Άδειασμα δεδομένων του πίνακα `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add asset', 1, 'add_asset'),
(2, 'Can change asset', 1, 'change_asset'),
(3, 'Can delete asset', 1, 'delete_asset'),
(4, 'Can view asset', 1, 'view_asset'),
(5, 'Can add faq', 2, 'add_faq'),
(6, 'Can change faq', 2, 'change_faq'),
(7, 'Can delete faq', 2, 'delete_faq'),
(8, 'Can view faq', 2, 'view_faq'),
(9, 'Can add investment', 3, 'add_investment'),
(10, 'Can change investment', 3, 'change_investment'),
(11, 'Can delete investment', 3, 'delete_investment'),
(12, 'Can view investment', 3, 'view_investment'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add virtual trade', 5, 'add_virtualtrade'),
(18, 'Can change virtual trade', 5, 'change_virtualtrade'),
(19, 'Can delete virtual trade', 5, 'delete_virtualtrade'),
(20, 'Can view virtual trade', 5, 'view_virtualtrade'),
(21, 'Can add portfolio', 6, 'add_portfolio'),
(22, 'Can change portfolio', 6, 'change_portfolio'),
(23, 'Can delete portfolio', 6, 'delete_portfolio'),
(24, 'Can view portfolio', 6, 'view_portfolio'),
(25, 'Can add blog post', 7, 'add_blogpost'),
(26, 'Can change blog post', 7, 'change_blogpost'),
(27, 'Can delete blog post', 7, 'delete_blogpost'),
(28, 'Can view blog post', 7, 'view_blogpost'),
(29, 'Can add log entry', 8, 'add_logentry'),
(30, 'Can change log entry', 8, 'change_logentry'),
(31, 'Can delete log entry', 8, 'delete_logentry'),
(32, 'Can view log entry', 8, 'view_logentry'),
(33, 'Can add permission', 9, 'add_permission'),
(34, 'Can change permission', 9, 'change_permission'),
(35, 'Can delete permission', 9, 'delete_permission'),
(36, 'Can view permission', 9, 'view_permission'),
(37, 'Can add group', 10, 'add_group'),
(38, 'Can change group', 10, 'change_group'),
(39, 'Can delete group', 10, 'delete_group'),
(40, 'Can view group', 10, 'view_group'),
(41, 'Can add content type', 11, 'add_contenttype'),
(42, 'Can change content type', 11, 'change_contenttype'),
(43, 'Can delete content type', 11, 'delete_contenttype'),
(44, 'Can view content type', 11, 'view_contenttype'),
(45, 'Can add session', 12, 'add_session'),
(46, 'Can change session', 12, 'change_session'),
(47, 'Can delete session', 12, 'delete_session'),
(48, 'Can view session', 12, 'view_session'),
(49, 'Can add blacklisted token', 13, 'add_blacklistedtoken'),
(50, 'Can change blacklisted token', 13, 'change_blacklistedtoken'),
(51, 'Can delete blacklisted token', 13, 'delete_blacklistedtoken'),
(52, 'Can view blacklisted token', 13, 'view_blacklistedtoken'),
(53, 'Can add outstanding token', 14, 'add_outstandingtoken'),
(54, 'Can change outstanding token', 14, 'change_outstandingtoken'),
(55, 'Can delete outstanding token', 14, 'delete_outstandingtoken'),
(56, 'Can view outstanding token', 14, 'view_outstandingtoken'),
(57, 'Can add user profile', 15, 'add_userprofile'),
(58, 'Can change user profile', 15, 'change_userprofile'),
(59, 'Can delete user profile', 15, 'delete_userprofile'),
(60, 'Can view user profile', 15, 'view_userprofile');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `Backend_asset`
--

CREATE TABLE `Backend_asset` (
  `ticker_symbol` varchar(10) NOT NULL,
  `asset_type` varchar(30) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `market_supply` int UNSIGNED NOT NULL
) ;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `Backend_blogpost`
--

CREATE TABLE `Backend_blogpost` (
  `id` bigint NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `author_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `Backend_faq`
--

CREATE TABLE `Backend_faq` (
  `id` bigint NOT NULL,
  `question` varchar(500) NOT NULL,
  `answer` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `Backend_investment`
--

CREATE TABLE `Backend_investment` (
  `id` bigint NOT NULL,
  `quantity` int UNSIGNED NOT NULL,
  `initial_purchase_price` decimal(10,2) NOT NULL,
  `current_price` decimal(10,2) NOT NULL,
  `purchase_date` datetime(6) NOT NULL,
  `asset_id` varchar(10) NOT NULL,
  `portfolio_id` int NOT NULL
) ;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `Backend_portfolio`
--

CREATE TABLE `Backend_portfolio` (
  `id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `Backend_user`
--

CREATE TABLE `Backend_user` (
  `id` bigint NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `address` longtext,
  `age` int UNSIGNED DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL
) ;

--
-- Άδειασμα δεδομένων του πίνακα `Backend_user`
--

INSERT INTO `Backend_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `firstname`, `lastname`, `address`, `age`, `country`, `phone_number`) VALUES
(2, 'pbkdf2_sha256$390000$jeM6NrkqfIAjU3Kg8KfgkB$4Uu0eWh/1KuSGtP9JzCaM4TV/i86PjkhSkATYbJS0Ow=', NULL, 1, 'admin1', '', '', 'admin@test.com', 1, 1, '2024-02-28 10:44:50.503782', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `Backend_userprofile`
--

CREATE TABLE `Backend_userprofile` (
  `id` bigint NOT NULL,
  `bio` longtext,
  `user_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Άδειασμα δεδομένων του πίνακα `Backend_userprofile`
--

INSERT INTO `Backend_userprofile` (`id`, `bio`, `user_id`) VALUES
(1, NULL, 2);

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `Backend_user_groups`
--

CREATE TABLE `Backend_user_groups` (
  `id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `group_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `Backend_user_user_permissions`
--

CREATE TABLE `Backend_user_user_permissions` (
  `id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `permission_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `Backend_virtualtrade`
--

CREATE TABLE `Backend_virtualtrade` (
  `id` bigint NOT NULL,
  `trade_type` varchar(4) NOT NULL,
  `trade_quantity` int UNSIGNED NOT NULL,
  `trade_price` decimal(10,2) NOT NULL,
  `trade_date` datetime(6) NOT NULL,
  `investment_id` bigint NOT NULL,
  `user_id` bigint NOT NULL
) ;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint UNSIGNED NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL
) ;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Άδειασμα δεδομένων του πίνακα `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(8, 'admin', 'logentry'),
(10, 'auth', 'group'),
(9, 'auth', 'permission'),
(1, 'Backend', 'asset'),
(7, 'Backend', 'blogpost'),
(2, 'Backend', 'faq'),
(3, 'Backend', 'investment'),
(6, 'Backend', 'portfolio'),
(4, 'Backend', 'user'),
(15, 'Backend', 'userprofile'),
(5, 'Backend', 'virtualtrade'),
(11, 'contenttypes', 'contenttype'),
(12, 'sessions', 'session'),
(13, 'token_blacklist', 'blacklistedtoken'),
(14, 'token_blacklist', 'outstandingtoken');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Άδειασμα δεδομένων του πίνακα `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2024-02-28 10:25:36.949638'),
(2, 'contenttypes', '0002_remove_content_type_name', '2024-02-28 10:25:37.485765'),
(3, 'auth', '0001_initial', '2024-02-28 10:25:38.673903'),
(4, 'auth', '0002_alter_permission_name_max_length', '2024-02-28 10:25:38.959702'),
(5, 'auth', '0003_alter_user_email_max_length', '2024-02-28 10:25:39.000744'),
(6, 'auth', '0004_alter_user_username_opts', '2024-02-28 10:25:39.025818'),
(7, 'auth', '0005_alter_user_last_login_null', '2024-02-28 10:25:39.045246'),
(8, 'auth', '0006_require_contenttypes_0002', '2024-02-28 10:25:39.061791'),
(9, 'auth', '0007_alter_validators_add_error_messages', '2024-02-28 10:25:39.085618'),
(10, 'auth', '0008_alter_user_username_max_length', '2024-02-28 10:25:39.104580'),
(11, 'auth', '0009_alter_user_last_name_max_length', '2024-02-28 10:25:39.123959'),
(12, 'auth', '0010_alter_group_name_max_length', '2024-02-28 10:25:39.184378'),
(13, 'auth', '0011_update_proxy_permissions', '2024-02-28 10:25:39.210833'),
(14, 'auth', '0012_alter_user_first_name_max_length', '2024-02-28 10:25:39.233774'),
(15, 'Backend', '0001_initial', '2024-02-28 10:25:42.890296'),
(16, 'admin', '0001_initial', '2024-02-28 10:25:43.763134'),
(17, 'admin', '0002_logentry_remove_auto_add', '2024-02-28 10:25:43.787143'),
(18, 'admin', '0003_logentry_add_action_flag_choices', '2024-02-28 10:25:43.814668'),
(19, 'sessions', '0001_initial', '2024-02-28 10:25:44.003343'),
(20, 'token_blacklist', '0001_initial', '2024-02-28 10:25:44.711574'),
(21, 'token_blacklist', '0002_outstandingtoken_jti_hex', '2024-02-28 10:25:44.829315'),
(22, 'token_blacklist', '0003_auto_20171017_2007', '2024-02-28 10:25:44.861947'),
(23, 'token_blacklist', '0004_auto_20171017_2013', '2024-02-28 10:25:45.231808'),
(24, 'token_blacklist', '0005_remove_outstandingtoken_jti', '2024-02-28 10:25:45.482215'),
(25, 'token_blacklist', '0006_auto_20171017_2113', '2024-02-28 10:25:45.626827'),
(26, 'token_blacklist', '0007_auto_20171017_2214', '2024-02-28 10:25:46.437737'),
(27, 'token_blacklist', '0008_migrate_to_bigautofield', '2024-02-28 10:25:47.692401'),
(28, 'token_blacklist', '0010_fix_migrate_to_bigautofield', '2024-02-28 10:25:47.723469'),
(29, 'token_blacklist', '0011_linearizes_history', '2024-02-28 10:25:47.741574'),
(30, 'token_blacklist', '0012_alter_outstandingtoken_user', '2024-02-28 10:25:47.769481'),
(31, 'Backend', '0002_remove_user_bio_remove_user_profile_picture_and_more', '2024-02-28 10:43:41.679974');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `token_blacklist_blacklistedtoken`
--

CREATE TABLE `token_blacklist_blacklistedtoken` (
  `id` bigint NOT NULL,
  `blacklisted_at` datetime(6) NOT NULL,
  `token_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `token_blacklist_outstandingtoken`
--

CREATE TABLE `token_blacklist_outstandingtoken` (
  `id` bigint NOT NULL,
  `token` longtext NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `expires_at` datetime(6) NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `jti` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Ευρετήρια για άχρηστους πίνακες
--

--
-- Ευρετήρια για πίνακα `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Ευρετήρια για πίνακα `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Ευρετήρια για πίνακα `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Ευρετήρια για πίνακα `Backend_asset`
--
ALTER TABLE `Backend_asset`
  ADD PRIMARY KEY (`ticker_symbol`);

--
-- Ευρετήρια για πίνακα `Backend_blogpost`
--
ALTER TABLE `Backend_blogpost`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Backend_blogpost_author_id_0ea9f679_fk_Backend_user_id` (`author_id`);

--
-- Ευρετήρια για πίνακα `Backend_faq`
--
ALTER TABLE `Backend_faq`
  ADD PRIMARY KEY (`id`);

--
-- Ευρετήρια για πίνακα `Backend_investment`
--
ALTER TABLE `Backend_investment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Backend_investment_portfolio_id_da57e77d_fk_Backend_portfolio_id` (`portfolio_id`),
  ADD KEY `Backend_investment_asset_id_4848b77c_fk_Backend_a` (`asset_id`);

--
-- Ευρετήρια για πίνακα `Backend_portfolio`
--
ALTER TABLE `Backend_portfolio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Backend_portfolio_user_id_5d528fb3_fk_Backend_user_id` (`user_id`);

--
-- Ευρετήρια για πίνακα `Backend_user`
--
ALTER TABLE `Backend_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Ευρετήρια για πίνακα `Backend_userprofile`
--
ALTER TABLE `Backend_userprofile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Ευρετήρια για πίνακα `Backend_user_groups`
--
ALTER TABLE `Backend_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Backend_user_groups_user_id_group_id_1bed5ca6_uniq` (`user_id`,`group_id`),
  ADD KEY `Backend_user_groups_group_id_217e8d90_fk_auth_group_id` (`group_id`);

--
-- Ευρετήρια για πίνακα `Backend_user_user_permissions`
--
ALTER TABLE `Backend_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Backend_user_user_permis_user_id_permission_id_3dee465d_uniq` (`user_id`,`permission_id`),
  ADD KEY `Backend_user_user_pe_permission_id_59de2e98_fk_auth_perm` (`permission_id`);

--
-- Ευρετήρια για πίνακα `Backend_virtualtrade`
--
ALTER TABLE `Backend_virtualtrade`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Backend_virtualtrade_investment_id_e51c2a1e_fk_Backend_i` (`investment_id`),
  ADD KEY `Backend_virtualtrade_user_id_aaec9699_fk_Backend_user_id` (`user_id`);

--
-- Ευρετήρια για πίνακα `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_Backend_user_id` (`user_id`);

--
-- Ευρετήρια για πίνακα `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Ευρετήρια για πίνακα `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Ευρετήρια για πίνακα `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Ευρετήρια για πίνακα `token_blacklist_blacklistedtoken`
--
ALTER TABLE `token_blacklist_blacklistedtoken`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token_id` (`token_id`);

--
-- Ευρετήρια για πίνακα `token_blacklist_outstandingtoken`
--
ALTER TABLE `token_blacklist_outstandingtoken`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_uniq` (`jti`),
  ADD KEY `token_blacklist_outs_user_id_83bc629a_fk_Backend_u` (`user_id`);

--
-- AUTO_INCREMENT για άχρηστους πίνακες
--

--
-- AUTO_INCREMENT για πίνακα `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT για πίνακα `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT για πίνακα `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT για πίνακα `Backend_blogpost`
--
ALTER TABLE `Backend_blogpost`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT για πίνακα `Backend_faq`
--
ALTER TABLE `Backend_faq`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT για πίνακα `Backend_investment`
--
ALTER TABLE `Backend_investment`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT για πίνακα `Backend_portfolio`
--
ALTER TABLE `Backend_portfolio`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT για πίνακα `Backend_user`
--
ALTER TABLE `Backend_user`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT για πίνακα `Backend_userprofile`
--
ALTER TABLE `Backend_userprofile`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT για πίνακα `Backend_user_groups`
--
ALTER TABLE `Backend_user_groups`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT για πίνακα `Backend_user_user_permissions`
--
ALTER TABLE `Backend_user_user_permissions`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT για πίνακα `Backend_virtualtrade`
--
ALTER TABLE `Backend_virtualtrade`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT για πίνακα `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT για πίνακα `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT για πίνακα `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT για πίνακα `token_blacklist_blacklistedtoken`
--
ALTER TABLE `token_blacklist_blacklistedtoken`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT για πίνακα `token_blacklist_outstandingtoken`
--
ALTER TABLE `token_blacklist_outstandingtoken`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- Περιορισμοί για άχρηστους πίνακες
--

--
-- Περιορισμοί για πίνακα `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Περιορισμοί για πίνακα `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Περιορισμοί για πίνακα `Backend_blogpost`
--
ALTER TABLE `Backend_blogpost`
  ADD CONSTRAINT `Backend_blogpost_author_id_0ea9f679_fk_Backend_user_id` FOREIGN KEY (`author_id`) REFERENCES `Backend_user` (`id`);

--
-- Περιορισμοί για πίνακα `Backend_investment`
--
ALTER TABLE `Backend_investment`
  ADD CONSTRAINT `Backend_investment_asset_id_4848b77c_fk_Backend_a` FOREIGN KEY (`asset_id`) REFERENCES `Backend_asset` (`ticker_symbol`),
  ADD CONSTRAINT `Backend_investment_portfolio_id_da57e77d_fk_Backend_portfolio_id` FOREIGN KEY (`portfolio_id`) REFERENCES `Backend_portfolio` (`id`);

--
-- Περιορισμοί για πίνακα `Backend_portfolio`
--
ALTER TABLE `Backend_portfolio`
  ADD CONSTRAINT `Backend_portfolio_user_id_5d528fb3_fk_Backend_user_id` FOREIGN KEY (`user_id`) REFERENCES `Backend_user` (`id`);

--
-- Περιορισμοί για πίνακα `Backend_userprofile`
--
ALTER TABLE `Backend_userprofile`
  ADD CONSTRAINT `Backend_userprofile_user_id_34b4515b_fk_Backend_user_id` FOREIGN KEY (`user_id`) REFERENCES `Backend_user` (`id`);

--
-- Περιορισμοί για πίνακα `Backend_user_groups`
--
ALTER TABLE `Backend_user_groups`
  ADD CONSTRAINT `Backend_user_groups_group_id_217e8d90_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `Backend_user_groups_user_id_0de93e07_fk_Backend_user_id` FOREIGN KEY (`user_id`) REFERENCES `Backend_user` (`id`);

--
-- Περιορισμοί για πίνακα `Backend_user_user_permissions`
--
ALTER TABLE `Backend_user_user_permissions`
  ADD CONSTRAINT `Backend_user_user_pe_permission_id_59de2e98_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `Backend_user_user_pe_user_id_77ab9b21_fk_Backend_u` FOREIGN KEY (`user_id`) REFERENCES `Backend_user` (`id`);

--
-- Περιορισμοί για πίνακα `Backend_virtualtrade`
--
ALTER TABLE `Backend_virtualtrade`
  ADD CONSTRAINT `Backend_virtualtrade_investment_id_e51c2a1e_fk_Backend_i` FOREIGN KEY (`investment_id`) REFERENCES `Backend_investment` (`id`),
  ADD CONSTRAINT `Backend_virtualtrade_user_id_aaec9699_fk_Backend_user_id` FOREIGN KEY (`user_id`) REFERENCES `Backend_user` (`id`);

--
-- Περιορισμοί για πίνακα `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_Backend_user_id` FOREIGN KEY (`user_id`) REFERENCES `Backend_user` (`id`);

--
-- Περιορισμοί για πίνακα `token_blacklist_blacklistedtoken`
--
ALTER TABLE `token_blacklist_blacklistedtoken`
  ADD CONSTRAINT `token_blacklist_blacklistedtoken_token_id_3cc7fe56_fk` FOREIGN KEY (`token_id`) REFERENCES `token_blacklist_outstandingtoken` (`id`);

--
-- Περιορισμοί για πίνακα `token_blacklist_outstandingtoken`
--
ALTER TABLE `token_blacklist_outstandingtoken`
  ADD CONSTRAINT `token_blacklist_outs_user_id_83bc629a_fk_Backend_u` FOREIGN KEY (`user_id`) REFERENCES `Backend_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 07, 2022 at 11:12 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kay_enterprise`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `middlename` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `account_type` varchar(255) DEFAULT NULL,
  `status` text DEFAULT NULL,
  `added_by` varchar(255) DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `customer_key` varchar(255) DEFAULT NULL,
  `date_joined` varchar(255) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `bank_account_number` varchar(255) DEFAULT NULL,
  `bank_account_type` varchar(255) DEFAULT NULL,
  `credit_status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `firstname`, `surname`, `middlename`, `address`, `phone`, `gender`, `account_type`, `status`, `added_by`, `dob`, `email`, `customer_key`, `date_joined`, `bank_name`, `bank_account_number`, `bank_account_type`, `credit_status`) VALUES
(1, 'Mary', 'Babalola', 'kkdk', 'No 10, Main Roundabout, King Street', '8129443621', 'female', 'CUSTOMER', 'ACTIVE', 'Daniel Emeka', '', 'daniel.similoluwa@gmail.com', 'cust9225', 'Tuesday 08th, February 2022', 'Sterling Bank', '3021568796', 'Savings', 'NO DEBT');

-- --------------------------------------------------------

--
-- Table structure for table `owner_db`
--

CREATE TABLE `owner_db` (
  `id` int(11) NOT NULL,
  `firstname` text NOT NULL,
  `middlename` text NOT NULL,
  `surname` text NOT NULL,
  `dob` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` text NOT NULL,
  `gender` text NOT NULL,
  `date_joined` varchar(11) NOT NULL,
  `account_type` text NOT NULL,
  `staff_key` varchar(255) NOT NULL,
  `status` text NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `owner_db`
--

INSERT INTO `owner_db` (`id`, `firstname`, `middlename`, `surname`, `dob`, `address`, `phone`, `email`, `gender`, `date_joined`, `account_type`, `staff_key`, `status`, `username`, `password`) VALUES
(1, 'Kayode', 'Abimbola', 'Olasupo', '1-1-1980', 'Abimbola Enterprise', '+18329074215', 'admin@kayenterprises.com', 'Male', '1-14-2022', 'ADMIN', 'admin0001', 'ACTIVE', 'admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` int(11) NOT NULL,
  `firstname` text NOT NULL,
  `surname` text NOT NULL,
  `middlename` text NOT NULL,
  `dob` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` text NOT NULL,
  `gender` text NOT NULL,
  `date_joined` varchar(255) NOT NULL,
  `account_type` text NOT NULL,
  `staff_key` varchar(255) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `status` text NOT NULL,
  `added_by` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `firstname`, `surname`, `middlename`, `dob`, `address`, `phone`, `email`, `gender`, `date_joined`, `account_type`, `staff_key`, `username`, `password`, `status`, `added_by`) VALUES
(5, 'Daniel', 'Emeka', 'asdf', '2022-01-02T10:08:20.619Z', 'No 10, Main Roundabout, King Street', '080123456789', 'root@abc.com', 'male', 'Wednesday 19th, January 2022', 'STAFF', 'staff1216', 'daniel.emeka', '12345', 'ACTIVE', 'admin0001'),
(6, 'Daniel', 'Monday', ';lkj', '2022-01-02T10:08:20.619Z', 'No 10, Main Roundabout, King Street', '080123456789', 'root@abc.com', 'male', 'Wednesday 19th, January 2022', 'STAFF', 'staff6325', 'daniel.monday', '12345678', 'ACTIVE', 'admin0001');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

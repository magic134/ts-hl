/*
 Navicat Premium Data Transfer

 Source Server         : hello
 Source Server Type    : MySQL
 Source Server Version : 32336
 Source Host           : 192.168.171.128:3306
 Source Schema         : hlyx

 Target Server Type    : MySQL
 Target Server Version : 32336
 File Encoding         : 65001

 Date: 21/10/2025 18:56:03
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_detail
-- ----------------------------
DROP TABLE IF EXISTS `user_detail`;
CREATE TABLE `user_detail`  (
  `account_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `realname` varchar(12) NULL DEFAULT NULL,
  `email` varchar(40) NULL DEFAULT NULL,
  `question` varchar(30) NULL DEFAULT NULL,
  `answer` varchar(30) NULL DEFAULT NULL,
  `first` varchar(15) NULL DEFAULT NULL,
  `second` varchar(15) NULL DEFAULT NULL,
  `third` varchar(15) NULL DEFAULT NULL,
  `last` varchar(15) NULL DEFAULT NULL,
  `idcard` varchar(20) NULL DEFAULT NULL,
  `sex` varchar(4) NULL DEFAULT NULL,
  `birthday` date NULL DEFAULT NULL,
  `living` varchar(4) NULL DEFAULT NULL,
  `qq` varchar(4) NULL DEFAULT NULL,
  `qq_no` varchar(10) NULL DEFAULT NULL,
  `tel` varchar(20) NULL DEFAULT NULL,
  `zip` varchar(7) NULL DEFAULT NULL,
  `address` varchar(50) NULL DEFAULT NULL,
  `mobil` varchar(15) NULL DEFAULT NULL,
  `five` varchar(15) NULL DEFAULT NULL,
  `six` varchar(15) NULL DEFAULT NULL,
  `seven` varchar(15) NULL DEFAULT NULL,
  `eight` varchar(15) NULL DEFAULT NULL,
  `nine` varchar(15) NULL DEFAULT NULL,
  `ten` varchar(15) NULL DEFAULT NULL,
  `reg_ip` varchar(15) NULL DEFAULT NULL,
  PRIMARY KEY (`account_id`)
) ENGINE = MyISAM AUTO_INCREMENT = 1 ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;

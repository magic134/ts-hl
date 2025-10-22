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

 Date: 21/10/2025 18:55:47
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for reg_user
-- ----------------------------
DROP TABLE IF EXISTS `reg_user`;
CREATE TABLE `reg_user`  (
  `event_id` int(4) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `user_id` varchar(32) NOT NULL DEFAULT '',
  `password` varchar(50) NOT NULL DEFAULT '',
  `level` int(2) NOT NULL DEFAULT 1,
  `reg_time` int(14) NOT NULL DEFAULT 0,
  `real_name` varchar(32) NULL DEFAULT NULL,
  `ip_addr` varchar(15) NULL DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  INDEX `user_id`(`user_id`)
) ENGINE = MyISAM AUTO_INCREMENT = 1 ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;

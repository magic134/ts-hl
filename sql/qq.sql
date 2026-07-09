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

 Date: 03/11/2025 16:48:38
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for qq
-- ----------------------------
DROP TABLE IF EXISTS `qq`;
CREATE TABLE `qq`  (
  `id` int(4) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `qq` int(16) NULL DEFAULT NULL,
  `account_id1` int(4) NULL DEFAULT NULL,
  `account_id2` int(4) NULL DEFAULT NULL,
  `account_id3` int(4) NULL DEFAULT NULL,
  `reg_date` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = MyISAM AUTO_INCREMENT = 2 ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of qq
-- ----------------------------
INSERT INTO `qq` VALUES (0001, 1234567890, 2, 3, 4, '2025-11-03');

SET FOREIGN_KEY_CHECKS = 1;

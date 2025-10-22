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

 Date: 21/10/2025 18:55:16
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account`  (
  `id` int(4) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `name` char(32) NOT NULL DEFAULT '',
  `password` char(16) NOT NULL DEFAULT '',
  `type` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0002,
  `point` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 100000,
  `pointtime` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 23001231,
  `online` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `licence` int(4) UNSIGNED NOT NULL DEFAULT 0,
  `netbar_ip` char(15) NULL DEFAULT '127.0.0.1',
  `ip_mask` char(15) NULL DEFAULT '255.255.255.255',
  `reg_date` date NULL DEFAULT NULL,
  `reg_flag` tinyint(1) UNSIGNED NULL DEFAULT 3,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `ix_name`(`name`)
) ENGINE = MyISAM AUTO_INCREMENT = 2 ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES (0001, '111111', '111111', 0002, 100000, 23001231, 0000, 0, '127.0.0.1', '255.255.255.255', NULL, 3);

SET FOREIGN_KEY_CHECKS = 1;

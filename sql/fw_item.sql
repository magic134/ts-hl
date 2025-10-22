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

 Date: 21/10/2025 18:55:34
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for fw_item
-- ----------------------------
DROP TABLE IF EXISTS `fw_item`;
CREATE TABLE `fw_item`  (
  `ownerid` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `name` char(32) NOT NULL DEFAULT '',
  `ownername` char(32) NOT NULL DEFAULT '',
  `type` enum('兵刃','暗器','毒药','补药','宝物') NOT NULL DEFAULT '兵刃',
  `power` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `life` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `attack` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `defence` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `cost` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `equiped` enum('是','否') NOT NULL DEFAULT '否'
) ENGINE = MyISAM ROW_FORMAT = Fixed;

SET FOREIGN_KEY_CHECKS = 1;

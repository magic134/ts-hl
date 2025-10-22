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

 Date: 21/10/2025 18:56:53
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yx_item
-- ----------------------------
DROP TABLE IF EXISTS `yx_item`;
CREATE TABLE `yx_item`  (
  `name` varchar(16) NULL DEFAULT NULL,
  `cost` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `look` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `item_sort` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `level_required` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `life` int(4) NULL DEFAULT 0,
  `power` int(4) NULL DEFAULT 0,
  `attack` int(4) NULL DEFAULT 0,
  `defence` int(4) NULL DEFAULT 0,
  `dexterity` int(4) NULL DEFAULT 0,
  `anti_poison` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `anti_freeze` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `anti_sleep` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `anti_chaos` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `id` int(4) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `inventer_name` varchar(16) NULL DEFAULT NULL,
  `id_action` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `exp` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `class` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `sacrifice` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  PRIMARY KEY (`id`)
) ENGINE = MyISAM AUTO_INCREMENT = 1 ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;

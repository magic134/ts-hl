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

 Date: 21/10/2025 18:57:45
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yx_petcolor
-- ----------------------------
DROP TABLE IF EXISTS `yx_petcolor`;
CREATE TABLE `yx_petcolor`  (
  `id_pet` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `hue0` tinyint(3) UNSIGNED NULL DEFAULT NULL,
  `stauration0` tinyint(2) NULL DEFAULT NULL,
  `bright0` tinyint(2) NULL DEFAULT NULL,
  `hue1` tinyint(3) UNSIGNED NULL DEFAULT NULL,
  `stauration1` tinyint(2) NULL DEFAULT NULL,
  `bright1` tinyint(2) NULL DEFAULT NULL,
  `hue2` tinyint(3) UNSIGNED NULL DEFAULT NULL,
  `stauration2` tinyint(2) NULL DEFAULT NULL,
  `bright2` tinyint(2) NULL DEFAULT NULL,
  PRIMARY KEY (`id_pet`)
) ENGINE = MyISAM ROW_FORMAT = Fixed;

SET FOREIGN_KEY_CHECKS = 1;

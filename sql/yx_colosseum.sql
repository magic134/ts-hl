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

 Date: 21/10/2025 18:56:28
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yx_colosseum
-- ----------------------------
DROP TABLE IF EXISTS `yx_colosseum`;
CREATE TABLE `yx_colosseum`  (
  `id` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `idmap` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `name` char(16) NULL DEFAULT '',
  `type` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `managerlook` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `managercellx` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `managercelly` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `lowlevellimit` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `toplevellimit` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 1200,
  `class` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  PRIMARY KEY (`id`)
) ENGINE = MyISAM ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of yx_colosseum
-- ----------------------------
INSERT INTO `yx_colosseum` VALUES (0001, 100001, '黄金角斗场', 0002, 0006, 0079, 0091, 0000, 2000, 0001);
INSERT INTO `yx_colosseum` VALUES (0002, 100002, '山城角斗场', 0002, 0006, 0042, 0024, 0000, 2000, 0001);
INSERT INTO `yx_colosseum` VALUES (0003, 100003, '树城角斗场', 0002, 0006, 0062, 0087, 0000, 2000, 0001);
INSERT INTO `yx_colosseum` VALUES (0004, 200001, '沙城角斗场', 0002, 0006, 0079, 0075, 0000, 2000, 0001);

SET FOREIGN_KEY_CHECKS = 1;

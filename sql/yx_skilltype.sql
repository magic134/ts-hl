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

 Date: 21/10/2025 18:58:53
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yx_skilltype
-- ----------------------------
DROP TABLE IF EXISTS `yx_skilltype`;
CREATE TABLE `yx_skilltype`  (
  `name` varchar(16) NULL DEFAULT '',
  `skill_sort` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `owner_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `look` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `trace` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `blast` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `level_required` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `power` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `attack_coefficient` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `defence_coefficient` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `recover_coefficient` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `magic_coefficient` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `cast_coefficient` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `lost_coefficient` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `magic_bout` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `range` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `magic_range` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `magic_sort` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `id` int(4) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `select_flag` int(4) NULL DEFAULT 0,
  `exp` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `inventer_name` varchar(16) NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE = MyISAM AUTO_INCREMENT = 1007 ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of yx_skilltype
-- ----------------------------
INSERT INTO `yx_skilltype` VALUES ('气动波', 0000, 0000, 0006, 0001, 0001, 0020, 0010, 0150, 0000, 0000, 0000, 0095, 0000, 0001, 0000, 0000, 0000, 0001, 0, 0000, '天晴五狼');
INSERT INTO `yx_skilltype` VALUES ('疾风斩', 0000, 0000, 0004, 0004, 0000, 0060, 0050, 0150, 0000, 0000, 0000, 0095, 0000, 0001, 0000, 0000, 0000, 0002, 0, 0000, '天晴五狼');
INSERT INTO `yx_skilltype` VALUES ('空明拳', 0000, 0000, 0000, 0000, 0002, 0100, 0100, 0180, 0000, 0000, 0000, 0095, 0000, 0001, 0000, 0000, 0000, 0003, 0, 0000, '天晴五狼');
INSERT INTO `yx_skilltype` VALUES ('少林金刚掌', 0000, 0000, 0007, 0004, 0005, 0200, 0200, 0180, 0000, 0000, 0000, 0095, 0000, 0001, 0000, 0000, 0000, 0004, 0, 0000, '※少林寺');
INSERT INTO `yx_skilltype` VALUES ('醉拳', 0000, 0000, 0007, 0012, 0017, 0600, 0600, 0180, 0000, 0000, 0000, 0095, 0000, 0001, 0000, 0000, 0000, 0005, 0, 0000, '※高阳酒徒');
INSERT INTO `yx_skilltype` VALUES ('般若掌', 0000, 0000, 0007, 0012, 0005, 0300, 0500, 0220, 0000, 0000, 0000, 0120, 0000, 0001, 0000, 0000, 0000, 1006, 0, 0000, '※少林寺');

SET FOREIGN_KEY_CHECKS = 1;

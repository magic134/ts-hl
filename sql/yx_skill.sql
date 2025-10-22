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

 Date: 21/10/2025 18:58:46
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yx_skill
-- ----------------------------
DROP TABLE IF EXISTS `yx_skill`;
CREATE TABLE `yx_skill`  (
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
  PRIMARY KEY (`id`),
  INDEX `index_ownerid`(`owner_id`)
) ENGINE = MyISAM AUTO_INCREMENT = 1 ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;

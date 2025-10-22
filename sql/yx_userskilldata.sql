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

 Date: 21/10/2025 19:00:19
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yx_userskilldata
-- ----------------------------
DROP TABLE IF EXISTS `yx_userskilldata`;
CREATE TABLE `yx_userskilldata`  (
  `userid` int(4) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `skill_count` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `skill0_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `skill1_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `skill2_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `skill3_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `skill4_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `skill5_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `skill6_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `skill7_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `skill8_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `skill9_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `skillused_count` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `skillused0_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `skillused1_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `skillused2_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `skillused3_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `skillused4_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  PRIMARY KEY (`userid`)
) ENGINE = MyISAM AUTO_INCREMENT = 1 ROW_FORMAT = Fixed;

SET FOREIGN_KEY_CHECKS = 1;

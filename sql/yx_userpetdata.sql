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

 Date: 21/10/2025 19:00:13
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yx_userpetdata
-- ----------------------------
DROP TABLE IF EXISTS `yx_userpetdata`;
CREATE TABLE `yx_userpetdata`  (
  `userid` int(4) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `pet_count` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `petused_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `pet0_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `pet1_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `pet2_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `pet3_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `pet4_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  PRIMARY KEY (`userid`)
) ENGINE = MyISAM AUTO_INCREMENT = 1 ROW_FORMAT = Fixed;

SET FOREIGN_KEY_CHECKS = 1;
